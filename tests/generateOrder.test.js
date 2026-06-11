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

  it('מפורק אף פעם לא מגיע עם חזק/חלש (200 samples)', () => {
    for (let i = 0; i < 200; i++) {
      const order = generateOrder()
      if (order.broken) {
        expect(order.strength).toBeNull()
      }
    }
  })

  it('waterBase, decaf, broken are booleans', () => {
    const order = generateOrder()
    expect(typeof order.waterBase).toBe('boolean')
    expect(typeof order.decaf).toBe('boolean')
    expect(typeof order.broken).toBe('boolean')
  })
})
