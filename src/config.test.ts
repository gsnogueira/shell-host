import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  getAllowedFinancasOrigins,
  getFinancasRemoteUrl,
  isAllowedFinancasRemote,
} from './config'

describe('financas remote config', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('uses the configured remote url when it is valid', () => {
    vi.stubEnv('VITE_FINANCAS_REMOTE_URL', 'https://financas.example.com/')

    expect(getFinancasRemoteUrl()).toBe('https://financas.example.com/')
  })

  it('falls back to the default dev url when the configured url is invalid', () => {
    vi.stubEnv('VITE_FINANCAS_REMOTE_URL', 'not-a-valid-url')

    expect(getFinancasRemoteUrl()).toBe('http://localhost:3003/')
  })

  it('deduplicates allowed origins and always includes the remote origin', () => {
    vi.stubEnv('VITE_FINANCAS_REMOTE_URL', 'https://financas.example.com/')
    vi.stubEnv(
      'VITE_FINANCAS_ALLOWED_ORIGINS',
      'https://allowed.example.com, https://allowed.example.com, https://financas.example.com',
    )

    expect(getAllowedFinancasOrigins()).toEqual([
      'https://allowed.example.com',
      'https://financas.example.com',
    ])
  })

  it('rejects urls outside the allowed origins', () => {
    vi.stubEnv('VITE_FINANCAS_REMOTE_URL', 'https://financas.example.com/')
    vi.stubEnv('VITE_FINANCAS_ALLOWED_ORIGINS', 'https://allowed.example.com')

    expect(isAllowedFinancasRemote('https://allowed.example.com/transactions/?embed=1')).toBe(true)
    expect(isAllowedFinancasRemote('https://evil.example.com/')).toBe(false)
  })
})