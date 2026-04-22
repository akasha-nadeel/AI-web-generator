// Free sites get 10 GB/month; paid plans get 100 GB. Numbers in bytes.
export const BANDWIDTH_CAPS = {
  free: 10 * 1024 * 1024 * 1024,
  paid: 100 * 1024 * 1024 * 1024,
} as const;

export type PlanTier = "free" | "paid";

export function capForPlan(plan: string): number {
  return plan === "free" ? BANDWIDTH_CAPS.free : BANDWIDTH_CAPS.paid;
}

export function planTier(plan: string): PlanTier {
  return plan === "free" ? "free" : "paid";
}
