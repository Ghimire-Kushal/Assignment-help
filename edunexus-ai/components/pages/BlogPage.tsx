"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock, Rss, Search, Tag } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

/* ── Data ──────────────────────────────────────────────────── */
const categories = [
  "All",
  "Essay Writing",
  "Research Tips",
  "Citation Guides",
  "Study Skills",
  "AI in Education",
  "Coding Help",
  "Dissertation",
];

interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorInitials: string;
  authorColor: string;
  gradient: string;
  featured?: boolean;
}

const posts: Post[] = [
  {
    id: 1,
    title: "How to Write a First-Class Literature Review: A Complete Step-by-Step Guide",
    excerpt:
      "A literature review is more than a summary of sources — it's a critical synthesis that positions your research in the field. Learn the exact structure, strategy, and common pitfalls to avoid.",
    category: "Research Tips",
    readTime: "12 min read",
    date: "May 15, 2026",
    author: "Dr. Sarah Cole",
    authorInitials: "SC",
    authorColor: "from-blue-500 to-indigo-600",
    gradient: "from-blue-600/25 to-indigo-600/10",
    featured: true,
  },
  {
    id: 2,
    title: "APA 7th Edition: The Definitive Cheat Sheet for Students",
    excerpt:
      "From in-text citations to reference lists — every rule, every edge case, every format you need for APA 7th edition, explained in plain English with real examples.",
    category: "Citation Guides",
    readTime: "8 min read",
    date: "May 12, 2026",
    author: "James Thornton",
    authorInitials: "JT",
    authorColor: "from-purple-500 to-violet-600",
    gradient: "from-purple-600/20 to-violet-600/10",
  },
  {
    id: 3,
    title: "How AI Tools Are Reshaping Academic Writing in 2026",
    excerpt:
      "From auto-citation tools to AI-powered feedback systems, the academic writing landscape is evolving fast. Here's what's changing and how students can stay ahead.",
    category: "AI in Education",
    readTime: "7 min read",
    date: "May 10, 2026",
    author: "Dr. Alex Park",
    authorInitials: "AP",
    authorColor: "from-emerald-500 to-teal-600",
    gradient: "from-emerald-600/20 to-teal-600/10",
  },
  {
    id: 4,
    title: "Crafting a Thesis Statement That Actually Works: Framework & Examples",
    excerpt:
      "The thesis statement is the backbone of every great essay. Master the three-part framework that top academics use, with 20 before-and-after examples across disciplines.",
    category: "Essay Writing",
    readTime: "9 min read",
    date: "May 8, 2026",
    author: "Emma Wilson",
    authorInitials: "EW",
    authorColor: "from-pink-500 to-rose-600",
    gradient: "from-pink-600/20 to-rose-600/10",
  },
  {
    id: 5,
    title: "Debugging Python Data Analysis Assignments: 15 Common Mistakes Fixed",
    excerpt:
      "From index errors in pandas to mismatched array shapes in NumPy — the most common errors students encounter in data analysis assignments, with working fixes for each.",
    category: "Coding Help",
    readTime: "11 min read",
    date: "May 5, 2026",
    author: "Chris Nakamura",
    authorInitials: "CN",
    authorColor: "from-cyan-500 to-sky-600",
    gradient: "from-cyan-600/20 to-sky-600/10",
  },
  {
    id: 6,
    title: "From Draft to Distinction: A Professional Editor's Review Process",
    excerpt:
      "What does a professional academic editor actually do? Walk through a real editing session — from first read to final pass — and learn how to self-edit your own work more effectively.",
    category: "Essay Writing",
    readTime: "6 min read",
    date: "May 2, 2026",
    author: "Dr. Sarah Cole",
    authorInitials: "SC",
    authorColor: "from-amber-500 to-orange-600",
    gradient: "from-amber-600/20 to-orange-600/10",
  },
  {
    id: 7,
    title: "Structuring Your Dissertation: Chapter-by-Chapter Breakdown",
    excerpt:
      "Not sure what goes in each chapter of your dissertation? This guide covers the exact content, length, and purpose of every section from introduction to conclusion.",
    category: "Dissertation",
    readTime: "15 min read",
    date: "Apr 28, 2026",
    author: "Dr. Alex Park",
    authorInitials: "AP",
    authorColor: "from-violet-500 to-purple-600",
    gradient: "from-violet-600/20 to-purple-600/10",
  },
  {
    id: 8,
    title: "The Pomodoro Technique for Academic Writing: A Science-Backed Guide",
    excerpt:
      "Struggling with writer's block and procrastination? The Pomodoro technique, adapted for academic writing, can dramatically increase your output and focus. Here's the exact protocol.",
    category: "Study Skills",
    readTime: "5 min read",
    date: "Apr 25, 2026",
    author: "James Thornton",
    authorInitials: "JT",
    authorColor: "from-green-500 to-emerald-600",
    gradient: "from-green-600/20 to-emerald-600/10",
  },
  {
    id: 9,
    title: "Harvard vs APA vs MLA: Which Referencing Style Is Right for Your Assignment?",
    excerpt:
      "Confused about which citation style your institution or subject requires? This quick-reference guide breaks down the key differences and tells you when each system is appropriate.",
    category: "Citation Guides",
    readTime: "6 min read",
    date: "Apr 22, 2026",
    author: "Emma Wilson",
    authorInitials: "EW",
    authorColor: "from-blue-500 to-cyan-600",
    gradient: "from-blue-600/20 to-cyan-600/10",
  },
];

