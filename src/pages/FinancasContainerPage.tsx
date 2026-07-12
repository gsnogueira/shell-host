import { useState } from 'react'
import { Button } from 'gabri-ui-components'
import { RemoteEmbedFrame } from '../components/RemoteEmbedFrame'

type FinancasRoute = '/' | '/transactions/' | '/analytics/'

export function FinancasContainerPage() {
  const [activeRoute, setActiveRoute] = useState<FinancasRoute>('/')

  return (
    <section className="panel">
      <div className="financas-toolbar">
        <h2>Rota /financas</h2>
        <p>Container da shell para o modulo remoto em modo embed.</p>

        <div className="segment" role="tablist" aria-label="Rotas do modulo remoto">
          <Button
            type="button"
            role="tab"
            variant={activeRoute === '/' ? 'primary' : 'ghost'}
            aria-selected={activeRoute === '/'}
            onClick={() => setActiveRoute('/')}
          >
            Inicio
          </Button>
          <Button
            type="button"
            role="tab"
            variant={activeRoute === '/transactions/' ? 'primary' : 'ghost'}
            aria-selected={activeRoute === '/transactions/'}
            onClick={() => setActiveRoute('/transactions/')}
          >
            Transactions
          </Button>
          <Button
            type="button"
            role="tab"
            variant={activeRoute === '/analytics/' ? 'primary' : 'ghost'}
            aria-selected={activeRoute === '/analytics/'}
            onClick={() => setActiveRoute('/analytics/')}
          >
            Analytics
          </Button>
        </div>
      </div>

      <RemoteEmbedFrame remotePath={activeRoute} />
    </section>
  )
}