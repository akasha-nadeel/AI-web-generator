import type { Variants } from "framer-motion";

// ── Fade variants ──
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

// ── Zoom variants ──
export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
};

export const zoomOut: Variants = {
  hidden: { opacity: 0, scale: 1.15 },
  visible: { opacity: 1, scale: 1 },
};

// ── Flip variants ──
export const flipUp: Variants = {
  hidden: { opacity: 0, rotateX: 30, y: 30 },
  visible: { opacity: 1, rotateX: 0, y: 0 },
};

export const flipLeft: Variants = {
  hidden: { opacity: 0, rotateY: -20, x: -30 },
  visible: { opacity: 1, rotateY: 0, x: 0 },
};

// ── Stagger container ──
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// ── Default transition presets ──
export const ease = {
  smooth: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  spring: { type: "spring" as const, stiffness: 100, damping: 15 },
  snappy: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  slow: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
};

// ── Viewport defaults ──
export const viewport = {
  once: true,
  margin: "-80px" as const,
};
