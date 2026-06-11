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
]

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
}
