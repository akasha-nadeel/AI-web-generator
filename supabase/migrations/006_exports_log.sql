-- Exports log
-- One row per successful Next.js export. Audit trail + backing store for
-- the soft rate limit added in Phase 8 (30 exports/user/hour counted via
-- the (user_id, created_at) index below).

CREATE TABLE exports_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_exports_log_user_created_at
  ON exports_log(user_id, created_at DESC);

ALTER TABLE exports_log ENABLE ROW LEVEL SECURITY;

-- Server-side only (service role bypasses RLS). No client policies needed.
