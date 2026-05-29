import { useCallback, useMemo, useState } from 'react'
import {
  CATEGORY_LABELS,
  type Category,
  getUnit,
  PRESETS,
  unitsForCategory,
} from './units'
import { convert, defaultPair, formatResult } from './convert'
import './App.css'

function App() {
  const [category, setCategory] = useState<Category>('length')
  const defaults = defaultPair(category)
  const [fromId, setFromId] = useState(defaults.from)
  const [toId, setToId] = useState(defaults.to)
  const [input, setInput] = useState('1')

  const units = useMemo(() => unitsForCategory(category), [category])
  const everyday = units.filter((u) => !u.weird)
  const weird = units.filter((u) => u.weird)

  const parsed = parseFloat(input)
  const fromUnit = getUnit(fromId)
  const toUnit = getUnit(toId)
  const result =
    fromUnit && toUnit && input.trim() !== '' && !Number.isNaN(parsed)
      ? convert(parsed, fromId, toId)
      : null

  const handleCategory = useCallback((next: Category) => {
    setCategory(next)
    const pair = defaultPair(next)
    setFromId(pair.from)
    setToId(pair.to)
    setInput('1')
  }, [])

  const swap = () => {
    setFromId(toId)
    setToId(fromId)
    if (result !== null && !Number.isNaN(parsed) && parsed !== 0) {
      setInput(String(result))
    }
  }

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    const from = getUnit(preset.fromId)
    if (!from) return
    setCategory(from.category)
    setFromId(preset.fromId)
    setToId(preset.toId)
    setInput(String(preset.value))
  }

  const blurb = fromUnit?.blurb ?? toUnit?.blurb

  return (
    <div className="app">
      <header className="header">
        <p className="eyebrow">Project #33 · name TBC</p>
        <h1>Unit Converter But Weird</h1>
        <p className="tagline">
          Normal conversions <em>and</em> absurd ones — how many capybaras tall is
          the Eiffel Tower?
        </p>
      </header>

      <nav className="tabs" aria-label="Conversion category">
        {(Object.keys(CATEGORY_LABELS) as Category[]).map((key) => (
          <button
            key={key}
            type="button"
            className={category === key ? 'tab active' : 'tab'}
            onClick={() => handleCategory(key)}
          >
            {CATEGORY_LABELS[key]}
          </button>
        ))}
      </nav>

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

        <div className="row units-row">
          <label className="field grow">
            <span className="label">From</span>
            <select value={fromId} onChange={(e) => setFromId(e.target.value)}>
              <optgroup label="Everyday">
                {everyday.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label} ({u.short})
                  </option>
                ))}
              </optgroup>
              {weird.length > 0 && (
                <optgroup label="Unhinged">
                  {weird.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.label} ({u.short})
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
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
            <select value={toId} onChange={(e) => setToId(e.target.value)}>
              <optgroup label="Everyday">
                {everyday.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label} ({u.short})
                  </option>
                ))}
              </optgroup>
              {weird.length > 0 && (
                <optgroup label="Unhinged">
                  {weird.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.label} ({u.short})
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </label>
        </div>

        <output className="result" aria-live="polite">
          {result !== null && toUnit ? (
            <>
              <span className="result-value">
                {formatResult(result, toUnit)}
              </span>
              {fromUnit && !Number.isNaN(parsed) && (
                <span className="result-equals">
                  {parsed} {fromUnit.short} =
                </span>
              )}
            </>
          ) : (
            <span className="result-muted">Enter a number to convert</span>
          )}
        </output>

        {blurb && <p className="blurb">{blurb}</p>}
      </section>

      <section className="presets card" aria-label="Quick conversions">
        <h2>Try something unhinged</h2>
        <ul className="preset-list">
          {PRESETS.map((preset) => (
            <li key={preset.label}>
              <button
                type="button"
                className="preset-btn"
                onClick={() => applyPreset(preset)}
              >
                {preset.label}
              </button>
            </li>
          ))}
        </ul>
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

export default App
