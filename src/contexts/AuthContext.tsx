import { createContext, useContext, useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom'

type AuthContextType = {
  user: User | null
  profile: { username: string; role: string } | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<{ username: string; role: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const supabase = createBrowserClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    async function getProfile() {
      if (user?.id) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, role')
          .eq('id', user.id)
          .single()
        
        console.log('Profile data:', data)
        console.log('Profile error:', error)
        
        if (!error && data) {
          setProfile(data)
        }
      }
    }
    
    getProfile()
  }, [user])

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 