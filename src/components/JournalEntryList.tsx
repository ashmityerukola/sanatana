import { useJournalEntries, useDeleteJournalEntry } from '../hooks/useJournal'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function JournalEntryList() {
  const { data: entries, isLoading, error } = useJournalEntries()
  const { mutate: deleteEntry } = useDeleteJournalEntry()

  if (isLoading) return <div className="animate-pulse h-24 rounded-lg bg-stone-100" />
  if (error) return <p className="text-red-600">Couldn't load entries: {(error as Error).message}</p>
  if (!entries || entries.length === 0) {
    return <p className="text-stone-500">No entries yet — write your first reflection above.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {entries.map((entry) => (
        <div key={entry.id} className="rounded-lg border border-stone-200 px-5 py-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-stone-400">{formatDate(entry.createdAt)}</p>
              {entry.prompt && <p className="text-sm font-medium text-stone-600">{entry.prompt}</p>}
            </div>
            <button
              onClick={() => deleteEntry(entry.id)}
              className="text-sm text-stone-400 hover:text-red-600"
            >
              Delete
            </button>
          </div>
          <p className="mt-2 whitespace-pre-wrap text-stone-800">{entry.text}</p>
        </div>
      ))}
    </div>
  )
}