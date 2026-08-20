import { QuoteCard } from '../components/QuoteCard'

export function Gratitude() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-2xl font-medium text-stone-900">Gratitude</h1>
      <div className="mt-4">
        <QuoteCard theme="gratitude" />
      </div>
      <p className="mt-6 text-stone-500">Daily 1-3 item log — coming next.</p>
    </div>
  )
}
