import { useQuery } from '@tanstack/react-query'
import { fetchAllQuotes } from '../lib/quotes'

// Shared by the Scripture library page (browse/search all quotes) and by
// useThemedQuote (pick one for a specific feature page) — both read from the
// same React Query cache entry, so navigating between pages doesn't refetch.
export function useQuotes() {
  return useQuery({
    queryKey: ['quotes'],
    queryFn: fetchAllQuotes,
    staleTime: 5 * 60 * 1000, // quotes are static content — no need to refetch often
  })
}
