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
  const { balance, refresh } = useCreditsStore();

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

  return (
    <Link
      href="/billing"
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        empty
          ? "border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20"
          : low
            ? "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
            : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white",
        className
      )}
      title={
        empty
          ? "You're out of credits — click to buy more"
          : low
            ? `Only ${balance} credits left — click to top up`
            : `${balance} credits remaining`
      }
    >
      <Zap className={cn("h-3.5 w-3.5", !empty && !low && "text-purple-400 group-hover:text-purple-300")} />
      {compact ? <span>{balance}</span> : <span>{balance} credits</span>}
    </Link>
  );
}
