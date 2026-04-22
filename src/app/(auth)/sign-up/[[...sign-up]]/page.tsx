"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-foreground transition-colors duration-500 overflow-hidden">
      {/* Left Panel - Branding */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col"
      >
        <Image
          src="/images/auth-left-bg.png"
          alt="Weavo"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay — Adjusted for light mode for cleaner branding */}
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? "from-black/60 via-black/20" : "from-black/40 via-transparent"} to-transparent transition-colors duration-500`} />

        {/* Brand */}
        <div className="absolute top-6 left-8 z-20 flex items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Weavo Logo" className="h-6 w-auto object-contain opacity-95" />
        </div>

        {/* Headline */}
        <div className="relative z-10 mt-auto p-10 max-w-md">
          <h1 className="text-3xl font-bold text-white leading-tight mb-3">
            Build stunning websites with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              AI power
            </span>{" "}
            on Weavo now.
          </h1>
          <p className="text-white/70 text-sm leading-relaxed">
            Describe your business, pick your style, and let AI build your dream website in seconds.
          </p>
        </div>
      </motion.div>

      {/* Right Panel - Sign Up Form */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        className="flex-1 flex items-center justify-center bg-background p-6 lg:p-10 min-h-screen lg:min-h-0 relative transition-colors duration-500"
      >
        {mounted && (
          <SignUp
            forceRedirectUrl="/dashboard"
            appearance={isDark ? {
              variables: {
                colorBackground: "#000000",
                colorText: "#ffffff",
                colorTextSecondary: "rgba(255,255,255,0.5)",
                colorInputBackground: "rgba(255,255,255,0.05)",
                colorInputText: "#ffffff",
                colorPrimary: "#a855f7",
                colorNeutral: "#ffffff",
                borderRadius: "0.5rem",
              },
              elements: {
                rootBox: "mx-auto w-full max-w-md relative z-10",
                card: "!bg-transparent shadow-none border-0 p-0 w-full",
                headerTitle: "text-2xl font-bold",
                socialButtonsBlockButton: "transition-colors !shadow-none",
                formButtonPrimary: "!bg-foreground hover:opacity-90 !text-background rounded-lg font-medium transition-colors !shadow-none",
                dividerLine: "opacity-10",
                dividerText: "opacity-40",
                footer: "!bg-transparent",
                footerAction: "!bg-transparent !border-t !border-foreground/5",
                cardBox: "!bg-transparent !shadow-none",
                main: "!bg-transparent",
                form: "!bg-transparent",
                formField: "!bg-transparent",
                internal: "!bg-transparent",
                identityPreview: "bg-foreground/5 border-foreground/10",
                footerPages: "!bg-transparent",
              },
            } : {
              // Use default Clerk light theme but make primary button black
              variables: {
                colorPrimary: "#000000",
              },
              elements: {
                formButtonPrimary: "bg-black hover:bg-black/90 text-white transition-colors",
              }
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
