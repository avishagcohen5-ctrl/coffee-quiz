import { COFFEE_TYPES } from '../data/coffeeTypes.js'

const MILKS = ['סויה', 'שקדים', 'שיבולת', 'דל']

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateOrder() {
  const type = pick(COFFEE_TYPES)
  const size = pick(type.sizes)
  const cup = pick(type.cups)

  const broken = Math.random() < 0.15

  const roll = Math.random()
  const strength = broken ? null : (roll < 0.25 ? 'חזק' : roll < 0.5 ? 'חלש' : null)

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
    broken,
    milk: Math.random() < 0.4 ? pick(MILKS) : null,
  }
}
