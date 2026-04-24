"use client";

import Link from "next/link";
import { ArrowRight, Check, Code2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
}

const BULLETS = [
  "Export sites as Next.js projects",
  "Own your code, deploy anywhere",
  "Customize freely in your own IDE",
];

export function UpgradeModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#bef264] text-black">
              <Code2 className="h-4 w-4" />
            </div>
            <DialogTitle>Export to Next.js is a Pro feature</DialogTitle>
          </div>
          <DialogDescription>Get the full Weavo experience:</DialogDescription>
        </DialogHeader>

        <ul className="flex flex-col gap-2 text-sm">
          {BULLETS.map((text) => (
            <li key={text} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#bef264]" />
              <span className="text-foreground/90">{text}</span>
            </li>
          ))}
        </ul>

        <DialogFooter className="sm:justify-end">
          <Button variant="ghost" onClick={onClose}>
            Maybe later
          </Button>
          <Button asChild>
            <Link href="/billing" onClick={onClose}>
              See Pricing
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
