// One-shot backfill: re-derive each site's `name` from the brand baked into
// its generated HTML's <title> tag. Existing names that look like raw user
// prompts ("Build a minimal ecommerce website for…") get replaced with
// the actual invented brand ("NOTFLIX", "Kino", "Iron Gym", etc.).
//
// Run with:  node scripts/backfill-site-names.mjs
//   - dry run by default; prints the proposed before -> after diff
//   - pass --apply to actually write to the database
//
// Idempotent: re-running with --apply on already-renamed sites is a no-op
// because the extractor returns the same value.

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env.local");
const envText = readFileSync(envPath, "utf8");
for (const line of envText.split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
  if (m && !process.env[m[1]]) {
    let val = m[2];
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[m[1]] = val;
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const APPLY = process.argv.includes("--apply");

// ─────────────────────────────────────────────────────────────────────
// Brand extractor — must stay in sync with extractBrandFromHtml in
// src/app/api/ai/generate/route.ts
// ─────────────────────────────────────────────────────────────────────
function extractBrandFromHtml(html) {
  if (!html || typeof html !== "string") return null;
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch) return null;

  let title = titleMatch[1]
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

  const split = title.split(/\s+[—–|·\-:]\s+/);
  if (split.length > 0) title = split[0].trim();

  title = title.replace(/^["'(]+|["')]+$/g, "").trim();

  if (!title) return null;
  if (title.length > 60) return null;
  if (/^(untitled|website|home|welcome|index|document|page|my\s+site)$/i.test(title)) {
    return null;
  }
  return title;
}

// ─────────────────────────────────────────────────────────────────────
// Heuristic — does the existing name look like a raw user prompt?
// We only rename if (a) the new name differs AND (b) the old name looks
// prompty (lowercase first word like "build", "create", "give", or
// suspiciously long, or ends with "for" / "website").
// ─────────────────────────────────────────────────────────────────────
function looksLikePromptName(name) {
  if (!name) return true;
  if (name.length > 50) return true;
  const lower = name.toLowerCase().trim();
  const promptyStarts = [
    "build ",
    "create ",
    "make ",
    "give me",
    "i want",
    "design ",
    "generate ",
    "i need",
  ];
  if (promptyStarts.some((p) => lower.startsWith(p))) return true;
  // Trailing "for" / "website" / "site" → almost certainly a truncated prompt
  if (/\s+(for|website|web\s+site|site|with|that)\.?$/i.test(name.trim())) {
    return true;
  }
  return false;
}

async function main() {
  console.log(
    `[backfill] Mode: ${APPLY ? "APPLY (will write)" : "DRY-RUN (preview only)"}`
  );

  const { data: sites, error } = await supabase
    .from("sites")
    .select("id, name, site_json")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[backfill] Failed to load sites:", error.message);
    process.exit(1);
  }

  if (!sites || sites.length === 0) {
    console.log("[backfill] No sites found.");
    return;
  }

  console.log(`[backfill] Loaded ${sites.length} site(s)`);

  const updates = [];
  const skipped = [];

  for (const site of sites) {
    const html = site.site_json?.html;
    const newName = extractBrandFromHtml(html);

    if (!newName) {
      skipped.push({ id: site.id, oldName: site.name, reason: "no <title>" });
      continue;
    }
    if (newName === site.name) {
      skipped.push({ id: site.id, oldName: site.name, reason: "already correct" });
      continue;
    }
    if (!looksLikePromptName(site.name)) {
      // Existing name doesn't look like a raw prompt — likely a manual rename.
      // Don't overwrite the user's choice.
      skipped.push({
        id: site.id,
        oldName: site.name,
        reason: "looks user-set (would extract: " + newName + ")",
      });
      continue;
    }

    updates.push({ id: site.id, oldName: site.name, newName });
  }

  console.log("");
  console.log(`[backfill] Sites to rename: ${updates.length}`);
  console.log(`[backfill] Sites skipped:  ${skipped.length}`);
  console.log("");

  if (updates.length > 0) {
    console.log("Renames:");
    for (const u of updates) {
      console.log(`  ${u.oldName.slice(0, 50).padEnd(52)} →  ${u.newName}`);
    }
  }

  if (skipped.length > 0 && process.argv.includes("--verbose")) {
    console.log("");
    console.log("Skipped:");
    for (const s of skipped) {
      console.log(`  [${s.reason}] ${s.oldName}`);
    }
  }

  if (!APPLY) {
    console.log("");
    console.log("[backfill] Dry-run complete. Re-run with --apply to commit.");
    return;
  }

  if (updates.length === 0) {
    console.log("");
    console.log("[backfill] Nothing to do.");
    return;
  }

  console.log("");
  console.log(`[backfill] Applying ${updates.length} rename(s)…`);

  let successCount = 0;
  let errorCount = 0;
  for (const u of updates) {
    const { error: updateError } = await supabase
      .from("sites")
      .update({ name: u.newName })
      .eq("id", u.id);
    if (updateError) {
      console.error(`  ✗ ${u.id}: ${updateError.message}`);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log("");
  console.log(
    `[backfill] Done. ${successCount} renamed, ${errorCount} failed.`
  );
}

main().catch((err) => {
  console.error("[backfill] Fatal:", err);
  process.exit(1);
});
