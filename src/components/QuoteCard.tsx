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
    return <div className="h-20 animate-pulse rounded-xl bg-surface" />
  }

  if (error || !quote) {
    // Fails quietly rather than blocking the page — the quote is framing,
    // not the core functionality of e.g. the Gratitude log.
    return null
  }

  return (
    <blockquote className="rounded-xl border border-border border-l-4 border-l-accent bg-accent-soft px-6 py-5">
      <p className="font-serif text-lg italic text-ink">"{quote.text}"</p>
      <cite className="mt-2 block text-sm not-italic text-muted">— {quote.source}</cite>
    </blockquote>
  )
}
