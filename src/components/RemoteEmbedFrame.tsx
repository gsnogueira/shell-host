import { useEffect, useMemo, useRef, useState } from 'react'
import {
  MAX_REMOTE_RETRIES,
  REMOTE_LOAD_TIMEOUT_MS,
  getFinancasRemoteUrl,
} from '../config'
import { getBackoffDelayMs } from '../utils/retry'

type RemoteStatus = 'loading' | 'loaded' | 'error'

type RemoteEmbedFrameProps = {
  remotePath: string
}

function emitHostEvent(name: string, detail: Record<string, unknown>): void {
  window.dispatchEvent(new CustomEvent(name, { detail }))
  console.info(`[shell-host] ${name}`, detail)
}

export function RemoteEmbedFrame({ remotePath }: RemoteEmbedFrameProps) {
  const remoteBaseUrl = useMemo(() => getFinancasRemoteUrl(), [])
  const [status, setStatus] = useState<RemoteStatus>('loading')
  const [attempt, setAttempt] = useState(0)
  const [version, setVersion] = useState(0)
  const [startedAt, setStartedAt] = useState<number>(performance.now())
  const timeoutRef = useRef<number | null>(null)

  const remoteUrl = useMemo(() => {
    const nextPath = remotePath.startsWith('/') ? remotePath : `/${remotePath}`
    return new URL(nextPath, remoteBaseUrl).toString()
  }, [remoteBaseUrl, remotePath])

  useEffect(() => {
    setStatus('loading')
    setAttempt(0)
    setVersion(0)
    setStartedAt(performance.now())
  }, [remoteUrl])

  useEffect(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setStatus((current) => {
        if (current === 'loaded') {
          return current
        }

        emitHostEvent('financas:load_error', {
          remoteUrl,
          attempt,
          reason: 'timeout',
        })

        return 'error'
      })
    }, REMOTE_LOAD_TIMEOUT_MS)

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [attempt, remoteUrl, version])

  function retryLoad(manual = false): void {
    setAttempt((current) => current + 1)
    setVersion((current) => current + 1)
    setStatus('loading')
    setStartedAt(performance.now())

    emitHostEvent('financas:retry', {
      remoteUrl,
      manual,
      nextAttempt: attempt + 1,
    })
  }

  function handleError(reason: 'network' | 'timeout'): void {
    setStatus('error')
    emitHostEvent('financas:load_error', { remoteUrl, attempt, reason })

    if (attempt >= MAX_REMOTE_RETRIES) {
      return
    }

    const delay = getBackoffDelayMs(attempt)
    window.setTimeout(() => retryLoad(false), delay)
  }

  function handleLoad(): void {
    const loadMs = Math.round(performance.now() - startedAt)
    setStatus('loaded')
    emitHostEvent('financas:loaded', { remoteUrl, loadMs, attempt })
  }

  return (
    <section className="remote-panel">
      <header className="remote-panel-header">
        <h2>Modulo de Financas</h2>
        <p>
          URL atual: <span>{remoteUrl}</span>
        </p>
      </header>

      {status === 'error' ? (
        <div className="fallback" role="alert">
          <h3>Falha ao carregar o modulo remoto</h3>
          <p>
            Verifique a URL, CORS e disponibilidade do host estatico. Tentativa atual:
            {` ${attempt}`}
          </p>
          <button type="button" onClick={() => retryLoad(true)}>
            Tentar novamente
          </button>
        </div>
      ) : null}

      <iframe
        key={`${remoteUrl}-${version}`}
        title="Modulo de Financas"
        src={remoteUrl}
        className="remote-frame"
        onLoad={handleLoad}
        onError={() => handleError('network')}
      />
    </section>
  )
}