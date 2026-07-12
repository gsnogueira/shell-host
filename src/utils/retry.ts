export function getBackoffDelayMs(attempt: number): number {
  const base = 400
  const cappedAttempt = Math.min(attempt, 6)
  return base * Math.pow(2, cappedAttempt)
}