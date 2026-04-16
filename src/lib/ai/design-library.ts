/**
 * Design Pattern Library — persistent storage + matching.
 *
 * Akasha uploads curated design screenshots → extractor produces a DesignBrief
 * → brief is stored in Supabase with industry/mood tags.
 *
 * When ANY user generates a site, the best-matching brief is found and injected
 * into the user prompt as design guidance. The AI receives ONE brief (or none),
 * never the whole library.
 */

import { createServerClient } from "@/lib/supabase/server";
import type { DesignBrief } from "@/lib/ai/prompts/modules/design-extractor";

export interface StoredPattern {
  id: string;
  name: string;
  industries: string[];
  moods: string[];
  colorMode: string;
  brief: DesignBrief;
  createdAt: string;
}

/**
 * Save an extracted design brief to the library.
 */
export async function saveDesignPattern(
  name: string,
  industries: string[],
  moods: string[],
  brief: DesignBrief
): Promise<StoredPattern | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("design_patterns")
    .insert({
      name,
      industries: industries.map((i) => i.toLowerCase()),
      moods: moods.map((m) => m.toLowerCase()),
      color_mode: brief.colorMode,
      brief_json: brief as unknown as Record<string, unknown>,
    })
    .select()
    .single();

  if (error || !data) {
    console.error("[DesignLibrary] Failed to save pattern:", error);
    return null;
  }

  return rowToPattern(data);
}

/**
 * Find the best matching design pattern for a given industry, mood, AND prompt text.
 * Returns the single best match, or null if nothing relevant is found.
 *
 * Matching logic:
 * 1. Industry match (dropdown) = 3 points per match
 * 2. Prompt text keyword match = 3 points per match (catches "saas" in "give me a saas web site")
 * 3. Mood match = 2 points per match
 * 4. Color mode match = 1 point
 * 5. Minimum score of 3 required (at least one strong match)
 */
export async function findBestPattern(
  industry: string,
  mood: string,
  prompt?: string
): Promise<StoredPattern | null> {
  const supabase = createServerClient();

  const { data: patterns, error } = await supabase
    .from("design_patterns")
    .select("*");

  if (error || !patterns || patterns.length === 0) {
    return null;
  }

  const industryLower = industry.toLowerCase();
  const moodLower = mood.toLowerCase();
  const moodWords = moodLower.split(/[\s,]+/).filter(Boolean);
  const promptLower = (prompt || "").toLowerCase();

  let bestScore = 0;
  let bestPattern: StoredPattern | null = null;

  for (const row of patterns) {
    let score = 0;

    // Industry matching from dropdown (3 points per match)
    for (const ind of row.industries) {
      if (industryLower.includes(ind) || ind.includes(industryLower)) {
        score += 3;
      }
    }

    // Industry matching from prompt text (3 points per match)
    // This catches cases like "give me a saas web site" where the dropdown is "general"
    if (promptLower) {
      for (const ind of row.industries) {
        // Use word boundary check to avoid false matches (e.g. "air" in "repair")
        const wordRegex = new RegExp(`\\b${ind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "i");
        if (wordRegex.test(promptLower)) {
          score += 3;
        }
      }
    }

    // Mood matching (2 points per match)
    for (const m of row.moods) {
      for (const mw of moodWords) {
        if (m.includes(mw) || mw.includes(m)) {
          score += 2;
        }
      }
    }

    // Mood matching from prompt text (2 points per match)
    if (promptLower) {
      for (const m of row.moods) {
        const wordRegex = new RegExp(`\\b${m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "i");
        if (wordRegex.test(promptLower)) {
          score += 2;
        }
      }
    }

    // Color mode bonus (1 point)
    // Dark moods match dark patterns, light moods match light patterns
    const darkMoods = ["dark", "bold", "cinematic", "moody", "dramatic", "neon"];
    const lightMoods = ["clean", "minimal", "friendly", "warm", "soft", "elegant"];
    const userWantsDark = darkMoods.some((d) => moodLower.includes(d));
    const userWantsLight = lightMoods.some((l) => moodLower.includes(l));

    if (
      (userWantsDark && row.color_mode === "dark") ||
      (userWantsLight && row.color_mode === "light") ||
      (!userWantsDark && !userWantsLight) // no preference = any matches
    ) {
      score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestPattern = rowToPattern(row);
    }
  }

  // Minimum score of 3 — at least one strong industry match
  if (bestScore < 3) {
    return null;
  }

  return bestPattern;
}

/**
 * List all patterns in the library.
 */
export async function listDesignPatterns(): Promise<StoredPattern[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("design_patterns")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(rowToPattern);
}

/**
 * Delete a pattern by ID.
 */
export async function deleteDesignPattern(id: string): Promise<boolean> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("design_patterns")
    .delete()
    .eq("id", id);
  return !error;
}

// ── Helpers ─────────────────────────────────────────────────────────

function rowToPattern(row: {
  id: string;
  name: string;
  industries: string[];
  moods: string[];
  color_mode: string;
  brief_json: Record<string, unknown>;
  created_at: string;
}): StoredPattern {
  return {
    id: row.id,
    name: row.name,
    industries: row.industries,
    moods: row.moods,
    colorMode: row.color_mode,
    brief: row.brief_json as unknown as DesignBrief,
    createdAt: row.created_at,
  };
}
