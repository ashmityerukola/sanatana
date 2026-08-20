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

- `quotes` — id, text, source, translation_notes
- `quote_themes` — join table: quote_id + theme (yoga / meditation / gratitude / self-study / general)
- `poses`, `sequences`, `meditations` — content tables (not yet built)
- `gratitude_entries`, `journal_entries` — user-generated tables (not yet built)

Content tables (quotes, poses, sequences, meditations) are kept separate from
user-generated tables (gratitude_entries, journal_entries) so that a future
premium tier (e.g. gating extra guided meditations) can add access checks to
content tables without touching the user-data tables at all.

## Running locally

```bash
npm install
cp .env.example .env   # fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev
```

### Setting up the database

In the Supabase SQL editor, run `supabase/schema.sql` then `supabase/seed.sql`
to create the `quotes` / `quote_themes` tables and load a starter set of
tagged Gita and Yoga Sutra verses.

## Screenshots

_Coming once there's UI worth screenshotting._
