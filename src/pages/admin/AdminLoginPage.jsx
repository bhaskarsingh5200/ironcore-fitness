import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { Dumbbell, Lock, AlertTriangle, Loader2 } from 'lucide-react'
import SEO from '../../components/SEO'
import Field from '../../components/ui/Field'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'
import { useAuth } from '../../hooks/useAuth'
import { signIn } from '../../services/auth'
import { isSupabaseConfigured } from '../../lib/supabase'

export default function AdminLoginPage() {
  const { status } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (status === 'admin') return <Navigate to="/admin" replace />

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email.trim(), password)
      // Redirect happens via onAuthStateChange -> useAuth status becomes 'admin'
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-ink px-5">
      <SEO title="Admin Login" />
      <div aria-hidden="true" className="absolute inset-0 bg-grid-faint [background-size:56px_56px] opacity-40" />
      <div aria-hidden="true" className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-blue-glow blur-3xl" />

      <Link to="/" className="mb-8 flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded border border-accent/40 bg-accent/10 text-accent-bright">
          <Dumbbell size={20} />
        </span>
        <span className="font-heading text-lg font-bold text-white">
          Iron<span className="text-accent-bright">Core</span>
        </span>
      </Link>

      <div className="relative w-full max-w-md rounded-lg border border-ink-line bg-ink-surface p-8 shadow-card">
        <h1 className="flex items-center gap-2 font-heading text-xl font-bold text-white">
          <Lock size={18} className="text-accent-bright" /> Admin Login
        </h1>
        <p className="mt-1.5 text-sm text-steel">
          Restricted area — only admin profiles can access the CMS.
        </p>

        {!isSupabaseConfigured && (
          <div className="mt-5 flex items-start gap-2.5 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-400">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <span>
              Supabase is not configured. Add <code className="text-amber-300">VITE_SUPABASE_URL</code>{' '}
              and <code className="text-amber-300">VITE_SUPABASE_ANON_KEY</code> to a{' '}
              <code className="text-amber-300">.env</code> file to enable authentication.
            </span>
          </div>
        )}

        {status === 'loading' ? (
          <div className="flex justify-center py-10">
            <Spinner className="h-5 w-5" />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Field
              label="Email"
              type="email"
              placeholder="admin@ironcore.example"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Field
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" disabled={loading || !isSupabaseConfigured} className="w-full">
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        )}

        <p className="mt-6 border-t border-ink-line pt-4 text-xs leading-relaxed text-slate-500">
          Setup: run <code className="text-accent-bright">supabase/schema.sql</code>, create a user,
          then set <code className="text-accent-bright">profiles.role = 'admin'</code> for that user
          (see README).
        </p>
      </div>
    </div>
  )
}
