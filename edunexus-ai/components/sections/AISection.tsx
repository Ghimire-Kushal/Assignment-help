"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  Languages,
  Lightbulb,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";


const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const aiFeatures = [
  {
    icon: FileSearch,
    title: "Plagiarism Intelligence",
    description: "AI cross-checks billions of sources in real time — your work is always original.",
  },
  {
    icon: Lightbulb,
    title: "Argument Strength Analysis",
    description: "Evaluates essay flow, logical coherence, and argument quality before delivery.",
  },
  {
    icon: Languages,
    title: "Academic Tone Calibration",
    description: "Automatically adjusts tone and vocabulary to match your academic level and institution style.",
  },
  {
    icon: Wand2,
    title: "Smart Citation Formatter",
    description: "Instantly formats references in APA, MLA, Chicago, Harvard, or any style you need.",
  },
];

const techBadges = ["GPT-4o", "Claude 3", "Gemini Pro", "Custom NLP", "Turnitin API", "Grammarly"];

function AIVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative"
    >
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-gradient-to-br from-blue-600/15 to-purple-600/15 blur-2xl" />

      <div className="relative glass rounded-2xl border border-blue-500/25 p-8">
        {/* Brain icon */}
        <div className="mb-6 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/20 blur-xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30">
              <BrainCircuit className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>

        <h3 className="mb-2 text-center text-xl font-bold text-foreground">
          ScholarSync Nepal <span className="gradient-text">AI Engine</span>
        </h3>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Powered by a multi-model ensemble trained on academic excellence
        </p>

        {/* Processing steps */}
        <div className="space-y-3">
          {[
            { step: "01", label: "Brief Analysis", done: true },
            { step: "02", label: "Expert Matching", done: true },
            { step: "03", label: "AI Quality Check", done: true },
            { step: "04", label: "Human Expert Review", active: true },
            { step: "05", label: "Plagiarism Scan", done: false },
            { step: "06", label: "Final Delivery", done: false },
          ].map(({ step, label, done, active }) => (
            <div
              key={step}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                active
                  ? "border border-blue-500/30 bg-blue-500/10"
                  : done
                  ? "bg-white/[0.02]"
                  : "opacity-40"
              }`}
            >
              <span
                className={`text-xs font-mono font-bold ${
                  active ? "text-blue-400" : done ? "text-green-400" : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
              <span className={`flex-1 text-sm ${active ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                {label}
              </span>
              {done && <CheckCircle2 className="h-4 w-4 text-green-400" />}
              {active && (
                <span className="flex items-center gap-1 text-xs text-blue-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                  Active
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Tech badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          {techBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function AISection() {
  return (
    <section id="ai-powered" className="relative overflow-hidden py-20 md:py-28">
      {/* Dark gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-800/60 to-dark-900/80" />
      <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/8 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-600/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300">
                <Sparkles className="h-3.5 w-3.5" />
                Proprietary AI Technology
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
              className="mb-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Supercharged by AI,{" "}
              <span className="gradient-text">Perfected by Experts</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              className="mb-8 text-muted-foreground leading-relaxed"
            >
              Our proprietary AI pipeline doesn&apos;t replace human experts — it makes
              them dramatically better. Every order passes through intelligent quality
              gates before it reaches you.
            </motion.p>

            <div className="space-y-5">
              {aiFeatures.map(({ icon: Icon, title, description }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: EASE }}
                  className="flex gap-4"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/25">
                    <Icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold text-foreground">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Highlight stat */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.5 }}
              className="mt-8 flex items-center gap-3 rounded-xl border border-purple-500/20 bg-purple-500/5 px-5 py-4"
            >
              <Zap className="h-5 w-5 flex-shrink-0 text-purple-400" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">87% of ScholarSync Nepal orders</span> score
                higher than the student&apos;s own previous work, based on graded submissions.
              </p>
            </motion.div>
          </div>

          {/* Right */}
          <AIVisual />
        </div>
      </div>
    </section>
  );
}
