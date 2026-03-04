import { LitElement, html, css } from 'lit'

function parseNum(val) {
  if (val.trim() === '') return 0
  const n = Number(val)
  if (Number.isNaN(n)) throw new Error(`"${val}" is not a number`)
  return n
}

class CalcApp extends LitElement {
  static properties = {
    a: { type: String },
    b: { type: String },
  }

  static styles = css`
    .container {
      font-family: system-ui, sans-serif;
      max-width: 600px;
      margin: 40px auto;
      padding: 24px;
    }
    .hint { color: #888; font-size: 14px; }
    .row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 16px;
      font-size: 24px;
    }
    .input {
      width: 80px;
      font-size: 24px;
      padding: 8px 12px;
      border: 2px solid #ccc;
      border-radius: 8px;
      text-align: center;
    }
    .op { font-size: 24px; font-weight: bold; }
    .result { font-size: 24px; font-weight: bold; color: #2563eb; }
    .note {
      margin-top: 32px;
      padding: 16px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      font-size: 14px;
      line-height: 1.6;
    }
  `

  constructor() {
    super()
    this.a = '2'
    this.b = '2'
  }

  // Lit's render() throws — the entire Shadow DOM stops updating.
  // Lit has NO error boundary. No recovery mechanism.
  // The component is permanently broken after a throw in render().
  render() {
    const numA = parseNum(this.a)  // can throw
    const numB = parseNum(this.b)  // can throw
    const result = `${numA} + ${numB} = ${numA + numB}`

    return html`
      <div class="container">
        <h1>Lit Calculator</h1>
        <p class="hint">Type "abc" in any field to see what happens</p>

        <div class="row">
          <input class="input" .value=${this.a}
            @input=${e => this.a = e.target.value} placeholder="A" />
          <span class="op">+</span>
          <input class="input" .value=${this.b}
            @input=${e => this.b = e.target.value} placeholder="B" />
          <span class="op">=</span>
          <div class="result">${result}</div>
        </div>

        <div class="note">
          <strong>The problem:</strong> Lit has zero error handling in render().
          If render() throws, the component freezes permanently.
          No fallback. No recovery. No error boundary concept.
          <br /><br />
          Lit is the closest to raw Web Components — and raw Web Components
          have no error isolation between elements. One broken element
          can prevent the entire page from rendering.
        </div>
      </div>
    `
  }
}

customElements.define('calc-app', CalcApp)
