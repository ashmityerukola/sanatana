import { useMemo } from 'react'
import { useQuotes } from './useQuotes'
import type { ThemeSlug } from '../types/database'

// This hook is the core piece of the tagging model: every feature page calls
// this with its own theme instead of hardcoding a quote.
//
// The random pick is memoized on [quotes, theme], NOT recomputed on every
// render — `quotes` is a stable array reference from React Query as long as
// the underlying data hasn't changed, so the chosen quote stays fixed for
// the lifetime of that data (i.e. it won't shuffle every time the component
// re-renders, only when the cache actually refetches).
export function useThemedQuote(theme: ThemeSlug) {
  const { data: quotes, isLoading, error } = useQuotes()

  const quote = useMemo(() => {
    if (!quotes) return undefined
    const matches = quotes.filter((q) => q.themes.includes(theme))
    if (matches.length === 0) return undefined
    return matches[Math.floor(Math.random() * matches.length)]
  }, [quotes, theme])

  return { quote, isLoading, error }
}
