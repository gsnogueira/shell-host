export const REMOTE_EVENTS = {
  loaded: 'financas:loaded',
  loadError: 'financas:load_error',
  retry: 'financas:retry',
} as const

export const FINANCAS_EVENTS = REMOTE_EVENTS

export function dispatchShellEvent(name: string, detail?: Record<string, unknown>) {
  window.dispatchEvent(new CustomEvent(name, { detail }))
}

export function emitRemoteEvent(
  name: (typeof REMOTE_EVENTS)[keyof typeof REMOTE_EVENTS],
  detail: Record<string, unknown>,
): void {
  dispatchShellEvent(name, detail)
}