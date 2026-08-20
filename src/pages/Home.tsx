import { Link } from 'react-router-dom'
import { QuoteCard } from '../components/QuoteCard'

const features = [
  { to: '/scripture', label: 'Scripture', description: 'A searchable library of verses, tagged by theme.' },
  { to: '/meditation', label: 'Meditation', description: 'Guided sessions and a plain timer.' },
  { to: '/yoga', label: 'Yoga', description: 'A pose library and guided sequences.' },
  { to: '/gratitude', label: 'Gratitude', description: 'A quick daily log.' },
  { to: '/journal', label: 'Journal', description: 'Freeform reflection.' },
]

export function Home() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-2xl font-medium text-stone-900">Sanatana</h1>
      <div className="mt-4">
        <QuoteCard theme="general" />
      </div>
      <div className="mt-8 flex flex-col gap-3">
        {features.map((f) => (
          <Link
            key={f.to}
            to={f.to}
            className="rounded-lg border border-stone-200 px-5 py-4 hover:border-stone-400"
          >
            <p className="font-medium text-stone-900">{f.label}</p>
            <p className="text-sm text-stone-500">{f.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
