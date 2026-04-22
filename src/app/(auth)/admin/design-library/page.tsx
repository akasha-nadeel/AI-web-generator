"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Upload,
  Trash2,
  Image as ImageIcon,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

interface Pattern {
  id: string;
  name: string;
  industries: string[];
  moods: string[];
  colorMode: string;
  createdAt: string;
}

interface StagedImage {
  file: File;
  dataUrl: string;
}

export default function DesignLibraryAdminPage() {
  const { user, isLoaded } = useUser();
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [name, setName] = useState("");
  const [industries, setIndustries] = useState("");
  const [moods, setMoods] = useState("");
  const [images, setImages] = useState<StagedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "success"; message: string }
    | { kind: "error"; message: string }
  >({ kind: "idle" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPatterns = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await fetch("/api/ai/design-library");
      const data = await res.json();
      if (res.ok) setPatterns(data.patterns ?? []);
    } catch {
      // soft-fail the list; the form still works
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && user) fetchPatterns();
  }, [isLoaded, user, fetchPatterns]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newItems: Promise<StagedImage>[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      newItems.push(
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ file, dataUrl: reader.result as string });
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        })
      );
    }
    Promise.all(newItems).then((items) => setImages((prev) => [...prev, ...items]));
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const parseCSV = (s: string): string[] =>
    s
      .split(/[,\n]+/)
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean);

  const handleSubmit = async () => {
    setStatus({ kind: "idle" });
    const industriesArr = parseCSV(industries);
    const moodsArr = parseCSV(moods);

    if (!name.trim()) {
      setStatus({ kind: "error", message: "Name is required" });
      return;
    }
    if (industriesArr.length === 0) {
      setStatus({ kind: "error", message: "At least one industry tag is required" });
      return;
    }
    if (moodsArr.length === 0) {
      setStatus({ kind: "error", message: "At least one mood tag is required" });
      return;
    }
    if (images.length === 0) {
      setStatus({ kind: "error", message: "Upload at least one screenshot" });
      return;
    }

    setUploading(true);
    try {
      const payload = {
        name: name.trim(),
        industries: industriesArr,
        moods: moodsArr,
        images: images.map((img) => ({ data: img.dataUrl, type: img.file.type })),
      };
      const res = await fetch("/api/ai/design-library", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ kind: "error", message: data?.error ?? `Upload failed (${res.status})` });
        return;
      }
      setStatus({ kind: "success", message: data.message ?? "Pattern uploaded" });
      setName("");
      setIndustries("");
      setMoods("");
      setImages([]);
      fetchPatterns();
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Upload failed",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, patternName: string) => {
    if (!confirm(`Delete pattern "${patternName}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch("/api/ai/design-library", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setPatterns((prev) => prev.filter((p) => p.id !== id));
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus({ kind: "error", message: data?.error ?? "Delete failed" });
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Dashboard</span>
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <h1 className="text-lg font-semibold">Design Library Admin</h1>
        </div>
        <div className="text-sm text-zinc-400">
          {user?.primaryEmailAddress?.emailAddress}
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-8 space-y-12">
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Upload reference pattern</h2>
            <p className="text-sm text-zinc-400">
              Drop screenshots, tag them, and submit. Extraction runs via Claude and saves to the library.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">Pattern name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Stronger Gym Fitness"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
                  Industries (comma-separated)
                </label>
                <input
                  type="text"
                  value={industries}
                  onChange={(e) => setIndustries(e.target.value)}
                  placeholder="gym, fitness, sports, training"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition"
                />
                <p className="text-xs text-zinc-500 mt-1">
                  Add multiple synonyms — they all count toward the matcher.
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
                  Moods (comma-separated)
                </label>
                <input
                  type="text"
                  value={moods}
                  onChange={(e) => setMoods(e.target.value)}
                  placeholder="bold, dark, energetic, cinematic"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">Screenshots</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFiles(e.dataTransfer.files);
                }}
                className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center cursor-pointer hover:border-white/30 transition"
              >
                <Upload className="w-8 h-8 mx-auto text-zinc-400 mb-2" />
                <p className="text-sm">Drop images or click to browse</p>
                <p className="text-xs text-zinc-500 mt-1">Full-page screenshots work best</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group aspect-video bg-white/5 rounded overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.dataUrl} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {status.kind === "success" && (
            <div className="flex items-start gap-2 px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{status.message}</span>
            </div>
          )}
          {status.kind === "error" && (
            <div className="flex items-start gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Extracting design DNA…
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload to library
              </>
            )}
          </button>
        </section>

        <section className="space-y-4 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Current library ({patterns.length})</h2>
          </div>

          {listLoading ? (
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading…
            </div>
          ) : patterns.length === 0 ? (
            <div className="text-zinc-500 text-sm flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              No patterns uploaded yet.
            </div>
          ) : (
            <div className="grid gap-3">
              {patterns.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start justify-between gap-4 p-4 bg-white/5 border border-white/10 rounded-lg"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold truncate">{p.name}</h3>
                      <span className="text-xs px-2 py-0.5 bg-white/10 rounded">{p.colorMode}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {p.industries.map((ind) => (
                        <span key={ind} className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded">
                          {ind}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.moods.map((m) => (
                        <span key={m} className="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-300 rounded">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    disabled={deletingId === p.id}
                    className="p-2 text-zinc-400 hover:text-red-400 transition disabled:opacity-50"
                    title="Delete pattern"
                  >
                    {deletingId === p.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
