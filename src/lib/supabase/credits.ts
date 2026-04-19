import { createServerClient } from "./server";
import type { CreditTransactionType, Database } from "./types";

type TransactionRow = Database["public"]["Tables"]["credit_transactions"]["Row"];

export type CreditOpResult =
  | { success: true; newBalance: number }
  | { success: false; reason: string; balance?: number };

export async function getCreditBalance(userId: string): Promise<number | null> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("users")
    .select("credits_remaining")
    .eq("id", userId)
    .single();
  return data?.credits_remaining ?? null;
}

/**
 * Atomically spend credits. Safe under concurrent requests — the Postgres
 * function row-locks the user, verifies the balance, decrements, and logs
 * a transaction in one shot. Returns `success: false` with `reason:
 * 'insufficient credits'` when the user can't afford the operation.
 */
export async function deductCredits(
  userId: string,
  amount: number,
  type: CreditTransactionType,
  metadata: Record<string, unknown> = {}
): Promise<CreditOpResult> {
  const supabase = createServerClient();
  const { data, error } = await supabase.rpc("deduct_credits_atomic", {
    p_user_id: userId,
    p_amount: amount,
    p_type: type,
    p_metadata: metadata,
  });

  if (error || !data) {
    return { success: false, reason: error?.message || "rpc failed" };
  }

  if (data.success && typeof data.new_balance === "number") {
    return { success: true, newBalance: data.new_balance };
  }

  return {
    success: false,
    reason: data.reason || "unknown",
    balance: data.balance,
  };
}

/**
 * Atomically add credits. Used by the Stripe webhook on pack purchase,
 * admin grants, and refunds. On `pack_purchase` the RPC also flips
 * `has_ever_paid = true`, unlocking Sonnet + Opus for the user.
 */
export async function addCredits(
  userId: string,
  amount: number,
  type: CreditTransactionType,
  metadata: Record<string, unknown> = {}
): Promise<CreditOpResult> {
  const supabase = createServerClient();
  const { data, error } = await supabase.rpc("add_credits_atomic", {
    p_user_id: userId,
    p_amount: amount,
    p_type: type,
    p_metadata: metadata,
  });

  if (error || !data) {
    return { success: false, reason: error?.message || "rpc failed" };
  }

  if (data.success && typeof data.new_balance === "number") {
    return { success: true, newBalance: data.new_balance };
  }

  return { success: false, reason: data.reason || "unknown" };
}

export async function getTransactionHistory(
  userId: string,
  limit = 50
): Promise<TransactionRow[]> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("credit_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return data || [];
}
