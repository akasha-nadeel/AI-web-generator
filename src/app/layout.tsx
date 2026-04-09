import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Weavo — AI Website Generator",
    template: "%s | Weavo",
  },
  description:
    "Generate stunning websites in seconds with AI. Describe your business, pick your style, and let Weavo build your dream website.",
  keywords: [
    "AI website generator",
    "website builder",
    "AI",
    "SaaS",
    "no-code",
    "Weavo",
    "website creator",
  ],
  openGraph: {
    title: "Weavo — AI Website Generator",
    description:
      "Generate stunning websites in seconds with AI. No coding required.",
    type: "website",
    siteName: "Weavo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weavo — AI Website Generator",
    description:
      "Generate stunning websites in seconds with AI. No coding required.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className={`${inter.variable} dark h-full antialiased`}>
        <body className="min-h-full flex flex-col bg-background text-foreground">
          {children}
          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
