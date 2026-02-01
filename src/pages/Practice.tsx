import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions } from '../data/questions'

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const QUESTIONS_PER_TEST = 46
const PASS_SCORE = 38

export default function Practice() {
  const navigate = useNavigate()
  const [testStarted, setTestStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testQuestions, setTestQuestions] = useState<typeof questions>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })
  const [answers, setAnswers] = useState<{questionId: number; selected: number; correct: boolean}[]>([])

  const startTest = () => {
    const shuffled = shuffleArray(questions).slice(0, QUESTIONS_PER_TEST)
    setTestQuestions(shuffled)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore({ correct: 0, incorrect: 0 })
    setAnswers([])
    setTestStarted(true)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    
    const currentQuestion = testQuestions[currentIndex]
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    
    const newAnswers = [...answers, {
      questionId: currentQuestion.id,
      selected: selectedAnswer,
      correct: isCorrect,
    }]
    setAnswers(newAnswers)
    
    const newScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      incorrect: score.incorrect + (isCorrect ? 0 : 1),
    }
    setScore(newScore)
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentIndex + 1 >= QUESTIONS_PER_TEST) {
      // Test complete
      localStorage.setItem('dmvTestResult', JSON.stringify({
        questions: testQuestions,
        answers,
        score,
        passed: score.correct >= PASS_SCORE,
        date: new Date().toISOString(),
      }))
      navigate('/results')
    } else {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  if (!testStarted) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
        <h1 className="text-3xl font-bold text-dmv-blue">Practice Test</h1>
        <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
          <div className="text-6xl">🚗</div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              California DMV Written Test
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li>📝 <strong>{QUESTIONS_PER_TEST} questions</strong> (same as real test)</li>
              <li>✅ <strong>{PASS_SCORE} correct</strong> answers to pass (83%)</li>
              <li>⏱️ No time limit - take your time</li>
            </ul>
          </div>

          <p className="text-sm text-gray-500">
            Questions are randomly selected from our question bank.
            You'll see your results at the end.
          </p>

          <button
            onClick={startTest}
            className="bg-dmv-blue hover:bg-dmv-blue/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
          >
            Start Test
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = testQuestions[currentIndex]
  const progress = ((currentIndex + 1) / QUESTIONS_PER_TEST) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentIndex + 1} of {QUESTIONS_PER_TEST}</span>
          <span>
            <span className="text-dmv-green">✓ {score.correct}</span>
            {' · '}
            <span className="text-dmv-red">✗ {score.incorrect}</span>
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-dmv-blue transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <div className="text-sm text-gray-500 mb-4">
          Category: {currentQuestion.category}
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-colors '
            
            if (showResult) {
              if (index === currentQuestion.correctAnswer) {
                buttonClass += 'border-dmv-green bg-green-50 text-dmv-green'
              } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                buttonClass += 'border-dmv-red bg-red-50 text-dmv-red'
              } else {
                buttonClass += 'border-gray-200 text-gray-400'
              }
            } else if (selectedAnswer === index) {
              buttonClass += 'border-dmv-blue bg-blue-50 text-dmv-blue'
            } else {
              buttonClass += 'border-gray-200 hover:border-dmv-blue hover:bg-blue-50'
            }
            
            return (
              <button
                key={index}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
                className={buttonClass}
              >
                <span className="font-medium mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            )
          })}
        </div>

        {showResult && (
          <div className={`mt-6 p-4 rounded-lg ${
            selectedAnswer === currentQuestion.correctAnswer 
              ? 'bg-green-50 border border-dmv-green' 
              : 'bg-red-50 border border-dmv-red'
          }`}>
            <p className={`font-semibold mb-2 ${
              selectedAnswer === currentQuestion.correctAnswer ? 'text-dmv-green' : 'text-dmv-red'
            }`}>
              {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-gray-700 text-sm">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                selectedAnswer === null
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-dmv-blue hover:bg-dmv-blue/90 text-white'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 py-3 bg-dmv-blue hover:bg-dmv-blue/90 text-white rounded-lg font-semibold transition-colors"
            >
              {currentIndex + 1 >= QUESTIONS_PER_TEST ? 'See Results' : 'Next Question →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
