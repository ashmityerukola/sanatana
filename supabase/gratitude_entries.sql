-- Sanatana: gratitude_entries schema
-- Run this in the Supabase SQL editor, after the earlier schema files.
--
-- Unlike quotes/poses/sequences (public content, read-only from the client),
-- this is user-generated data: every row belongs to exactly one user, and
-- RLS restricts each user to their own rows. `user_id` references
-- `auth.users` directly -- Supabase Auth already manages that table, so we
-- don't need a separate `users` table of our own.

create table if not exists gratitude_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null default current_date,
  items text[] not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, entry_date) -- one entry per user per day; saving is an upsert against this
);

create index if not exists gratitude_entries_user_date_idx on gratitude_entries(user_id, entry_date desc);

alter table gratitude_entries enable row level security;

-- auth.uid() is the user ID Supabase derives from the caller's session JWT.
-- Comparing it to user_id on every operation is what actually enforces
-- "you can only touch your own entries" -- not anything in the frontend code.
create policy "users can read their own gratitude entries"
  on gratitude_entries for select
  using (auth.uid() = user_id);

create policy "users can insert their own gratitude entries"
  on gratitude_entries for insert
  with check (auth.uid() = user_id);

create policy "users can update their own gratitude entries"
  on gratitude_entries for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users can delete their own gratitude entries"
  on gratitude_entries for delete
  using (auth.uid() = user_id);