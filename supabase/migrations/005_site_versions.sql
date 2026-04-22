-- Site version history
-- Every time a site's site_json changes, the PREVIOUS state is snapshotted
-- into this table so users can roll back. Append-only log.

CREATE TABLE site_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  site_json JSONB NOT NULL,
  source TEXT DEFAULT 'chat' CHECK (source IN ('chat', 'editor', 'generate', 'restore', 'manual')),
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_site_versions_site_id_created_at
  ON site_versions(site_id, created_at DESC);

ALTER TABLE site_versions ENABLE ROW LEVEL SECURITY;

-- Server-side only (service role bypasses RLS). No client policies needed.
