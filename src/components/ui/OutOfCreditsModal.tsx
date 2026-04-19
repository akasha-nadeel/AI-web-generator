"use client";

import Link from "next/link";
import { X, Zap, Lock } from "lucide-react";
import { useCreditsStore } from "@/stores/creditsStore";
import { CREDIT_PACKS } from "@/lib/constants";

export function OutOfCreditsModal() {
  const { outOfCredits, closeOutOfCredits } = useCreditsStore();

  if (!outOfCredits) return null;

  const { required, balance } = outOfCredits;
  const short = required - balance;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={closeOutOfCredits}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeOutOfCredits}
          className="absolute right-4 top-4 rounded-full p-1.5 text-white/40 hover:bg-white/5 hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
          <Zap className="h-7 w-7 text-red-400" />
        </div>

        <h2 className="text-center text-2xl font-semibold text-white">
          Not enough credits
        </h2>
        <p className="mt-2 text-center text-sm text-white/60">
          This generation needs{" "}
          <span className="font-semibold text-white">{required}</span> credits. You have{" "}
          <span className="font-semibold text-white">{balance}</span>.
        </p>
        <p className="mt-1 text-center text-xs text-white/40">
          You&apos;re short by {short} {short === 1 ? "credit" : "credits"}.
        </p>

        <div className="mt-6 space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-white/40">
            Top up with a credit pack
          </p>
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{pack.name}</span>
                  {pack.popular && (
                    <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-purple-300">
                      Popular
                    </span>
                  )}
                </div>
                <div className="text-xs text-white/50">{pack.credits} credits</div>
              </div>
              <div className="text-sm font-semibold text-white">${pack.price}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <button
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium text-white/50 cursor-not-allowed"
            title="Payments coming soon"
          >
            <Lock className="h-4 w-4" />
            Buy credits (coming soon)
          </button>
          <Link
            href="/billing"
            onClick={closeOutOfCredits}
            className="block w-full rounded-lg border border-white/10 px-4 py-3 text-center text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
          >
            View billing
          </Link>
        </div>
      </div>
    </div>
  );
}
