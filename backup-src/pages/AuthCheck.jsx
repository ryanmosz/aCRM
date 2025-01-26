import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSupabaseClient } from '../lib/supabase'

export default function AuthCheck() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleLogout = async () => {
    const supabase = createSupabaseClient()
    await supabase.auth.signOut()
    navigate('/login')
  }

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Fetch profile data from our profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(profile)
      }
      
      setUser(user)
      setLoading(false)
    }

    checkAuth()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <button onClick={handleLogout}>Logout</button>
          {profile && (
            <div>
              <h2>Profile</h2>
              <p>Username: {profile.username}</p>
              <p>Full Name: {profile.full_name}</p>
              <p>Role: {profile.role}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>Not authenticated</h1>
          <a href="/login">Go to login</a>
        </div>
      )}
    </div>
  )
} 