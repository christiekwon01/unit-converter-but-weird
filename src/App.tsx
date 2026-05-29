import { useCallback, useMemo, useState } from 'react'
import {
  CATEGORIES,
  CATEGORY_LABELS,
  type Category,
  getUnit,
  UNITS,
  type Unit,
} from './units'
import { convert, defaultPair, formatNumber } from './convert'
import './App.css'

const INITIAL = defaultPair('length')

function matchesFilter(unit: Unit, query: string): boolean {
  if (!query) return true
  const q = query.toLowerCase()
  return (
    unit.label.toLowerCase().includes(q) ||
    unit.id.replace(/-/g, ' ').includes(q)
  )
}

function firstInCategory(category: Category, excludeId?: string): string {
  const unit = UNITS.find(
    (u) => u.category === category && u.id !== excludeId,
  )
  return unit?.id ?? UNITS.find((u) => u.category === category)!.id
}

function randomValueForCategory(category: Category): number {
  switch (category) {
    case 'length':
      return Number((Math.random() * 5000 + 0.5).toFixed(2))
    case 'mass':
      return Number((Math.random() * 2000 + 0.1).toFixed(2))
    case 'volume':
      return Number((Math.random() * 3000 + 0.1).toFixed(2))
    case 'temperature':
      return Number((Math.random() * 350 - 100).toFixed(1))
    default:
      return 1
  }
}

function pickTwoDistinct(units: Unit[]): [Unit, Unit] | null {
  if (units.length < 2) return null
  const firstIdx = Math.floor(Math.random() * units.length)
  let secondIdx = Math.floor(Math.random() * units.length)
  while (secondIdx === firstIdx) {
    secondIdx = Math.floor(Math.random() * units.length)
  }
  return [units[firstIdx], units[secondIdx]]
}

