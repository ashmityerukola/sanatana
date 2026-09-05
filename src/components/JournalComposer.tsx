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
    <section className="rounded-xl border border-border bg-white px-6 py-7 sm:px-8">
      <h2 className="font-serif text-xl text-ink">A moment for reflection</h2>
      <p className="mt-1 text-sm text-muted">Write without needing to make it perfect.</p>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Prompt (optional)"
        className="mt-5 w-full rounded-lg border border-border bg-cream px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-accent"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write freely..."
        rows={5}
        className="mt-3 w-full resize-none rounded-lg border border-border bg-cream px-3 py-2 leading-7 text-ink outline-none transition-colors placeholder:text-muted focus:border-accent"
      />
      <button
        onClick={handleSave}
        disabled={isPending || !text.trim()}
        className="mt-4 rounded-lg bg-accent px-4 py-2 text-white transition-colors hover:bg-accent-hover disabled:opacity-40"
      >
        {isPending ? 'Saving...' : 'Save entry'}
      </button>
    </section>
  )
}
