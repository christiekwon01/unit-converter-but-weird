import { UNHINGED_UNITS } from './unhingedUnits'

export type Category = 'length' | 'mass' | 'volume' | 'temperature'

export interface Unit {
  id: string
  label: string
  short: string
  category: Category
  weird?: boolean
  /** Multiply by this to get the category base unit (m, kg, L, or °C for temperature). */
  toBase: number
  blurb?: string
}

export const CATEGORY_LABELS: Record<Category, string> = {
  length: 'Length',
  mass: 'Mass',
  volume: 'Volume',
  temperature: 'Temperature',
}

export const CATEGORIES: Category[] = [
  'length',
  'mass',
  'volume',
  'temperature',
]

const EVERYDAY_UNITS: Unit[] = [
  // Length
  { id: 'm', label: 'Meters', short: 'm', category: 'length', toBase: 1 },
  { id: 'km', label: 'Kilometers', short: 'km', category: 'length', toBase: 1000 },
  { id: 'cm', label: 'Centimeters', short: 'cm', category: 'length', toBase: 0.01 },
  { id: 'mm', label: 'Millimeters', short: 'mm', category: 'length', toBase: 0.001 },
  { id: 'ft', label: 'Feet', short: 'ft', category: 'length', toBase: 0.3048 },
  { id: 'in', label: 'Inches', short: 'in', category: 'length', toBase: 0.0254 },
  { id: 'mi', label: 'Miles', short: 'mi', category: 'length', toBase: 1609.344 },
  { id: 'yd', label: 'Yards', short: 'yd', category: 'length', toBase: 0.9144 },
  // Mass
  { id: 'kg', label: 'Kilograms', short: 'kg', category: 'mass', toBase: 1 },
  { id: 'g', label: 'Grams', short: 'g', category: 'mass', toBase: 0.001 },
  { id: 'mg', label: 'Milligrams', short: 'mg', category: 'mass', toBase: 0.000001 },
  { id: 'lb', label: 'Pounds', short: 'lb', category: 'mass', toBase: 0.453592 },
  { id: 'oz', label: 'Ounces', short: 'oz', category: 'mass', toBase: 0.0283495 },
  { id: 't', label: 'Metric Tons', short: 't', category: 'mass', toBase: 1000 },
  // Volume
  { id: 'l', label: 'Liters', short: 'L', category: 'volume', toBase: 1 },
  { id: 'ml', label: 'Milliliters', short: 'mL', category: 'volume', toBase: 0.001 },
  { id: 'gal', label: 'US Gallons', short: 'gal', category: 'volume', toBase: 3.78541 },
  { id: 'floz', label: 'US Fluid Ounces', short: 'fl oz', category: 'volume', toBase: 0.0295735 },
  { id: 'cup', label: 'US Cups', short: 'cup', category: 'volume', toBase: 0.236588 },
  // Temperature
  { id: 'c', label: 'Celsius', short: '°C', category: 'temperature', toBase: 1 },
  { id: 'f', label: 'Fahrenheit', short: '°F', category: 'temperature', toBase: 1 },
  { id: 'k', label: 'Kelvin', short: 'K', category: 'temperature', toBase: 1 },
]

export const UNITS: Unit[] = [...EVERYDAY_UNITS, ...UNHINGED_UNITS]

export const PRESETS: { label: string; fromId: string; toId: string; value: number }[] = [
  { label: 'Eiffel Tower in capybaras', fromId: 'eiffel', toId: 'capybara', value: 1 },
  { label: 'Marathon in football fields', fromId: 'km', toId: 'football-field', value: 42.195 },
  { label: 'Blue whale in hot dogs', fromId: 'blue-whale', toId: 'hot-dog', value: 1 },
  { label: 'Olympic pool in coffee mugs', fromId: 'olympic-pool', toId: 'coffee-mug', value: 1 },
  { label: 'Elephant in smartphones', fromId: 'elephant', toId: 'smartphone', value: 1 },
  { label: 'Mount Everest in giraffes', fromId: 'mount-everest', toId: 'giraffe', value: 1 },
  { label: 'Human in hamsters', fromId: 'human', toId: 'hamster', value: 1 },
  { label: 'Light-year in bananas', fromId: 'light-year', toId: 'banana', value: 1 },
  { label: 'Boiling water in comfortable rooms', fromId: 'boiling-water', toId: 'room', value: 1 },
]

const WEIRD_TEMP_C: Record<string, number> = Object.fromEntries(
  UNHINGED_UNITS.filter((u) => u.category === 'temperature').map((u) => [
    u.id,
    u.toBase,
  ]),
)

export function unitsForCategory(category: Category): Unit[] {
  return UNITS.filter((u) => u.category === category)
}

export function getUnit(id: string): Unit | undefined {
  return UNITS.find((u) => u.id === id)
}

export function toCelsius(value: number, unitId: string): number {
  switch (unitId) {
    case 'c':
      return value
    case 'f':
      return ((value - 32) * 5) / 9
    case 'k':
      return value - 273.15
    default: {
      const ref = WEIRD_TEMP_C[unitId]
      return ref !== undefined ? value * ref : value
    }
  }
}

export function fromCelsius(celsius: number, unitId: string): number {
  switch (unitId) {
    case 'c':
      return celsius
    case 'f':
      return (celsius * 9) / 5 + 32
    case 'k':
      return celsius + 273.15
    default: {
      const ref = WEIRD_TEMP_C[unitId]
      return ref !== undefined ? celsius / ref : celsius
    }
  }
}
