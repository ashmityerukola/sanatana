import { QuoteCard } from '../components/QuoteCard'
import { PoseCard } from '../components/PoseCard'
import { usePoses, useSequences } from '../hooks/usePoses'

function formatHold(seconds: number) {
  return seconds >= 60 ? `${Math.round(seconds / 60)} min` : `${seconds}s`
}

export function Yoga() {
  const { data: poses, isLoading: posesLoading, error: posesError } = usePoses()
  const { data: sequences, isLoading: sequencesLoading, error: sequencesError } = useSequences()

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-serif text-2xl text-ink">Yoga</h1>
      <div className="mt-5">
        <QuoteCard theme="yoga" />
      </div>

      <h2 className="mt-10 font-serif text-xl text-ink">Guided sequences</h2>
      <p className="mt-1 text-sm text-muted">Move through each pose in order, at your own pace.</p>
      {sequencesLoading && <p className="mt-3 text-sm text-muted">Loading sequences...</p>}
      {sequencesError && (
        <p className="mt-2 text-red-600">Couldn't load sequences: {(sequencesError as Error).message}</p>
      )}
      <div className="mt-5 flex flex-col gap-4">
        {sequences?.map((sequence) => (
          <section key={sequence.id} className="rounded-xl border border-border bg-white px-6 py-5">
            <p className="font-serif text-lg text-ink">{sequence.name}</p>
            {sequence.description && (
              <p className="mt-1 text-sm text-muted">{sequence.description}</p>
            )}
            <ol className="mt-5 flex flex-col gap-3">
              {sequence.steps.map((step) => (
                <li key={step.position} className="flex items-center justify-between gap-4 text-sm">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-medium text-accent-hover">
                      {step.position}
                    </span>
                    <span className="min-w-0 text-ink">
                      {step.pose.nameEnglish}{' '}
                      <span className="italic text-muted">({step.pose.nameSanskrit})</span>
                    </span>
                  </div>
                  <span className="shrink-0 text-muted">{formatHold(step.holdSeconds)}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <h2 className="mt-12 font-serif text-xl text-ink">Pose library</h2>
      <p className="mt-1 text-sm text-muted">Instructions, benefits, and cautions for each pose.</p>
      {posesLoading && <p className="mt-3 text-sm text-muted">Loading poses...</p>}
      {posesError && (
        <p className="mt-2 text-red-600">Couldn't load poses: {(posesError as Error).message}</p>
      )}
      <div className="mt-5 flex flex-col gap-4">
        {poses?.map((pose) => (
          <PoseCard key={pose.id} pose={pose} />
        ))}
      </div>
    </div>
  )
}
