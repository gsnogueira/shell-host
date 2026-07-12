export type FinancasRemoteProps = {
  tenantId: string
  authToken?: string
  locale: string
  onNavigate?: (path: string) => void
}

export type FinancasRemoteApi = {
  mount: (element: HTMLElement, props: FinancasRemoteProps) => void
  unmount: (element: HTMLElement) => void
}