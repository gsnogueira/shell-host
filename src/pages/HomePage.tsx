import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <section className="panel">
      <h1>Shell SPA para o modulo de Financas</h1>
      <p>
        Esta shell centraliza roteamento, layout global e observabilidade. A Fase 1
        usa o build estatico em modo embed, e a Fase 2 evolui para Module Federation
        em runtime.
      </p>

      <div className="grid">
        <article className="card">
          <h2>Fase 1 ativa</h2>
          <ul>
            <li>Rota da shell em /financas</li>
            <li>Container dedicado com fallback de erro</li>
            <li>Eventos de carregamento e falha do modulo</li>
          </ul>
        </article>

        <article className="card">
          <h2>Pronto para Fase 2</h2>
          <ul>
            <li>Contrato mount/unmount tipado</li>
            <li>Ponto de extensao para remote federado</li>
            <li>Compartilhamento de React preparado no desenho</li>
          </ul>
        </article>
      </div>

      <Link className="cta" to="/financas">
        Abrir modulo de Financas
      </Link>
    </section>
  )
}