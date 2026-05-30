import { formatNumber } from './convert'
import type { Category, Unit } from './units'

const CATEGORY_FACTS: Record<Category, string[]> = {
  length: [
    'A blue whale is about as long as a basketball court — minus the snacks.',
    'The internet uses bananas for scale because they’re roughly 18 cm and emotionally neutral.',
    'Mount Everest grows about 4 mm taller every year. Very ambitious for a rock.',
  ],
  mass: [
    'A blue whale weighs about as much as 30 African elephants. Casual.',
    'The average smartphone weighs less than a double cheeseburger. Progress?',
    'An adult capybara weighs ~50 kg — mostly water and good vibes.',
  ],
  volume: [
    'An Olympic swimming pool holds about 2.5 million liters. That’s a lot of cannonballs.',
    'One tanker truck carries enough liquid to fill roughly 7,000 bathtubs.',
    'A coffee mug holds ~350 mL — the official unit of “just one more cup.”',
  ],
  temperature: [
    'Liquid nitrogen is −196 °C. Do not use it to chill your soda.',
    'The surface of the Sun is ~5,500 °C. SPF infinity recommended.',
    'Room temperature is controversial. We picked 21 °C and refuse to elaborate.',
  ],
}

const UNIT_FACTS: Record<string, string> = {
  eiffel:
    'The Eiffel Tower was meant to be temporary. It outlasted most of your New Year’s resolutions.',
  capybara:
    'Capybaras are the world’s largest rodents and unofficially the chillest mammals alive.',
  'blue-whale':
    'Blue whales are the largest animals ever — bigger than any dinosaur. Humble brag.',
  'tanker-truck':
    'A tanker truck typically hauls ~30,000 liters. That’s one very committed road trip.',
  'olympic-pool':
    'Olympic pools are 50 m long and hold ~2.5 million liters. Michael Phelps approved.',
  'hot-dog':
    'The hot dog is an official unit of American summer. Bun physics not included.',
  elephant:
    'African elephants can weigh up to 6,000 kg and never forget a birthday.',
  hamster:
    'Hamsters run up to 8 km per night on their wheel. Tiny athletes, zero medals.',
  'mount-everest':
    'Everest is 8,848 m tall and still growing. Peak performance, literally.',
  banana:
    'Bananas are the internet’s favourite measuring stick since ~2010. Objectively silly.',
}

function pickStable<T>(items: T[], seed: string): T {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash + seed.charCodeAt(i) * (i + 1)) % items.length
  }
  return items[hash]
}

function singular(label: string): string {
  if (label.endsWith('ies')) return label.slice(0, -3) + 'y'
  if (label.endsWith('ses') || label.endsWith('xes')) return label.slice(0, -2)
  if (label.endsWith('s')) return label.slice(0, -1)
  return label
}

export function getFunFact(
  from: Unit | undefined,
  to: Unit | undefined,
  amount: number,
  result: number | null,
): string | null {
  if (!from || !to || from.category !== to.category) return null

  if (from.blurb) {
    return from.blurb
  }
  if (to.blurb) {
    return to.blurb
  }

  const unitFact = UNIT_FACTS[from.id] ?? UNIT_FACTS[to.id]
  if (unitFact) {
    return unitFact
  }

  if (
    result !== null &&
    Number.isFinite(amount) &&
    !Number.isNaN(amount) &&
    amount > 0
  ) {
    const fromLabel = amount === 1 ? singular(from.label) : from.label.toLowerCase()
    const toLabel = to.label.toLowerCase()
    return `${formatNumber(amount)} ${from.short} equals ${formatNumber(result)} ${to.short} — that's ${formatNumber(result)} ${toLabel} per ${amount === 1 ? singular(from.label).toLowerCase() : fromLabel}.`
  }

  return pickStable(CATEGORY_FACTS[from.category], `${from.id}-${to.id}`)
}
