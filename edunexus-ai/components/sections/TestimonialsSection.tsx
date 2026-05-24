"use client";

import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  university: string;
  content: string;
  service: string;
  initials: string;
  avatarColor: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Kushal G.",
    role: "Computer Science, Year 3",
    university: "Tribhuvan University",
    content:
      "I had a massive algorithms assignment due in 8 hours and was completely stuck. ScholarSync Nepal matched me with an expert within minutes — the solution was clean, commented, and my professor loved it.",
    service: "Coding Help",
    initials: "KG",
    avatarColor: "from-blue-500 to-indigo-600",
    rating: 5,
  },
  {
    id: 2,
    name: "Sanjal G.",
    role: "BBA Student",
    university: "Kathmandu University",
    content:
      "Used ScholarSync Nepal for three different case studies this semester. Each one came back polished, well-structured, and referenced perfectly. This platform is genuinely impressive.",
    service: "Essay Writing",
    initials: "SG",
    avatarColor: "from-purple-500 to-violet-600",
    rating: 5,
  },
  {
    id: 3,
    name: "Puspa K. Gharti",
    role: "Nursing, Year 2",
    university: "Pokhara University",
    content:
      "Academic writing in English is challenging for me. My ScholarSync Nepal expert helped me understand the structure AND delivered excellent work. The result was beyond what I expected.",
    service: "Assignment Help",
    initials: "PG",
    avatarColor: "from-pink-500 to-rose-600",
    rating: 5,
  },
  {
    id: 4,
    name: "Santi Lama",
    role: "Mathematics, Year 4",
    university: "Purbanchal University",
    content:
      "The statistics assignment I got back was flawless — every step shown, every formula explained. My instructor even asked if I had tutoring. I said yes, and I wasn't lying.",
    service: "Math & STEM",
    initials: "SL",
    avatarColor: "from-emerald-500 to-teal-600",
    rating: 5,
  },
  {
    id: 5,
    name: "Aarav Shrestha",
    role: "Law, Year 2",
    university: "Nepal Law Campus",
    content:
      "Submitted my contract law essay and got back a brilliant, properly formatted piece in under 12 hours. The legal reasoning was sharp and well-argued. Scored very well.",
    service: "Essay Writing",
    initials: "AS",
    avatarColor: "from-amber-500 to-orange-600",
    rating: 5,
  },
  {
    id: 6,
    name: "Prabin Tamang",
    role: "Engineering, Year 3",
    university: "Nepal Engineering College",
    content:
      "Used it for my Thermodynamics problem set — 15 problems, complex derivations. Got the full solution in 4 hours with clear working. Saved my exam prep entirely.",
    service: "Math & STEM",
    initials: "PT",
    avatarColor: "from-cyan-500 to-sky-600",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="glass rounded-2xl border border-white/[0.07] p-5 transition-all duration-300 hover:border-blue-500/20 hover:-translate-y-1">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-medium text-blue-400">
          {testimonial.service}
        </span>
        <StarRating rating={testimonial.rating} />
      </div>

      <div className="relative mb-4">
        <Quote className="absolute -left-1 -top-1 h-5 w-5 text-blue-500/30" />
        <p className="pl-4 text-sm leading-relaxed text-muted-foreground">
          {testimonial.content}
        </p>
      </div>

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

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Student Reviews"
          title="Loved by Students "
          highlight="Worldwide"
          description="Don't take our word for it. Here's what students say after their first order."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
