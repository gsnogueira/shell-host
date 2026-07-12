import type { FinancasRemoteApi } from './types'

export async function loadFinancasRemote(): Promise<FinancasRemoteApi> {
  throw new Error(
    'Module Federation ainda nao configurado. Use esta funcao quando a Fase 2 for ativada.',
  )
}