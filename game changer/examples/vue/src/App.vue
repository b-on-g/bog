<script setup>
import { ref, computed } from 'vue'

const a = ref('2')
const b = ref('2')

function parseNum(val) {
  if (val.trim() === '') return 0
  const n = Number(val)
  if (Number.isNaN(n)) throw new Error(`"${val}" is not a number`)
  return n
}

// Vue's computed throws — and the ENTIRE app goes white.
// Vue has onErrorCaptured() but you must set it up manually
// and it doesn't recover the component — it stays broken.
const result = computed(() => {
  const numA = parseNum(a.value)  // can throw
  const numB = parseNum(b.value)  // can throw
  return `${numA} + ${numB} = ${numA + numB}`
})
</script>

<template>
  <div class="container">
    <h1>Vue Calculator</h1>
    <p class="hint">Type "abc" in any field to see what happens</p>

    <div class="row">
      <input v-model="a" class="input" placeholder="A" />
      <span class="op">+</span>
      <input v-model="b" class="input" placeholder="B" />
      <span class="op">=</span>

      <!-- When computed throws, Vue kills the entire render -->
      <div class="result">{{ result }}</div>
    </div>

    <div class="note">
      <strong>The problem:</strong> When a computed property throws,
      Vue's renderer crashes. The whole component stops updating.
      <br /><br />
      Vue has <code>onErrorCaptured</code> and <code>errorHandler</code>,
      but they don't recover the UI — the component stays in its broken state.
      You must manually wrap every computed in try/catch.
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: system-ui, sans-serif;
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
}
.hint {
  color: #888;
  font-size: 14px;
}
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
.op {
  font-size: 24px;
  font-weight: bold;
}
.result {
  font-size: 24px;
  font-weight: bold;
  color: #2563eb;
}
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
