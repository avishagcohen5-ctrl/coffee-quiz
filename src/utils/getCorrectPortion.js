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
