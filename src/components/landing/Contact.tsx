"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { zoomIn, fadeUp, ease, viewport as vp } from "@/lib/animations";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-border"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={zoomIn}
          transition={ease.slow}
        >
          {/* Left — Image + Info */}
          <div className="relative min-h-[380px] sm:min-h-[500px] lg:min-h-0 bg-muted overflow-hidden">
            <Image
              src="/images/contact-watch.png"
              alt=""
              fill
              className="object-cover scale-110"
            />
            {/* Gradient overlays — Dark mode only for depth and readability */}
            <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
            <div className="hidden dark:block absolute inset-0 bg-background/20" />

            <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
              {/* Top */}
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-foreground mb-3">
                  Get in Touch
                </h2>
                <p className="text-foreground/50 text-sm max-w-sm leading-relaxed">
                  Have a question or want to work together? We&apos;d love to hear from you.
                </p>
              </div>

              {/* Bottom — Contact info */}
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-foreground/70" />
                  </div>
                  <span className="text-sm text-foreground/60">support@weavo.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-foreground/70" />
                  </div>
                  <span className="text-sm text-foreground/60">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-foreground/70" />
                  </div>
                  <span className="text-sm text-foreground/60">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-card p-8 md:p-10">
            <h3 className="text-xl font-semibold text-foreground mb-1">Send us a message</h3>
            <p className="text-sm text-foreground/40 mb-8">Fill in the details below and we&apos;ll get back to you shortly.</p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground/50 mb-1.5 block">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full bg-foreground/[0.06] border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-foreground/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground/50 mb-1.5 block">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-foreground/[0.06] border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-foreground/20 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground/50 mb-1.5 block">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-foreground/[0.06] border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-foreground/20 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground/50 mb-1.5 block">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-foreground/[0.06] border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-foreground/20 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background font-semibold px-6 py-3.5 rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
