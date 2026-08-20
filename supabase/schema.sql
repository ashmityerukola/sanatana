-- Sanatana: quotes schema
-- Run this in the Supabase dashboard SQL editor (Project > SQL Editor > New query).
--
-- Design note: themes live in a junction table (quote_themes) rather than a
-- `theme text[]` column on quotes, because a quote can belong to more than one
-- theme (e.g. a verse on dhyana might tag both "meditation" and "self-study"),
-- and a proper many-to-many table is the standard relational answer to that —
-- easier to query/index one theme at a time and easier to extend later.

create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  source text not null,               -- e.g. "Bhagavad Gita 6.19"
  translation_notes text,             -- optional context on the translation/interpretation
  created_at timestamptz not null default now()
);

create table if not exists quote_themes (
  quote_id uuid not null references quotes(id) on delete cascade,
  theme text not null check (theme in ('yoga', 'meditation', 'gratitude', 'self-study', 'general')),
  primary key (quote_id, theme)
);

create index if not exists quote_themes_theme_idx on quote_themes(theme);

-- Row Level Security: quotes are app content, not user data.
-- Everyone (including anonymous visitors) can read them; nobody can write
-- through the public API — edits happen via the Supabase dashboard/service role.
-- This is the pattern the rest of the content tables (poses, sequences,
-- meditations) will follow too, which is why content tables are kept separate
-- from user-generated tables (gratitude_entries, journal_entries) that WILL
-- need per-user write policies later.
alter table quotes enable row level security;
alter table quote_themes enable row level security;

create policy "quotes are publicly readable"
  on quotes for select
  using (true);

create policy "quote_themes are publicly readable"
  on quote_themes for select
  using (true);
