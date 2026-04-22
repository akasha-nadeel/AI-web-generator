import { createServerClient } from "./server";
import { randomUUID } from "crypto";

export const USER_UPLOADS_BUCKET = "user-uploads";

// Create the bucket on first use. Idempotent — if it already exists,
// Supabase returns a 409 which we swallow. Runs at most once per cold start.
let bucketEnsured = false;
async function ensureBucket(): Promise<void> {
  if (bucketEnsured) return;
  const supabase = createServerClient();
  const { error } = await supabase.storage.createBucket(USER_UPLOADS_BUCKET, {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024, // 5 MB
    allowedMimeTypes: [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/gif",
    ],
  });
  // error is null on create or exists on "already exists" — either is fine.
  if (error && !/already exists|duplicate/i.test(error.message)) {
    console.warn(`[storage] createBucket(${USER_UPLOADS_BUCKET}) warning:`, error.message);
  }
  bucketEnsured = true;
}

export interface UploadResult {
  publicUrl: string;
  path: string;
}

/**
 * Upload a base64-encoded image to the user-uploads bucket.
 * Returns the public URL on success, null on failure.
 *
 * Path layout: `<userId>/<siteId>/<uuid>.<ext>`
 * Keeping files scoped by user+site makes it easy to clean up later
 * if a user deletes a site or we need to enforce per-user quotas.
 */
export async function uploadUserImage(opts: {
  userId: string;
  siteId?: string | null;
  base64: string;
  mimeType: string;
}): Promise<UploadResult | null> {
  const { userId, siteId, base64, mimeType } = opts;
  try {
    await ensureBucket();
    const supabase = createServerClient();

    const ext =
      mimeType === "image/jpeg" ? "jpg" : mimeType.split("/")[1] || "png";
    const path = `${userId}/${siteId ?? "loose"}/${randomUUID()}.${ext}`;
    const buffer = Buffer.from(base64, "base64");

    const { error: uploadError } = await supabase.storage
      .from(USER_UPLOADS_BUCKET)
      .upload(path, buffer, {
        contentType: mimeType,
        upsert: false,
        cacheControl: "public, max-age=31536000, immutable",
      });

    if (uploadError) {
      console.error("[storage] upload failed:", uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from(USER_UPLOADS_BUCKET).getPublicUrl(path);
    const publicUrl = data.publicUrl;

    // Best-effort audit row in the existing uploads table. Failure doesn't
    // block the response — the actual file is already stored.
    supabase
      .from("uploads")
      .insert({
        user_id: userId,
        file_url: publicUrl,
        file_type: mimeType,
        original_name: null,
      })
      .then(({ error }) => {
        if (error) console.warn("[storage] uploads-log insert failed:", error.message);
      });

    return { publicUrl, path };
  } catch (err) {
    console.error("[storage] upload threw:", err);
    return null;
  }
}
