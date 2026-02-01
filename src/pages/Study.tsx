import { useState } from 'react'
import { questions, categories } from '../data/questions'

export default function Study() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState<number | null>(null)

  const filteredQuestions = selectedCategory
    ? questions.filter((q) => q.category === selectedCategory)
    : questions

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">Study Questions</h1>
          <p className="text-gray-600">
            {filteredQuestions.length} questions
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>

        <select
          value={selectedCategory || ''}
          onChange={(e) => {
            setSelectedCategory(e.target.value || null)
            setExpandedQuestion(null)
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-navy"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory
              ? 'bg-navy text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({questions.length})
        </button>
        {categories.map((cat) => {
          const count = questions.filter((q) => q.category === cat).length
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-navy text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.replace('Traffic Signs & Signals', 'Signs')} ({count})
            </button>
          )
        })}
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => {
                setExpandedQuestion(expandedQuestion === q.id ? null : q.id)
                setShowAnswer(null)
              }}
              className="w-full px-6 py-4 text-left flex items-start gap-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-navy font-bold text-lg min-w-[2.5rem]">
                Q{q.id}
              </span>
              <span className="flex-1 text-gray-800">{q.question}</span>
              <span
                className={`text-gray-400 transition-transform ${
                  expandedQuestion === q.id ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>

            {expandedQuestion === q.id && (
              <div className="px-6 pb-4 pt-0 border-t border-gray-100">
                <div className="pt-4 space-y-3">
                  {q.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        showAnswer === q.id && index === q.correctAnswer
                          ? 'bg-green-50 border border-success'
                          : 'bg-gray-50'
                      }`}
                    >
                      <span className="font-medium mr-2">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                      {showAnswer === q.id && index === q.correctAnswer && (
                        <span className="ml-2 text-success">✓ Correct</span>
                      )}
                    </div>
                  ))}

                  {showAnswer === q.id ? (
                    <div className="p-4 bg-blue-50 rounded-lg border border-navy">
                      <p className="font-semibold text-navy mb-1">Explanation:</p>
                      <p className="text-gray-700">{q.explanation}</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAnswer(q.id)}
                      className="w-full py-2 bg-navy hover:bg-navy/90 text-white rounded-lg font-medium transition-colors"
                    >
                      Show Answer
                    </button>
                  )}

                  <p className="text-xs text-gray-400">
                    Category: {q.category}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
