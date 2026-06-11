# Coffee Quiz App — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile web quiz that trains baristas to identify the correct espresso portion for a randomly generated coffee order.

**Architecture:** Pure React + Vite SPA — no backend, no routing. All logic is client-side. Three layers: data definitions → pure utility functions → React components. State lives only in `App.jsx`.

**Tech Stack:** React 18, Vite 5, Vitest (tests), Heebo Google Font (Hebrew), deployed to Render as a static site.

---

## File Structure

```
/
├── index.html                        # RTL, font import, mount point
├── vite.config.js                    # Vite + Vitest config
├── package.json
├── src/
│   ├── main.jsx                      # ReactDOM.createRoot
│   ├── App.jsx                       # State: order + answered. Orchestrates flow.
│   ├── index.css                     # All styles (RTL, bon card, buttons, feedback)
│   ├── data/
│   │   ├── portionScale.js           # PORTIONS array + STANDARD_BUTTONS
│   │   └── coffeeTypes.js            # COFFEE_TYPES array + DEFAULT_PORTION_INDEX map
│   ├── utils/
│   │   ├── getCorrectPortion.js      # Pure fn: order → correct portion string
│   │   └── generateOrder.js          # Pure fn: () → random order object
│   └── components/
│       ├── Bon.jsx                   # Displays order receipt-style (no logic)
│       └── AnswerButtons.jsx         # 4+1 buttons with correct/wrong CSS states
└── tests/
    ├── getCorrectPortion.test.js
    └── generateOrder.test.js
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`

- [ ] **Step 1: Init project**

```bash
cd "/Users/home/Desktop/אישי/כוסות קפה"
npm create vite@latest . -- --template react
```

When prompted about non-empty directory — choose **"Ignore files and continue"** (NOT "Remove existing files") to preserve the `docs/` folder.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install -D vitest
```

- [ ] **Step 3: Configure Vitest in vite.config.js**

Replace the contents of `vite.config.js` with:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 4: Add test script to package.json**

In `package.json`, add to the `"scripts"` section:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Replace index.html**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;900&display=swap" rel="stylesheet" />
    <title>כוסות קפה</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Replace src/main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 7: Create empty src/index.css**

Delete the existing contents of `src/index.css` and replace with:

```css
/* styles added in Task 8 */
```

- [ ] **Step 8: Delete boilerplate files**

```bash
rm -f src/App.css src/assets/react.svg public/vite.svg
```

- [ ] **Step 9: Create tests directory**

```bash
mkdir -p tests
```

- [ ] **Step 10: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts at `http://localhost:5173`. Open in browser — page loads (may be blank or error, that's fine).

- [ ] **Step 11: Create .gitignore**

```
node_modules
dist
.DS_Store
.superpowers
```

Save as `.gitignore` in the project root.

- [ ] **Step 12: Commit**

```bash
git init
git add index.html vite.config.js package.json package-lock.json src/main.jsx src/index.css .gitignore
git commit -m "feat: scaffold Vite + React + Vitest project"
```

---

## Task 2: Data Layer

**Files:**
- Create: `src/data/portionScale.js`
- Create: `src/data/coffeeTypes.js`

- [ ] **Step 1: Create src/data/portionScale.js**

```js
export const PORTIONS = [
  'חצי מנה',       // index 0 — special, below scale minimum
  'מנה קצרה',      // index 1
  'מנה ארוכה',     // index 2
  '2 מנות קצרות',  // index 3
  '2 מנות ארוכות', // index 4
  '3 מנות ארוכות', // index 5 — special, above scale maximum
];

// The 4 buttons always shown
export const STANDARD_BUTTONS = PORTIONS.slice(1, 5);
```

- [ ] **Step 2: Create src/data/coffeeTypes.js**

