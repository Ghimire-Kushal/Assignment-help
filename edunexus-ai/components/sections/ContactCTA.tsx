"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/shared/Button";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const trustPoints = [
  { emoji: "💳", text: "No credit card required" },
  { emoji: "🔄", text: "Free first revision" },
  { emoji: "⚡", text: "Results in as fast as 3 hours" },
  { emoji: "✅", text: "100% satisfaction guarantee" },
];

const studentAvatars = [
  { emoji: "👨‍💻", bg: "from-blue-500 to-indigo-600" },
  { emoji: "👩‍🎓", bg: "from-purple-500 to-violet-600" },
  { emoji: "👩‍⚕️", bg: "from-pink-500 to-rose-600" },
  { emoji: "🧮",   bg: "from-emerald-500 to-teal-600" },
  { emoji: "⚖️",   bg: "from-amber-500 to-orange-600" },
];

export function ContactCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-dark-800 to-purple-950/80" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          <div className="pointer-events-none absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[100px]" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-[400px] w-[400px] rounded-full bg-purple-500/15 blur-[100px]" />
          <div className="absolute inset-0 rounded-3xl border border-blue-500/25" />

          <div className="relative px-6 py-16 text-center sm:px-12 md:py-20 lg:px-20">

            {/* Student avatars */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex justify-center"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {studentAvatars.map(({ emoji, bg }, i) => (
                    <div key={i} className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${bg} border-2 border-background text-lg`}>
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex gap-0.5 mb-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">500+ happy students</p>
                </div>
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
              Nepal&apos;s most trusted academic support platform
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              Ready to{" "}
              <span className="gradient-text">Ace Your Next</span>
              <br />
              Assignment? 🎯
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Join 500+ students who stop stressing and start succeeding with ScholarSync Nepal.
              Start for free — your first revision is always on us, no questions asked.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.3, ease: EASE }}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button variant="glow" size="xl" asChild>
                <Link href="/register">
                  Start for Free <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <a
                href="https://wa.me/9779749231395"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-600/10 px-6 py-3 text-base font-semibold text-foreground transition-all hover:bg-green-600/20"
              >
                <span className="text-lg">💬</span>
                WhatsApp Us
              </a>
            </motion.div>

            {/* Trust checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.42 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-4"
            >
              {trustPoints.map(({ emoji, text }) => (
                <span key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{emoji}</span>
                  {text}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
