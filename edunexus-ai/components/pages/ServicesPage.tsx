"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Clock,
  FileText,
  FolderOpen,
  Monitor,
  Pencil,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const services = [
  {
    id: "assignment",
    icon: FileText,
    badge: "Most Ordered",
    title: "Assignment Help",
    tagline: "Any subject, any level, any deadline",
    description:
      "Struggling with a homework problem set, coursework brief, or complex multi-part assignment? Our verified experts deliver precise, well-structured solutions that meet your marking criteria exactly.",
    features: [
      "200+ subjects covered — STEM, humanities, business & more",
      "All academic levels from GCSE to postgraduate",
      "Urgency options from 3 hours to 7 days",
      "Detailed step-by-step solutions, not just answers",
      "Aligned to your institution's marking rubric",
      "Plagiarism report included with every order",
    ],
    popularFor: ["Coursework", "Problem Sets", "Case Studies", "Lab Reports"],
    price: "From $9/page",
    color: {
      gradient: "from-blue-600/20 to-indigo-600/10",
      border: "border-blue-500/25",
      hoverBorder: "hover:border-blue-500/50",
      iconBg: "bg-blue-600",
      badge: "bg-blue-500/15 border-blue-500/25 text-blue-300",
      pill: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      glow: "hover:shadow-blue-500/10",
    },
  },
  {
    id: "thesis",
    icon: BookOpen,
    badge: "Expert Level",
    title: "Thesis & Dissertation",
    tagline: "Full support from proposal to final submission",
    description:
      "A dissertation is the most important piece of work you'll write. Our PhD-qualified specialists guide you through every chapter — from literature review and methodology to analysis, conclusions, and final edits.",
    features: [
      "Chapter-by-chapter writing and review",
      "Research proposal and ethics forms",
      "Literature review with comprehensive source mapping",
      "Data analysis (SPSS, R, Python, NVivo)",
      "Reference list formatted to your required style",
      "Unlimited revisions across 30 days",
    ],
    popularFor: ["Masters Dissertations", "PhD Theses", "Capstone Projects"],
    price: "From $22/page",
    color: {
      gradient: "from-purple-600/20 to-violet-600/10",
      border: "border-purple-500/25",
      hoverBorder: "hover:border-purple-500/50",
      iconBg: "bg-purple-600",
      badge: "bg-purple-500/15 border-purple-500/25 text-purple-300",
      pill: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      glow: "hover:shadow-purple-500/10",
    },
  },
  {
    id: "projects",
    icon: FolderOpen,
    badge: "End-to-End",
    title: "Final Year Projects",
    tagline: "Research, build, and document your best work",
    description:
      "Final year projects span months and require real depth. Whether it's a research project, software build, engineering design, or business plan, our specialists deliver a polished, submission-ready outcome.",
    features: [
      "Project scoping and feasibility studies",
      "Research design and data collection strategy",
      "Technical development (code, models, prototypes)",
      "Full project report and documentation",
      "Presentation slides for viva/defence",
      "Post-submission support and feedback reviews",
    ],
    popularFor: ["Engineering Projects", "CS Builds", "Business Plans", "Research Projects"],
    price: "From $18/page",
    color: {
      gradient: "from-cyan-600/20 to-sky-600/10",
      border: "border-cyan-500/25",
      hoverBorder: "hover:border-cyan-500/50",
      iconBg: "bg-cyan-600",
      badge: "bg-cyan-500/15 border-cyan-500/25 text-cyan-300",
      pill: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      glow: "hover:shadow-cyan-500/10",
    },
  },
  {
    id: "presentation",
    icon: Monitor,
    badge: "Visual First",
    title: "Presentation Design",
    tagline: "Slides that impress — research-backed and beautifully built",
    description:
      "Whether it's a seminar, conference, viva defence, or group presentation, our designers and subject experts craft visually compelling slides with strong academic content and clear narrative flow.",
    features: [
      "PowerPoint, Google Slides, and Keynote",
      "Content research and talking points included",
      "Professional design with academic tone",
      "Speaker notes written for each slide",
      "Custom graphic elements and data visualisations",
      "Unlimited iterations until you're satisfied",
    ],
    popularFor: ["Seminar Presentations", "Viva Defences", "Conference Talks", "Group Projects"],
    price: "From $15/slide",
    color: {
      gradient: "from-pink-600/20 to-rose-600/10",
      border: "border-pink-500/25",
      hoverBorder: "hover:border-pink-500/50",
      iconBg: "bg-pink-600",
      badge: "bg-pink-500/15 border-pink-500/25 text-pink-300",
      pill: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      glow: "hover:shadow-pink-500/10",
    },
  },
  {
    id: "editing",
    icon: Pencil,
    badge: "Polish & Perfect",
    title: "Editing & Formatting",
    tagline: "Transform good work into distinction-level writing",
    description:
      "Already have a draft? Our academic editors refine your language, tighten your arguments, fix your citations, and format your document to institutional standards — turning good work into exceptional work.",
    features: [
      "Grammar, style, and clarity improvements",
      "Academic tone and vocabulary enhancement",
      "Structural and argument coherence review",
      "Citation and bibliography formatting (APA, MLA, Harvard, Chicago, OSCOLA, IEEE)",
      "Formatting to exact university style guide",
      "Track-changes version returned for your review",
    ],
    popularFor: ["Essays", "Dissertations", "Research Papers", "Reflective Journals"],
    price: "From $5/page",
    color: {
      gradient: "from-amber-600/20 to-orange-600/10",
      border: "border-amber-500/25",
      hoverBorder: "hover:border-amber-500/50",
      iconBg: "bg-amber-600",
      badge: "bg-amber-500/15 border-amber-500/25 text-amber-300",
      pill: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      glow: "hover:shadow-amber-500/10",
    },
  },
  {
    id: "ai",
    icon: BrainCircuit,
    badge: "AI-Powered",
    title: "AI Academic Assistance",
    tagline: "Intelligent tutoring, explanations, and study support",
    description:
      "Our proprietary AI works alongside human tutors to provide personalised academic support. From concept explanations and exam prep to structured study plans and draft reviews — always on, always sharp.",
    features: [
      "On-demand concept explanations in plain language",
      "Personalised study plans based on your syllabus",
      "Practice questions with detailed worked solutions",
      "Essay and assignment draft feedback in minutes",
      "Plagiarism and AI-detection-safe content",
      "Multimodal support: upload images, PDFs, code",
    ],
    popularFor: ["Exam Prep", "Study Guides", "Draft Feedback", "Concept Tutoring"],
    price: "From $7/session",
    color: {
      gradient: "from-emerald-600/20 to-teal-600/10",
      border: "border-emerald-500/25",
      hoverBorder: "hover:border-emerald-500/50",
      iconBg: "bg-emerald-600",
      badge: "bg-emerald-500/15 border-emerald-500/25 text-emerald-300",
      pill: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      glow: "hover:shadow-emerald-500/10",
    },
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const { icon: Icon, badge, title, tagline, description, features, popularFor, price, color } =
    service;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      className={`group relative flex flex-col rounded-2xl border bg-gradient-to-br ${color.gradient} ${color.border} ${color.hoverBorder} glass p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${color.glow}`}
    >
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-3">
        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${color.iconBg} bg-opacity-90 shadow-lg`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${color.badge}`}
        >
          {badge}
        </span>
      </div>

      {/* Title & tagline */}
      <h3 className="mb-1 text-xl font-bold text-foreground">{title}</h3>
      <p className={`mb-3 text-xs font-medium ${color.pill.split(" ")[1]}`}>{tagline}</p>
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{description}</p>

      {/* Features */}
      <ul className="mb-5 flex-1 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Popular for */}
      <div className="mb-5 flex flex-wrap gap-2">
        {popularFor.map((tag) => (
          <span
            key={tag}
            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${color.pill}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className={`flex items-center justify-between border-t ${color.border} pt-4`}>
        <span className="text-sm font-bold text-foreground">{price}</span>
        <Button variant="outline" size="sm" asChild>
          <Link href="/get-started">
            Order Now <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

const processSteps = [
  { icon: FileText, title: "Describe your need", desc: "Fill in your brief — subject, deadline, requirements — in under 2 minutes." },
  { icon: Star, title: "Expert is matched", desc: "Our AI matches you with the best available specialist in your subject." },
  { icon: Zap, title: "Work gets done", desc: "Your expert writes from scratch, with AI quality gates throughout." },
  { icon: CheckCircle2, title: "Delivered & revised", desc: "Receive polished work with plagiarism report, free revisions included." },
];

export function ServicesPage() {
  return (
    <div className="min-h-screen pt-16 bg-mesh">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/8 blur-[130px]" />
          <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-600/8 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              6 Core Academic Services
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Expert Help for Every{" "}
            <span className="gradient-text">Academic Challenge</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            From a 500-word essay to a 30,000-word dissertation, EduNexus AI
            covers every academic need — delivered by PhD-qualified experts, enhanced
            by our proprietary AI.
          </motion.p>

          {/* Quick nav pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-blue-500/30 hover:text-foreground"
              >
                {s.title}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service cards */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, i) => (
              <div id={service.id} key={service.id}>
                <ServiceCard service={service} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-white/[0.06] bg-dark-900/40 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="How It Works"
            title="Simple Process, "
            highlight="Outstanding Results"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-background border border-border text-[10px] font-bold text-foreground">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-1.5 font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: CheckCircle2, label: "100% Original Work", color: "text-green-400" },
              { icon: Clock, label: "On-Time Every Time", color: "text-blue-400" },
              { icon: Star, label: "98.7% Satisfaction", color: "text-yellow-400" },
              { icon: Zap, label: "As Fast as 3 Hours", color: "text-purple-400" },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center"
              >
                <Icon className={`h-6 w-6 ${color}`} />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-blue-500/25 bg-gradient-to-br from-blue-950/60 to-purple-950/60 px-8 py-14"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/8 to-purple-600/8" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Not Sure Which Service? <span className="gradient-text">Let Us Help.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Tell us about your assignment and we&apos;ll recommend the right service,
                match you with the best expert, and give you an instant quote.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button variant="glow" size="lg" asChild>
                  <Link href="/get-started">
                    Get Instant Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/contact">Talk to an Expert</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
