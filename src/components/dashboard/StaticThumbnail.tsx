"use client";

import { Globe } from "lucide-react";

const INDUSTRY_GRADIENTS: Record<string, string> = {
  restaurant: "linear-gradient(135deg, #F97316 0%, #BE185D 100%)",
  portfolio: "linear-gradient(135deg, #0F172A 0%, #475569 100%)",
  agency: "linear-gradient(135deg, #18181B 0%, #3F3F46 100%)",
  ecommerce: "linear-gradient(135deg, #6366F1 0%, #C026D3 100%)",
  blog: "linear-gradient(135deg, #0EA5E9 0%, #0F172A 100%)",
  fitness: "linear-gradient(135deg, #DC2626 0%, #18181B 100%)",
  realestate: "linear-gradient(135deg, #1E40AF 0%, #0F172A 100%)",
  saas: "linear-gradient(135deg, #6366F1 0%, #0EA5E9 100%)",
  education: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
  photography: "linear-gradient(135deg, #18181B 0%, #4B5563 100%)",
  medical: "linear-gradient(135deg, #0E7490 0%, #1E40AF 100%)",
  nonprofit: "linear-gradient(135deg, #16A34A 0%, #0E7490 100%)",
  music: "linear-gradient(135deg, #E63838 0%, #18181B 100%)",
  events: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
  travel: "linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)",
  beauty: "linear-gradient(135deg, #F472B6 0%, #C026D3 100%)",
  automotive: "linear-gradient(135deg, #0F172A 0%, #F97316 100%)",
};

const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #6366F1 0%, #C026D3 100%)",
  "linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)",
  "linear-gradient(135deg, #F97316 0%, #BE185D 100%)",
  "linear-gradient(135deg, #16A34A 0%, #0E7490 100%)",
  "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
  "linear-gradient(135deg, #DC2626 0%, #18181B 100%)",
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function gradientFor(site: { id: string; industry: string | null }): string {
  if (site.industry && INDUSTRY_GRADIENTS[site.industry]) {
    return INDUSTRY_GRADIENTS[site.industry];
  }
  const idx = hashStr(site.id) % FALLBACK_GRADIENTS.length;
  return FALLBACK_GRADIENTS[idx];
}

type Variant = "card" | "row" | "small";

type Props = {
  site: { id: string; name: string; industry: string | null };
  variant?: Variant;
  className?: string;
  style?: React.CSSProperties;
};

export function StaticThumbnail({
  site,
  variant = "card",
  className,
  style,
}: Props) {
  const gradient = gradientFor(site);

  if (variant === "row" || variant === "small") {
    // Tiny version for list rows — no overlay text, just the gradient + globe
    return (
      <div
        className={className}
        style={{
          background: gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          ...style,
        }}
      >
        <Globe className="w-3 h-3 text-white/60" />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        background: gradient,
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "16px 18px",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Subtle radial highlight for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.18) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", color: "#FFFFFF" }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textShadow: "0 2px 8px rgba(0,0,0,0.25)",
          }}
        >
          {site.name}
        </h3>
        {site.industry && (
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.85,
              marginTop: 6,
            }}
          >
            {site.industry}
          </div>
        )}
      </div>
    </div>
  );
}
