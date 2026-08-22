import type { Pose } from '../types/database'

export function PoseCard({ pose }: { pose: Pose }) {
  return (
    <div className="rounded-lg border border-stone-200 px-5 py-4">
      {pose.imageUrl ? (
        <img src={pose.imageUrl} alt={pose.nameEnglish} className="mb-3 rounded-md" />
      ) : (
        <div className="mb-3 flex h-24 items-center justify-center rounded-md bg-stone-100 text-sm text-stone-400">
          Image coming soon
        </div>
      )}
      <p className="font-medium text-stone-900">{pose.nameEnglish}</p>
      <p className="text-sm italic text-stone-500">{pose.nameSanskrit}</p>
      <p className="mt-2 text-stone-700">{pose.instructions}</p>
      {pose.benefits && <p className="mt-2 text-sm text-stone-500">Benefits: {pose.benefits}</p>}
      {pose.cautions && <p className="mt-1 text-sm text-amber-700">Caution: {pose.cautions}</p>}
    </div>
  )
}