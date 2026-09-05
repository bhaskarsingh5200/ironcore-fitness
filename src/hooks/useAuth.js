import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSession, getProfile, onAuthStateChange, signOut } from '../services/auth'

/**
 * Admin authentication hook. Returns:
 *   status: 'loading' | 'signedOut' | 'member' | 'admin'
 *   profile, signOutAdmin
 */
export function useAuth() {
  const [status, setStatus] = useState('loading')
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true

    const refresh = async (userId) => {
      if (!userId) {
        if (mounted) setStatus('signedOut')
        return
      }
      const prof = await getProfile(userId)
      if (!mounted) return
      if (prof?.role === 'admin') {
        setProfile(prof)
        setStatus('admin')
      } else {
        setStatus('member')
      }
    }

    getSession().then(async (session) => {
      await refresh(session?.user?.id)
    })

    const unsubscribe = onAuthStateChange((session) => {
      refresh(session?.user?.id)
    })

    return () => {
      mounted = false
      unsubscribe()
    }
  }, [])

  const signOutAdmin = async () => {
    await signOut()
    setProfile(null)
    setStatus('signedOut')
    navigate('/admin/login')
  }

  return { status, profile, signOutAdmin }
}
