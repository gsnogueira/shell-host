const DEFAULT_FINANCAS_REMOTE = 'https://financas.example.com/'

export function getFinancasRemoteUrl(): string {
  const rawUrl = import.meta.env.VITE_FINANCAS_REMOTE_URL ?? DEFAULT_FINANCAS_REMOTE

  try {
    return new URL(rawUrl).toString()
  } catch {
    return DEFAULT_FINANCAS_REMOTE
  }
}

export const MAX_REMOTE_RETRIES = 3
export const REMOTE_LOAD_TIMEOUT_MS = 12000