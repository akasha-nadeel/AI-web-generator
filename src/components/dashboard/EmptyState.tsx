"use client";

import { Sparkles } from "lucide-react";
import { GradientButton } from "@/components/shared/GradientButton";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 flex items-center justify-center mb-6">
        <Sparkles className="w-10 h-10 text-purple-400" />
      </div>
      <h2 className="text-2xl font-bold mb-2">No websites yet</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Create your first AI-generated website in seconds. Just describe your
        business and let Weavo handle the rest.
      </p>
      <GradientButton href="/wizard" size="lg">
        <Sparkles className="w-5 h-5" />
        Create Your First Website
      </GradientButton>
    </div>
  );
}
