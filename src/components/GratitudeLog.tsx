import { useEffect, useRef, useState } from 'react'
import { useSaveGratitude, useTodayGratitude } from '../hooks/useGratitude'

const MAX_ITEMS = 3

export function GratitudeLog() {
  const { data: entry, isLoading } = useTodayGratitude()
  const { mutate: save, isPending, isSuccess } = useSaveGratitude()
  const [items, setItems] = useState<string[]>([''])

  // Only seed local state from the server once the initial fetch resolves --
  // guarded by a ref rather than re-running on every `entry` change, because
  // saving triggers a refetch (see useSaveGratitude's invalidateQueries) and
  // we don't want that refetch to stomp on whatever the user is mid-typing.
  const seeded = useRef(false)
  useEffect(() => {
    if (!isLoading && !seeded.current) {
      seeded.current = true
      if (entry && entry.items.length > 0) setItems(entry.items)
    }
  }, [isLoading, entry])

  function updateItem(index: number, value: string) {
    setItems((prev) => prev.map((item, i) => (i === index ? value : item)))
  }

  function addItem() {
    if (items.length < MAX_ITEMS) setItems((prev) => [...prev, ''])
  }

  function removeItem(index: number) {
    setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev))
  }

  function handleSave() {
    const cleaned = items.map((item) => item.trim()).filter(Boolean)
    if (cleaned.length > 0) save(cleaned)
  }

  if (isLoading) {
    return <div className="h-32 animate-pulse rounded-xl bg-surface" />
  }

  return (
    <section className="rounded-xl border border-border bg-white px-6 py-7 sm:px-8">
      <h2 className="font-serif text-xl text-ink">What are you grateful for today?</h2>
      <p className="mt-1 text-sm text-muted">Keep it simple: one to three things is enough.</p>
      <div className="mt-4 flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <label htmlFor={`gratitude-item-${index}`} className="sr-only">
              Gratitude {index + 1}
            </label>
            <input
              id={`gratitude-item-${index}`}
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={`Gratitude ${index + 1}`}
              className="flex-1 rounded-lg border border-border bg-cream px-3 py-2 text-ink outline-none transition-colors placeholder:text-muted focus:border-accent"
            />
            {items.length > 1 && (
              <button
                onClick={() => removeItem(index)}
                aria-label="Remove"
                className="px-2 text-muted transition-colors hover:text-accent-hover"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {items.length < MAX_ITEMS && (
        <button onClick={addItem} className="mt-3 w-fit text-sm text-accent transition-colors hover:text-accent-hover">
          + Add another
        </button>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="rounded-lg bg-accent px-4 py-2 text-white transition-colors hover:bg-accent-hover disabled:opacity-40"
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
        {isSuccess && <span className="text-sm text-muted">Saved.</span>}
      </div>
    </section>
  )
}
