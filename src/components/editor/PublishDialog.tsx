"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink, Globe, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PUBLISH_APEX, publicUrlFor } from "@/lib/publishing/urls";

type Props = {
  siteId: string;
  currentSubdomain: string | null;
  open: boolean;
  onClose: () => void;
  onPublished: (subdomain: string) => void;
  onUnpublished: () => void;
};

type AvailabilityState =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "ok"; normalized: string }
  | { status: "bad"; reason: string };

export function PublishDialog({
  siteId,
  currentSubdomain,
  open,
  onClose,
  onPublished,
  onUnpublished,
}: Props) {
  const [slug, setSlug] = useState(currentSubdomain || "");
  const [availability, setAvailability] = useState<AvailabilityState>({ status: "idle" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset state when reopened so the form reflects current subdomain.
  useEffect(() => {
    if (open) {
      setSlug(currentSubdomain || "");
      setAvailability({ status: "idle" });
      setError(null);
      setCopied(false);
    }
  }, [open, currentSubdomain]);

  // Debounced availability check.
  useEffect(() => {
    if (!open) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = slug.trim().toLowerCase();
    if (!trimmed) {
      setAvailability({ status: "idle" });
      return;
    }
    if (trimmed === currentSubdomain) {
      setAvailability({ status: "ok", normalized: trimmed });
      return;
    }

    setAvailability({ status: "checking" });
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/sites/subdomain-available?slug=${encodeURIComponent(trimmed)}&siteId=${siteId}`
        );
        const data = await res.json();
        if (data.available) {
          setAvailability({ status: "ok", normalized: data.normalized });
        } else {
          setAvailability({ status: "bad", reason: data.reason || "Unavailable." });
        }
      } catch {
        setAvailability({ status: "bad", reason: "Check failed — try again." });
      }
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [slug, siteId, currentSubdomain, open]);

  const canPublish =
    availability.status === "ok" && !submitting && slug.trim().length >= 3;

  async function handlePublish() {
    if (!canPublish) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/sites/${siteId}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subdomain: slug.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Publish failed.");
        return;
      }
      onPublished(data.subdomain);
    } catch {
      setError("Publish failed.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUnpublish() {
    if (!currentSubdomain) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/sites/${siteId}/unpublish`, { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Unpublish failed.");
        return;
      }
      onUnpublished();
    } catch {
      setError("Unpublish failed.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleCopy() {
    if (!currentSubdomain) return;
    navigator.clipboard.writeText(publicUrlFor(currentSubdomain)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  if (!open) return null;

  const liveUrl = currentSubdomain ? publicUrlFor(currentSubdomain) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-[#15151a] border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-semibold">
              {liveUrl ? "Your site is live" : "Publish site"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {liveUrl && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between gap-3">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-emerald-300 hover:text-emerald-200 flex items-center gap-1.5 truncate"
              >
                <span className="truncate">{liveUrl}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
              <button
                onClick={handleCopy}
                className="shrink-0 p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground"
                aria-label="Copy link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">
              {liveUrl ? "Change subdomain" : "Pick a subdomain"}
            </label>
            <div className="flex items-stretch rounded-lg bg-white/[0.04] border border-white/10 overflow-hidden focus-within:border-purple-500/50">
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="my-business"
                spellCheck={false}
                autoCapitalize="none"
                className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
              />
              <div className="flex items-center px-3 text-xs text-muted-foreground bg-white/[0.03] border-l border-white/10">
                .{PUBLISH_APEX}
              </div>
            </div>
            <div className="mt-1.5 h-4 text-xs">
              {availability.status === "checking" && (
                <span className="text-muted-foreground flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Checking…
                </span>
              )}
              {availability.status === "ok" && (
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Available
                </span>
              )}
              {availability.status === "bad" && (
                <span className="text-red-400">{availability.reason}</span>
              )}
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300">
              {error}
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handlePublish}
              disabled={!canPublish}
              className={cn(
                "flex-1 h-9 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2",
                canPublish
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
                  : "bg-white/5 text-muted-foreground cursor-not-allowed"
              )}
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {liveUrl
                ? slug.trim().toLowerCase() === currentSubdomain
                  ? "Re-publish"
                  : "Update URL"
                : "Publish"}
            </button>
            {liveUrl && (
              <button
                onClick={handleUnpublish}
                disabled={submitting}
                className="h-9 px-3 rounded-lg text-sm text-red-300 hover:bg-red-500/10 disabled:opacity-50"
              >
                Unpublish
              </button>
            )}
          </div>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Free sites include 10 GB of monthly bandwidth. Upgrade for 100 GB.
          </p>
        </div>
      </div>
    </div>
  );
}
