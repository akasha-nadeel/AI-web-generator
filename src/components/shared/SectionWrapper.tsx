"use client";

import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import { fadeUp, ease, viewport as vp } from "@/lib/animations";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variants?: Variants;
}

export function SectionWrapper({
  children,
  className,
  id,
  variants = fadeUp,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      variants={variants}
      transition={ease.smooth}
      className={cn("py-14 md:py-20 lg:py-28 px-4 md:px-6", className)}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </motion.section>
  );
}
