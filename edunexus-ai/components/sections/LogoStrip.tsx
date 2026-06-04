"use client";

import { motion } from "framer-motion";

const universities = [
  { name: "Tribhuvan University", emoji: "🏛️", short: "TU" },
  { name: "Kathmandu University", emoji: "🔬", short: "KU" },
  { name: "Pokhara University",   emoji: "⛰️", short: "PU" },
  { name: "Purbanchal University",emoji: "🌄", short: "PuU" },
  { name: "Mid-Western Univ.",    emoji: "🏔️", short: "MWU" },
  { name: "Far-Western Univ.",    emoji: "🌿", short: "FWU" },
  { name: "AFU Chitwan",          emoji: "🌾", short: "AFU" },
  { name: "BPKIHS Dharan",        emoji: "🏥", short: "BPKIHS" },
  { name: "Nepal Sanskrit Univ.", emoji: "📿", short: "NSU" },
  { name: "Lumbini Buddhist Univ.",emoji: "🕌", short: "LBU" },
  { name: "Nepal Engineering",    emoji: "⚙️", short: "NEC" },
  { name: "Nepal Law Campus",     emoji: "⚖️", short: "NLC" },
];

function LogoItem({ name, emoji, short }: { name: string; emoji: string; short: string }) {
  return (
    <span className="inline-flex flex-shrink-0 items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-blue-500/20 hover:text-foreground">
      <span className="text-lg">{emoji}</span>
      <span>{name}</span>
    </span>
  );
}

export function LogoStrip() {
  const doubled = [...universities, ...universities];

  return (
    <section className="border-y border-white/[0.06] bg-gradient-to-r from-dark-900/60 via-dark-800/60 to-dark-900/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            🏫 Trusted by students from Nepal&apos;s top universities
          </p>
        </motion.div>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="animate-marquee flex gap-4">
          {doubled.map((u, i) => (
            <LogoItem key={`${u.short}-${i}`} name={u.name} emoji={u.emoji} short={u.short} />
          ))}
        </div>
      </div>
    </section>
  );
}
