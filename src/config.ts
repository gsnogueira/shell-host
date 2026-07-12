const DEFAULT_DEV_FINANCAS_REMOTE = 'http://localhost:3003/'
const DEFAULT_PROD_FINANCAS_REMOTE = 'https://financas.vercel.app/'

function getDefaultFinancasRemoteUrl(): string {
  return import.meta.env.PROD
    ? DEFAULT_PROD_FINANCAS_REMOTE
    : DEFAULT_DEV_FINANCAS_REMOTE
}

export function getFinancasRemoteUrl(): string {
  const fallback = getDefaultFinancasRemoteUrl()
  const rawUrl = import.meta.env.VITE_FINANCAS_REMOTE_URL ?? fallback

  try {
    return new URL(rawUrl).toString()
  } catch {
    return fallback
  }
}

export function getAllowedFinancasOrigins(): string[] {
  const configured = import.meta.env.VITE_FINANCAS_ALLOWED_ORIGINS
  const remoteOrigin = new URL(getFinancasRemoteUrl()).origin

  if (!configured) {
    return Array.from(new Set(['http://localhost:3003', remoteOrigin]))
  }

  const origins = configured
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  return Array.from(new Set([...origins, remoteOrigin]))
}

export function isAllowedFinancasRemote(url: string): boolean {
  try {
    const origin = new URL(url).origin
    return getAllowedFinancasOrigins().includes(origin)
  } catch {
    return false
  }
}

export const MAX_REMOTE_RETRIES = 3
export const REMOTE_LOAD_TIMEOUT_MS = 12000