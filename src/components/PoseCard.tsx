import type { Pose } from '../types/database'

export function PoseCard({ pose }: { pose: Pose }) {
  return (
    <article className="rounded-xl border border-border bg-white px-6 py-5">
      {pose.imageUrl ? (
        <img src={pose.imageUrl} alt={pose.nameEnglish} className="mb-4 rounded-lg" />
      ) : (
        <div className="mb-4 flex h-28 items-center justify-center rounded-lg bg-surface text-sm text-muted">
          Image coming soon
        </div>
      )}
      <h3 className="font-serif text-lg text-ink">{pose.nameEnglish}</h3>
      <p className="mt-0.5 text-sm italic text-muted">{pose.nameSanskrit}</p>
      <p className="mt-4 leading-7 text-ink">{pose.instructions}</p>
      {(pose.benefits || pose.cautions) && (
        <div className="mt-4 border-t border-border pt-4 text-sm leading-6">
          {pose.benefits && <p className="text-muted"><span className="font-medium text-ink">Benefits:</span> {pose.benefits}</p>}
          {pose.cautions && <p className="mt-1 text-accent-hover"><span className="font-medium">Caution:</span> {pose.cautions}</p>}
        </div>
      )}
    </article>
  )
}
