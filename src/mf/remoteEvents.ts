export const REMOTE_EVENTS = {
  loaded: 'financas:loaded',
  loadError: 'financas:load_error',
  retry: 'financas:retry',
} as const

export function emitRemoteEvent(
  name: (typeof REMOTE_EVENTS)[keyof typeof REMOTE_EVENTS],
  detail: Record<string, unknown>,
): void {
  window.dispatchEvent(new CustomEvent(name, { detail }))
  console.info(`[shell-host] ${name}`, detail)
}