import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { getFinancasRemoteUrl } from './config'
import { FinancasContainerPage } from './pages/FinancasContainerPage'

function App() {
  const remoteUrl = getFinancasRemoteUrl()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FinancasContainerPage remoteUrl={remoteUrl} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
