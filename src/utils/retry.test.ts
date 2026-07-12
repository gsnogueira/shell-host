import { describe, expect, it } from 'vitest'
import { getBackoffDelayMs } from './retry'

describe('retry backoff', () => {
  it('grows exponentially up to the cap', () => {
    expect(getBackoffDelayMs(0)).toBe(400)
    expect(getBackoffDelayMs(1)).toBe(800)
    expect(getBackoffDelayMs(2)).toBe(1600)
    expect(getBackoffDelayMs(6)).toBe(25600)
  })

  it('caps larger attempts at the same max delay', () => {
    expect(getBackoffDelayMs(7)).toBe(25600)
    expect(getBackoffDelayMs(20)).toBe(25600)
  })
})