"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
}

export function GradientButton({
  children,
  className,
  href,
  onClick,
  size = "md",
  variant = "primary",
  type = "button",
}: GradientButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105",
    secondary:
      "glass-card text-white hover:bg-white/10",
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer",
    sizes[size],
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
