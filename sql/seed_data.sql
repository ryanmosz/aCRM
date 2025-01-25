-- Create corresponding profile for existing auth user
INSERT INTO public.profiles (
  id,
  username,
  full_name,
  role
)
SELECT 
  id,
  'testuser',
  'Test User',
  'user'
FROM auth.users 
WHERE email = 'test@example.com'
ON CONFLICT (id) DO NOTHING;
