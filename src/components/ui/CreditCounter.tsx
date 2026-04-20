"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { useCreditsStore } from "@/stores/creditsStore";
import { cn } from "@/lib/utils";

interface CreditCounterProps {
  /** Show compact `⚡ N` badge vs. full `N credits` text. */
  compact?: boolean;
  className?: string;
}

export function CreditCounter({ compact = false, className }: CreditCounterProps) {
  const { balance, plan, refresh } = useCreditsStore();

  useEffect(() => {
    if (balance === null) refresh();
  }, [balance, refresh]);

  if (balance === null) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/40",
          className
        )}
      >
        <Zap className="h-3.5 w-3.5" />
        <span>—</span>
      </div>
    );
  }

  const low = balance <= 10;
  const empty = balance <= 0;

  if (compact) {
    return (
      <Link
        href="/billing"
        className={cn(
          "group inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all",
          empty
            ? "border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20"
            : low
              ? "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
              : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
          className
        )}
      >
        <Zap className={cn("h-3 w-3", !empty && !low && "text-amber-400")} />
        <span>{balance}</span>
      </Link>
    );
  }

  return (
    <Link
      href="/billing"
      className={cn(
        "group flex items-center gap-3 rounded-[20px] border border-white/[0.08] bg-[#0d0d0d] pl-1.5 pr-5 py-1.5 transition-all hover:bg-white/[0.04] hover:border-white/15",
        className
      )}
    >
      {/* Icon Circle */}
      <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
        <Zap className="h-4.5 w-4.5 text-amber-400" fill="currentColor" />
      </div>

      {/* Text column */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-tight">
          <span className="text-sm font-bold text-white tracking-tight">
            {balance}
          </span>
          <span className="text-sm font-bold text-white tracking-tight">
            credits
          </span>
        </div>
        <div className="text-[11px] font-medium text-blue-400/80 leading-tight capitalize">
          {plan} Plan
        </div>
      </div>
    </Link>
  );
}
