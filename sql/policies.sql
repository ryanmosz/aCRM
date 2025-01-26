-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Enable RLS on posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Posts policies
-- Allow users to read published posts
CREATE POLICY "Anyone can read published posts"
  ON public.posts
  FOR SELECT
  USING (published = true);

-- Allow users to read their own unpublished posts
CREATE POLICY "Users can read own unpublished posts"
  ON public.posts
  FOR SELECT
  USING (auth.uid() = user_id AND published = false);

-- Allow users to create their own posts
CREATE POLICY "Users can create own posts"
  ON public.posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Restrict users to only update their own posts
CREATE POLICY "Users can update own posts"
  ON public.posts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own posts
CREATE POLICY "Users can delete own posts"
  ON public.posts
  FOR DELETE
  USING (auth.uid() = user_id);
