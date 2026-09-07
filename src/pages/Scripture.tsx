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
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-serif text-2xl text-ink">Scripture</h1>
      <p className="mt-1 text-muted">
        The library of verses every other page draws from, tagged by theme.
      </p>

      <label htmlFor="scripture-search" className="sr-only">
        Search quotes
      </label>
      <input
        id="scripture-search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search text or source..."
        className="mt-6 w-full rounded-lg border border-border bg-white px-4 py-2 text-ink outline-none focus:border-accent"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {THEME_FILTERS.map((theme) => (
          <button
            key={theme}
            onClick={() => setThemeFilter(theme)}
            className={`rounded-full border px-3 py-1 text-sm capitalize transition-colors ${
              themeFilter === theme
                ? 'border-accent bg-accent text-white'
                : 'border-border text-muted hover:border-accent hover:text-ink'
            }`}
          >
            {theme}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {isLoading && <p className="text-muted">Loading quotes...</p>}
        {error && <p className="text-red-600">Couldn't load quotes: {(error as Error).message}</p>}
        {!isLoading && !error && filtered.length === 0 && (
          <p className="text-muted">No quotes match.</p>
        )}
        {filtered.map((quote) => (
          <blockquote key={quote.id} className="rounded-xl border border-border bg-white px-6 py-5">
            <p className="font-serif italic text-ink">"{quote.text}"</p>
            <div className="mt-3 flex items-center justify-between">
              <cite className="text-sm not-italic text-muted">— {quote.source}</cite>
              <div className="flex gap-1">
                {quote.themes.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-full bg-accent-soft px-2 py-0.5 text-xs capitalize text-accent-hover"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
            {quote.translationNotes && (
              <p className="mt-2 text-sm text-muted">{quote.translationNotes}</p>
            )}
          </blockquote>
        ))}
      </div>
    </div>
  )
}