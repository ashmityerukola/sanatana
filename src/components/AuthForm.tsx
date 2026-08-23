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
    <div className="mx-auto max-w-sm rounded-lg border border-stone-200 px-6 py-6">
      <h2 className="text-lg font-medium text-stone-900">
        {mode === 'signIn' ? 'Sign in' : 'Create an account'}
      </h2>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-stone-900 px-4 py-2 text-white disabled:opacity-40"
        >
          {mode === 'signIn' ? 'Sign in' : 'Sign up'}
        </button>
      </form>
      <button
        onClick={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
        className="mt-3 text-sm text-stone-500 hover:text-stone-800"
      >
        {mode === 'signIn' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
      </button>
    </div>
  )
}