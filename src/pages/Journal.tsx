import { QuoteCard } from '../components/QuoteCard'
import { RequireAuth } from '../components/RequireAuth'
import { JournalComposer } from '../components/JournalComposer'
import { JournalEntryList } from '../components/JournalEntryList'

export function Journal() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-serif text-2xl text-ink">Journal</h1>
      <div className="mt-5">
        <QuoteCard theme="self-study" />
      </div>
      <div className="mt-6">
        <RequireAuth>
          <div className="flex flex-col gap-6">
            <JournalComposer />
            <JournalEntryList />
          </div>
        </RequireAuth>
      </div>
    </div>
  )
}
