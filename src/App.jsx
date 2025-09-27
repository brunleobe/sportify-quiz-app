import { useState } from "react"
import StartScreen from "./StartScreen"
import QuizScreen from "./QuizScreen"

export default function App() {
  const [gameStarted, setGameStarted] = useState(false)

  function startQuiz() {
    setGameStarted(true)
  }

  return (
    <main className="app">
      {gameStarted ? (
        <QuizScreen />
      ) : (
        <StartScreen startQuiz={startQuiz} />
      )}
    </main>
  )
}
