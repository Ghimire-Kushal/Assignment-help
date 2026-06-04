"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare, Upload, Users, Zap } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Submit Your Brief",
    description:
      "Describe your assignment, set your deadline, and attach any relevant files. Takes less than 10 minutes.",
    color: "from-blue-600 to-blue-700",
    glowColor: "shadow-blue-500/30",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/10",
  },
  {
    number: "02",
    icon: Users,
    title: "Expert Matched",
    description:
      "Our AI instantly matches you with the best available expert in your subject. You can chat with them directly.",
    color: "from-violet-600 to-violet-700",
    glowColor: "shadow-violet-500/30",
    borderColor: "border-violet-500/30",
    bgColor: "bg-violet-500/10",
  },
  {
    number: "03",
    icon: Zap,
    title: "Work Gets Done",
    description:
      "Your expert writes from scratch, using our AI pipeline to check quality, originality, and structure throughout.",
    color: "from-purple-600 to-purple-700",
    glowColor: "shadow-purple-500/30",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/10",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Delivered & Revised",
    description:
      "Receive your polished submission with a plagiarism report. Request free revisions until you're 100% satisfied.",
    color: "from-green-600 to-emerald-600",
    glowColor: "shadow-green-500/30",
    borderColor: "border-green-500/30",
    bgColor: "bg-green-500/10",
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
          description="Our streamlined 4-step process gets your work done right, fast — with zero stress on your end."
        />

        {/* Steps */}
        <div className="relative mt-16">
          {/* Connector line (desktop) */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ number, icon: Icon, title, description, color, glowColor, borderColor, bgColor }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: EASE }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number bubble */}
                <div className="relative mb-6 z-10">
                  {/* Outer ring */}
                  <div className={`absolute -inset-2 rounded-full ${bgColor} border ${borderColor} opacity-50`} />
                  <div
                    className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${color} shadow-xl ${glowColor}`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-border">
                    <span className="text-[10px] font-bold text-foreground">{number}</span>
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

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

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[
            { icon: Upload, label: "10-minute setup", sub: "No lengthy forms" },
            { icon: MessageSquare, label: "Direct expert chat", sub: "Real-time updates" },
            { icon: CheckCircle2, label: "Free revisions", sub: "14 days included" },
          ].map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Icon className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
