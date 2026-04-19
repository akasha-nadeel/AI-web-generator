-- Credits system
-- Adds has_ever_paid flag, credit_transactions log, atomic deduction RPC.
-- Run this in your Supabase SQL Editor after 001 + 002 have been applied.

-- ── Extend users table ───────────────────────────────────────────
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS has_ever_paid BOOLEAN NOT NULL DEFAULT false;

-- Bump default signup credits from 3 → 30 (new Haiku-only free tier)
ALTER TABLE users
  ALTER COLUMN credits_remaining SET DEFAULT 30;

-- ── Credit transactions log ──────────────────────────────────────
-- One row per credit movement. Positive amount = credits added,
-- negative amount = credits spent. Used for auditing + billing history.
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (
    type IN (
      'signup_bonus',
      'pack_purchase',
      'generation',
      'refund',
      'admin_grant'
    )
  ),
  balance_after INTEGER NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_created
  ON credit_transactions (user_id, created_at DESC);

ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own transactions"
  ON credit_transactions
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert transactions"
  ON credit_transactions
  FOR INSERT
  WITH CHECK (true);

-- ── Atomic credit deduction ──────────────────────────────────────
-- Row-locks the user, verifies balance, decrements, and writes a
-- transaction row — all inside one Postgres transaction so two
-- parallel generation requests cannot double-spend.
--
-- Returns: JSON { success: bool, new_balance: int, reason?: text }
CREATE OR REPLACE FUNCTION deduct_credits_atomic(
  p_user_id UUID,
  p_amount INTEGER,
  p_type TEXT,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_balance INTEGER;
  v_new_balance INTEGER;
BEGIN
  IF p_amount <= 0 THEN
    RETURN jsonb_build_object('success', false, 'reason', 'amount must be positive');
  END IF;

  -- Lock the user row for the duration of this transaction
  SELECT credits_remaining INTO v_balance
  FROM users
  WHERE id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'reason', 'user not found');
  END IF;

  IF v_balance < p_amount THEN
    RETURN jsonb_build_object(
      'success', false,
      'reason', 'insufficient credits',
      'balance', v_balance
    );
  END IF;

  v_new_balance := v_balance - p_amount;

  UPDATE users
  SET credits_remaining = v_new_balance
  WHERE id = p_user_id;

  INSERT INTO credit_transactions (user_id, amount, type, balance_after, metadata)
  VALUES (p_user_id, -p_amount, p_type, v_new_balance, p_metadata);

  RETURN jsonb_build_object('success', true, 'new_balance', v_new_balance);
END;
$$;

-- ── Atomic credit addition ───────────────────────────────────────
-- Used by Stripe webhook (pack purchases), admin grants, and refunds.
-- Also flips has_ever_paid = true on pack_purchase so the model gate
-- unlocks Sonnet + Opus for the user.
CREATE OR REPLACE FUNCTION add_credits_atomic(
  p_user_id UUID,
  p_amount INTEGER,
  p_type TEXT,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_balance INTEGER;
  v_new_balance INTEGER;
BEGIN
  IF p_amount <= 0 THEN
    RETURN jsonb_build_object('success', false, 'reason', 'amount must be positive');
  END IF;

  SELECT credits_remaining INTO v_balance
  FROM users
  WHERE id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'reason', 'user not found');
  END IF;

  v_new_balance := v_balance + p_amount;

  UPDATE users
  SET
    credits_remaining = v_new_balance,
    has_ever_paid = CASE WHEN p_type = 'pack_purchase' THEN true ELSE has_ever_paid END
  WHERE id = p_user_id;

  INSERT INTO credit_transactions (user_id, amount, type, balance_after, metadata)
  VALUES (p_user_id, p_amount, p_type, v_new_balance, p_metadata);

  RETURN jsonb_build_object('success', true, 'new_balance', v_new_balance);
END;
$$;
