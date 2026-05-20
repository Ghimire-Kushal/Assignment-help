"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/shared/Button";

/* ── Animated order-card mockup ─────────────────────────────── */
function OrderMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
      className="relative hidden lg:block"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-10 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl" />

      {/* Main card */}
      <div className="relative glass rounded-2xl p-6 border border-blue-500/25 shadow-[0_30px_80px_rgba(59,130,246,0.12)]">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
              EN
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">EduNexus Order</p>
              <p className="text-xs text-muted-foreground">#ORD-2847</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            In Progress
          </span>
        </div>

        {/* Details */}
        <div className="mb-5 space-y-3">
          <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
            <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
            <div>
              <p className="text-xs text-muted-foreground">Assignment</p>
              <p className="text-sm font-medium text-foreground">Data Structures & Algorithms</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
              <p className="text-xs text-muted-foreground">Deadline</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Clock className="h-3.5 w-3.5 text-orange-400" />
                6 Hours
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
              <p className="text-xs text-muted-foreground">Pages</p>
              <p className="mt-0.5 text-sm font-medium text-foreground">5 pages</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Completion</span>
            <span className="text-xs font-semibold text-blue-400">65%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 1.6, delay: 1.1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </div>

        {/* Expert */}
        <div className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-green-500 text-xs font-bold text-white">
            AP
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-foreground">Dr. Alex P.</p>
            <p className="truncate text-xs text-muted-foreground">PhD Computer Science • MIT</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-yellow-400">4.9</span>
          </div>
        </div>
      </div>

      {/* Floating: delivered */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="absolute -bottom-6 -left-10 glass rounded-xl border border-green-500/20 px-4 py-3 shadow-xl"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Assignment Delivered!</p>
            <p className="text-xs text-muted-foreground">2 mins ago • Grade A</p>
          </div>
        </div>
      </motion.div>

      {/* Floating: rating */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute -right-6 -top-6 glass rounded-xl border border-yellow-500/20 px-3 py-2 shadow-xl"
      >
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">Just rated 5.0</p>
      </motion.div>
    </motion.div>
  );
}

/* ── Main section ─────────────────────────────────────────── */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-16 bg-mesh"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: blobY1 }}
          className="absolute -top-1/4 left-1/3 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]"
        />
        <motion.div
          style={{ y: blobY2 }}
          className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]"
        />
        <div className="absolute bottom-0 left-0 h-[300px] w-[600px] rounded-full bg-indigo-900/10 blur-[100px]" />
      </div>

      <motion.div style={{ opacity: contentOpacity }} className="relative w-full">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* ── Left ── */}
            <div className="space-y-7">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
                  <Zap className="h-3.5 w-3.5 text-blue-400" />
                  AI + Human Expert Platform
                  <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs text-blue-300">
                    v2.0
                  </span>
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl font-bold leading-[1.07] tracking-tight sm:text-6xl xl:text-7xl"
              >
                Premium Academic
                <br />
                Help That{" "}
                <span className="gradient-text">Exceeds</span>
                <br />
                <span className="gradient-text">Expectations</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-xl text-lg leading-relaxed text-muted-foreground"
              >
                EduNexus AI pairs you with PhD-verified experts supercharged by our
                proprietary AI. Assignments, essays, research, code — delivered with
                precision, on deadline, every time.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <Button variant="glow" size="xl" asChild>
                  <Link href="/get-started">
                    Start for Free <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="secondary" size="xl" asChild>
                  <Link href="#how-it-works">How It Works</Link>
                </Button>
              </motion.div>

              {/* Trust row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-3"
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">4.9/5</span>
                  <span className="text-sm text-muted-foreground">from 12K+ reviews</span>
                </div>
                <div className="hidden h-4 w-px bg-border sm:block" />
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span>50,000+ students helped</span>
                </div>
              </motion.div>

              {/* Feature chips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="flex flex-wrap gap-4"
              >
                {[
                  "100% Original",
                  "On-time Delivery",
                  "Free Revisions",
                  "24/7 Support",
                ].map((f) => (
                  <span key={f} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    {f}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── Right ── */}
            <OrderMockup />
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
