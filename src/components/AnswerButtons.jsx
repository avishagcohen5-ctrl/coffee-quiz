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
    if (portion === correctPortion)                         return cls + ' btn--correct'
    if (portion === answered && portion !== correctPortion) return cls + ' btn--wrong'
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
