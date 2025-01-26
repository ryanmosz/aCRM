export interface Profile {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  role: 'user' | 'admin' | 'moderator'
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  user_id: string
  title: string
  content: string | null
  published: boolean
  created_at: string
  updated_at: string
} 