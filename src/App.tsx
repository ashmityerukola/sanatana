import { Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Home } from './pages/Home'
import { Scripture } from './pages/Scripture'
import { Meditation } from './pages/Meditation'
import { Yoga } from './pages/Yoga'
import { Gratitude } from './pages/Gratitude'
import { Journal } from './pages/Journal'

export function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scripture" element={<Scripture />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/yoga" element={<Yoga />} />
        <Route path="/gratitude" element={<Gratitude />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </>
  )
}
