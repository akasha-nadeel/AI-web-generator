"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { zoomIn, fadeUp, ease, viewport as vp } from "@/lib/animations";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-white/[0.06]"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={zoomIn}
          transition={ease.slow}
        >
          {/* Left — Image + Info */}
          <div className="relative min-h-[500px] lg:min-h-0 bg-[#1a1a2e] overflow-hidden">
            <img
              src="/images/contact-watch.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/30 to-transparent" />
            <div className="absolute inset-0 bg-[#0a0a0a]/20" />

            <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
              {/* Top */}
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
                  Get in Touch
                </h2>
                <p className="text-white/50 text-sm max-w-sm leading-relaxed">
                  Have a question or want to work together? We&apos;d love to hear from you.
                </p>
              </div>

              {/* Bottom — Contact info */}
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white/70" />
                  </div>
                  <span className="text-sm text-white/60">support@weavo.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white/70" />
                  </div>
                  <span className="text-sm text-white/60">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white/70" />
                  </div>
                  <span className="text-sm text-white/60">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-[#111] p-8 md:p-10">
            <h3 className="text-xl font-semibold text-white mb-1">Send us a message</h3>
            <p className="text-sm text-white/40 mb-8">Fill in the details below and we&apos;ll get back to you shortly.</p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-white/50 mb-1.5 block">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/50 mb-1.5 block">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-white/50 mb-1.5 block">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-white/50 mb-1.5 block">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-6 py-3.5 rounded-lg hover:bg-white/90 transition-colors text-sm"
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