/* ── Featured card ─────────────────────────────────────────── */
function FeaturedCard({ post }: { post: Post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br ${post.gradient} glass p-8 transition-all duration-300 hover:border-blue-500/25 hover:-translate-y-0.5`}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
        {/* Category indicator */}
        <div className="flex-shrink-0 lg:w-48">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/20 border border-blue-500/25">
            <BookOpen className="h-7 w-7 text-blue-400" />
          </div>
          <span className="rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400">
            Featured
          </span>
        </div>

        <div className="flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-400">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
          </div>

          <h2 className="mb-3 text-2xl font-bold leading-snug tracking-tight text-foreground group-hover:text-blue-100 transition-colors lg:text-3xl">
            {post.title}
          </h2>
          <p className="mb-5 text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${post.authorColor} text-xs font-bold text-white`}
              >
                {post.authorInitials}
              </div>
              <span className="text-sm font-medium text-foreground">{post.author}</span>
            </div>
            <Button variant="glow" size="sm" asChild>
              <Link href={`/blog/${post.id}`}>
                Read Article <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Post card ─────────────────────────────────────────────── */
function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
    >
      <Link href={`/blog/${post.id}`} className="group block h-full">
        <div
          className={`flex h-full flex-col rounded-2xl border border-white/[0.07] bg-gradient-to-br ${post.gradient} glass p-6 transition-all duration-300 hover:border-white/15 hover:-translate-y-1`}
        >
          {/* Category & meta */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <h3 className="mb-3 flex-1 text-base font-bold leading-snug text-foreground group-hover:text-blue-100 transition-colors">
            {post.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${post.authorColor} text-[10px] font-bold text-white`}
              >
                {post.authorInitials}
              </div>
              <span className="text-xs text-muted-foreground">{post.author}</span>
            </div>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Main export ─────────────────────────────────────────── */
export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featured = posts.find((p) => p.featured)!;
  const nonFeatured = posts.filter((p) => !p.featured);

  const filtered = nonFeatured.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-16 bg-mesh">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/8 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-4"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300">
                  <Rss className="h-3.5 w-3.5" />
                  Academic Insights & Guides
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
                className="text-4xl font-bold tracking-tight sm:text-5xl"
              >
                The <span className="gradient-text">ScholarSync Nepal</span> Blog
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16, ease: EASE }}
                className="mt-3 text-muted-foreground"
              >
                Academic writing guides, citation tips, study strategies, and insights on AI
                in education.
              </motion.p>
            </div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
              className="relative w-full max-w-xs"
            >
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-blue-500/40 focus:outline-none focus:ring-1 focus:ring-blue-500/15 transition-colors"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 md:pb-28">
        {/* Featured post */}
        <FeaturedCard post={featured} />

        {/* Category filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150",
                activeCategory === cat
                  ? "border-blue-500/40 bg-blue-500/15 text-blue-300"
                  : "border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:border-white/15 hover:text-foreground"
              )}
            >
              <Tag className="h-3 w-3" />
              {cat}
            </button>
          ))}
        </div>

        {/* Post grid */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-10 py-14 text-center">
            <p className="text-muted-foreground">
              No articles found for &quot;{searchQuery}&quot; in {activeCategory}.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Newsletter signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 overflow-hidden rounded-2xl border border-purple-500/25 bg-gradient-to-br from-purple-950/60 to-blue-950/60 px-8 py-12 text-center"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-600/8 to-blue-600/8" />
          <div className="relative mx-auto max-w-xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
              <Rss className="h-3 w-3" />
              Weekly newsletter
            </span>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Get Academic Tips in Your Inbox
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Join 8,000+ students who receive weekly writing guides, citation tips, and
              study strategies — no spam, unsubscribe any time.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                
                className="rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-purple-500/40 focus:outline-none sm:w-64 transition-colors"
              />
              <Button variant="glow" size="md">
                Subscribe <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Free forever · Unsubscribe anytime · No spam
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
