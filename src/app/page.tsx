import { Navbar } from "@/components/landing/Navbar";
import { AnnouncementBanner } from "@/components/shared/AnnouncementBanner";
import { Hero } from "@/components/landing/Hero";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { VideoDemo } from "@/components/landing/VideoDemo";
import { Features } from "@/components/landing/Features";
import { PricingCards } from "@/components/landing/PricingCards";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { FAQ } from "@/components/landing/FAQ";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <VideoDemo />
        <Features />
        <Testimonials />
        <PricingCards />
        <CTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
