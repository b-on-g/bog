import { Component, computed, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'

function parseNum(val: string): number {
  if (val.trim() === '') return 0
  const n = Number(val)
  if (Number.isNaN(n)) throw new Error(`"${val}" is not a number`)
  return n
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h1>Angular Calculator</h1>
      <p class="hint">Type "abc" in any field to see what happens</p>

      <div class="row">
        <input class="input" [(ngModel)]="a" placeholder="A" />
        <span class="op">+</span>
        <input class="input" [(ngModel)]="b" placeholder="B" />
        <span class="op">=</span>

        <!-- Angular's computed signal throws — crashes change detection -->
        <div class="result">{{ result() }}</div>
      </div>

      <div class="note">
        <strong>The problem:</strong> When a computed signal throws in Angular,
        it crashes the change detection cycle. The component freezes.
        <br /><br />
        Angular has ErrorHandler service, but it's a global catch-all.
        It doesn't recover individual components. You must manually
        wrap every computation in try/catch and manage error states yourself.
        <br /><br />
        Also notice: Angular needs zone.js, RxJS, FormsModule import,
        standalone component config — just for two inputs and a sum.
      </div>
    </div>
  `,
  styles: [`
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
  `]
})
export class AppComponent {
  a = signal('2')
  b = signal('2')

  // Throws when input is not a number — kills change detection
  result = computed(() => {
    const numA = parseNum(this.a())
    const numB = parseNum(this.b())
    return `${numA} + ${numB} = ${numA + numB}`
  })
}
