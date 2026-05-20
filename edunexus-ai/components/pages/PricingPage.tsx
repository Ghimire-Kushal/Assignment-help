"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Minus, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

/* ── Pricing data ──────────────────────────────────────────── */
const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$9",
    unit: "/ page",
    description: "Budget-friendly for non-urgent, standard submissions.",
    badge: null,
    highlight: false,
    features: [
      "3–7 day delivery",
      "Bachelor's / Master's level experts",
      "1 free revision (7 days)",
      "Plagiarism report included",
      "200+ subjects covered",
      "Email support",
    ],
    cta: "Get Started",
    ctaVariant: "secondary" as const,
  },
  {
    id: "standard",
    name: "Standard",
    price: "$14",
    unit: "/ page",
    description: "The best balance of speed, quality, and price. Most students choose this.",
    badge: "Most Popular",
    highlight: true,
    features: [
      "12–48 hour delivery",
      "Master's / PhD level experts",
      "3 free revisions (14 days)",
      "Plagiarism report included",
      "AI quality check",
      "Direct expert chat",
      "Live chat support",
    ],
    cta: "Choose Standard",
    ctaVariant: "glow" as const,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$22",
    unit: "/ page",
    description: "Highest quality for urgent, high-stakes work. Top-rated PhD experts only.",
    badge: "Best Quality",
    highlight: false,
    features: [
      "3–12 hour delivery",
      "Top-rated PhD experts only",
      "Unlimited revisions (30 days)",
      "Plagiarism report included",
      "AI + human quality check",
      "Direct PhD expert chat",
      "24/7 priority support",
      "Formatting & citations included",
    ],
    cta: "Choose Premium",
    ctaVariant: "primary" as const,
  },
  {
    id: "custom",
    name: "Custom",
    price: "Quote",
    unit: "",
    description: "Tailored pricing for dissertations, bulk orders, and institutional contracts.",
    badge: "Enterprise",
    highlight: false,
    features: [
      "Flexible delivery schedule",
      "Subject-specialist matching",
      "Unlimited revisions",
      "Full project management",
      "Dedicated account manager",
      "API access available",
      "Volume discounts (20–40%)",
      "Custom SLA & invoicing",
    ],
    cta: "Request a Quote",
    ctaVariant: "outline" as const,
  },
];

/* ── Comparison table ──────────────────────────────────────── */
type CompareValue = string | boolean;

const compareRows: { label: string; values: CompareValue[] }[] = [
  { label: "Starting price", values: ["$9/page", "$14/page", "$22/page", "Custom"] },
  { label: "Delivery time", values: ["3–7 days", "12–48 hrs", "3–12 hrs", "Flexible"] },
  { label: "Expert level", values: ["Master's+", "Master's/PhD", "PhD (top-rated)", "Specialist"] },
  { label: "Free revisions", values: ["1 (7 days)", "3 (14 days)", "Unlimited (30d)", "Unlimited"] },
  { label: "Plagiarism report", values: [true, true, true, true] },
  { label: "AI quality check", values: [false, true, true, true] },
  { label: "Direct expert chat", values: [false, true, true, true] },
  { label: "Priority support", values: [false, false, true, true] },
  { label: "Formatting included", values: [false, false, true, true] },
  { label: "Money-back guarantee", values: [true, true, true, true] },
];

/* ── FAQ ───────────────────────────────────────────────────── */
const pricingFaqs = [
  {
    q: "Do you charge per page or per word?",
    a: "We price per page (approximately 275 words, double-spaced). For coding tasks, presentations, and data analysis, we price per project/task. You'll always see the exact total before confirming an order.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. The price you see at checkout is the price you pay. Revisions within the free period are always free. The only optional add-ons are expedited delivery or additional revision rounds after the included period.",
  },
  {
    q: "Can I upgrade to a higher plan after placing an order?",
    a: "Yes — you can upgrade your delivery speed or support level before your expert begins work. After work has started, upgrades may incur a small fee depending on how much has been completed.",
  },
  {
    q: "What counts as a 'page'?",
    a: "One academic page = 275 words, double-spaced, 12pt Times New Roman, 1-inch margins — the standard academic format. If you're unsure, our order form will auto-calculate based on your word count.",
  },
  {
    q: "Do you offer student discounts?",
    a: "Yes. We offer loyalty discounts starting after your 3rd order, student verification discounts of up to 15%, and seasonal promotions. Check our pricing page for active offers.",
  },
];

