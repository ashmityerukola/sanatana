import { supabase } from './supabaseClient'
import type { Quote, ThemeSlug } from '../types/database'

// Row shape returned by the nested select below, before we flatten it.
interface QuoteRow {
  id: string
  text: string
  source: string
  translation_notes: string | null
  quote_themes: { theme: ThemeSlug }[]
}

// Fetches every quote with its full set of themes joined in one query, rather
// than one query per theme. The dataset is small (dozens of quotes, not
// thousands), so it's cheaper to pull it all once and filter/pick a random
// one in memory (see useThemedQuote) than to round-trip to Postgres per page.
// React Query caches the result, so this only actually hits the network once
// per session, not once per feature page.
export async function fetchAllQuotes(): Promise<Quote[]> {
  const { data, error } = await supabase
    .from('quotes')
    .select('id, text, source, translation_notes, quote_themes(theme)')
    .order('created_at')

  if (error) throw error

  return (data as QuoteRow[]).map((row) => ({
    id: row.id,
    text: row.text,
    source: row.source,
    translationNotes: row.translation_notes,
    themes: row.quote_themes.map((t) => t.theme),
  }))
}
