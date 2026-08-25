import { useState } from 'react'
import { useCreateJournalEntry } from '../hooks/useJournal'

export function JournalComposer() {
  const [prompt, setPrompt] = useState('')
  const [text, setText] = useState('')
  const { mutate: create, isPending } = useCreateJournalEntry()

  function handleSave() {
    const trimmed = text.trim()
    if (!trimmed) return
    create(
      { text: trimmed, prompt: prompt.trim() || null },
      {
        onSuccess: () => {
          setText('')
          setPrompt('')
        },
      },
    )
  }

  return (
    <div className="rounded-lg border border-stone-200 px-6 py-6">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Prompt (optional)"
        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write freely..."
        rows={5}
        className="mt-3 w-full resize-none rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
      />
      <button
        onClick={handleSave}
        disabled={isPending || !text.trim()}
        className="mt-3 rounded-lg bg-stone-900 px-4 py-2 text-white disabled:opacity-40"
      >
        {isPending ? 'Saving...' : 'Save entry'}
      </button>
    </div>
  )
}