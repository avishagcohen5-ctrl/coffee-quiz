export const PORTIONS = [
  'חצי מנה',       // index 0 — special, below scale minimum
  'מנה קצרה',      // index 1
  'מנה ארוכה',     // index 2
  '2 מנות קצרות',  // index 3
  '2 מנות ארוכות', // index 4
  '3 מנות ארוכות', // index 5 — special, above scale maximum
]

// The 4 buttons always shown
export const STANDARD_BUTTONS = PORTIONS.slice(1, 5)
