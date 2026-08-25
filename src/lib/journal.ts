import { supabase } from './supabaseClient'
import type { JournalEntry } from '../types/database'

interface JournalRow {
  id: string
  entry_date: string
  prompt: string | null
  entry_text: string
  created_at: string
}

function mapEntry(row: JournalRow): JournalEntry {
  return {
    id: row.id,
    entryDate: row.entry_date,
    prompt: row.prompt,
    text: row.entry_text,
    createdAt: row.created_at,
  }
}

export async function fetchJournalEntries(userId: string): Promise<JournalEntry[]> {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('id, entry_date, prompt, entry_text, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as JournalRow[]).map(mapEntry)
}

export async function createJournalEntry(
  userId: string,
  text: string,
  prompt: string | null,
): Promise<void> {
  const { error } = await supabase
    .from('journal_entries')
    .insert({ user_id: userId, entry_text: text, prompt })

  if (error) throw error
}

export async function deleteJournalEntry(id: string): Promise<void> {
  // No user_id check needed here beyond RLS -- the delete policy already
  // guarantees this only succeeds for a row the caller owns.
  const { error } = await supabase.from('journal_entries').delete().eq('id', id)
  if (error) throw error
}