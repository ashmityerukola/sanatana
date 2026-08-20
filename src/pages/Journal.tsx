import { QuoteCard } from '../components/QuoteCard'

export function Journal() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-2xl font-medium text-stone-900">Journal</h1>
      <div className="mt-4">
        <QuoteCard theme="self-study" />
      </div>
      <p className="mt-6 text-stone-500">Freeform reflection — coming next.</p>
    </div>
  )
}
