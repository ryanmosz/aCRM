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

-- Create test users and their profiles
-- Create admin user
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
VALUES (
  gen_random_uuid(),
  'test_admin@example.com',
  crypt('admin', gen_salt('bf', 10)),
  now()
) ON CONFLICT (email) DO NOTHING;

-- Create regular users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
VALUES 
  (gen_random_uuid(), 'tom@example.com', crypt('1234', gen_salt('bf', 10)), now()),
  (gen_random_uuid(), 'sue@example.com', crypt('1234', gen_salt('bf', 10)), now())
ON CONFLICT (email) DO NOTHING;

-- Create corresponding profiles
INSERT INTO public.profiles (id, username, full_name, role)
SELECT 
  id,
  SPLIT_PART(email, '@', 1),
  CASE 
    WHEN email LIKE 'test_admin%' THEN 'Admin User'
    WHEN email LIKE 'tom%' THEN 'Tom User'
    ELSE 'Sue User'
  END,
  CASE 
    WHEN email LIKE 'test_admin%' THEN 'admin'
    ELSE 'user'
  END::user_role
FROM auth.users 
WHERE email IN ('test_admin@example.com', 'tom@example.com', 'sue@example.com')
ON CONFLICT (id) DO NOTHING;
