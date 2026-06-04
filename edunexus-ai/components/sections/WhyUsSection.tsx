"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, RefreshCw, Shield, Star, ThumbsUp, Users, Zap } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const pillars = [
  {
    icon: Shield,
    emoji: "🛡️",
    title: "100% Original, Guaranteed",
    description:
      "Every submission is written from scratch and scanned with advanced plagiarism tools before delivery. You get a full originality report — no exceptions.",
    stat: "0% Plagiarism",
  },
  {
    icon: Clock,
    emoji: "⏰",
    title: "Never Misses a Deadline",
    description:
      "We've maintained a 98% on-time delivery rate across 1,200+ orders. If we're late, you get a full refund — no questions asked.",
    stat: "98% On-Time",
  },
  {
    icon: RefreshCw,
    emoji: "🔄",
    title: "Unlimited Free Revisions",
    description:
      "Not 100% happy? Request unlimited revisions within 14 days of delivery, completely free. We iterate until you're genuinely satisfied.",
    stat: "Free for 14 Days",
  },
  {
    icon: Users,
    emoji: "🎓",
    title: "Verified PhD Experts",
    description:
      "Our experts hold advanced degrees and pass a rigorous 4-stage vetting process. Only the top 3% of applicants make it onto the platform.",
    stat: "Top 3% Experts",
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: "Lightning-Fast Turnaround",
    description:
      "Need it in 3 hours? We handle urgent requests around the clock. Our network spans every timezone for true 24/7 delivery.",
    stat: "As Fast as 3 hrs",
  },
  {
    icon: ThumbsUp,
    emoji: "🤖",
    title: "AI-Enhanced Quality",
    description:
      "Our proprietary AI reviews every submission for clarity, argument strength, and academic standards before your expert finalizes it.",
    stat: "AI + Human Review",
  },
];

const achievements = [
  { value: "1,200+", label: "Orders Completed" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "4.9★", label: "Average Rating" },
  { value: "120+", label: "Countries Served" },
];

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle bg blob */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-purple-600/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why ScholarSync Nepal"
          title="Built Around Your "
          highlight="Academic Success"
          description="We don't just deliver work — we deliver outcomes. Every decision we make is guided by one goal: your grade."
        />

        {/* Achievement bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 grid grid-cols-2 divide-x divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.07] sm:grid-cols-4 sm:divide-y-0"
        >
          {achievements.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center px-6 py-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <span className="text-2xl font-bold gradient-text">{value}</span>
              <span className="mt-1 text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Feature grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, emoji, title, description, stat }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              className="group relative flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.04]"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/15 to-purple-600/15 border border-blue-500/20 group-hover:border-blue-500/35 transition-colors text-2xl">
                {emoji}
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                  <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">
                    {stat}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Satisfaction guarantee banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-green-500/20 bg-green-500/5 px-6 py-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/15 border border-green-500/25">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Money-Back Guarantee</p>
              <p className="text-sm text-muted-foreground">
                Not satisfied? 100% refund within 72 hours — no questions, no hassle.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm font-medium text-foreground">4.9 / 5.0</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
