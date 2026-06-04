"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const faqs = [
  {
    q: "Is the work delivered by ScholarSync Nepal original?",
    a: "Yes — absolutely. Every submission is written from scratch by a verified human expert, then scanned through our AI plagiarism engine and Turnitin before delivery. You also receive a full originality report with every order.",
  },
  {
    q: "How fast can I get my assignment done?",
    a: "Our fastest turnaround is 3 hours for suitable tasks (e.g. short coding problems, concise essays). Most orders are matched with an expert within 15 minutes of submission. Standard academic assignments typically arrive within 24 hours.",
  },
  {
    q: "What subjects and topics do you cover?",
    a: "We cover 200+ subjects across every academic discipline — from computer science and mathematics to law, medicine, humanities, and business. If you don't see your subject listed, contact our team and we'll match you manually.",
  },
  {
    q: "How are your experts vetted?",
    a: "Our experts go through a 4-stage vetting process: credential verification, subject-matter testing, trial assignments reviewed by senior academics, and an ongoing performance rating system. Only the top 3% of applicants are accepted.",
  },
  {
    q: "What if I'm not satisfied with the result?",
    a: "You're entitled to unlimited free revisions for 14 days after delivery. If revisions don't resolve the issue, our dispute team handles all refund requests within 48 hours. We've maintained a 98% satisfaction rate, so this is rare.",
  },
  {
    q: "Is my personal information kept private?",
    a: "Your privacy is paramount. We never share your personal details with third parties. All communications are encrypted end-to-end, and your order information is never associated with publicly accessible data.",
  },
  {
    q: "Can I communicate with my expert directly?",
    a: "Yes. Once matched, you have a dedicated chat thread with your expert. You can share additional requirements, ask for progress updates, and clarify anything in real time — 24 hours a day.",
  },
  {
    q: "What citation styles do you support?",
    a: "We support all major citation formats: APA (6th & 7th edition), MLA, Chicago/Turabian, Harvard, OSCOLA, Vancouver, IEEE, and more. Simply specify your required style when submitting your order.",
  },
  {
    q: "Do you offer discounts for bulk or repeat orders?",
    a: "Yes. We have a loyalty rewards program that activates after your 3rd order. Pro and Enterprise plan members receive 20–40% discounts on all orders, plus priority expert matching and dedicated account managers.",
  },
  {
    q: "Is using ScholarSync Nepal against university policies?",
    a: "ScholarSync Nepal is an academic assistance and tutoring platform. How you use the work is your decision. We recommend using our materials as a study guide, reference, or learning tool. Always review your institution's specific policies.",
  },
];

interface FAQItemProps {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ q, a, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: EASE }}
      className={cn(
        "rounded-xl border transition-all duration-200",
        isOpen
          ? "border-blue-500/25 bg-blue-500/5"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-foreground sm:text-base">{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-colors",
              isOpen ? "text-blue-400" : "text-muted-foreground"
            )}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Questions? We Have "
          highlight="Answers"
          description="Everything you need to know about ScholarSync Nepal before placing your first order."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <a
              href="mailto:scholarsyncnepal@gmail.com"
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Email our team
            </a>{" "}
            or{" "}
            <a
              href="https://wa.me/9749231395"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-green-400 hover:text-green-300 transition-colors"
            >
              chat on WhatsApp
            </a>{" "}
            — we respond in under 10 minutes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
