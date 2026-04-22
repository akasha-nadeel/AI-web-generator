import { createServerClient } from "@/lib/supabase/server";
import { PUBLISH_APEX, publicUrlFor } from "./urls";

export { PUBLISH_APEX, publicUrlFor };

// Subdomains we use for our own app, infra, or reserve for future features.
// Users cannot claim any of these.
const RESERVED_SUBDOMAINS = new Set([
  "www", "api", "admin", "app", "mail", "auth", "status",
  "dashboard", "billing", "settings", "editor", "wizard", "generate",
  "sign-in", "sign-up", "login", "logout", "signup", "signin",
  "help", "docs", "support", "blog", "about", "pricing",
  "cdn", "static", "assets", "media", "img", "images",
  "ftp", "smtp", "pop", "imap", "ns", "dns", "mx",
  "dev", "staging", "test", "preview", "beta",
  "weavo", "pixora",
]);

// 3–30 chars, lowercase letters/digits/hyphens, no leading/trailing hyphen,
// no consecutive hyphens.
const SUBDOMAIN_RE = /^(?!-)(?!.*--)[a-z0-9-]{3,30}(?<!-)$/;

export type SubdomainCheck =
  | { ok: true; normalized: string }
  | { ok: false; reason: string };

export function validateSubdomain(raw: string): SubdomainCheck {
  const normalized = (raw || "").trim().toLowerCase();
  if (!normalized) return { ok: false, reason: "Subdomain is required." };
  if (normalized.length < 3) return { ok: false, reason: "Must be at least 3 characters." };
  if (normalized.length > 30) return { ok: false, reason: "Must be 30 characters or fewer." };
  if (!SUBDOMAIN_RE.test(normalized)) {
    return { ok: false, reason: "Use lowercase letters, numbers, and hyphens only." };
  }
  if (RESERVED_SUBDOMAINS.has(normalized)) {
    return { ok: false, reason: "This name is reserved." };
  }
  return { ok: true, normalized };
}

export async function isSubdomainAvailable(
  subdomain: string,
  excludeSiteId?: string
): Promise<boolean> {
  const supabase = createServerClient();
  let query = supabase.from("sites").select("id").eq("subdomain", subdomain);
  if (excludeSiteId) query = query.neq("id", excludeSiteId);
  const { data } = await query.limit(1);
  return !data || data.length === 0;
}

