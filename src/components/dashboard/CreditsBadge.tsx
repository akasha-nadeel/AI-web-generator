"use client";

import { Zap } from "lucide-react";

interface CreditsBadgeProps {
  remaining: number;
  total: number;
}

export function CreditsBadge({ remaining, total }: CreditsBadgeProps) {
  const percentage = (remaining / total) * 100;

  return (
    <div className="glass-card px-4 py-3 flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
        <Zap className="w-4 h-4 text-yellow-400" />
      </div>
      <div>
        <p className="text-sm font-medium">
          {remaining} / {total} credits
        </p>
        <div className="w-24 h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