/* ── Sub-components ────────────────────────────────────────── */
function PlanCard({ plan, index }: { plan: (typeof plans)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: EASE }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-7 transition-all duration-300",
        plan.highlight
          ? "glass border-blue-500/50 shadow-xl shadow-blue-500/15 scale-[1.02]"
          : "glass border-white/[0.08] hover:border-white/15"
      )}
    >
      {/* Highlight glow */}
      {plan.highlight && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-600/10 to-purple-600/10" />
      )}

      {/* Badge */}
      {plan.badge && (
        <div className="mb-4">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold",
              plan.highlight
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : plan.id === "custom"
                ? "bg-amber-500/15 border border-amber-500/30 text-amber-300"
                : "bg-purple-500/15 border border-purple-500/30 text-purple-300"
            )}
          >
            {plan.badge}
          </span>
        </div>
      )}

      <div className="relative flex flex-col flex-1">
        <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
        <div className="mt-2 flex items-end gap-1">
          <span
            className={cn(
              "text-4xl font-extrabold",
              plan.highlight ? "gradient-text" : "text-foreground"
            )}
          >
            {plan.price}
          </span>
          {plan.unit && (
            <span className="mb-1 text-sm text-muted-foreground">{plan.unit}</span>
          )}
        </div>
        <p className="mt-2 mb-5 text-sm leading-relaxed text-muted-foreground">
          {plan.description}
        </p>

        <ul className="mb-7 flex-1 space-y-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <Check className="h-4 w-4 flex-shrink-0 text-green-400" />
              {f}
            </li>
          ))}
        </ul>

        <Button variant={plan.ctaVariant} size="lg" asChild className="w-full justify-center">
          <Link href={plan.id === "custom" ? "/contact" : "/get-started"}>
            {plan.cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

function CompareCell({ value, planIndex }: { value: CompareValue; planIndex: number }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-4 w-4 text-green-400" />
    ) : (
      <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
    );
  }
  return (
    <span
      className={cn(
        "text-sm",
        planIndex === 1 ? "font-semibold text-blue-400" : "text-muted-foreground"
      )}
    >
      {value}
    </span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "cursor-pointer rounded-xl border px-5 py-4 transition-colors",
        open
          ? "border-blue-500/25 bg-blue-500/5"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/10"
      )}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <span className={cn("text-lg transition-transform", open ? "rotate-45" : "")}>
          <span className="text-muted-foreground">+</span>
        </span>
      </div>
      {open && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>}
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────── */
export function PricingPage() {
  return (
    <div className="min-h-screen pt-16 bg-mesh">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/8 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              Transparent, flexible pricing
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Simple Pricing,{" "}
            <span className="gradient-text">No Surprises</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="mt-5 text-lg leading-relaxed text-muted-foreground"
          >
            Pay per page, per project, or per session. No subscriptions, no hidden fees —
            just straightforward pricing for the exact help you need.
          </motion.p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            All plans include a{" "}
            <span className="font-medium text-green-400">100% money-back guarantee</span> if
            we can&apos;t meet your deadline or quality requirements.
          </motion.p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 md:py-20 border-y border-white/[0.06] bg-dark-900/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Compare Plans"
            title="What's Included in "
            highlight="Each Plan"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 overflow-x-auto"
          >
            <table className="w-full min-w-[600px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="py-3 pr-4 text-left text-sm font-medium text-muted-foreground w-1/3">
                    Feature
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      className={cn(
                        "py-3 text-center text-sm font-bold",
                        p.highlight ? "text-blue-400" : "text-foreground"
                      )}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
                <tr>
                  <td colSpan={5}>
                    <div className="h-px bg-white/[0.08]" />
                  </td>
                </tr>
              </thead>
              <tbody>
                {compareRows.map(({ label, values }, ri) => (
                  <tr
                    key={label}
                    className={cn(
                      "transition-colors",
                      ri % 2 === 0 ? "bg-white/[0.015]" : ""
                    )}
                  >
                    <td className="py-3 pr-4 text-sm text-muted-foreground">{label}</td>
                    {values.map((v, vi) => (
                      <td key={vi} className="py-3 text-center">
                        <CompareCell value={v} planIndex={vi} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Volume pricing callout */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 sm:grid-cols-3"
          >
            {[
              {
                icon: Zap,
                title: "Loyalty Rewards",
                desc: "Earn 5% credit back on every order after your 3rd. Stacks with other discounts.",
                color: "text-blue-400",
                bg: "bg-blue-500/10 border-blue-500/20",
              },
              {
                icon: Sparkles,
                title: "Bulk Discounts",
                desc: "Order 10+ pages at once and unlock 15–25% off automatically at checkout.",
                color: "text-purple-400",
                bg: "bg-purple-500/10 border-purple-500/20",
              },
              {
                icon: ArrowRight,
                title: "Referral Credit",
                desc: "Refer a friend who places their first order — you both get $10 account credit.",
                color: "text-green-400",
                bg: "bg-green-500/10 border-green-500/20",
              },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className={`flex gap-4 rounded-xl border p-5 ${bg}`}>
                <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${color}`} />
                <div>
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Pricing FAQ"
            title="Common "
            highlight="Pricing Questions"
          />
          <div className="mt-10 space-y-3">
            {pricingFaqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-10 text-center"
          >
            <p className="text-muted-foreground">
              Still unsure about pricing?{" "}
              <Link href="/contact" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Chat with our team
              </Link>{" "}
              — we respond in under 2 minutes.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
