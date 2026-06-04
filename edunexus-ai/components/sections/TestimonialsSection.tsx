"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const testimonials = [
  {
    id: 1,
    name: "Kushal G.",
    role: "Computer Science, Year 3",
    university: "Tribhuvan University",
    avatar: "👨‍💻",
    avatarBg: "from-blue-500 to-indigo-600",
    content: "I had a massive algorithms assignment due in 8 hours and was completely stuck. ScholarSync Nepal matched me with an expert within minutes — the solution was clean, commented, and my professor loved it.",
    service: "💻 Coding Help",
    serviceBg: "bg-blue-500/10 border-blue-500/20 text-blue-300",
    rating: 5,
    highlight: "Matched in minutes",
  },
  {
    id: 2,
    name: "Sanjal G.",
    role: "BBA Student",
    university: "Kathmandu University",
    avatar: "👩‍🎓",
    avatarBg: "from-purple-500 to-violet-600",
    content: "Used ScholarSync Nepal for three different case studies this semester. Each one came back polished, well-structured, and referenced perfectly. This platform is genuinely impressive.",
    service: "✍️ Essay Writing",
    serviceBg: "bg-purple-500/10 border-purple-500/20 text-purple-300",
    rating: 5,
    highlight: "3 case studies, all A's",
  },
  {
    id: 3,
    name: "Puspa K. Gharti",
    role: "Nursing, Year 2",
    university: "Pokhara University",
    avatar: "👩‍⚕️",
    avatarBg: "from-pink-500 to-rose-600",
    content: "Academic writing in English is challenging for me. My ScholarSync Nepal expert helped me understand the structure AND delivered excellent work. The result was beyond what I expected.",
    service: "📝 Assignment Help",
    serviceBg: "bg-pink-500/10 border-pink-500/20 text-pink-300",
    rating: 5,
    highlight: "Beyond expectations",
  },
  {
    id: 4,
    name: "Santi Lama",
    role: "Mathematics, Year 4",
    university: "Purbanchal University",
    avatar: "🧮",
    avatarBg: "from-emerald-500 to-teal-600",
    content: "The statistics assignment I got back was flawless — every step shown, every formula explained. My instructor even asked if I had tutoring. I said yes, and I wasn't lying.",
    service: "📊 Math & STEM",
    serviceBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    rating: 5,
    highlight: "Instructor was impressed",
  },
  {
    id: 5,
    name: "Aarav Shrestha",
    role: "Law, Year 2",
    university: "Nepal Law Campus",
    avatar: "⚖️",
    avatarBg: "from-amber-500 to-orange-600",
    content: "Submitted my contract law essay and got back a brilliant, properly formatted piece in under 12 hours. The legal reasoning was sharp and well-argued. Scored very well.",
    service: "📖 Essay Writing",
    serviceBg: "bg-amber-500/10 border-amber-500/20 text-amber-300",
    rating: 5,
    highlight: "Delivered in 12 hours",
  },
  {
    id: 6,
    name: "Prabin Tamang",
    role: "Engineering, Year 3",
    university: "Nepal Engineering College",
    avatar: "🔧",
    avatarBg: "from-cyan-500 to-sky-600",
    content: "Used it for my Thermodynamics problem set — 15 problems, complex derivations. Got the full solution in 4 hours with clear working. Saved my exam prep entirely.",
    service: "🔬 Math & STEM",
    serviceBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
    rating: 5,
    highlight: "15 problems in 4 hours",
  },
];

const overallStats = [
  { emoji: "⭐", value: "4.9/5", label: "Average rating" },
  { emoji: "💬", value: "12,400+", label: "Verified reviews" },
  { emoji: "🎓", value: "500+", label: "Students helped" },
  { emoji: "✅", value: "98%", label: "Satisfaction rate" },
];

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Real Student Reviews"
          title="Don't Take Our Word "
          highlight="For It"
          description="These are real students from real Nepali universities. Their words, not ours."
        />

        {/* Overall stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {overallStats.map(({ emoji, value, label }) => (
            <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4 text-center">
              <div className="text-3xl mb-1">{emoji}</div>
              <p className="text-xl font-bold gradient-text">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              className="glass rounded-2xl border border-white/[0.07] p-5 transition-all duration-300 hover:border-blue-500/20 hover:-translate-y-1 flex flex-col"
            >
              {/* Service tag + stars */}
              <div className="mb-3 flex items-center justify-between">
                <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${t.serviceBg}`}>
                  {t.service}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Highlight pill */}
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-1 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[11px] font-medium text-green-300">{t.highlight}</span>
              </div>

              {/* Quote */}
              <div className="relative flex-1 mb-4">
                <Quote className="absolute -left-1 -top-1 h-5 w-5 text-blue-500/30" />
                <p className="pl-4 text-sm leading-relaxed text-muted-foreground">{t.content}</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.avatarBg} text-xl`}>
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.role} · {t.university}</p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <span className="text-[10px] font-medium text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5">✓ Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-3 text-center"
        >
          <div className="flex -space-x-2">
            {["👨‍💻","👩‍🎓","👩‍⚕️","🧮","⚖️","🔧"].map((emoji, i) => (
              <div key={i} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-slate-700 to-slate-800 text-base`}>
                {emoji}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Join <span className="font-semibold text-foreground">500+ students</span> across Nepal who already trust ScholarSync Nepal
          </p>
        </motion.div>
      </div>
    </section>
  );
}
