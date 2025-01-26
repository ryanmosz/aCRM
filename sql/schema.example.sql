-- Example schema structure (no sensitive data)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid references auth.users primary key,
  username text,
  role user_role
);
