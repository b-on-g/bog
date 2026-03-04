import React, { useState } from 'react'

// This function parses input and THROWS on invalid number.
// This simulates real-world: parsing, fetching, computing — anything can throw.
function parseNum(val) {
  if (val.trim() === '') return 0
  const n = Number(val)
  if (Number.isNaN(n)) throw new Error(`"${val}" is not a number`)
  return n
}

// The Result component computes A + B.
// If either input is invalid, this component CRASHES.
function Result({ a, b }) {
  const numA = parseNum(a)  // can throw
  const numB = parseNum(b)  // can throw
  return <div style={styles.result}>{numA} + {numB} = {numA + numB}</div>
}

// Without ErrorBoundary — one bad input crashes the ENTIRE app.
// The input fields disappear. User can't fix the error.
// This is React's "birth trauma": errors propagate up and kill the tree.

// Uncomment ErrorBoundary below to "fix" it — but that's extra code YOU must write.

/*
class ErrorBoundary extends React.Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return <div style={styles.error}>{this.state.error.message}</div>
    }
    return this.props.children
  }
}
*/

export default function App() {
  const [a, setA] = useState('2')
  const [b, setB] = useState('2')

  return (
    <div style={styles.container}>
      <h1>React Calculator</h1>
      <p style={styles.hint}>Type "abc" in any field to see what happens</p>

      <div style={styles.row}>
        <input
          style={styles.input}
          value={a}
          onChange={e => setA(e.target.value)}
          placeholder="A"
        />
        <span style={styles.op}>+</span>
        <input
          style={styles.input}
          value={b}
          onChange={e => setB(e.target.value)}
          placeholder="B"
        />
        <span style={styles.op}>=</span>

        {/* No ErrorBoundary — app crashes on bad input */}
        <Result a={a} b={b} />

        {/* With ErrorBoundary — you must write it yourself:
        <ErrorBoundary>
          <Result a={a} b={b} />
        </ErrorBoundary>
        */}
      </div>

      <div style={styles.note}>
        <strong>The problem:</strong> Without ErrorBoundary, the error crashes
        the entire component tree. Inputs disappear. User is stuck.
        <br /><br />
        React requires YOU to manually wrap every risky component
        in an ErrorBoundary class component (can't even use hooks for this).
      </div>
    </div>
  )
}

const styles = {
  container: {
    fontFamily: 'system-ui, sans-serif',
    maxWidth: 600,
    margin: '40px auto',
    padding: 24,
  },
  hint: {
    color: '#888',
    fontSize: 14,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
    fontSize: 24,
  },
  input: {
    width: 80,
    fontSize: 24,
    padding: '8px 12px',
    border: '2px solid #ccc',
    borderRadius: 8,
    textAlign: 'center',
  },
  op: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  error: {
    fontSize: 18,
    color: '#dc2626',
    fontWeight: 'bold',
  },
  note: {
    marginTop: 32,
    padding: 16,
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: 8,
    fontSize: 14,
    lineHeight: 1.6,
  },
}
