import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'gabri-ui-components'
import {
  MAX_REMOTE_RETRIES,
  REMOTE_LOAD_TIMEOUT_MS,
  getAllowedFinancasOrigins,
  getFinancasRemoteUrl,
  isAllowedFinancasRemote,
} from '../config'
import { REMOTE_EVENTS, emitRemoteEvent } from '../mf/remoteEvents'
import { getBackoffDelayMs } from '../utils/retry'

type RemoteStatus = 'loading' | 'loaded' | 'error'

type RemoteEmbedFrameProps = {
  remotePath: string
}

export function RemoteEmbedFrame({ remotePath }: RemoteEmbedFrameProps) {
  const remoteBaseUrl = useMemo(() => getFinancasRemoteUrl(), [])
  const allowedOrigins = useMemo(() => getAllowedFinancasOrigins(), [])
  const [status, setStatus] = useState<RemoteStatus>('loading')
  const [attempt, setAttempt] = useState(0)
  const [version, setVersion] = useState(0)
  const [startedAt, setStartedAt] = useState<number>(performance.now())
  const timeoutRef = useRef<number | null>(null)

  const remoteUrl = useMemo(() => {
    const nextPath = remotePath.startsWith('/') ? remotePath : `/${remotePath}`
    return new URL(nextPath, remoteBaseUrl).toString()
  }, [remoteBaseUrl, remotePath])

  const canRenderRemote = useMemo(
    () => isAllowedFinancasRemote(remoteUrl),
    [remoteUrl],
  )

  useEffect(() => {
    setStatus('loading')
    setAttempt(0)
    setVersion(0)
    setStartedAt(performance.now())
  }, [remoteUrl])

  useEffect(() => {
    if (!canRenderRemote) {
      setStatus('error')
      emitRemoteEvent(REMOTE_EVENTS.loadError, {
        remoteUrl,
        reason: 'origin_not_allowed',
        allowedOrigins,
      })
      return
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setStatus((current) => {
        if (current === 'loaded') {
          return current
        }

        emitRemoteEvent(REMOTE_EVENTS.loadError, {
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
  }, [allowedOrigins, attempt, canRenderRemote, remoteUrl, version])

  function retryLoad(manual = false): void {
    setAttempt((current) => current + 1)
    setVersion((current) => current + 1)
    setStatus('loading')
    setStartedAt(performance.now())

    emitRemoteEvent(REMOTE_EVENTS.retry, {
      remoteUrl,
      manual,
      nextAttempt: attempt + 1,
    })
  }

  function handleError(reason: 'network' | 'timeout'): void {
    setStatus('error')
    emitRemoteEvent(REMOTE_EVENTS.loadError, { remoteUrl, attempt, reason })

    if (attempt >= MAX_REMOTE_RETRIES) {
      return
    }

    const delay = getBackoffDelayMs(attempt)
    window.setTimeout(() => retryLoad(false), delay)
  }

  function handleLoad(): void {
    const loadMs = Math.round(performance.now() - startedAt)
    setStatus('loaded')
    emitRemoteEvent(REMOTE_EVENTS.loaded, { remoteUrl, loadMs, attempt })
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
            {canRenderRemote
              ? `Verifique a URL, CORS e disponibilidade do host estatico. Tentativa atual: ${attempt}`
              : `Origem do remote nao permitida. Origem atual: ${new URL(remoteUrl).origin}`}
          </p>
          {!canRenderRemote ? (
            <p>Origens permitidas: {allowedOrigins.join(', ')}</p>
          ) : null}
          <Button type="button" variant="danger" size="sm" onClick={() => retryLoad(true)}>
            Tentar novamente
          </Button>
        </div>
      ) : null}

      {canRenderRemote ? (
        <iframe
          key={`${remoteUrl}-${version}`}
          title="Modulo de Financas"
          src={remoteUrl}
          className="remote-frame"
          onLoad={handleLoad}
          onError={() => handleError('network')}
        />
      ) : null}
    </section>
  )
}