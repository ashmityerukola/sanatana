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
    <div className="mx-auto max-w-3xl px-6 py-10">
      <p className="font-serif text-2xl text-ink">A quiet place to practice.</p>
      <div className="mt-5">
        <QuoteCard theme="general" />
      </div>
      <div className="mt-8 flex flex-col gap-3">
        {features.map((f) => (
          <Link
            key={f.to}
            to={f.to}
            className="rounded-xl border border-border bg-white px-6 py-5 transition-colors hover:border-accent"
          >
            <p className="font-serif text-lg text-ink">{f.label}</p>
            <p className="text-sm text-muted">{f.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}