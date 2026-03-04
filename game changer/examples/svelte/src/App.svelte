<script>
  let a = '2'
  let b = '2'

  function parseNum(val) {
    if (val.trim() === '') return 0
    const n = Number(val)
    if (Number.isNaN(n)) throw new Error(`"${val}" is not a number`)
    return n
  }

  // Svelte's reactive declaration ($:) throws — crashes the component.
  // Svelte has NO built-in error boundary.
  // There's no <ErrorBoundary> component. No onErrorCaptured.
  // If this throws, the component silently dies.
  $: numA = parseNum(a)
  $: numB = parseNum(b)
  $: result = `${numA} + ${numB} = ${numA + numB}`
</script>

<div class="container">
  <h1>Svelte Calculator</h1>
  <p class="hint">Type "abc" in any field to see what happens</p>

  <div class="row">
    <input class="input" bind:value={a} placeholder="A" />
    <span class="op">+</span>
    <input class="input" bind:value={b} placeholder="B" />
    <span class="op">=</span>
    <div class="result">{result}</div>
  </div>

  <div class="note">
    <strong>The problem:</strong> Svelte has NO error boundary mechanism at all.
    When a reactive statement throws, the component silently breaks.
    No recovery. No fallback UI.
    <br /><br />
    The Svelte team has discussed error boundaries for years
    (GitHub issue #1096) but never shipped them.
    You must wrap every reactive computation in try/catch manually.
  </div>
</div>

<style>
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
</style>
