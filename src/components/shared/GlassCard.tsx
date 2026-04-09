"use client";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300",
        hover && "hover:bg-white/10 hover:border-white/15 hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
