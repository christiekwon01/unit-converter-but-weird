import {
  type Category,
  fromCelsius,
  getUnit,
  toCelsius,
  type Unit,
} from './units'

export function convert(
  value: number,
  fromId: string,
  toId: string,
): number | null {
  const from = getUnit(fromId)
  const to = getUnit(toId)
  if (!from || !to || from.category !== to.category) return null
  if (!Number.isFinite(value)) return null

  if (from.category === 'temperature') {
    const celsius = toCelsius(value, from.id)
    return fromCelsius(celsius, to.id)
  }

  const base = value * from.toBase
  return base / to.toBase
}

export function formatResult(value: number, unit: Unit): string {
  if (!Number.isFinite(value)) return '—'

  const abs = Math.abs(value)
  let digits: number
  if (abs >= 1_000_000) digits = 2
  else if (abs >= 1000) digits = 2
  else if (abs >= 1) digits = 4
  else if (abs >= 0.01) digits = 6
  else digits = 8

  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  }).format(value)

  return `${formatted} ${unit.short}`
}

export function defaultPair(category: Category): { from: string; to: string } {
  if (category === 'length') return { from: 'eiffel', to: 'capybara' }
  if (category === 'mass') return { from: 'elephant', to: 'capybara-mass' }
  if (category === 'volume') return { from: 'olympic-pool', to: 'coffee-mug' }
  return { from: 'c', to: 'f' }
}
