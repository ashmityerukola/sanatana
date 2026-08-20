import { useMemo, useState } from 'react'
import { useQuotes } from '../hooks/useQuotes'
import type { ThemeSlug } from '../types/database'

const THEME_FILTERS: (ThemeSlug | 'all')[] = [
  'all',
  'yoga',
  'meditation',
  'gratitude',
  'self-study',
  'general',
]

// The Scripture page is the one place that reads the whole quotes table
// rather than a single theme slice — every other feature page's QuoteCard
// pulls from the same cached data this page primes.
export function Scripture() {
  const { data: quotes, isLoading, error } = useQuotes()
  const [search, setSearch] = useState('')
  const [themeFilter, setThemeFilter] = useState<ThemeSlug | 'all'>('all')

  const filtered = useMemo(() => {
    if (!quotes) return []
    const term = search.trim().toLowerCase()
    return quotes.filter((q) => {
      const matchesTheme = themeFilter === 'all' || q.themes.includes(themeFilter)
      const matchesSearch =
        term === '' || q.text.toLowerCase().includes(term) || q.source.toLowerCase().includes(term)
      return matchesTheme && matchesSearch
    })
  }, [quotes, search, themeFilter])

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-2xl font-medium text-stone-900">Scripture</h1>
      <p className="mt-1 text-stone-500">
        The library of verses every other page draws from, tagged by theme.
      </p>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search text or source..."
        className="mt-6 w-full rounded-lg border border-stone-300 px-4 py-2 outline-none focus:border-stone-500"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {THEME_FILTERS.map((theme) => (
          <button
            key={theme}
            onClick={() => setThemeFilter(theme)}
            className={`rounded-full border px-3 py-1 text-sm capitalize ${
              themeFilter === theme
                ? 'border-stone-900 bg-stone-900 text-white'
                : 'border-stone-300 text-stone-600 hover:border-stone-500'
            }`}
          >
            {theme}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {isLoading && <p className="text-stone-500">Loading quotes...</p>}
        {error && <p className="text-red-600">Couldn't load quotes: {(error as Error).message}</p>}
        {!isLoading && !error && filtered.length === 0 && (
          <p className="text-stone-500">No quotes match.</p>
        )}
        {filtered.map((quote) => (
          <blockquote key={quote.id} className="rounded-lg border border-stone-200 px-5 py-4">
            <p className="text-stone-800 italic">"{quote.text}"</p>
            <div className="mt-2 flex items-center justify-between">
              <cite className="text-sm text-stone-500 not-italic">— {quote.source}</cite>
              <div className="flex gap-1">
                {quote.themes.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-full bg-stone-100 px-2 py-0.5 text-xs capitalize text-stone-600"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
            {quote.translationNotes && (
              <p className="mt-2 text-sm text-stone-400">{quote.translationNotes}</p>
            )}
          </blockquote>
        ))}
      </div>
    </div>
  )
}
