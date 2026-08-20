import { QuoteCard } from '../components/QuoteCard'

export function Meditation() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-2xl font-medium text-stone-900">Meditation</h1>
      <div className="mt-4">
        <QuoteCard theme="meditation" />
      </div>
      <p className="mt-6 text-stone-500">Guided sessions and a plain timer — coming next.</p>
    </div>
  )
}
