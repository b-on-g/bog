# $mol Calculator — Error Isolation Demo

## How to run

Place this folder inside your MAM workspace:
```
mam/mol/calc/
```

Then:
```bash
cd mam
npm start mol/calc
```

Open http://localhost:9080/mol/calc/

## What to demonstrate

1. Type "abc" in field A
2. **Only the result shows an error** — inputs keep working
3. Fix the input back to a number
4. **Result recovers automatically** — no page reload needed

## The point

Every other framework either:
- **Crashes the entire component tree** (React without ErrorBoundary, Vue, Svelte, Lit)
- **Permanently kills the component** (Solid's ErrorBoundary — no auto-recovery)
- **Requires manual try/catch everywhere** (all of them)

$mol does this automatically. Every @$mol_mem property is its own error boundary.
Errors are isolated to the exact spot where they occur.
Recovery happens automatically when the cause is fixed.

Zero extra code. Zero configuration. This is not a feature — it's the architecture.
