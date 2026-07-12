import { NavLink } from 'react-router-dom'

export function ShellSidebar() {
  return (
    <aside className="shell-sidebar" aria-label="Navegacao da shell">
      <p className="shell-logo">Shell Financas</p>
      <nav className="shell-side-nav">
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/financas">Financas</NavLink>
      </nav>
    </aside>
  )
}