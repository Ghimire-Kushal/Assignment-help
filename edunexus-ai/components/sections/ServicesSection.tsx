"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Code2,
  FileText,
  GraduationCap,
  Microscope,
  Presentation,
  Calculator,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const services = [
  {
    icon: FileText,
    title: "Assignment Help",
    description:
      "Any subject, any level. Our experts tackle complex assignments and deliver structured, high-quality solutions on tight deadlines.",
    features: ["All academic levels", "Detailed explanations", "Up to 3-hour delivery"],
    price: "From $12/page",
    color: "from-blue-600/20 to-blue-800/10",
    border: "border-blue-500/20 group-hover:border-blue-500/40",
    iconColor: "text-blue-400",
  },
  {
    icon: BookOpen,
    title: "Essay Writing",
    description:
      "Compelling, argument-driven essays crafted by subject specialists. Properly structured, cited, and polished to impress.",
    features: ["Any citation style", "Plagiarism-free", "Free revisions"],
    price: "From $14/page",
    color: "from-violet-600/20 to-violet-800/10",
    border: "border-violet-500/20 group-hover:border-violet-500/40",
    iconColor: "text-violet-400",
  },
  {
    icon: Microscope,
    title: "Research Papers",
    description:
      "Deep, methodical research with proper citations, literature reviews, and data analysis — every academic standard met.",
    features: ["Primary & secondary research", "All citation formats", "Full bibliography"],
    price: "From $18/page",
    color: "from-purple-600/20 to-purple-800/10",
    border: "border-purple-500/20 group-hover:border-purple-500/40",
    iconColor: "text-purple-400",
  },
  {
    icon: Code2,
    title: "Coding & CS Help",
    description:
      "From debugging to full project builds. Any language, any framework — clean, documented, and test-ready code.",
    features: ["All languages & frameworks", "Working code with tests", "Detailed comments"],
    price: "From $25/task",
    color: "from-cyan-600/20 to-cyan-800/10",
    border: "border-cyan-500/20 group-hover:border-cyan-500/40",
    iconColor: "text-cyan-400",
  },
  {
    icon: GraduationCap,
    title: "Dissertation & Thesis",
    description:
      "Complete dissertation support: proposals, literature reviews, methodology chapters, data analysis, and final edits.",
    features: ["Chapter-by-chapter support", "Expert in your field", "Turnitin-safe"],
    price: "From $22/page",
    color: "from-pink-600/20 to-pink-800/10",
    border: "border-pink-500/20 group-hover:border-pink-500/40",
    iconColor: "text-pink-400",
  },
  {
    icon: Calculator,
    title: "Math & STEM",
    description:
      "Complex proofs, problem sets, and quantitative analysis across calculus, statistics, physics, and engineering.",
    features: ["Step-by-step solutions", "All STEM subjects", "Show-your-work format"],
    price: "From $15/task",
    color: "from-emerald-600/20 to-emerald-800/10",
    border: "border-emerald-500/20 group-hover:border-emerald-500/40",
    iconColor: "text-emerald-400",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="What We Cover"
          title="Every Academic Challenge, "
          highlight="Solved"
          description="From a late-night assignment to a semester-long dissertation — our platform covers every academic need, every subject, every level."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(
            ({ icon: Icon, title, description, features, price, color, border, iconColor }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              >
                <div className={`group relative flex h-full flex-col rounded-2xl border bg-gradient-to-br ${color} ${border} glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5`}>
                  {/* Icon */}
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${color} border ${border} transition-colors`}>
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                  </div>

                  {/* Title & desc */}
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>

                  {/* Features */}
                  <ul className="mb-5 space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${iconColor.replace("text-", "bg-")}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <span className="text-sm font-semibold text-foreground">{price}</span>
                    <Link
                      href="/get-started"
                      className={`flex items-center gap-1.5 text-xs font-medium ${iconColor} opacity-0 transition-all duration-200 group-hover:opacity-100`}
                    >
                      Order Now <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Don&apos;t see your subject?{" "}
            <Link href="/contact" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Contact us — we cover 200+ subjects →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
