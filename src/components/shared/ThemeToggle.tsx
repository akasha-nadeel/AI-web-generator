"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-muted/20 animate-pulse" />
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white/10 dark:hover:bg-black/10 transition-colors border border-border group overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            y: theme === "dark" ? 0 : 30,
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 45
          }}
          transition={{ duration: 0.3, ease: "backOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-5 h-5 text-purple-400" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            y: theme === "light" ? 0 : -30,
            opacity: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : -45
          }}
          transition={{ duration: 0.3, ease: "backOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-amber-500" />
        </motion.div>
      </div>
    </motion.button>
  );
}
