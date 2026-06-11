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
  it('הפוך רגיל זכוכית — חזק → כפול קצר', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'רגיל', cup: 'זכוכית', strength: 'חזק' }))
      .toBe('כפול קצר')
  })

  // --- hot, גדול, TA (default index 4) ---
  it('הפוך גדול TA — רגיל → כפול ארוך', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'גדול', cup: 'TA', strength: null }))
      .toBe('כפול ארוך')
  })
  it('הפוך גדול TA — חלש → כפול קצר', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'גדול', cup: 'TA', strength: 'חלש' }))
      .toBe('כפול קצר')
  })
  it('הפוך גדול TA — חזק → 3 מנות ארוכות', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'גדול', cup: 'TA', strength: 'חזק' }))
      .toBe('3 מנות ארוכות')
  })

  // --- cold, זכוכית (default index 3) ---
  it('קפה קר זכוכית — רגיל → כפול קצר', () => {
    expect(getCorrectPortion({ category: 'cold', size: null, cup: 'זכוכית', strength: null }))
      .toBe('כפול קצר')
  })
  it('קפה קר זכוכית — חלש → מנה ארוכה', () => {
    expect(getCorrectPortion({ category: 'cold', size: null, cup: 'זכוכית', strength: 'חלש' }))
      .toBe('מנה ארוכה')
  })
  it('קפה קר זכוכית — חזק → כפול ארוך', () => {
    expect(getCorrectPortion({ category: 'cold', size: null, cup: 'זכוכית', strength: 'חזק' }))
      .toBe('כפול ארוך')
  })

  // --- cold, TA (default index 4) ---
  it('קפה קר TA — רגיל → כפול ארוך', () => {
    expect(getCorrectPortion({ category: 'cold', size: null, cup: 'TA', strength: null }))
      .toBe('כפול ארוך')
  })
  it('קפה קר TA — חזק → 3 מנות ארוכות', () => {
    expect(getCorrectPortion({ category: 'cold', size: null, cup: 'TA', strength: 'חזק' }))
      .toBe('3 מנות ארוכות')
  })
  it('קפה קר TA — חלש → כפול קצר', () => {
    expect(getCorrectPortion({ category: 'cold', size: null, cup: 'TA', strength: 'חלש' }))
      .toBe('כפול קצר')
  })

  // --- מפורק תמיד מנה ארוכה ---
  it('מפורק — הפוך גדול TA חזק → מנה ארוכה (מבטל חוזק וכוס)', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'גדול', cup: 'TA', strength: 'חזק', broken: true }))
      .toBe('מנה ארוכה')
  })
  it('מפורק — קפה קר זכוכית רגיל → מנה ארוכה', () => {
    expect(getCorrectPortion({ category: 'cold', size: null, cup: 'זכוכית', strength: null, broken: true }))
      .toBe('מנה ארוכה')
  })
  it('מפורק — הפוך רגיל פורצלן חלש → מנה ארוכה (לא חצי מנה)', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'רגיל', cup: 'פורצלן', strength: 'חלש', broken: true }))
      .toBe('מנה ארוכה')
  })

  // --- index clamping ---
  it('index לא יורד מתחת ל-0 (חצי מנה הוא הרצפה)', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'רגיל', cup: 'פורצלן', strength: 'חלש' }))
      .toBe('חצי מנה')
  })
  it('index לא עולה מעל 5 (3 מנות ארוכות הוא התקרה)', () => {
    expect(getCorrectPortion({ category: 'hot', size: 'גדול', cup: 'TA', strength: 'חזק' }))
      .toBe('3 מנות ארוכות')
  })
})
