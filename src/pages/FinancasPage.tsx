import { useState } from 'react'
import { RemoteEmbedFrame } from '../components/RemoteEmbedFrame'

type FinancasRoute = '/' | '/transactions/' | '/analytics/'

export function FinancasPage() {
  const [activeRoute, setActiveRoute] = useState<FinancasRoute>('/')

  return (
    <section className="panel">
      <div className="financas-toolbar">
        <h1>Rota /financas</h1>
        <p>Container da shell para o modulo remoto em modo embed.</p>

        <div className="segment" role="tablist" aria-label="Rotas do modulo remoto">
          <button
            type="button"
            role="tab"
            aria-selected={activeRoute === '/'}
            onClick={() => setActiveRoute('/')}
          >
            Inicio
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeRoute === '/transactions/'}
            onClick={() => setActiveRoute('/transactions/')}
          >
            Transactions
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeRoute === '/analytics/'}
            onClick={() => setActiveRoute('/analytics/')}
          >
            Analytics
          </button>
        </div>
      </div>

      <RemoteEmbedFrame remotePath={activeRoute} />
    </section>
  )
}