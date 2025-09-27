import { useState, useEffect } from "react"
import he from "he"

export default function QuizScreen() {
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=21")
      .then(res => res.json())
      .then(data => {
        const formatted = data.results.map((q, index) => {
          const answers = [...q.incorrect_answers, q.correct_answer]
            .sort(() => Math.random() - 0.5)
          return {
            id: index,
            question: he.decode(q.question),
            correct: he.decode(q.correct_answer),
            answers: answers.map(a => he.decode(a))
          }
        })
        setQuestions(formatted)
      })
  }, [])

  function selectAnswer(qId, answer) {
    if (!showResults) {
      setSelectedAnswers(prev => ({ ...prev, [qId]: answer }))
      setShowWarning(false)
    }
  }

  function checkAnswers() {
    if (!allAnswered) {
      setShowWarning(true)
      return
    }
    let newScore = 0
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        newScore++
      }
    })
    setScore(newScore)
    setShowResults(true)
  }

  function playAgain() {
    window.location.reload()
  }

  const allAnswered = questions.length > 0 && questions.every(q => selectedAnswers[q.id])

  return (
    <div className="quiz-screen">
      <img src="/src/assets/yellow-blob-main.png" alt="" className="blob-img blob-yellow" />
      <img src="/src/assets/blue-blob-main.png" alt="" className="blob-img blob-blue" />
      <div className="quiz-container">
        {questions.map(q => (
          <div key={q.id} className="question-block">
            <h3>{q.question}</h3>
            <div className="answers">
              {q.answers.map(a => {
                const isSelected = selectedAnswers[q.id] === a
                const isCorrect = q.correct === a

                let className = "answer"
                if (showResults) {
                  if (isCorrect) className += " correct"
                  else if (isSelected) className += " wrong"
                } else if (isSelected) {
                  className += " selected"
                }

                return (
                  <button
                    key={a}
                    className={className}
                    onClick={() => selectAnswer(q.id, a)}
                  >
                    {a}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
        {showWarning && (
          <div className="warning-message">
            Please answer all questions first
          </div>
        )}
        {showResults ? (
          <div className="results">
            <p>You scored {score}/{questions.length} correct answers</p>
            <button onClick={playAgain}>Play again</button>
          </div>
        ) : (
          <button
            className="checkAnswersBtn"
            onClick={checkAnswers}
          >
            Check answers
          </button>
        )}
      </div>
    </div>
  )
}
