import { createSignal, createMemo } from 'solid-js'
import { ErrorBoundary } from 'solid-js/web'

function parseNum(val) {
  if (val.trim() === '') return 0
  const n = Number(val)
  if (Number.isNaN(n)) throw new Error(`"${val}" is not a number`)
  return n
}

function Result(props) {
  // createMemo throws — kills the reactive graph
  const result = createMemo(() => {
    const numA = parseNum(props.a())
    const numB = parseNum(props.b())
    return `${numA} + ${numB} = ${numA + numB}`
  })

  return <div style={resultStyle}>{result()}</div>
}

export default function App() {
  const [a, setA] = createSignal('2')
  const [b, setB] = createSignal('2')

  return (
    <div style={containerStyle}>
      <h1>Solid Calculator</h1>
      <p style={hintStyle}>Type "abc" in any field to see what happens</p>

      <div style={rowStyle}>
        <input style={inputStyle} value={a()}
          onInput={e => setA(e.target.value)} placeholder="A" />
        <span style={opStyle}>+</span>
        <input style={inputStyle} value={b()}
          onInput={e => setB(e.target.value)} placeholder="B" />
        <span style={opStyle}>=</span>

        {/* Solid HAS ErrorBoundary — better than most! */}
        {/* But it catches the error and REPLACES the component permanently. */}
        {/* The user can't fix the input — the Result component is gone. */}
        <ErrorBoundary fallback={(err) =>
          <div style={errorStyle}>{err.message}</div>
        }>
          <Result a={a} b={b} />
        </ErrorBoundary>
      </div>

      <div style={noteStyle}>
        <strong>Credit where due:</strong> Solid is the ONLY framework here
        that ships ErrorBoundary out of the box (besides React's class-based one).
        <br /><br />
        <strong>But the problem remains:</strong> Once the error fires,
        the Result component is replaced with the fallback. Even after the user
        fixes the input back to a valid number, the component stays dead.
        Solid's ErrorBoundary doesn't re-try — it's a one-way trap.
        <br /><br />
        You need to manually add a "retry" mechanism or key-based remounting.
      </div>
    </div>
  )
}

const containerStyle = {
  'font-family': 'system-ui, sans-serif',
  'max-width': '600px',
  margin: '40px auto',
  padding: '24px',
}
const hintStyle = { color: '#888', 'font-size': '14px' }
const rowStyle = {
  display: 'flex',
  'align-items': 'center',
  gap: '12px',
  'margin-top': '16px',
  'font-size': '24px',
}
const inputStyle = {
  width: '80px',
  'font-size': '24px',
  padding: '8px 12px',
  border: '2px solid #ccc',
  'border-radius': '8px',
  'text-align': 'center',
}
const opStyle = { 'font-size': '24px', 'font-weight': 'bold' }
const resultStyle = { 'font-size': '24px', 'font-weight': 'bold', color: '#2563eb' }
const errorStyle = { 'font-size': '18px', color: '#dc2626', 'font-weight': 'bold' }
const noteStyle = {
  'margin-top': '32px',
  padding: '16px',
  background: '#fef2f2',
  border: '1px solid #fecaca',
  'border-radius': '8px',
  'font-size': '14px',
  'line-height': '1.6',
}
