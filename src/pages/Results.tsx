import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface TestResult {
  questions: Array<{
    id: number
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
    category: string
  }>
  answers: Array<{
    questionId: number
    selected: number
    correct: boolean
  }>
  score: { correct: number; incorrect: number }
  passed: boolean
  date: string
}

const PASS_SCORE = 38
const TOTAL_QUESTIONS = 46

export default function Results() {
  const [result, setResult] = useState<TestResult | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('dmvTestResult')
    if (saved) {
      setResult(JSON.parse(saved))
    }
  }, [])

  if (!result) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 space-y-6">
        <h1 className="text-3xl font-bold text-dmv-blue">No Results</h1>
        <p className="text-gray-600">
          You haven't taken a practice test yet.
        </p>
        <Link
          to="/practice"
          className="inline-block bg-dmv-blue hover:bg-dmv-blue/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Take a Practice Test
        </Link>
      </div>
    )
  }

  const percentage = Math.round((result.score.correct / TOTAL_QUESTIONS) * 100)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Result Banner */}
      <div
        className={`rounded-xl p-8 text-center text-white ${
          result.passed ? 'bg-dmv-green' : 'bg-dmv-red'
        }`}
      >
        <div className="text-6xl mb-4">{result.passed ? '🎉' : '📚'}</div>
        <h1 className="text-3xl font-bold mb-2">
          {result.passed ? 'You Passed!' : 'Keep Practicing'}
        </h1>
        <p className="text-white/80">
          {result.passed
            ? 'Great job! You\'re ready for the real DMV test.'
            : 'Don\'t worry — practice makes perfect!'}
        </p>
      </div>

      {/* Score Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-dmv-green">
              {result.score.correct}
            </div>
            <div className="text-sm text-gray-500">Correct</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-dmv-red">
              {result.score.incorrect}
            </div>
            <div className="text-sm text-gray-500">Incorrect</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-dmv-blue">{percentage}%</div>
            <div className="text-sm text-gray-500">Score</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${result.passed ? 'bg-dmv-green' : 'bg-dmv-red'}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>0%</span>
            <span className="font-medium">Passing: 83% ({PASS_SCORE}/{TOTAL_QUESTIONS})</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Review Wrong Answers */}
      {result.answers.filter(a => !a.correct).length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-dmv-blue mb-4">
            📝 Review Missed Questions ({result.answers.filter(a => !a.correct).length})
          </h2>
          <div className="space-y-4">
            {result.answers
              .filter(a => !a.correct)
              .map((answer) => {
                const question = result.questions.find(q => q.id === answer.questionId)
                if (!question) return null
                return (
                  <div
                    key={answer.questionId}
                    className="p-4 bg-red-50 rounded-lg border border-dmv-red/20"
                  >
                    <p className="font-medium text-gray-800 mb-3">
                      {question.question}
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="text-dmv-red">
                        ✗ Your answer: {question.options[answer.selected]}
                      </p>
                      <p className="text-dmv-green">
                        ✓ Correct answer: {question.options[question.correctAnswer]}
                      </p>
                      <p className="text-gray-600 mt-2 pt-2 border-t border-red-100">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-dmv-blue mb-4">📊 Performance by Category</h2>
        <div className="space-y-3">
          {Array.from(new Set(result.questions.map(q => q.category))).map(category => {
            const categoryQuestions = result.questions.filter(q => q.category === category)
            const categoryAnswers = result.answers.filter(a => 
              categoryQuestions.some(q => q.id === a.questionId)
            )
            const correct = categoryAnswers.filter(a => a.correct).length
            const total = categoryAnswers.length
            const pct = total > 0 ? Math.round((correct / total) * 100) : 0
            
            return (
              <div key={category} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{category}</span>
                    <span className="text-gray-500">{correct}/{total}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${pct >= 83 ? 'bg-dmv-green' : pct >= 60 ? 'bg-dmv-gold' : 'bg-dmv-red'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <span className={`text-sm font-medium ${pct >= 83 ? 'text-dmv-green' : 'text-dmv-red'}`}>
                  {pct}%
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/practice"
          className="flex-1 text-center bg-dmv-blue hover:bg-dmv-blue/90 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Try Again
        </Link>
        <Link
          to="/study"
          className="flex-1 text-center bg-dmv-gold hover:bg-dmv-gold/90 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Study More
        </Link>
      </div>

      {/* Tips based on result */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-dmv-blue mb-4">
          {result.passed ? '✅ Next Steps' : '💡 Study Tips'}
        </h2>
        {result.passed ? (
          <ul className="space-y-2 text-gray-700">
            <li>• Schedule your DMV appointment at <a href="https://www.dmv.ca.gov/portal/appointments/" target="_blank" rel="noopener noreferrer" className="text-dmv-blue hover:underline">dmv.ca.gov</a></li>
            <li>• Bring required documents (ID, SSN, residency proof)</li>
            <li>• Get a good night's sleep before your test</li>
            <li>• Review the California Driver Handbook one more time</li>
          </ul>
        ) : (
          <ul className="space-y-2 text-gray-700">
            <li>• Focus on the categories where you scored lowest</li>
            <li>• Review the Road Signs section carefully</li>
            <li>• Read the California Driver Handbook</li>
            <li>• Take the practice test multiple times until you consistently pass</li>
          </ul>
        )}
      </div>
    </div>
  )
}
