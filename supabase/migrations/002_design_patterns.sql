-- Design Pattern Library
-- Stores curated design briefs extracted from Akasha-design screenshots.
-- Used to match and inject design direction into generations.

CREATE TABLE design_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industries TEXT[] NOT NULL DEFAULT '{}',
  moods TEXT[] NOT NULL DEFAULT '{}',
  color_mode TEXT NOT NULL DEFAULT 'mixed',
  brief_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for matching by industry and mood
CREATE INDEX idx_design_patterns_industries ON design_patterns USING GIN(industries);
CREATE INDEX idx_design_patterns_moods ON design_patterns USING GIN(moods);

-- RLS (service role key bypasses — this table is admin-only, read by generation)
ALTER TABLE design_patterns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read design patterns" ON design_patterns FOR SELECT USING (true);
CREATE POLICY "Service role can insert design patterns" ON design_patterns FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can delete design patterns" ON design_patterns FOR DELETE USING (true);
