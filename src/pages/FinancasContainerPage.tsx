import { useMemo, useState } from 'react'
import { Button } from 'gabri-ui-components'
import { ShellSidebar } from '../components/ShellSidebar'
import { ShellTopbar } from '../components/ShellTopbar'
import { isAllowedFinancasRemote } from '../config'

type FinancasRoute = '/' | '/transactions/' | '/analytics/'

interface FinancasContainerPageProps {
  remoteUrl: string
}

const FINANCAS_EMBED_ROUTES: Array<{ label: string; route: FinancasRoute }> = [
  { label: 'Dashboard', route: '/' },
  { label: 'Transactions', route: '/transactions/' },
  { label: 'Analytics', route: '/analytics/' },
]

function buildEmbedUrl(remoteUrl: string, route: FinancasRoute): string {
  const url = new URL(route, remoteUrl)
  url.searchParams.set('embed', '1')
  return url.toString()
}

export function FinancasContainerPage({ remoteUrl }: FinancasContainerPageProps) {
  const [activeRoute, setActiveRoute] = useState<FinancasRoute>('/')
  const [loadedRoutes, setLoadedRoutes] = useState<Record<FinancasRoute, boolean>>({
    '/': false,
    '/transactions/': false,
    '/analytics/': false,
  })
  const [errorRoute, setErrorRoute] = useState<FinancasRoute | null>(null)

  const embedUrls = useMemo(
    () =>
      FINANCAS_EMBED_ROUTES.reduce<Record<FinancasRoute, string>>(
        (accumulator, { route }) => {
          accumulator[route] = buildEmbedUrl(remoteUrl, route)
          return accumulator
        },
        { '/': '', '/transactions/': '', '/analytics/': '' },
      ),
    [remoteUrl],
  )

  const navItems = FINANCAS_EMBED_ROUTES.map(({ label, route }) => ({ href: route, label }))

  const canRenderAll = useMemo(
    () => FINANCAS_EMBED_ROUTES.every(({ route }) => isAllowedFinancasRemote(embedUrls[route])),
    [embedUrls],
  )

  function handleNavigateSidebar(href: string): void {
    if (href === '/' || href === '/transactions/' || href === '/analytics/') {
      setErrorRoute(null)
      setActiveRoute(href)
    }
  }

  function markRouteLoaded(route: FinancasRoute): void {
    setLoadedRoutes((current) => (current[route] ? current : { ...current, [route]: true }))
    if (errorRoute === route) {
      setErrorRoute(null)
    }
  }

  function markRouteError(route: FinancasRoute): void {
    setErrorRoute(route)
  }

  const activeUrl = embedUrls[activeRoute]
  const activeLoaded = loadedRoutes[activeRoute]

  return (
    <div className="sh-root">
      <ShellSidebar activePath={activeRoute} navItems={navItems} onNavigate={handleNavigateSidebar} />

      <div className="sh-main">
        <ShellTopbar title="Dashboard" subtitle="Visao geral das suas financas" />

        <main className="sh-content">
          <section className="remote-panel">
            {!canRenderAll ? (
              <div className="fallback" role="alert">
                <h3>Falha ao carregar o modulo remoto</h3>
                <p>
                  Origem do remote nao permitida. Origem atual: {new URL(activeUrl).origin}
                </p>
              </div>
            ) : null}

            {!activeLoaded && !errorRoute ? <div className="remote-loading">Carregando modulo de Financas...</div> : null}

            {errorRoute ? (
              <div className="fallback" role="alert">
                <h3>Falha ao carregar o modulo remoto</h3>
                <p>Verifique a disponibilidade do host estatico e tente novamente.</p>
                <Button type="button" variant="danger" size="sm" onClick={() => setErrorRoute(null)}>
                  Tentar novamente
                </Button>
              </div>
            ) : null}

            {FINANCAS_EMBED_ROUTES.map(({ route }) => {
              const isActive = route === activeRoute
              const isLoaded = loadedRoutes[route]
              const src = embedUrls[route]

              return (
                <iframe
                  key={route}
                  title={`Modulo de Financas ${route}`}
                  src={src}
                  data-financas-frame={isActive ? 'active' : 'cached'}
                  className={`remote-frame ${isActive ? 'remote-frame-active' : 'remote-frame-cached'}`}
                  style={{ display: isActive ? 'block' : 'none' }}
                  onLoad={() => markRouteLoaded(route)}
                  onError={() => markRouteError(route)}
                  loading={isLoaded ? 'eager' : 'eager'}
                  aria-hidden={isActive ? undefined : true}
                />
              )
            })}

            {!errorRoute && activeLoaded ? null : null}
          </section>
        </main>
      </div>
    </div>
  )
}