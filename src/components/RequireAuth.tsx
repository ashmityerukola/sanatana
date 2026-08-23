import type { ReactNode } from 'react'
import { useAuth } from '../lib/AuthContext'
import { AuthForm } from './AuthForm'

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <AuthForm />

  return <>{children}</>
}