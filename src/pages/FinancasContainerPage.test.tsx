import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { FinancasContainerPage } from './FinancasContainerPage'

vi.mock('../components/ShellTopbar', () => ({
  ShellTopbar: ({ title, subtitle }: { title: string; subtitle: string }) => (
    <header>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  ),
}))

vi.mock('gabri-ui-components', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <button {...props}>{children}</button>
  ),
}))

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('FinancasContainerPage', () => {
  it('renders cached embed iframes and switches the active route', () => {
    vi.stubEnv('VITE_FINANCAS_ALLOWED_ORIGINS', 'https://financas.example.com')
    vi.stubEnv('VITE_FINANCAS_REMOTE_URL', 'https://financas.example.com/')

    render(<FinancasContainerPage remoteUrl="https://financas.example.com/" />)

    const dashboardFrame = screen.getByTitle('Modulo de Financas /')
    const transactionsFrame = screen.getByTitle('Modulo de Financas /transactions/')
    const analyticsFrame = screen.getByTitle('Modulo de Financas /analytics/')

    expect(dashboardFrame).toHaveAttribute('src', 'https://financas.example.com/?embed=1')
    expect(transactionsFrame).toHaveAttribute('src', 'https://financas.example.com/transactions/?embed=1')
    expect(analyticsFrame).toHaveAttribute('src', 'https://financas.example.com/analytics/?embed=1')
    expect(dashboardFrame).toHaveStyle({ display: 'block' })
    expect(transactionsFrame).toHaveStyle({ display: 'none' })

    fireEvent.load(dashboardFrame)
    expect(screen.queryByText(/carregando modulo de financas/i)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Transactions' }))

    expect(transactionsFrame).toHaveStyle({ display: 'block' })
    expect(dashboardFrame).toHaveStyle({ display: 'none' })
    expect(screen.getByText(/carregando modulo de financas/i)).toBeInTheDocument()

    fireEvent.load(transactionsFrame)

    expect(screen.queryByText(/carregando modulo de financas/i)).not.toBeInTheDocument()
  })

  it('shows an error when the remote origin is not allowed', () => {
    vi.stubEnv('VITE_FINANCAS_ALLOWED_ORIGINS', 'https://allowed.example.com')

    render(<FinancasContainerPage remoteUrl="https://unlisted.example.com/" />)

    expect(screen.getByText(/origem do remote nao permitida/i)).toBeInTheDocument()
  })
})