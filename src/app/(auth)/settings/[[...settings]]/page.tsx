"use client";

import { UserProfile } from "@clerk/nextjs";
import { AuthNavbar } from "@/components/dashboard/AuthNavbar";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AuthNavbar />
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-card/80 backdrop-blur-xl border border-white/10 shadow-none w-full",
            },
          }}
        />
      </main>
    </div>
  );
}
