// Mirrors the `theme` check constraint in supabase/schema.sql — keep in sync.
export type ThemeSlug = 'yoga' | 'meditation' | 'gratitude' | 'self-study' | 'general'

export interface Quote {
  id: string
  text: string
  source: string
  translationNotes: string | null
  themes: ThemeSlug[]
}
