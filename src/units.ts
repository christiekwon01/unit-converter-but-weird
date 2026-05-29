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

export const UNITS: Unit[] = [
  // Length — everyday
  { id: 'm', label: 'Meters', short: 'm', category: 'length', toBase: 1 },
  { id: 'km', label: 'Kilometers', short: 'km', category: 'length', toBase: 1000 },
  { id: 'cm', label: 'Centimeters', short: 'cm', category: 'length', toBase: 0.01 },
  { id: 'mm', label: 'Millimeters', short: 'mm', category: 'length', toBase: 0.001 },
  { id: 'ft', label: 'Feet', short: 'ft', category: 'length', toBase: 0.3048 },
  { id: 'in', label: 'Inches', short: 'in', category: 'length', toBase: 0.0254 },
  { id: 'mi', label: 'Miles', short: 'mi', category: 'length', toBase: 1609.344 },
  { id: 'yd', label: 'Yards', short: 'yd', category: 'length', toBase: 0.9144 },

  // Length — unhinged
  {
    id: 'capybara',
    label: 'Capybaras',
    short: '🦫 capy',
    category: 'length',
    weird: true,
    toBase: 1.3,
    blurb: 'Average adult capybara, nose to tail (~1.3 m).',
  },
  {
    id: 'eiffel',
    label: 'Eiffel Towers',
    short: '🗼 Eiffel',
    category: 'length',
    weird: true,
    toBase: 330,
    blurb: 'Tip of the antenna, not counting vibes.',
  },
  {
    id: 'banana',
    label: 'Bananas',
    short: '🍌 nana',
    category: 'length',
    weird: true,
    toBase: 0.18,
    blurb: 'Internet-standard banana for scale.',
  },
  {
    id: 'blue-whale',
    label: 'Blue Whales',
    short: '🐋 whale',
    category: 'length',
    weird: true,
    toBase: 24,
    blurb: 'Largest animal ever; also a respectable ruler.',
  },
  {
    id: 'school-bus',
    label: 'School Buses',
    short: '🚌 bus',
    category: 'length',
    weird: true,
    toBase: 12,
    blurb: 'Classic yellow bus, bumper to bumper.',
  },
  {
    id: 'football-field',
    label: 'Football Fields',
    short: '🏈 field',
    category: 'length',
    weird: true,
    toBase: 91.44,
    blurb: 'American football field, goal line to goal line.',
  },
  {
    id: 'empire-state',
    label: 'Empire State Buildings',
    short: '🏙️ Empire',
    category: 'length',
    weird: true,
    toBase: 443,
    blurb: 'Roof height; King Kong sold separately.',
  },
  {
    id: 'hot-dog',
    label: 'Hot Dogs',
    short: '🌭 dog',
    category: 'length',
    weird: true,
    toBase: 0.15,
    blurb: 'Standard festival hot dog, bun not included.',
  },

  // Mass — everyday
  { id: 'kg', label: 'Kilograms', short: 'kg', category: 'mass', toBase: 1 },
  { id: 'g', label: 'Grams', short: 'g', category: 'mass', toBase: 0.001 },
  { id: 'mg', label: 'Milligrams', short: 'mg', category: 'mass', toBase: 0.000001 },
  { id: 'lb', label: 'Pounds', short: 'lb', category: 'mass', toBase: 0.453592 },
  { id: 'oz', label: 'Ounces', short: 'oz', category: 'mass', toBase: 0.0283495 },
  { id: 't', label: 'Metric Tons', short: 't', category: 'mass', toBase: 1000 },

  // Mass — unhinged
  {
    id: 'capybara-mass',
    label: 'Capybaras (by weight)',
    short: '🦫 capy',
    category: 'mass',
    weird: true,
    toBase: 50,
    blurb: 'One chill capybara ≈ 50 kg of pure serenity.',
  },
  {
    id: 'elephant',
    label: 'African Elephants',
    short: '🐘 ellie',
    category: 'mass',
    weird: true,
    toBase: 6000,
    blurb: 'Average adult African bush elephant.',
  },
  {
    id: 'smartphone',
    label: 'Smartphones',
    short: '📱 phone',
    category: 'mass',
    weird: true,
    toBase: 0.2,
    blurb: 'Modern flagship, case optional.',
  },
  {
    id: 'hamburger',
    label: 'Double Cheeseburgers',
    short: '🍔 burger',
    category: 'mass',
    weird: true,
    toBase: 0.22,
    blurb: 'Two patties, one dream.',
  },
  {
    id: 'blue-whale-mass',
    label: 'Blue Whales (by weight)',
    short: '🐋 whale',
    category: 'mass',
    weird: true,
    toBase: 150000,
    blurb: 'Maximum recorded ~190 t; we use a polite 150 t.',
  },

  // Volume — everyday
  { id: 'l', label: 'Liters', short: 'L', category: 'volume', toBase: 1 },
  { id: 'ml', label: 'Milliliters', short: 'mL', category: 'volume', toBase: 0.001 },
  { id: 'gal', label: 'US Gallons', short: 'gal', category: 'volume', toBase: 3.78541 },
  { id: 'floz', label: 'US Fluid Ounces', short: 'fl oz', category: 'volume', toBase: 0.0295735 },
  { id: 'cup', label: 'US Cups', short: 'cup', category: 'volume', toBase: 0.236588 },

  // Volume — unhinged
  {
    id: 'olympic-pool',
    label: 'Olympic Swimming Pools',
    short: '🏊 pool',
    category: 'volume',
    weird: true,
    toBase: 2_500_000,
    blurb: 'Regulation pool at 2 m depth ≈ 2.5 million liters.',
  },
  {
    id: 'bathtub',
    label: 'Bathtubs',
    short: '🛁 tub',
    category: 'volume',
    weird: true,
    toBase: 150,
    blurb: 'Full tub, not just the puddle you actually use.',
  },
  {
    id: 'coffee-mug',
    label: 'Coffee Mugs',
    short: '☕ mug',
    category: 'volume',
    weird: true,
    toBase: 0.35,
    blurb: 'One respectable morning mug.',
  },
  {
    id: 'soda-can',
    label: 'Soda Cans',
    short: '🥤 can',
    category: 'volume',
    weird: true,
    toBase: 0.355,
    blurb: '12 fl oz / 355 mL of carbonated chaos.',
  },

  // Temperature — everyday only (weird temps are… risky)
  { id: 'c', label: 'Celsius', short: '°C', category: 'temperature', toBase: 1 },
  { id: 'f', label: 'Fahrenheit', short: '°F', category: 'temperature', toBase: 1 },
  { id: 'k', label: 'Kelvin', short: 'K', category: 'temperature', toBase: 1 },

  // Temperature — unhinged (stored as offsets from °C for display math)
  {
    id: 'room',
    label: 'Comfortable Room',
    short: '🏠 room',
    category: 'temperature',
    weird: true,
    toBase: 1,
    blurb: 'Defined as exactly 21 °C. Controversial.',
  },
  {
    id: 'surface-sun',
    label: 'Surface of the Sun',
    short: '☀️ sun',
    category: 'temperature',
    weird: true,
    toBase: 1,
    blurb: 'Photosphere ~5,500 °C. Do not touch.',
  },
  {
    id: 'lava',
    label: 'Fresh Lava',
    short: '🌋 lava',
    category: 'temperature',
    weird: true,
    toBase: 1,
    blurb: 'Basaltic lava ~1,200 °C. Also do not touch.',
  },
]

export const PRESETS: { label: string; fromId: string; toId: string; value: number }[] = [
  { label: 'Eiffel Tower in capybaras', fromId: 'eiffel', toId: 'capybara', value: 1 },
  { label: 'Marathon in football fields', fromId: 'km', toId: 'football-field', value: 42.195 },
  { label: 'Blue whale in hot dogs', fromId: 'blue-whale', toId: 'hot-dog', value: 1 },
  { label: 'Olympic pool in coffee mugs', fromId: 'olympic-pool', toId: 'coffee-mug', value: 1 },
  { label: 'Elephant in smartphones', fromId: 'elephant', toId: 'smartphone', value: 1 },
]

const WEIRD_TEMP_C: Record<string, number> = {
  room: 21,
  'surface-sun': 5500,
  lava: 1200,
}

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
    case 'room':
    case 'surface-sun':
    case 'lava': {
      const ref = WEIRD_TEMP_C[unitId]
      return ref !== undefined ? value * ref : value
    }
    default:
      return value
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
    case 'room':
    case 'surface-sun':
    case 'lava': {
      const ref = WEIRD_TEMP_C[unitId]
      return ref !== undefined ? celsius / ref : celsius
    }
    default:
      return celsius
  }
}
