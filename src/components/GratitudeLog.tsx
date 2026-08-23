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
    return <div className="animate-pulse h-32 rounded-lg bg-stone-100" />
  }

  return (
    <div className="rounded-lg border border-stone-200 px-6 py-6">
      <p className="font-medium text-stone-900">What are you grateful for today?</p>
      <div className="mt-4 flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={`Gratitude ${index + 1}`}
              className="flex-1 rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
            />
            {items.length > 1 && (
              <button
                onClick={() => removeItem(index)}
                aria-label="Remove"
                className="text-stone-400 hover:text-stone-700"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {items.length < MAX_ITEMS && (
        <button onClick={addItem} className="mt-2 text-sm text-stone-500 hover:text-stone-800">
          + Add another
        </button>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="rounded-lg bg-stone-900 px-4 py-2 text-white disabled:opacity-40"
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
        {isSuccess && <span className="text-sm text-stone-500">Saved.</span>}
      </div>
    </div>
  )
}