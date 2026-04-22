"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { useCreditsStore } from "@/stores/creditsStore";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CreditCounterProps {
  /** Show compact `⚡ N` badge vs. full `N credits` text. */
  compact?: boolean;
  className?: string;
}

export function CreditCounter({ compact = false, className }: CreditCounterProps) {
  const { balance, plan, refresh } = useCreditsStore();
  const { user } = useUser();

  useEffect(() => {
    if (balance === null) refresh();
  }, [balance, refresh]);

  if (balance === null) {
    return (
      <div
        className={cn(
          "flex items-center gap-2.5 rounded-full border border-border bg-foreground/[0.02] pl-1 pr-1 h-9 animate-pulse",
          className
        )}
      >
        <div className="w-8 h-8 rounded-full bg-foreground/[0.04] shrink-0 ml-0.5" />
        <div className="flex flex-col pr-1 gap-1">
          <div className="h-3 bg-foreground/[0.06] rounded w-14" />
          <div className="h-2 bg-foreground/[0.04] rounded w-10" />
        </div>
        <div className="h-[28px] w-[28px] rounded-full bg-foreground/[0.06] shrink-0" />
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
          "group inline-flex items-center gap-1.5 rounded-full border pl-1 pr-0.5 py-0.5 text-xs font-medium transition-all",
          empty
            ? "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20"
            : low
              ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-300 hover:bg-amber-500/20"
              : "border-border bg-foreground/[0.05] text-foreground/80 hover:bg-foreground/[0.1]",
          className
        )}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-orange-500/15 border border-orange-500/20 flex items-center justify-center shrink-0">
            <Zap className={cn("h-3 w-3 fill-orange-500 text-orange-500", empty && "text-destructive fill-destructive")} />
          </div>
          <span className="pr-1">{balance}</span>
        </div>
        
        <Avatar size="sm" className="h-[20px] w-[20px] border border-border">
          <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
          <AvatarFallback className="bg-foreground/[0.08] text-[8px] text-foreground font-bold border-none">
            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </Link>
    );
  }

  return (
    <Link
      href="/billing"
      className={cn(
        "group flex items-center gap-2.5 rounded-full border border-border bg-card pl-1 pr-1 h-10 transition-all hover:bg-foreground/[0.04] hover:border-foreground/20",
        className
      )}
    >
      <div className="flex items-center gap-2.5 pl-0.5">
        {/* Icon Circle - Matched to avatar size */}
        <div className="w-[30px] h-[30px] rounded-full bg-orange-500/15 border border-orange-500/20 flex items-center justify-center shrink-0">
          <Zap className="w-[16px] h-[16px] fill-orange-500 text-orange-500" strokeWidth={2.5} />
        </div>

        {/* Text column */}
        <div className="flex flex-col pr-1">
          <div className="flex items-center gap-1 leading-tight">
            <span className="text-[14px] font-bold text-foreground tracking-tight">
              {balance}
            </span>
            <span className="text-[12px] font-bold text-foreground tracking-tight">
              credits
            </span>
          </div>
          <div className="text-[9px] font-bold text-blue-600 dark:text-blue-400 leading-tight uppercase tracking-wide">
            {plan} Plan
          </div>
        </div>
      </div>

      {/* Avatar - Exactly matched to icon size */}
      <div className="w-[30px] h-[30px] rounded-full border border-border overflow-hidden shrink-0">
        {user?.imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={user.imageUrl} alt={user?.fullName || "User"} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-foreground/[0.08] flex items-center justify-center text-[10px] text-foreground font-bold uppercase">
            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
      </div>
    </Link>
  );
}
