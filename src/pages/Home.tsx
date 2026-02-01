import { Link } from 'react-router-dom'
import { totalQuestions } from '../data/questions'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-8">
        <img 
          src="/logo-icon.svg" 
          alt="Stars & Rights" 
          className="h-20 w-20 mx-auto mb-4"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
          California DMV Practice Test
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Free practice tests to help you pass your CA permit exam on the first try!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/practice"
            className="bg-navy hover:bg-navy/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
          >
            Start Practice Test
          </Link>
          <Link
            to="/study"
            className="bg-red hover:bg-red/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
          >
            Study Questions
          </Link>
        </div>
      </section>

      {/* Test Info */}
      <section className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-navy mb-6">📋 CA DMV Written Test Format</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-slate-50 rounded-lg p-6">
            <div className="text-4xl font-bold text-navy mb-2">46</div>
            <div className="text-gray-600">Questions on the test</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-6">
            <div className="text-4xl font-bold text-success mb-2">38</div>
            <div className="text-gray-600">Correct answers to pass (83%)</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-6">
            <div className="text-4xl font-bold text-red mb-2">{totalQuestions}</div>
            <div className="text-gray-600">Practice questions available</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800">
            <strong>⚠️ Under 18?</strong> If you fail, you must wait 7 days before retaking the test. 
            Make sure you're ready by practicing here first!
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/study"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-red transition-colors">
            Study Mode
          </h3>
          <p className="text-gray-600">Browse all questions with answers and explanations</p>
        </Link>

        <Link
          to="/practice"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="text-4xl mb-4">✍️</div>
          <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-red transition-colors">
            Practice Test
          </h3>
          <p className="text-gray-600">Simulate the real DMV test experience</p>
        </Link>

        <Link
          to="/signs"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="text-4xl mb-4">🛑</div>
          <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-red transition-colors">
            Road Signs
          </h3>
          <p className="text-gray-600">Learn all the road signs you need to know</p>
        </Link>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-bold text-navy mb-2">
            Works Offline
          </h3>
          <p className="text-gray-600">Install this app and study anywhere, anytime</p>
        </div>
      </section>

      {/* Tips */}
      <section className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-navy mb-6">💡 Tips for the DMV Test</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-2">
              <span className="text-success">✓</span>
              Read each question carefully
            </li>
            <li className="flex gap-2">
              <span className="text-success">✓</span>
              Study the California Driver Handbook
            </li>
            <li className="flex gap-2">
              <span className="text-success">✓</span>
              Focus on road signs - many test questions cover them
            </li>
            <li className="flex gap-2">
              <span className="text-success">✓</span>
              Know the speed limits (school zones, residential, highways)
            </li>
          </ul>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-2">
              <span className="text-success">✓</span>
              Understand right-of-way rules
            </li>
            <li className="flex gap-2">
              <span className="text-success">✓</span>
              Know the alcohol/DUI laws (BAC limits)
            </li>
            <li className="flex gap-2">
              <span className="text-success">✓</span>
              Get plenty of sleep before the test
            </li>
            <li className="flex gap-2">
              <span className="text-success">✓</span>
              Bring required documents (ID, SSN, residency proof)
            </li>
          </ul>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="text-center text-sm text-gray-500">
        <p>
          This is a practice tool based on the California Driver Handbook. For official information, visit{' '}
          <a
            href="https://www.dmv.ca.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy hover:underline"
          >
            dmv.ca.gov
          </a>
        </p>
      </section>
    </div>
  )
}
