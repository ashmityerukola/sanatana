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

  if (isLoading) return <div className="h-24 animate-pulse rounded-xl bg-surface" />
  if (error) return <p className="text-red-600">Couldn't load entries: {(error as Error).message}</p>
  if (!entries || entries.length === 0) {
    return <p className="text-sm text-muted">No entries yet — write your first reflection above.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {entries.map((entry) => (
        <article key={entry.id} className="rounded-xl border border-border bg-white px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted">{formatDate(entry.createdAt)}</p>
              {entry.prompt && <p className="mt-1 text-sm font-medium text-ink">{entry.prompt}</p>}
            </div>
            <button
              onClick={() => deleteEntry(entry.id)}
              className="text-sm text-muted transition-colors hover:text-accent-hover"
            >
              Delete
            </button>
          </div>
          <p className="mt-4 whitespace-pre-wrap leading-7 text-ink">{entry.text}</p>
        </article>
      ))}
    </div>
  )
}
