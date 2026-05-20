"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  university: string;
  rating: number;
  content: string;
  service: string;
  initials: string;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Computer Science, Year 3",
    university: "UC Berkeley",
    rating: 5,
    content:
      "I had a massive algorithms assignment due in 8 hours and was completely stuck. EduNexus matched me with a CS PhD within minutes — the solution was clean, commented, and my professor loved it.",
    service: "Coding Help",
    initials: "SM",
    avatarColor: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    name: "James T.",
    role: "MBA Student",
    university: "London Business School",
    rating: 5,
    content:
      "Used EduNexus for three different case studies this semester. Each one came back polished, well-structured, and referenced perfectly. This platform is genuinely impressive.",
    service: "Essay Writing",
    initials: "JT",
    avatarColor: "from-purple-500 to-violet-600",
  },
  {
    id: 3,
    name: "Priya K.",
    role: "Nursing, Year 2",
    university: "University of Toronto",
    rating: 5,
    content:
      "As an international student, academic writing is really challenging for me. My EduNexus expert helped me understand the structure AND delivered excellent work. Two birds, one stone.",
    service: "Assignment Help",
    initials: "PK",
    avatarColor: "from-pink-500 to-rose-600",
  },
  {
    id: 4,
    name: "Alex R.",
    role: "Mathematics, Year 4",
    university: "ETH Zürich",
    rating: 5,
    content:
      "The statistics assignment I got back was flawless — every step shown, every formula explained. My TA even asked if I had tutoring. I said yes, and I wasn't lying.",
    service: "Math & STEM",
    initials: "AR",
    avatarColor: "from-emerald-500 to-teal-600",
  },
  {
    id: 5,
    name: "Emma W.",
    role: "Law, Year 2",
    university: "University of Oxford",
    rating: 5,
    content:
      "Submitted my contract law essay and got back a brilliant, Oscola-formatted piece in under 12 hours. The legal reasoning was sharp and well-argued. Scored 78%.",
    service: "Essay Writing",
    initials: "EW",
    avatarColor: "from-amber-500 to-orange-600",
  },
  {
    id: 6,
    name: "Daniel K.",
    role: "Engineering, Year 3",
    university: "Imperial College London",
    rating: 5,
    content:
      "Used it for my Thermodynamics problem set — 15 problems, complex derivations. Got the full solution in 4 hours with clear working. Saved my exam prep entirely.",
    service: "Math & STEM",
    initials: "DK",
    avatarColor: "from-cyan-500 to-sky-600",
  },
  {
    id: 7,
    name: "Maria G.",
    role: "Psychology, Year 1",
    university: "University of Amsterdam",
    rating: 5,
    content:
      "I was so overwhelmed with three deadlines in one week. EduNexus handled my research paper and the quality was better than what I would have produced with double the time.",
    service: "Research Papers",
    initials: "MG",
    avatarColor: "from-violet-500 to-purple-600",
  },
  {
    id: 8,
    name: "Chris N.",
    role: "Data Science, MSc",
    university: "NUS Singapore",
    rating: 5,
    content:
      "My Python ML assignment needed real expertise — not just syntax help. The expert actually understood the model architecture and delivered production-quality code.",
    service: "Coding Help",
    initials: "CN",
    avatarColor: "from-blue-500 to-cyan-600",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="mx-2 w-80 flex-shrink-0 glass rounded-2xl border border-white/[0.07] p-5 transition-all duration-300 hover:border-blue-500/20 hover:-translate-y-1">
      {/* Stars */}
      <div className="mb-3 flex items-center gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        <span className="ml-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-medium text-blue-400">
          {testimonial.service}
        </span>
      </div>

      {/* Quote */}
      <div className="relative mb-4">
        <Quote className="absolute -left-1 -top-1 h-5 w-5 text-blue-500/30" />
        <p className="pl-4 text-sm leading-relaxed text-muted-foreground line-clamp-4">
          {testimonial.content}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.avatarColor} text-xs font-bold text-white`}
        >
          {testimonial.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {testimonial.role} · {testimonial.university}
          </p>
        </div>
      </div>
    </div>
  );
}

const row1 = testimonials.slice(0, 4);
const row2 = testimonials.slice(4, 8);

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Student Reviews"
          title="Loved by 50,000+ "
          highlight="Students"
          description="Don't take our word for it. Here's what students say after their first order."
        />
      </div>

      {/* Row 1: scrolls left */}
      <div className="relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="animate-marquee flex">
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`${t.id}-row1-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Row 2: scrolls right */}
      <div className="relative mt-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="animate-marquee-reverse flex">
          {[...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`${t.id}-row2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mt-10 flex flex-col items-center gap-2"
      >
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">4.9 / 5.0</span> average from{" "}
          <span className="font-semibold text-foreground">12,400+</span> verified reviews
        </p>
      </motion.div>
    </section>
  );
}
