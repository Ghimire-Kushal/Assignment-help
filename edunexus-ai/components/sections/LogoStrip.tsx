"use client";

import { motion } from "framer-motion";

const universities = [
  "MIT",
  "Stanford University",
  "Harvard University",
  "University of Oxford",
  "Cambridge University",
  "Yale University",
  "Princeton University",
  "Columbia University",
  "UC Berkeley",
  "University of Toronto",
  "Imperial College London",
  "ETH Zürich",
  "University of Melbourne",
  "NUS Singapore",
  "TU Munich",
  "University of Amsterdam",
];

function LogoItem({ name }: { name: string }) {
  return (
    <span className="inline-flex flex-shrink-0 items-center rounded-lg border border-white/[0.07] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-blue-500/20 hover:text-foreground">
      {name}
    </span>
  );
}

export function LogoStrip() {
  const doubled = [...universities, ...universities];

  return (
    <section className="border-y border-white/[0.06] bg-gradient-to-r from-dark-900/60 via-dark-800/60 to-dark-900/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground"
        >
          Trusted by students at 120+ universities worldwide
        </motion.p>
      </div>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="animate-marquee flex gap-4">
          {doubled.map((name, i) => (
            <LogoItem key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
