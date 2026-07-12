import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ShellSidebar } from './components/ShellSidebar'
import { ShellTopbar } from './components/ShellTopbar'
import { FinancasContainerPage } from './pages/FinancasContainerPage'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <div className="shell-root">
        <ShellSidebar />
        <section className="shell-workspace">
          <ShellTopbar />
          <main className="shell-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/financas" element={<FinancasContainerPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </section>
      </div>
    </BrowserRouter>
  )
}

export default App
