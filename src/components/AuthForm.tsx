import { useState, type FormEvent } from 'react'
import { signIn, signUp } from '../lib/auth'

// Shown wherever a page needs a signed-in user (see RequireAuth). Toggles
// between sign-up and sign-in rather than being two separate pages/routes --
// there's nothing else on either screen, so a route each would be overhead.
export function AuthForm() {
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (mode === 'signUp') {
        await signUp(email, password)
      } else {
        await signIn(email, password)
      }
      // On success, AuthContext's onAuthStateChange listener picks up the
      // new session automatically -- no need to manually redirect/refetch here.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-md rounded-xl border border-border bg-white px-6 py-7 sm:px-8">
      <h2 className="font-serif text-xl text-ink">
        {mode === 'signIn' ? 'Sign in' : 'Create an account'}
      </h2>
      <p className="mt-1 text-sm text-muted">Your reflections stay connected to your account.</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-border bg-cream px-3 py-2 text-ink outline-none transition-colors placeholder:text-muted focus:border-accent"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-border bg-cream px-3 py-2 text-ink outline-none transition-colors placeholder:text-muted focus:border-accent"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-accent px-4 py-2 text-white transition-colors hover:bg-accent-hover disabled:opacity-40"
        >
          {mode === 'signIn' ? 'Sign in' : 'Sign up'}
        </button>
      </form>
      <button
        onClick={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
        className="mt-4 text-left text-sm text-muted transition-colors hover:text-ink"
      >
        {mode === 'signIn' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
      </button>
    </section>
  )
}