```js
// category 'hot': הפוך / קפוצ'ינו / אמריקנו — cups: פורצלן (default), זכוכית, TA
// category 'cold': קפה קר / אמריקנו קר — cups: זכוכית (default), TA
export const COFFEE_TYPES = [
  {
    name: 'הפוך',
    category: 'hot',
    sizes: ['רגיל', 'גדול'],
    cups: ['פורצלן', 'זכוכית', 'TA'],
    defaultCup: 'פורצלן',
    milkOnSide: false,
  },
  {
    name: "קפוצ'ינו",
    category: 'hot',
    sizes: ['רגיל', 'גדול'],
    cups: ['פורצלן', 'זכוכית', 'TA'],
    defaultCup: 'פורצלן',
    milkOnSide: false,
  },
  {
    name: 'אמריקנו',
    category: 'hot',
    sizes: ['רגיל', 'גדול'],
    cups: ['פורצלן', 'זכוכית', 'TA'],
    defaultCup: 'פורצלן',
    milkOnSide: true,
  },
  {
    name: 'קפה קר',
    category: 'cold',
    sizes: [null],
    cups: ['זכוכית', 'TA'],
    defaultCup: 'זכוכית',
    milkOnSide: false,
  },
  {
    name: 'אמריקנו קר',
    category: 'cold',
    sizes: [null],
    cups: ['זכוכית', 'TA'],
    defaultCup: 'זכוכית',
    milkOnSide: false,
  },
];

// key: `${category}|${size ?? 'null'}|${cup}`  →  base PORTIONS index
export const DEFAULT_PORTION_INDEX = {
  'hot|רגיל|פורצלן': 1,
  'hot|רגיל|זכוכית': 2,
  'hot|רגיל|TA':     2,
  'hot|גדול|פורצלן': 2,
  'hot|גדול|זכוכית': 3,
  'hot|גדול|TA':     4,
  'cold|null|זכוכית': 3,
  'cold|null|TA':     4,
};
```

- [ ] **Step 3: Commit**

```bash
git add src/data/portionScale.js src/data/coffeeTypes.js
git commit -m "feat: add data layer — portions scale and coffee type definitions"
```

---

## Task 3: getCorrectPortion Utility (TDD)

**Files:**
- Create: `src/utils/getCorrectPortion.js`
- Create: `tests/getCorrectPortion.test.js`

- [ ] **Step 1: Write the failing tests**

Create `tests/getCorrectPortion.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { getCorrectPortion } from '../src/utils/getCorrectPortion'

describe('getCorrectPortion', () => {
  // --- hot, רגיל, פורצלן (default index 1) ---
  it('הפוך רגיל פורצלן — רגיל → מנה קצרה', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'רגיל', cup: 'פורצלן', strength: null }))
      .toBe('מנה קצרה')
  })
  it('הפוך רגיל פורצלן — חלש → חצי מנה', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'רגיל', cup: 'פורצלן', strength: 'חלש' }))
      .toBe('חצי מנה')
  })
  it('הפוך רגיל פורצלן — חזק → מנה ארוכה', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'רגיל', cup: 'פורצלן', strength: 'חזק' }))
      .toBe('מנה ארוכה')
  })

  // --- hot, רגיל, זכוכית (default index 2) ---
  it('הפוך רגיל זכוכית — רגיל → מנה ארוכה', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'רגיל', cup: 'זכוכית', strength: null }))
      .toBe('מנה ארוכה')
  })
  it('הפוך רגיל זכוכית — חלש → מנה קצרה', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'רגיל', cup: 'זכוכית', strength: 'חלש' }))
      .toBe('מנה קצרה')
  })
  it('הפוך רגיל זכוכית — חזק → 2 מנות קצרות', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'רגיל', cup: 'זכוכית', strength: 'חזק' }))
      .toBe('2 מנות קצרות')
  })

  // --- hot, גדול, TA (default index 4) ---
  it('הפוך גדול TA — רגיל → 2 מנות ארוכות', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'גדול', cup: 'TA', strength: null }))
      .toBe('2 מנות ארוכות')
  })
  it('הפוך גדול TA — חלש → 2 מנות קצרות', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'גדול', cup: 'TA', strength: 'חלש' }))
      .toBe('2 מנות קצרות')
  })
  it('הפוך גדול TA — חזק → 3 מנות ארוכות', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'גדול', cup: 'TA', strength: 'חזק' }))
      .toBe('3 מנות ארוכות')
  })

  // --- cold, זכוכית (default index 3) ---
  it('קפה קר זכוכית — רגיל → 2 מנות קצרות', () => {
    expect(getCorrectPortion({ category: 'cold', size: null, cup: 'זכוכית', strength: null }))
      .toBe('2 מנות קצרות')
  })
  it('קפה קר זכוכית — חלש → מנה ארוכה', () => {
    expect(getCorrectPortion({ category: 'cold', size: null, cup: 'זכוכית', strength: 'חלש' }))
      .toBe('מנה ארוכה')
  })
  it('קפה קר זכוכית — חזק → 2 מנות ארוכות', () => {
    expect(getCorrectPortion({ category: 'cold', size: null, cup: 'זכוכית', strength: 'חזק' }))
      .toBe('2 מנות ארוכות')
  })

  // --- cold, TA (default index 4) ---
  it('קפה קר TA — רגיל → 2 מנות ארוכות', () => {
    expect(getCorrectPortion({ category: 'cold', size: null, cup: 'TA', strength: null }))
      .toBe('2 מנות ארוכות')
  })
  it('קפה קר TA — חזק → 3 מנות ארוכות', () => {
    expect(getCorrectPortion({ category: 'cold', size: null, cup: 'TA', strength: 'חזק' }))
      .toBe('3 מנות ארוכות')
  })
  it('קפה קר TA — חלש → 2 מנות קצרות', () => {
    expect(getCorrectPortion({ category: 'cold', size: null, cup: 'TA', strength: 'חלש' }))
      .toBe('2 מנות קצרות')
  })

  // --- index clamping ---
  it('index never goes below 0 (חצי מנה is the floor)', () => {
    // הפוך רגיל פורצלן חלש = index 0; a second חלש can't go to -1
    // we test the floor directly by calling with the already-minimum case
    expect(getCorrectPortion({ category: 'hot', size: 'רגיל', cup: 'פורצלן', strength: 'חלש' }))
      .toBe('חצי מנה')
  })
  it('index never goes above 5 (3 מנות ארוכות is the ceiling)', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'גדול', cup: 'TA', strength: 'חזק' }))
      .toBe('3 מנות ארוכות')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```

