import { createServerClient } from "./server";
import type { Database } from "./types";
import { FREE_CREDITS } from "@/lib/constants";

type UserRow = Database["public"]["Tables"]["users"]["Row"];

export async function getUserByClerkId(clerkId: string): Promise<UserRow | null> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", clerkId)
    .single();
  return data;
}

export async function createUser(clerkId: string, email: string, name: string | null): Promise<UserRow | null> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("users")
    .insert({ clerk_id: clerkId, email, name })
    .select()
    .single();

  // Log the signup bonus so the transaction history matches the balance.
  // The 30 credits themselves come from the users.credits_remaining DB default,
  // so we only write the audit row here.
  if (data) {
    const { error: txError } = await supabase
      .from("credit_transactions")
      .insert({
        user_id: data.id,
        amount: FREE_CREDITS,
        type: "signup_bonus",
        balance_after: data.credits_remaining,
        metadata: { source: "signup" },
      });
    if (txError) {
      console.warn("[createUser] signup bonus log failed:", txError.message);
    }
  }

  return data;
}

export async function getOrCreateUser(clerkId: string, email: string, name: string | null): Promise<UserRow | null> {
  let user = await getUserByClerkId(clerkId);
  if (!user) {
    user = await createUser(clerkId, email, name);
  }
  return user;
}

export async function getUserSites(userId: string) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("sites")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getSiteById(siteId: string) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("sites")
    .select("*")
    .eq("id", siteId)
    .single();
  return data;
}

export async function createSite(userId: string, name: string, industry: string, themeJson: Record<string, unknown>, siteJson: Record<string, unknown>) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("sites")
    .insert({
      user_id: userId,
      name,
      industry,
      theme_json: themeJson,
      site_json: siteJson,
    })
    .select()
    .single();
  return data;
}

export async function updateSite(siteId: string, updates: Record<string, unknown>) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("sites")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", siteId)
    .select()
    .single();
  return data;
}

export async function deleteSite(siteId: string) {
  const supabase = createServerClient();
  await supabase.from("sites").delete().eq("id", siteId);
}

export async function logGeneration(siteId: string, userId: string, promptSummary: string, resultJson: Record<string, unknown>, model: string) {
  const supabase = createServerClient();
  await supabase.from("generations").insert({
    site_id: siteId,
    user_id: userId,
    prompt_summary: promptSummary,
    result_json: resultJson,
    model,
  });
}
