import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSupabaseClient } from '../lib/supabase'

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        navigate('/login', { replace: true })
      }
      setLoading(false)
    }

    checkAuth()
  }, [navigate])

  if (loading) {
    return <div>Loading...</div>
  }

  return children
} 