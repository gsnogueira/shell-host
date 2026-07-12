import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { FinancasPage } from './pages/FinancasPage'
import { HomePage } from './pages/HomePage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="shell-root">
        <header className="shell-header">
          <p className="shell-badge">Shell Host</p>
          <nav className="shell-nav" aria-label="Rotas principais">
            <Link to="/">Inicio</Link>
            <Link to="/financas">Financas</Link>
          </nav>
        </header>

        <main className="shell-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/financas" element={<FinancasPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
