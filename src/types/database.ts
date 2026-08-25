// Mirrors the `theme` check constraint in supabase/schema.sql — keep in sync.
export type ThemeSlug = 'yoga' | 'meditation' | 'gratitude' | 'self-study' | 'general'

export interface Quote {
  id: string
  text: string
  source: string
  translationNotes: string | null
  themes: ThemeSlug[]
}

export interface Pose {
  id: string
  nameSanskrit: string
  nameEnglish: string
  instructions: string
  benefits: string | null
  cautions: string | null
  imageUrl: string | null
}

export interface SequenceStep {
  position: number
  holdSeconds: number
  pose: Pose
}

export interface Sequence {
  id: string
  name: string
  description: string | null
  steps: SequenceStep[]
}

export interface GratitudeEntry {
  id: string
  entryDate: string // YYYY-MM-DD
  items: string[]
}

export interface JournalEntry {
  id: string
  entryDate: string // YYYY-MM-DD
  prompt: string | null
  text: string
  createdAt: string
}
