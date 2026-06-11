import { useState } from 'react'
import HomeScreen from './components/HomeScreen.jsx'
import RefreshScreen from './components/RefreshScreen.jsx'
import Bon from './components/Bon.jsx'
import AnswerButtons from './components/AnswerButtons.jsx'
import { generateOrder } from './utils/generateOrder.js'
import { getCorrectPortion } from './utils/getCorrectPortion.js'

export default function App() {
  const [screen, setScreen] = useState('home') // 'home' | 'refresh' | 'quiz'
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

  if (screen === 'home') {
    return (
      <div className="app">
        <HomeScreen
          onStart={() => setScreen('quiz')}
          onRefresh={() => setScreen('refresh')}
        />
      </div>
    )
  }

  if (screen === 'refresh') {
    return (
      <div className="app">
        <RefreshScreen
          onStart={() => setScreen('quiz')}
          onBack={() => setScreen('home')}
        />
      </div>
    )
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
      <div className="quiz-bottom">
        <button className="quiz-refresh-btn" onClick={() => setScreen('refresh')}>
          רענן זיכרון
        </button>
      </div>
    </div>
  )
}
