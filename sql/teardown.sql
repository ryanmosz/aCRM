-- Teardown script to reset the database schema
-- Wrapping in a transaction to ensure atomic execution
BEGIN;

-- Disable foreign key checks temporarily for clean teardown
SET CONSTRAINTS ALL DEFERRED;

-- Drop all tables (if they exist)
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS followers CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS post_tags CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;

-- Drop any custom types
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS notification_type CASCADE;

-- Drop any custom functions
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;
DROP FUNCTION IF EXISTS notify_followers() CASCADE;

-- Re-enable foreign key checks
SET CONSTRAINTS ALL IMMEDIATE;

COMMIT; 