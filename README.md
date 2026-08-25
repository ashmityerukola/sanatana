# Sanatana

A practice app for Hindus, built around five features — each one opens with a
scripture verse relevant to that specific feature, not a generic app-wide quote.

- **Scripture** — a searchable, themed library of verses (Gita, Yoga Sutras). This is the source pool every other page pulls from.
- **Meditation** — guided sessions + a plain timer, opened with a verse on dhyana (Gita ch. 6).
- **Yoga** — pose library + guided sequences, opened with a Yoga Sutra.
- **Gratitude** — a quick daily log, opened with a verse on santosha (contentment).
- **Journal** — freeform reflection, opened with a verse on svadhyaya (self-study).

## The tagging model

Every quote in the database is tagged with one or more themes
(`yoga`, `meditation`, `gratitude`, `self-study`, `general`) via a
`quote_themes` join table — a quote can belong to more than one theme, so
this is a proper many-to-many relationship rather than a single `theme`
column. Each feature page asks for a random quote *from its own theme*
(`useThemedQuote(theme)`), rather than every page sharing one hardcoded
string. This is the core design decision of the app: the quotes table isn't
just content for the Scripture page, it's the shared source every other
feature draws its framing from.

## Stack

- **Frontend**: React + TypeScript + Vite, React Router for the five feature routes
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Postgres + Auth), accessed directly from the client via the JS SDK, with Row Level Security policies enforcing access control (not app-level checks)
- **Server state**: React Query — caches Supabase reads (quotes, etc.) and dedupes requests across pages
- **Local/UI state**: plain React state and context — no Redux, the app isn't big enough to need it

Started as a web app (React + Vite) rather than React Native/Expo, so early
progress is a plain shareable URL rather than something that needs an app
install to demo. A React Native port is a possible later step, not a
day-one requirement.

## Data model

Content tables — public, read-only from the client, RLS lets anyone select:
- `quotes` — id, text, source, translation_notes
- `quote_themes` — join table: quote_id + theme (yoga / meditation / gratitude / self-study / general)
- `poses` — id, name (Sanskrit + English), instructions, benefits, cautions, image_url (nullable — no real pose images sourced yet)
- `sequences` — id, name, description
- `sequence_poses` — ordered join table: sequence_id + pose_id + position + hold_seconds
- `meditations` — not yet built; deferred until there's real guided-session audio to seed

User-generated tables — every row belongs to exactly one user, RLS restricts each user to their own rows via `auth.uid() = user_id`:
- `gratitude_entries` — one row per user per day (upserted), items text[]
- `journal_entries` — append-only, multiple entries per day allowed, optional prompt + entry_text

Auth is Supabase's built-in email/password (`auth.users`) — no custom `users`
table. Content tables are kept separate from user-generated tables so that a
future premium tier (e.g. gating extra guided meditations) can add access
checks to content tables without touching the user-data tables at all.

## Running locally

```bash
npm install
cp .env.example .env   # fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev
```

### Setting up the database

In the Supabase SQL editor, run these files in order:

1. `supabase/schema.sql` then `supabase/seed.sql` — quotes + quote_themes, with starter Gita/Yoga Sutra verses
2. `supabase/poses_and_sequences.sql` then `supabase/poses_and_sequences_seed.sql` — poses + sequences
3. `supabase/gratitude_entries.sql`
4. `supabase/journal_entries.sql`

Auth: in Authentication → Sign In / Providers → Email, "Confirm email" is
turned off for now (dev convenience — signup logs you in immediately instead
of requiring an email click). Turn it back on before this has real users.

## Screenshots

_Coming once there's UI worth screenshotting._
