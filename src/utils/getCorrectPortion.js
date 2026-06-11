import { PORTIONS } from '../data/portionScale.js'
import { DEFAULT_PORTION_INDEX } from '../data/coffeeTypes.js'

export function getCorrectPortion({ category, size, cup, strength, broken }) {
  if (broken) return PORTIONS[2] // מפורק תמיד = מנה ארוכה
  const key = `${category}|${size ?? 'null'}|${cup}`
  let index = DEFAULT_PORTION_INDEX[key]
  if (strength === 'חזק') index += 1
  if (strength === 'חלש') index -= 1
  index = Math.max(0, Math.min(5, index))
  return PORTIONS[index]
}
