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
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-2xl font-medium text-stone-900">Yoga</h1>
      <div className="mt-4">
        <QuoteCard theme="yoga" />
      </div>

      <h2 className="mt-8 text-lg font-medium text-stone-900">Guided Sequences</h2>
      {sequencesLoading && <p className="mt-2 text-stone-500">Loading sequences...</p>}
      {sequencesError && (
        <p className="mt-2 text-red-600">Couldn't load sequences: {(sequencesError as Error).message}</p>
      )}
      <div className="mt-3 flex flex-col gap-4">
        {sequences?.map((sequence) => (
          <div key={sequence.id} className="rounded-lg border border-stone-200 px-5 py-4">
            <p className="font-medium text-stone-900">{sequence.name}</p>
            {sequence.description && (
              <p className="text-sm text-stone-500">{sequence.description}</p>
            )}
            <ol className="mt-3 flex flex-col gap-1">
              {sequence.steps.map((step) => (
                <li key={step.position} className="flex justify-between text-sm text-stone-700">
                  <span>
                    {step.position}. {step.pose.nameEnglish}{' '}
                    <span className="italic text-stone-400">({step.pose.nameSanskrit})</span>
                  </span>
                  <span className="text-stone-400">{formatHold(step.holdSeconds)}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-lg font-medium text-stone-900">Pose Library</h2>
      {posesLoading && <p className="mt-2 text-stone-500">Loading poses...</p>}
      {posesError && (
        <p className="mt-2 text-red-600">Couldn't load poses: {(posesError as Error).message}</p>
      )}
      <div className="mt-3 flex flex-col gap-4">
        {poses?.map((pose) => (
          <PoseCard key={pose.id} pose={pose} />
        ))}
      </div>
    </div>
  )
}