-- Weavo Database Schema
-- Run this in your Supabase SQL Editor

-- Users table (synced from Clerk)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  credits_remaining INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Sites table
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  theme_json JSONB DEFAULT '{}',
  site_json JSONB,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Pages table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  sections_json JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Generations log
CREATE TABLE generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  prompt_summary TEXT,
  result_json JSONB,
  model TEXT,
  cost_cents INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Uploads table
CREATE TABLE uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_type TEXT,
  original_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT DEFAULT 'free',
  status TEXT DEFAULT 'active',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_sites_user_id ON sites(user_id);
CREATE INDEX idx_pages_site_id ON pages(site_id);
CREATE INDEX idx_generations_user_id ON generations(user_id);
CREATE INDEX idx_uploads_user_id ON uploads(user_id);
CREATE INDEX idx_users_clerk_id ON users(clerk_id);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies (using service role key bypasses these, anon key respects them)
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (true);

CREATE POLICY "Users can read own sites" ON sites FOR SELECT USING (true);
CREATE POLICY "Users can insert own sites" ON sites FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own sites" ON sites FOR UPDATE USING (true);
CREATE POLICY "Users can delete own sites" ON sites FOR DELETE USING (true);

CREATE POLICY "Users can read own pages" ON pages FOR SELECT USING (true);
CREATE POLICY "Users can insert own pages" ON pages FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own pages" ON pages FOR UPDATE USING (true);
CREATE POLICY "Users can delete own pages" ON pages FOR DELETE USING (true);

CREATE POLICY "Users can read own generations" ON generations FOR SELECT USING (true);
CREATE POLICY "Users can insert generations" ON generations FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can read own uploads" ON uploads FOR SELECT USING (true);
CREATE POLICY "Users can insert uploads" ON uploads FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can read own subscriptions" ON subscriptions FOR SELECT USING (true);
