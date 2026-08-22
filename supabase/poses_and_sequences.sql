-- Sanatana: poses + sequences schema
-- Run this in the Supabase SQL editor, after schema.sql/seed.sql.
--
-- sequence_poses is an ORDERED join table: a sequence is a list of poses in
-- a specific order, each held for a specific duration. That's different
-- from quote_themes (an unordered many-to-many tag table) — here the
-- `position` column carries meaning, and hold_seconds is data that belongs
-- to the (sequence, pose) pairing itself, not to either side alone. Neither
-- an array column nor a plain many-to-many table without `position` could
-- represent that.

create table if not exists poses (
  id uuid primary key default gen_random_uuid(),
  name_sanskrit text not null,
  name_english text not null,
  instructions text not null,
  benefits text,
  cautions text,
  image_url text,              -- nullable: no real pose photos/illustrations sourced yet
  created_at timestamptz not null default now()
);

create table if not exists sequences (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists sequence_poses (
  sequence_id uuid not null references sequences(id) on delete cascade,
  pose_id uuid not null references poses(id) on delete restrict,
  position int not null,
  hold_seconds int not null,
  primary key (sequence_id, position)
);

create index if not exists sequence_poses_sequence_idx on sequence_poses(sequence_id);

-- Same content-table pattern as quotes: publicly readable, not writable
-- through the client API.
alter table poses enable row level security;
alter table sequences enable row level security;
alter table sequence_poses enable row level security;

create policy "poses are publicly readable" on poses for select using (true);
create policy "sequences are publicly readable" on sequences for select using (true);
create policy "sequence_poses are publicly readable" on sequence_poses for select using (true);