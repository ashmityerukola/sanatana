import { QuoteCard } from '../components/QuoteCard'
import { MeditationTimer } from '../components/MeditationTimer'

export function Meditation() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-2xl font-medium text-stone-900">Meditation</h1>
      <div className="mt-4">
        <QuoteCard theme="meditation" />
      </div>
      <div className="mt-6">
        <MeditationTimer />
      </div>
      <p className="mt-6 text-stone-500">
        Guided sessions are coming later, once there's real audio content to play.
      </p>
    </div>
  )
}
