-- Sanatana: journal_entries schema
-- Run this in the Supabase SQL editor, after the earlier schema files.
--
-- Unlike gratitude_entries (one row per user per day, upserted), journal is
-- append-only: no unique constraint on (user_id, entry_date), since a
-- freeform reflection naturally allows more than one entry in a day.
-- Same user-owned-data pattern otherwise: user_id -> auth.users, RLS scoped
-- to auth.uid().

create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null default current_date,
  prompt text,
  entry_text text not null,
  created_at timestamptz not null default now()
);

create index if not exists journal_entries_user_date_idx on journal_entries(user_id, created_at desc);

alter table journal_entries enable row level security;

create policy "users can read their own journal entries"
  on journal_entries for select
  using (auth.uid() = user_id);

create policy "users can insert their own journal entries"
  on journal_entries for insert
  with check (auth.uid() = user_id);

create policy "users can delete their own journal entries"
  on journal_entries for delete
  using (auth.uid() = user_id);