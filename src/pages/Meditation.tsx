import { QuoteCard } from '../components/QuoteCard'
import { MeditationTimer } from '../components/MeditationTimer'

export function Meditation() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-serif text-2xl text-ink">Meditation</h1>
      <div className="mt-5">
        <QuoteCard theme="meditation" />
      </div>
      <div className="mt-6">
        <MeditationTimer />
      </div>
      <p className="mt-6 text-sm text-muted">
        Guided sessions are coming later, once there's real audio content to play.
      </p>
    </div>
  )
}