import type { ThemeSlug } from '../types/database'
import { useThemedQuote } from '../hooks/useThemedQuote'

interface QuoteCardProps {
  theme: ThemeSlug
}

// Every feature page renders one of these at the top — the "non-negotiable"
// themed verse requirement from the spec lives here in one place instead of
// being reimplemented per page.
export function QuoteCard({ theme }: QuoteCardProps) {
  const { quote, isLoading, error } = useThemedQuote(theme)

  if (isLoading) {
    return <div className="animate-pulse h-20 rounded-lg bg-stone-100" />
  }

  if (error || !quote) {
    // Fails quietly rather than blocking the page — the quote is framing,
    // not the core functionality of e.g. the Gratitude log.
    return null
  }

  return (
    <blockquote className="rounded-lg border border-stone-200 bg-stone-50 px-5 py-4">
      <p className="text-stone-800 italic">"{quote.text}"</p>
      <cite className="mt-2 block text-sm text-stone-500 not-italic">— {quote.source}</cite>
    </blockquote>
  )
}