Expected: `getCorrectPortion` not found — all tests fail.

- [ ] **Step 3: Implement getCorrectPortion**

Create `src/utils/getCorrectPortion.js`:

```js
import { PORTIONS } from '../data/portionScale.js'
import { DEFAULT_PORTION_INDEX } from '../data/coffeeTypes.js'

export function getCorrectPortion({ category, size, cup, strength }) {
  const key = `${category}|${size ?? 'null'}|${cup}`
  let index = DEFAULT_PORTION_INDEX[key]
  if (strength === 'חזק') index += 1
  if (strength === 'חלש') index -= 1
  index = Math.max(0, Math.min(5, index))
  return PORTIONS[index]
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```

Expected: all 16 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/utils/getCorrectPortion.js tests/getCorrectPortion.test.js
git commit -m "feat: add getCorrectPortion utility with full test coverage"
```

---

## Task 4: generateOrder Utility (TDD)

**Files:**
- Create: `src/utils/generateOrder.js`
- Create: `tests/generateOrder.test.js`

- [ ] **Step 1: Write the failing tests**

Create `tests/generateOrder.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { generateOrder } from '../src/utils/generateOrder'
import { COFFEE_TYPES } from '../src/data/coffeeTypes'

describe('generateOrder', () => {
  it('returns an object with all required fields', () => {
    const order = generateOrder()
    expect(order).toHaveProperty('coffeeType')
    expect(order).toHaveProperty('category')
    expect(order).toHaveProperty('size')
    expect(order).toHaveProperty('cup')
    expect(order).toHaveProperty('defaultCup')
    expect(order).toHaveProperty('milkOnSide')
    expect(order).toHaveProperty('strength')
    expect(order).toHaveProperty('waterBase')
    expect(order).toHaveProperty('decaf')
    expect(order).toHaveProperty('broken')
    expect(order).toHaveProperty('milk')
  })

  it('cup is always valid for the chosen coffee type (100 samples)', () => {
    for (let i = 0; i < 100; i++) {
      const order = generateOrder()
      const type = COFFEE_TYPES.find(c => c.name === order.coffeeType)
      expect(type.cups).toContain(order.cup)
    }
  })

  it('strength is always חזק, חלש, or null (100 samples)', () => {
    for (let i = 0; i < 100; i++) {
      const { strength } = generateOrder()
      expect(['חזק', 'חלש', null]).toContain(strength)
    }
  })

  it('cold drinks always have null size (200 samples)', () => {
    for (let i = 0; i < 200; i++) {
      const order = generateOrder()
      if (order.category === 'cold') {
        expect(order.size).toBeNull()
      }
    }
  })

  it('hot drinks always have a non-null size (200 samples)', () => {
    for (let i = 0; i < 200; i++) {
      const order = generateOrder()
      if (order.category === 'hot') {
        expect(order.size).not.toBeNull()
      }
    }
  })

  it('milk is one of the valid values or null (100 samples)', () => {
    const validMilks = ['סויה', 'שקדים', 'שיבולת', 'דל', null]
    for (let i = 0; i < 100; i++) {
      expect(validMilks).toContain(generateOrder().milk)
    }
  })

  it('waterBase, decaf, broken are booleans', () => {
    const order = generateOrder()
    expect(typeof order.waterBase).toBe('boolean')
    expect(typeof order.decaf).toBe('boolean')
    expect(typeof order.broken).toBe('boolean')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```

Expected: `generateOrder` not found — all tests fail.

- [ ] **Step 3: Implement generateOrder**

Create `src/utils/generateOrder.js`:

```js
import { COFFEE_TYPES } from '../data/coffeeTypes.js'

const MILKS = ['סויה', 'שקדים', 'שיבולת', 'דל']

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateOrder() {
  const type = pick(COFFEE_TYPES)
  const size = pick(type.sizes)
  const cup = pick(type.cups)

  const roll = Math.random()
  const strength = roll < 0.25 ? 'חזק' : roll < 0.5 ? 'חלש' : null

  return {
    coffeeType: type.name,
    category: type.category,
    size,
    cup,
    defaultCup: type.defaultCup,
    milkOnSide: type.milkOnSide,
    strength,
    waterBase: Math.random() < 0.2,
    decaf: Math.random() < 0.15,
    broken: Math.random() < 0.15,
    milk: Math.random() < 0.4 ? pick(MILKS) : null,
  }
}
```

- [ ] **Step 4: Run all tests**

```bash
npm test
```

Expected: all tests PASS (16 from Task 3 + 7 from Task 4).

- [ ] **Step 5: Commit**

```bash
git add src/utils/generateOrder.js tests/generateOrder.test.js
git commit -m "feat: add generateOrder utility with randomness tests"
```

---

## Task 5: Bon Component

**Files:**
- Create: `src/components/Bon.jsx`

- [ ] **Step 1: Create src/components/Bon.jsx**

```jsx
export default function Bon({ order }) {
  const {
    coffeeType, size, cup, defaultCup,
    milkOnSide, strength, waterBase, decaf, broken, milk,
  } = order

  const displayName = size ? `${coffeeType} ${size}` : coffeeType
  const showCup = cup !== defaultCup

  return (
    <div className="bon">
      <div className="bon-label">☕ בון</div>
      <div className="bon-content">
        <p className="bon-name">{displayName}</p>
        {strength && <p className="bon-line">{strength}</p>}
        {waterBase && <p className="bon-line">בסיס מים</p>}
        {decaf && <p className="bon-line">נטול</p>}
        {broken && <p className="bon-line">מפורק</p>}
        {milk && <p className="bon-line">{milk}</p>}
        {showCup && <p className="bon-line">{cup}</p>}
        {milkOnSide && <p className="bon-line">חלב בצד</p>}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Bon.jsx
git commit -m "feat: add Bon component — receipt-style order display"
```

---

## Task 6: AnswerButtons Component

**Files:**
- Create: `src/components/AnswerButtons.jsx`

- [ ] **Step 1: Create src/components/AnswerButtons.jsx**

```jsx
import { PORTIONS, STANDARD_BUTTONS } from '../data/portionScale.js'

export default function AnswerButtons({ correctPortion, answered, onAnswer }) {
  const needsHalf   = correctPortion === PORTIONS[0]  // 'חצי מנה'
  const needsTriple = correctPortion === PORTIONS[5]  // '3 מנות ארוכות'

  const buttons = [...STANDARD_BUTTONS]
  if (needsHalf)   buttons.push(PORTIONS[0])
  if (needsTriple) buttons.push(PORTIONS[5])

  function getClass(portion, idx) {
    let cls = 'btn'
    if (buttons.length === 5 && idx === 4) cls += ' btn--wide'
    if (!answered) return cls
    if (portion === correctPortion)                           return cls + ' btn--correct'
    if (portion === answered && portion !== correctPortion)   return cls + ' btn--wrong'
    return cls + ' btn--dim'
  }

  return (
    <div className="buttons-grid">
      {buttons.map((portion, idx) => (
        <button
          key={portion}
          className={getClass(portion, idx)}
          onClick={() => !answered && onAnswer(portion)}
          disabled={!!answered}
        >
          {portion}
          {answered && portion === correctPortion && ' ✓'}
          {answered && portion === answered && portion !== correctPortion && ' ✗'}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AnswerButtons.jsx
git commit -m "feat: add AnswerButtons component with correct/wrong feedback states"
```

---

## Task 7: App.jsx Orchestration

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace src/App.jsx**

```jsx
import { useState } from 'react'
import Bon from './components/Bon.jsx'
import AnswerButtons from './components/AnswerButtons.jsx'
import { generateOrder } from './utils/generateOrder.js'
import { getCorrectPortion } from './utils/getCorrectPortion.js'

export default function App() {
  const [order, setOrder] = useState(() => generateOrder())
  const [answered, setAnswered] = useState(null)

  const correctPortion = getCorrectPortion(order)

  function handleAnswer(portion) {
    setAnswered(portion)
    setTimeout(() => {
      setOrder(generateOrder())
      setAnswered(null)
    }, 1500)
  }

  return (
    <div className="app">
      <Bon order={order} />
      <div className="divider" />
      <AnswerButtons
        correctPortion={correctPortion}
        answered={answered}
        onAnswer={handleAnswer}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:5173` in a mobile-sized window (DevTools → device toolbar → iPhone). 

Check:
- Bon shows a random coffee order line-by-line
- 4 buttons appear (or 5 when applicable)
- Tapping correct: button turns green with ✓
- Tapping wrong: chosen turns red ✗, correct turns green ✓
- After 1.5s a new order appears

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire up App — bon + answer buttons with auto-advance"
```

---

## Task 8: CSS Styling

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace src/index.css with full stylesheet**

```css
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;900&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Heebo', sans-serif;
  direction: rtl;
  text-align: right;
  background: #e8e3dc;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.app {
  width: 100%;
  max-width: 430px;
  min-height: 100dvh;
  background: #fff;
  display: flex;
  flex-direction: column;
}

/* ── Bon ── */

.bon {
  flex: 1;
  padding: 28px 22px 24px;
}

.bon-label {
  font-size: 11px;
  color: #c0b8b0;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.bon-name {
  font-family: 'Courier New', Courier, monospace;
  font-size: 26px;
  font-weight: 700;
  color: #111;
  line-height: 1.3;
  margin-bottom: 6px;
}

.bon-line {
  font-family: 'Courier New', Courier, monospace;
  font-size: 17px;
  color: #444;
  line-height: 2;
}

/* ── Divider ── */

.divider {
  border: none;
  border-top: 2px dashed #d0c8be;
  margin: 0 18px;
}

/* ── Buttons ── */

.buttons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 16px;
  background: #faf8f5;
}

.btn {
  background: #fff;
  border: 1.5px solid #e0d8d0;
  border-radius: 12px;
  padding: 15px 8px;
  font-size: 14px;
  font-family: 'Heebo', sans-serif;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s, color 0.12s;
  -webkit-tap-highlight-color: transparent;
}

.btn:active:not(:disabled) {
  transform: scale(0.96);
}

.btn--wide {
  grid-column: span 2;
}

.btn--correct {
  background: #4CAF50;
  border-color: #4CAF50;
  color: #fff;
  font-weight: 700;
}

.btn--wrong {
  background: #e53935;
  border-color: #e53935;
  color: #fff;
  font-weight: 700;
}

.btn--dim {
  color: #c8c0b8;
  border-color: #ece8e4;
  background: #faf8f5;
}

.btn:disabled {
  cursor: default;
}
```

- [ ] **Step 2: Check in browser at mobile size**

```bash
npm run dev
```

Open DevTools → device toolbar → iPhone 14 Pro (or similar).

Verify:
- Bon text looks like a receipt (monospace font, good line height)
- Dashed divider visible between bon and buttons
- Buttons have correct spacing and rounded corners
- Green/red feedback colors render correctly
- No horizontal scroll

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add full CSS — receipt bon, RTL, mobile-first button grid"
```

---

## Task 9: Deploy to Render

- [ ] **Step 1: Create GitHub repository**

Go to github.com → New repository → name it `coffee-quiz` → public → create.

- [ ] **Step 2: Push to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/coffee-quiz.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Create Render static site**

1. Go to render.com → New → Static Site
2. Connect GitHub → select `coffee-quiz`
3. Set:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Click **Create Static Site**

- [ ] **Step 4: Verify live URL**

Render provides a URL like `https://coffee-quiz-xxxx.onrender.com`.

Open on iPhone in Safari:
- Bon displays correctly
- Buttons respond to touch
- Feedback appears and advances automatically after 1.5s

- [ ] **Step 5: Share URL**

Send the URL to anyone who needs to train — opens directly in Safari/Chrome, no installation needed.
