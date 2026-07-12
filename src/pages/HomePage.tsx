import { Link } from 'react-router-dom'
import { Button, Card, DataTable, MetricCard } from 'gabri-ui-components'

export function HomePage() {
  const checklistColumns = [
    { key: 'item', label: 'Item' },
    { key: 'status', label: 'Status' },
  ]

  const checklistRows = [
    { item: 'Rota da shell em /financas', status: 'Ativo' },
    { item: 'Fallback com retry', status: 'Ativo' },
    { item: 'Contrato federado tipado', status: 'Preparado' },
  ]

  return (
    <section className="panel">
      <h1>Shell SPA para o modulo de Financas</h1>
      <p>
        Esta shell centraliza roteamento, layout global e observabilidade. A Fase 1
        usa o build estatico em modo embed, e a Fase 2 evolui para Module Federation
        em runtime.
      </p>

      <div className="metrics-grid">
        <MetricCard
          label="Fase 1"
          value="Operacional"
          change="Remote em embed"
          tone="green"
          changeDirection="up"
        />
        <MetricCard
          label="Fase 2"
          value="Preparada"
          change="Mount/unmount tipado"
          tone="blue"
          changeDirection="up"
        />
      </div>

      <div className="grid">
        <Card
          title="Checklist da shell"
          subtitle="Baseado no plano de entrega em duas fases"
          accent="blue"
        >
          <DataTable columns={checklistColumns} rows={checklistRows} />
        </Card>

        <Card
          title="Proxima etapa"
          subtitle="Conectar dominio real do modulo na shell"
          accent="green"
        >
          <p>Valide /transactions e /analytics com o mesmo visual compartilhado.</p>
        </Card>
      </div>

      <Link to="/financas" aria-label="Abrir modulo de Financas">
        <Button variant="primary" size="md">Abrir modulo de Financas</Button>
      </Link>
    </section>
  )
}