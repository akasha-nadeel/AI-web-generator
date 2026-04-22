"use client";

import Link from "next/link";
import { MoreVertical, Edit, Download, Trash2, Globe } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SiteCardProps {
  site: {
    id: string;
    name: string;
    industry: string | null;
    status: string;
    created_at: string;
    updated_at: string;
  };
  onDelete: (id: string) => void;
}

export function SiteCard({ site, onDelete }: SiteCardProps) {
  const formattedDate = new Date(site.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <GlassCard className="group relative transition-colors duration-300">
      {/* Preview area */}
      <Link href={`/editor/${site.id}`} className="block">
        <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/5 border border-border mb-4 flex items-center justify-center overflow-hidden">
          <Globe className="w-8 h-8 text-foreground/20" />
        </div>
      </Link>

      {/* Info */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-sm text-foreground">{site.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {site.industry && <span className="capitalize">{site.industry}</span>}
            {site.industry && " · "}
            {formattedDate}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="text-xs capitalize bg-foreground/5 border-border"
          >
            {site.status}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 hover:bg-foreground/10 rounded transition-colors">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card border-border">
              <DropdownMenuItem asChild>
                <Link href={`/editor/${site.id}`} className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/editor/${site.id}?export=true`} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(site.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </GlassCard>
  );
}
