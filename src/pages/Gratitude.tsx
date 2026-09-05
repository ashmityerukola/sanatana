import { QuoteCard } from '../components/QuoteCard'
import { RequireAuth } from '../components/RequireAuth'
import { GratitudeLog } from '../components/GratitudeLog'

export function Gratitude() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-serif text-2xl text-ink">Gratitude</h1>
      <div className="mt-5">
        <QuoteCard theme="gratitude" />
      </div>
      <div className="mt-6">
        <RequireAuth>
          <GratitudeLog />
        </RequireAuth>
      </div>
    </div>
  )
}
