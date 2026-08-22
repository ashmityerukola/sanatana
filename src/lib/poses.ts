import { supabase } from './supabaseClient'
import type { Pose, Sequence } from '../types/database'

interface PoseRow {
  id: string
  name_sanskrit: string
  name_english: string
  instructions: string
  benefits: string | null
  cautions: string | null
  image_url: string | null
}

function mapPose(row: PoseRow): Pose {
  return {
    id: row.id,
    nameSanskrit: row.name_sanskrit,
    nameEnglish: row.name_english,
    instructions: row.instructions,
    benefits: row.benefits,
    cautions: row.cautions,
    imageUrl: row.image_url,
  }
}

export async function fetchPoses(): Promise<Pose[]> {
  const { data, error } = await supabase.from('poses').select('*').order('name_english')
  if (error) throw error
  return (data as PoseRow[]).map(mapPose)
}

interface SequenceRow {
  id: string
  name: string
  description: string | null
  sequence_poses: { position: number; hold_seconds: number; poses: PoseRow }[]
}

// Ordering happens twice on purpose: `foreignTable` orders the nested rows
// as Postgres returns them, but that's a query hint, not a guarantee we want
// to depend on — sorting by `position` again client-side is what actually
// makes "step 1, step 2, step 3..." reliable.
export async function fetchSequences(): Promise<Sequence[]> {
  const { data, error } = await supabase
    .from('sequences')
    .select('id, name, description, sequence_poses(position, hold_seconds, poses(*))')
    .order('position', { referencedTable: 'sequence_poses' })

  if (error) throw error

  // supabase-js can't infer the shape of a nested embed like sequence_poses(poses(*))
  // without generated database types, so it falls back to `any` — the cast through
  // `unknown` just asserts the shape we know this query actually returns.
  return (data as unknown as SequenceRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    steps: row.sequence_poses
      .map((step) => ({
        position: step.position,
        holdSeconds: step.hold_seconds,
        pose: mapPose(step.poses),
      }))
      .sort((a, b) => a.position - b.position),
  }))
}