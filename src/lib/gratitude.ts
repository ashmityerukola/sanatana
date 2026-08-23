import { supabase } from './supabaseClient'
import type { GratitudeEntry } from '../types/database'

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

interface GratitudeRow {
  id: string
  entry_date: string
  items: string[]
}

// maybeSingle (not single) because "no entry for today yet" is an expected,
// non-error state for a brand new day -- single() would throw on 0 rows.
export async function fetchTodayEntry(userId: string): Promise<GratitudeEntry | null> {
  const { data, error } = await supabase
    .from('gratitude_entries')
    .select('id, entry_date, items')
    .eq('user_id', userId)
    .eq('entry_date', todayIso())
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  const row = data as GratitudeRow
  return { id: row.id, entryDate: row.entry_date, items: row.items }
}

// Upsert against the (user_id, entry_date) unique constraint: first save of
// the day inserts, reopening the page and saving again updates the same row
// instead of creating a duplicate.
export async function saveTodayEntry(userId: string, items: string[]): Promise<void> {
  const { error } = await supabase
    .from('gratitude_entries')
    .upsert(
      { user_id: userId, entry_date: todayIso(), items, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,entry_date' },
    )

  if (error) throw error
}