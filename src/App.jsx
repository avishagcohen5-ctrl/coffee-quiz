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
      <div className="spacer" />
      <div className="divider" />
      <AnswerButtons
        correctPortion={correctPortion}
        answered={answered}
        onAnswer={handleAnswer}
      />
    </div>
  )
}
