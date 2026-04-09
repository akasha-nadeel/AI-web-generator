"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black overflow-hidden">
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
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-2.5 p-10">
          <span className="text-xl font-bold text-white tracking-tight">Weavo</span>
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
        className="flex-1 flex items-center justify-center bg-black p-6 lg:p-10 min-h-screen lg:min-h-0 relative"
      >
        {/* Skeleton placeholder while Clerk loads */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-md px-6 space-y-6 animate-pulse">
            <div><div className="h-7 w-56 bg-white/10 rounded mb-2" /><div className="h-4 w-72 bg-white/5 rounded" /></div>
            <div className="h-11 w-full bg-white/5 rounded-lg" />
            <div className="h-px bg-white/5" />
            <div className="space-y-4"><div className="h-4 w-24 bg-white/10 rounded" /><div className="h-11 w-full bg-white/5 rounded-lg" /><div className="h-4 w-20 bg-white/10 rounded" /><div className="h-11 w-full bg-white/5 rounded-lg" /></div>
            <div className="h-11 w-full bg-white/10 rounded-lg" />
          </div>
        </div>
        <SignUp
          forceRedirectUrl="/dashboard"
          appearance={{
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
              card: "!bg-black shadow-none border-0 p-0 w-full",
              headerTitle: "!text-white text-2xl font-bold",
              headerSubtitle: "!text-white/50",
              socialButtonsBlockButton:
                "!bg-white/[0.05] !border !border-white/[0.1] !text-white hover:!bg-white/[0.1] transition-colors",
              socialButtonsBlockButtonText: "!text-white",
              formFieldLabel: "!text-white font-semibold text-sm",
              formFieldInput:
                "!bg-white/[0.05] !border !border-white/[0.1] !text-white !placeholder-white/30 rounded-lg focus:!border-purple-400",
              footerActionLink: "!text-purple-400 hover:!text-purple-300 font-medium",
              formButtonPrimary:
                "!bg-white hover:!bg-white/90 !text-black rounded-lg font-medium transition-colors !shadow-none",
              dividerLine: "!bg-white/[0.1]",
              dividerText: "!text-white/30",
              footer: "!bg-black [&>*]:!bg-black",
              footerActionText: "!text-white/50",
              formFieldInputShowPasswordButton: "!text-white/50 hover:!text-white",
              cardBox: "!bg-black !shadow-none",
              main: "!bg-black",
              form: "!bg-black",
              formField: "!bg-black",
              internal: "!bg-black",
              identityPreview: "!bg-white/[0.05] !border-white/[0.1]",
              identityPreviewText: "!text-white",
              identityPreviewEditButton: "!text-purple-400",
              formFieldAction: "!text-purple-400",
              alertText: "!text-white/70",
              footerAction: "!bg-black !border-t !border-white/[0.08]",
              footerPages: "!bg-black",
              footerPagesLink: "!text-white/50",
            },
          }}
        />
      </motion.div>
    </div>
  );
}