function App() {
  const [fromId, setFromId] = useState(INITIAL.from)
  const [toId, setToId] = useState(INITIAL.to)
  const [input, setInput] = useState('1')
  const [unitFilter, setUnitFilter] = useState('')

  const fromUnit = getUnit(fromId)
  const toUnit = getUnit(toId)
  const activeCategory = fromUnit?.category ?? toUnit?.category

  const unhingedTotal = useMemo(
    () => UNITS.filter((u) => u.weird).length,
    [],
  )

  const unitsByCategory = useMemo(() => {
    const q = unitFilter.trim()
    const map = new Map<
      Category,
      { everyday: Unit[]; weird: Unit[] }
    >()
    for (const cat of CATEGORIES) {
      const inCat = UNITS.filter((u) => u.category === cat)
      const everyday = inCat.filter((u) => !u.weird && matchesFilter(u, q))
      const weird = inCat.filter((u) => u.weird && matchesFilter(u, q))
      map.set(cat, { everyday, weird })
    }
    return map
  }, [unitFilter])

  const parsed = parseFloat(input)
  const result =
    fromUnit &&
    toUnit &&
    fromUnit.category === toUnit.category &&
    input.trim() !== '' &&
    !Number.isNaN(parsed)
      ? convert(parsed, fromId, toId)
      : null

  const setFrom = useCallback(
    (id: string) => {
      const next = getUnit(id)
      if (!next) return
      setFromId(id)
      const to = getUnit(toId)
      if (to && to.category !== next.category) {
        setToId(firstInCategory(next.category, id))
      }
    },
    [toId],
  )

  const setTo = useCallback(
    (id: string) => {
      const next = getUnit(id)
      if (!next) return
      setToId(id)
      const from = getUnit(fromId)
      if (from && from.category !== next.category) {
        setFromId(firstInCategory(next.category, id))
      }
    },
    [fromId],
  )

  const renderUnitSelect = (
    value: string,
    onChange: (id: string) => void,
    lockCategory: Category | undefined,
  ) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={lockCategory ? 'select-locked' : undefined}
    >
      {CATEGORIES.map((cat) => {
        const { everyday, weird } = unitsByCategory.get(cat)!
        if (everyday.length === 0 && weird.length === 0) return null
        const incompatible = lockCategory !== undefined && lockCategory !== cat
        const groupLabel = CATEGORY_LABELS[cat]

        return (
          <optgroup
            key={cat}
            label={groupLabel}
            disabled={incompatible}
            className={incompatible ? 'optgroup-incompatible' : undefined}
          >
            {everyday.map((u) => (
              <option key={u.id} value={u.id} disabled={incompatible}>
                {u.label}
              </option>
            ))}
            {weird.map((u) => (
              <option key={u.id} value={u.id} disabled={incompatible}>
                {u.label}
              </option>
            ))}
          </optgroup>
        )
      })}
    </select>
  )

  const swap = () => {
    setFromId(toId)
    setToId(fromId)
    if (result !== null && !Number.isNaN(parsed) && parsed !== 0) {
      setInput(String(result))
    }
  }

  const randomize = useCallback(() => {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
    const units = UNITS.filter((u) => u.category === category)
    const pair = pickTwoDistinct(units)
    if (!pair) return
    const [from, to] = pair

    setFromId(from.id)
    setToId(to.id)
    setInput(String(randomValueForCategory(category)))
    setUnitFilter('')
  }, [])

  const blurb = fromUnit?.blurb ?? toUnit?.blurb
  const mismatch =
    fromUnit && toUnit && fromUnit.category !== toUnit.category

  return (
    <div className="app">
      <header className="header">
        <h1>Scale of Things</h1>
        <p className="tagline">Measure anything in anything.</p>
      </header>

      <section className="converter card" aria-label="Unit converter">
        <div className="row">
          <label className="field">
            <span className="label">Amount</span>
            <input
              type="text"
              inputMode="decimal"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="0"
              className="amount"
            />
          </label>
        </div>

        <label className="field unit-search">
          <span className="label">Search unhinged ({unhingedTotal})</span>
          <input
            type="search"
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
            placeholder="capybara, pizza, moon…"
            className="unit-search-input"
          />
        </label>

        <div className="units-block">
          <div className="row units-row">
            <label className="field grow">
              <span className="label">From</span>
              {renderUnitSelect(fromId, setFrom, toUnit?.category)}
            </label>

            <button
              type="button"
              className="swap"
              onClick={swap}
              title="Swap units"
              aria-label="Swap from and to units"
            >
              ⇄
            </button>

            <label className="field grow">
              <span className="label">To</span>
              {renderUnitSelect(toId, setTo, fromUnit?.category)}
            </label>
          </div>

          <output className="row result-row" aria-live="polite">
            {mismatch ? (
              <p className="result-muted result-full">
                Pick two units of the same kind — length with length, mass with
                mass, and so on.
              </p>
            ) : result !== null && fromUnit && toUnit && !Number.isNaN(parsed) ? (
              <>
                <div className="result-cell grow">
                  <span className="result-number">
                    {formatNumber(parsed)}
                  </span>
                  <span className="result-unit">{fromUnit.short}</span>
                </div>
                <div className="swap-spacer" aria-hidden="true" />
                <div className="result-cell grow">
                  <span className="result-number">{formatNumber(result)}</span>
                  <span className="result-unit">{toUnit.short}</span>
                </div>
              </>
            ) : (
              <p className="result-muted result-full">
                Enter a number to convert
              </p>
            )}
          </output>
        </div>

        {activeCategory && (
          <p className="dimension-hint">
            Converting within{' '}
            <strong>{CATEGORY_LABELS[activeCategory]}</strong>
            {lockHint(fromUnit, toUnit)}
          </p>
        )}

        {blurb && <p className="blurb">{blurb}</p>}
      </section>

      <section className="presets card" aria-label="Random conversion">
        <button type="button" className="randomize-btn" onClick={randomize}>
          Randomize conversion
        </button>
      </section>

      <footer className="footer">
        <p>
          All “weird” units use lovingly approximate real-world averages. Perfect
          for trivia, terrible for engineering.
        </p>
      </footer>
    </div>
  )
}

function lockHint(from: Unit | undefined, to: Unit | undefined): string {
  if (from && !to) return ' — other dimensions faded in “To”'
  if (to && !from) return ' — other dimensions faded in “From”'
  return ''
}

export default App
