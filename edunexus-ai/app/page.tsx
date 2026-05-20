"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Clock,
  Shield,
  Star,
  Users,
  Zap,
  BookOpen,
  Code2,
  FileText,
  GraduationCap,
  Microscope,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/shared/Card";
import { SectionHeading } from "@/components/shared/SectionHeading";

const stats = [
  { value: "50K+", label: "Students Helped" },
  { value: "120+", label: "Countries" },
  { value: "98.7%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Expert Support" },
];

const services = [
  {
    icon: FileText,
    title: "Assignment Help",
    description:
      "From simple homework to complex multi-part assignments — delivered with precision.",
  },
  {
    icon: BookOpen,
    title: "Essay Writing",
    description:
      "Compelling, well-structured essays crafted by subject-matter experts.",
  },
  {
    icon: Microscope,
    title: "Research Papers",
    description:
      "In-depth research with proper citations, methodology, and analysis.",
  },
  {
    icon: Code2,
    title: "Coding Help",
    description:
      "Bugs squashed, projects built — any language, any framework.",
  },
  {
    icon: GraduationCap,
    title: "Dissertation",
    description:
      "Full dissertation support from proposal to final chapter reviews.",
  },
  {
    icon: Brain,
    title: "AI-Enhanced Review",
    description:
      "Proprietary AI checks every submission for quality, originality, and clarity.",
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description: "Turnaround as quick as 3 hours without sacrificing quality.",
  },
  {
    icon: Shield,
    title: "100% Original Work",
    description: "Every submission is plagiarism-checked and guaranteed unique.",
  },
  {
    icon: Clock,
    title: "Always On Time",
    description: "Deadline missed? Full refund — we've never broken this promise.",
  },
  {
    icon: Users,
    title: "Verified Experts",
    description:
      "Our experts hold advanced degrees and pass rigorous vetting.",
  },
];

const EASE = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: EASE },
  }),
};

export default function HomePage() {
  return (
    <div className="bg-mesh">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400"
          >
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            Powered by Advanced AI + Human Experts
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl"
          >
            Academic Excellence
            <br />
            <span className="gradient-text glow-text-blue">Redefined</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed"
          >
            EduNexus AI combines cutting-edge artificial intelligence with vetted
            academic experts to deliver premium academic assistance — fast,
            original, and tailored to you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="glow" size="xl" asChild>
              <Link href="/get-started">
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="secondary" size="xl" asChild>
              <Link href="/#how-it-works">See How It Works</Link>
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground"
          >
            {["No credit card required", "Free first revision", "24/7 support"].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-green-400" />
                  {item}
                </span>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 border-y border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="text-center"
              >
                <div className="text-3xl font-bold gradient-text sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Services"
            title="Everything You Need to "
            highlight="Succeed"
            description="From urgent assignments to comprehensive dissertations, our platform covers every academic challenge you face."
          />

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <Card variant="feature" padding="lg" animated className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="how-it-works" className="py-20 md:py-28 bg-dark-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Why EduNexus AI"
            title="Built for "
            highlight="Academic Success"
            description="We don't just deliver work — we deliver outcomes. Here's why 50,000+ students trust us."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex gap-5 p-6 rounded-xl glass border border-white/[0.06] hover:border-blue-500/20 transition-colors"
              >
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/15 to-purple-600/15 border border-blue-500/20">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative rounded-2xl glass border border-blue-500/20 glow-blue p-10 md:p-16 overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
            </div>
            <div className="relative">
              <SectionHeading
                title="Ready to "
                highlight="Ace Your Assignments?"
                description="Join 50,000+ students who get smarter results with EduNexus AI. Start for free, upgrade when you're ready."
              />
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="glow" size="lg" asChild>
                  <Link href="/get-started">
                    Start for Free <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/#pricing">View Pricing</Link>
                </Button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  4.9/5 from 12,000+ reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
