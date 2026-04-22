-- Publishing + bandwidth tracking
-- Adds subdomain hosting so users can publish their generated sites
-- to *.weavo.site. Bandwidth counter protects us from a viral site
-- eating the whole Vercel budget.
-- Run this in your Supabase SQL Editor after 001–003 have been applied.

-- ── Extend sites table ───────────────────────────────────────────
ALTER TABLE sites
  ADD COLUMN IF NOT EXISTS subdomain TEXT,
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS bandwidth_used_bytes BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS bandwidth_reset_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Subdomain must be unique (but many sites can be NULL = unpublished).
CREATE UNIQUE INDEX IF NOT EXISTS idx_sites_subdomain_unique
  ON sites (subdomain)
  WHERE subdomain IS NOT NULL;

-- Lookup by subdomain is the hot path for the public renderer.
CREATE INDEX IF NOT EXISTS idx_sites_subdomain_lookup
  ON sites (subdomain)
  WHERE status = 'published';

-- ── Atomic bandwidth increment ───────────────────────────────────
-- Called from the public renderer after each response. Row-locks
-- the site so parallel visits can't lose writes. Also resets the
-- counter lazily when the monthly window has passed.
CREATE OR REPLACE FUNCTION increment_site_bandwidth(
  p_site_id UUID,
  p_bytes BIGINT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_used BIGINT;
  v_reset_at TIMESTAMPTZ;
BEGIN
  SELECT bandwidth_used_bytes, bandwidth_reset_at
    INTO v_used, v_reset_at
  FROM sites
  WHERE id = p_site_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'reason', 'site not found');
  END IF;

  -- Monthly reset: if the reset marker is in the past, zero the counter
  -- and push the marker forward by one month.
  IF v_reset_at < now() THEN
    v_used := 0;
    v_reset_at := now() + interval '1 month';
  END IF;

  v_used := v_used + p_bytes;

  UPDATE sites
  SET
    bandwidth_used_bytes = v_used,
    bandwidth_reset_at = v_reset_at
  WHERE id = p_site_id;

  RETURN jsonb_build_object(
    'success', true,
    'used_bytes', v_used,
    'reset_at', v_reset_at
  );
END;
$$;
