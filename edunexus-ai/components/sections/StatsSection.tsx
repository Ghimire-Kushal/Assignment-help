"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

interface StatCardProps {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
  decimals?: number;
}

function StatCard({ target, suffix = "", prefix = "", label, sublabel, decimals = 0 }: StatCardProps) {
  const { value, ref } = useCountUp(target, { decimals });

  return (
    <div className="flex flex-col items-center text-center">
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="text-4xl font-bold sm:text-5xl lg:text-6xl"
      >
        <span className="gradient-text">
          {prefix}
          {decimals > 0 ? value.toFixed(decimals) : value.toLocaleString()}
          {suffix}
        </span>
      </span>
      <span className="mt-2 text-base font-semibold text-foreground">{label}</span>
      <span className="mt-1 text-sm text-muted-foreground">{sublabel}</span>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-950/40 via-dark-900 to-purple-950/40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/8 blur-[130px]" />

      {/* Top/bottom borders */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
            Impact by the numbers
          </span>
        </motion.div>

        <div className="grid grid-cols-2 gap-10 sm:gap-16 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          >
            <StatCard
              target={50000}
              suffix="+"
              label="Students Helped"
              sublabel="Across 120+ countries"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
          >
            <StatCard
              target={98.7}
              suffix="%"
              label="Satisfaction Rate"
              sublabel="Based on 400K+ orders"
              decimals={1}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.19, ease: EASE }}
          >
            <StatCard
              target={400000}
              suffix="+"
              label="Orders Completed"
              sublabel="Since 2019"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.26, ease: EASE }}
          >
            <StatCard
              target={3}
              prefix="< "
              suffix=" hrs"
              label="Avg Delivery Time"
              sublabel="For urgent requests"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
