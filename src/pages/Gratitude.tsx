import { QuoteCard } from '../components/QuoteCard'
import { RequireAuth } from '../components/RequireAuth'
import { GratitudeLog } from '../components/GratitudeLog'

export function Gratitude() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-2xl font-medium text-stone-900">Gratitude</h1>
      <div className="mt-4">
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