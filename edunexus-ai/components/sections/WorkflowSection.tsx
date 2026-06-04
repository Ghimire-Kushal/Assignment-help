"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare, Upload } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const steps = [
  {
    number: "01",
    emoji: "📋",
    title: "Tell Us What You Need",
    description: "Describe your assignment, set your deadline, and upload any files. It takes less than 10 minutes — and you don't need to write an essay just to place an order.",
    color: "from-blue-600 to-blue-700",
    glow: "shadow-blue-500/30",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    scene: ["📚", "⏰", "📎"],
    tip: "Most students submit in under 5 minutes",
  },
  {
    number: "02",
    emoji: "🤝",
    title: "Meet Your Expert",
    description: "Our AI matches you with the best available specialist in your exact subject and academic level. You can chat with them directly before work even starts.",
    color: "from-violet-600 to-violet-700",
    glow: "shadow-violet-500/30",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    scene: ["🧑‍🏫", "💬", "⚡"],
    tip: "Matched within 15 minutes on average",
  },
  {
    number: "03",
    emoji: "✍️",
    title: "We Get to Work",
    description: "Your expert writes everything from scratch. Our AI pipeline checks quality, originality, and structure throughout — not just at the end.",
    color: "from-purple-600 to-purple-700",
    glow: "shadow-purple-500/30",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    scene: ["🔬", "🤖", "📝"],
    tip: "AI quality checks happen at every stage",
  },
  {
    number: "04",
    emoji: "🎉",
    title: "Delivered. Done. Happy.",
    description: "Your polished submission arrives with a plagiarism report. Not satisfied? Request free revisions for 14 days — no questions, no hassle.",
    color: "from-green-600 to-emerald-600",
    glow: "shadow-green-500/30",
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    scene: ["📄", "✅", "🌟"],
    tip: "98% of students are happy first time",
  },
];

export function WorkflowSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-dark-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="How It Works"
          title="From Brief to "
          highlight="Brilliant"
          description="Four simple steps. Zero stress. Here's exactly what happens after you click 'Get Started'."
        />

        <div className="relative mt-16">
          {/* Desktop connector */}
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ number, emoji, title, description, color, glow, border, bg, scene, tip }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: EASE }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon bubble */}
                <div className="relative mb-6 z-10">
                  <div className={`absolute -inset-3 rounded-full ${bg} border ${border} opacity-60`} />
                  <div className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${color} shadow-xl ${glow} text-4xl`}>
                    {emoji}
                  </div>
                  <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-border">
                    <span className="text-[10px] font-bold text-foreground">{number}</span>
                  </div>
                </div>

                {/* Mini scene */}
                <div className="mb-4 flex gap-2">
                  {scene.map((s, j) => (
                    <span key={j} className={`rounded-xl border ${border} ${bg} px-2 py-1 text-base`}>{s}</span>
                  ))}
                </div>

                <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground mb-3">{description}</p>

                {/* Tip */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-[11px] text-muted-foreground">
                  ✨ {tip}
                </span>

                {/* Arrow (mobile) */}
                {i < steps.length - 1 && (
                  <div className="mt-6 block lg:hidden text-muted-foreground/30">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom reassurance strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[
            { emoji: "⚡", label: "10-minute setup", sub: "No lengthy forms or registration hoops" },
            { emoji: "💬", label: "Direct expert chat", sub: "Real human, real-time — not a bot" },
            { emoji: "🔄", label: "Free revisions for 14 days", sub: "Included in every order, always" },
          ].map(({ emoji, label, sub }) => (
            <div key={label} className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
              <span className="text-3xl flex-shrink-0">{emoji}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
