import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HomePage } from './HomePage'

vi.mock('gabri-ui-components', () => ({
  Button: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  Card: ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => (
    <section>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {children}
    </section>
  ),
  DataTable: ({ columns, rows }: { columns: Array<{ key: string; label: string }>; rows: Array<Record<string, string>> }) => (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  MetricCard: ({ label, value }: { label: string; value: string }) => (
    <div>
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  ),
}))

describe('HomePage', () => {
  it('renders the shell overview and call to action', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /shell spa para o modulo de financas/i })).toBeInTheDocument()
    expect(screen.getByText(/Rota da shell em \/financas/i)).toBeInTheDocument()
    expect(screen.getByText('Operacional')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /abrir modulo de financas/i })).toHaveAttribute('href', '/financas')
  })
})