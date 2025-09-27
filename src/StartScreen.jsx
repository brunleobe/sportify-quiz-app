export default function StartScreen({ startQuiz }) {
  return (
    <div className="start-screen">
      <img src="/src/assets/yellow-blob-main.png" alt="" className="blob-img blob-yellow" />
      <img src="/src/assets/blue-blob-main.png" alt="" className="blob-img blob-blue" />
      <h1>Sportify Quiz</h1>
      <p>Test your knowledge of sports with 10 trivia questions!</p>
      <button className="startQuizBtn" onClick={startQuiz}>Start Quiz</button>
    </div>
  )
}
