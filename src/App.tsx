import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Study from './pages/Study'
import Practice from './pages/Practice'
import Signs from './pages/Signs'
import Results from './pages/Results'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="study" element={<Study />} />
          <Route path="practice" element={<Practice />} />
          <Route path="signs" element={<Signs />} />
          <Route path="results" element={<Results />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
