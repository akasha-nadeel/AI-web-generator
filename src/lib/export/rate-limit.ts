// Soft rate limit for the /api/export/nextjs endpoint. Counts rows in
// exports_log for the given user within a sliding window and reports
// whether one more export is allowed.
//
// Fail-open by design: if the count query errors (e.g. migration 006 not
// yet applied), the caller gets `{ allowed: true }` and a warning in logs
// — blocking paying users over an infra glitch would be a worse outcome
// than under-counting exports for a minute.

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

export const EXPORT_RATE_LIMIT_PER_HOUR = 30;
const HOUR_MS = 60 * 60 * 1000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Rows counted in the window. Useful for telemetry / tests. */
  count: number;
  /** ISO timestamp for the bottom of the window. */
  since: string;
}

export interface RateLimitOptions {
  limit?: number;
  windowMs?: number;
  now?: () => Date;
}

export async function checkExportRateLimit(
  supabase: SupabaseClient<Database>,
  userId: string,
  opts: RateLimitOptions = {}
): Promise<RateLimitResult> {
  const limit = opts.limit ?? EXPORT_RATE_LIMIT_PER_HOUR;
  const windowMs = opts.windowMs ?? HOUR_MS;
  const now = (opts.now ?? (() => new Date()))();
  const since = new Date(now.getTime() - windowMs).toISOString();

  const { count, error } = await supabase
    .from("exports_log")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", since);

  if (error) {
    console.warn("[Export] rate-limit count failed — allowing request:", error.message);
    return { allowed: true, remaining: limit, count: 0, since };
  }

  const current = count ?? 0;
  return {
    allowed: current < limit,
    remaining: Math.max(0, limit - current),
    count: current,
    since,
  };
}
