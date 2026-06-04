"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  AlertCircle, ArrowRight, BookOpen, CheckCircle2,
  ChevronDown, ChevronRight, FileText, GraduationCap,
  Lightbulb, MessageCircle, Search, Shield,
  Sparkles, Star, Zap, Clock, Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/Button";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

/* ─── TYPES ─── */
interface FormatRow { element: string; req: string; tip?: string }
interface WordCount  { program: string; minimum: string; typical: string }
interface Faculty {
  name: string; programs: string; citation: string; intro: string;
  formatting: FormatRow[]; chapters: string[]; wordCount: WordCount[];
  keyPoints: string[]; warnings: string[]; proTips: string[];
}
interface University {
  id: string; name: string; short: string; emoji: string;
  established: string; students: string; campuses: string;
  location: string; primary: string; color: string;
  headerGradient: string; about: string; funFact: string;
  faculties: Faculty[];
}

/* ─── UNIVERSITIES ─── */
const universities: University[] = [
  {
    id: "tu", name: "Tribhuvan University", short: "TU", emoji: "🏛️",
    established: "1959", students: "500,000+", campuses: "60+ campuses",
    location: "Kirtipur, Kathmandu", primary: "APA 7th", color: "blue",
    headerGradient: "from-blue-600/30 via-blue-900/20 to-transparent",
    funFact: "TU is one of the largest universities in the world by enrollment. If you study at almost any college in Nepal, you're probably affiliated with TU.",
    about: "Nepal's oldest and largest university — and honestly, the most complex to navigate because guidelines can differ between faculties, departments, and even individual campuses. The golden rule at TU: always confirm with your own supervisor, not just the central TU document.",
    faculties: [
      {
        name: "Faculty of Management (FOM)", programs: "MBS, MBA, BBA",
        citation: "APA 7th Edition (adopted 2021)",
        intro: "TU FOM shifted to APA 7th in 2021. If your supervisor hands you a template from before that, politely double-check — those templates may still follow APA 6th. The differences are subtle but examiners notice them.",
        formatting: [
          { element: "📄 Paper Size",      req: "A4 (210mm × 297mm)",                                  tip: "Always check your printer — most default to Letter, not A4. Printing on the wrong size wastes money." },
          { element: "🖊️ Font",            req: "Times New Roman — 12pt body, 14pt chapter headings",  tip: "Don't mix fonts. Headings are 14pt bold, everything else 12pt regular." },
          { element: "📏 Line Spacing",    req: "1.5 lines throughout",                                 tip: "Set this in paragraph style settings, not by pressing Enter multiple times." },
          { element: "📐 Left Margin",     req: "1.5 inch (binding side)",                             tip: "The extra 0.5 inch is for binding — without it, your text disappears into the spine." },
          { element: "↔️ Other Margins",   req: "1 inch on all other sides" },
          { element: "⬅️ Paragraph Indent",req: "First line 0.5 inch",                                  tip: "Use the paragraph indent setting — not the Tab key, which creates inconsistent spacing." },
          { element: "🔢 Page Numbers",    req: "Roman (i, ii, iii…) for preliminary pages; Arabic (1, 2, 3…) for main content; top-right corner" },
          { element: "📊 Alignment",       req: "Justified (both edges aligned)",                       tip: "Not left-aligned. Justified means text lines up on both left and right." },
        ],
        chapters: [
          "📋 Preliminary Pages — Title page, Supervisor's Recommendation, Approval, Acknowledgements, TOC, Lists, Abbreviations, Abstract",
          "📌 Chapter I — Introduction",
          "📚 Chapter II — Review of Literature",
          "🔬 Chapter III — Research Methodology",
          "📊 Chapter IV — Presentation & Analysis of Data",
          "🎯 Chapter V — Summary, Conclusions & Recommendations",
          "📖 References (APA 7th, alphabetical, 0.5 inch hanging indent)",
          "📁 Appendices",
        ],
        wordCount: [
          { program: "MBS Thesis",        minimum: "10,000 words", typical: "12,000–18,000" },
          { program: "MBA Dissertation",  minimum: "15,000 words", typical: "18,000–25,000" },
          { program: "BBA Final Project", minimum: "6,000 words",  typical: "8,000–12,000"  },
          { program: "Research Proposal", minimum: "2,500 words",  typical: "3,000–5,000"   },
        ],
        keyPoints: [
          "In-text citations: (Author, Year) — e.g. (Sharma, 2022)",
          "DOI links are now mandatory for journal articles in APA 7th",
          "Same author, same year = add a, b, c suffix — e.g. (Sharma, 2022a)",
          "Viva defense before a 3-member committee — your supervisor usually chairs it",
          "Final submission: 3 bound hard copies + 1 digital copy (USB or CD)",
        ],
        warnings: [
          "Using an old APA 6th template is the #1 formatting mistake at TU FOM — the format changed in 2021",
          "Submitting without a plagiarism report is grounds for rejection at most TU campuses",
          "Forgetting to switch page numbers from Roman to Arabic at Chapter I is embarrassingly common",
        ],
        proTips: [
          "Write your abstract last — it's much easier to summarise a finished thesis than an imagined one",
          "Set up Heading 1 and Heading 2 styles in MS Word from Day 1 — your TOC will auto-generate",
          "Back up to Google Drive constantly. Losing a thesis file happens more than you'd think",
        ],
      },
      {
        name: "Faculty of Education (FOE)", programs: "B.Ed, M.Ed, M.Phil",
        citation: "APA 7th Edition",
        intro: "Education theses at TU often deal with Nepali schools and local communities — meaning many students write in Nepali with English abstracts. This is fully accepted. Don't let anyone tell you otherwise.",
        formatting: [
          { element: "📄 Paper",         req: "A4, Times New Roman 12pt" },
          { element: "📏 Spacing",       req: "Double-spaced (1.5 acceptable in some departments — confirm with your supervisor)", tip: "Spacing varies by department. Ask before you format 80 pages the wrong way." },
          { element: "📐 Margins",       req: "Left 1.5 inch; all others 1 inch" },
          { element: "🔢 Page Numbers",  req: "Roman for preliminary; Arabic from Chapter I" },
        ],
        chapters: [
          "📌 Chapter 1 — Introduction",
          "📚 Chapter 2 — Review of Related Literature",
          "🔬 Chapter 3 — Methodology",
          "📊 Chapter 4 — Analysis and Interpretation",
          "🎯 Chapter 5 — Findings, Discussion, Conclusion & Recommendations",
          "📖 References (APA 7th)",
          "📁 Appendices",
        ],
        wordCount: [],
        keyPoints: [
          "Theses may be written in Nepali — English abstract is still required",
          "Nepali-language references: transliterate author names in Roman script",
          "Mixed-methods (surveys + interviews) is common and well-accepted here",
        ],
        warnings: [
          "Spacing requirements vary between departments — don't assume, ask first",
        ],
        proTips: [
          "Qualitative theses in education naturally have longer methodology chapters — this is expected, not a problem",
          "If your research involves schoolchildren, seek ethics approval even if your department doesn't strictly require it",
        ],
      },
      {
        name: "Institute of Science & Technology (IOST)", programs: "BCA, B.Sc. CSIT, MCA",
        citation: "IEEE Numbered References",
        intro: "At IOST, your thesis documents something you built. The code is as important as the writing. IEEE references are numbered in order of citation — completely different from APA's alphabetical style.",
        formatting: [
          { element: "📄 Paper",         req: "A4, Times New Roman 12pt (Arial 11pt also fine)" },
          { element: "📏 Spacing",       req: "1.5 lines" },
          { element: "📐 Margins",       req: "Left 1.5 inch; others 1 inch" },
          { element: "📝 Abstract",      req: "Max 200 words — describe what you built and what it does", tip: "No citations in the abstract." },
          { element: "💾 Source Code",   req: "Full code on CD/DVD/pen drive with user manual — mandatory" },
        ],
        chapters: [
          "📋 Preliminary Pages (Title, Certification, Approval, Abstract, TOC, Lists)",
          "📌 Chapter 1 — Introduction",
          "📚 Chapter 2 — Literature Review",
          "🏗️ Chapter 3 — System Analysis & Design",
          "⚙️ Chapter 4 — Implementation",
          "🧪 Chapter 5 — Testing & Evaluation",
          "🎯 Chapter 6 — Conclusion & Future Recommendations",
          "📖 References (IEEE numbered)",
          "📁 Appendices (source code, user manual)",
        ],
        wordCount: [],
        keyPoints: [
          "IEEE references: [1], [2], [3]… in order of first citation — NOT alphabetical",
          "Source code goes in appendix AND on physical media (CD/USB)",
          "Always include a README file explaining how to run your project",
          "Screenshots of your working system strengthen Chapters 4 and 5 significantly",
        ],
        warnings: [
          "Using APA format instead of IEEE is a very common CS student mistake — they look completely different",
          "Leaving source code out of the submission is grounds for rejection",
        ],
        proTips: [
          "Take screenshots at every stage of development — you'll need them for the report",
          "Write Chapter 3 (System Design) before you start coding — it forces you to think architecture first",
          "Even 5 users for a basic UAT section makes your evaluation chapter far more credible",
        ],
      },
      {
        name: "Institute of Medicine (IOM)", programs: "MBBS, Nursing (BN/MN), MPH, Pharmacy",
        citation: "Vancouver (ICMJE) — Numbered Superscript",
        intro: "Medical research at IOM has the highest ethical requirements in this guide. The IRC process isn't a formality — it's a hard blocker. Plan your entire research timeline around it.",
        formatting: [
          { element: "🖊️ Font",          req: "Times New Roman 12pt" },
          { element: "📏 Spacing",       req: "Double throughout (1.5 for MPH)" },
          { element: "📝 Abstract",      req: "Structured: Background / Objectives / Methods / Results / Conclusions — max 300 words", tip: "Each heading is a separate section, not flowing text." },
          { element: "⚖️ Ethics",        req: "Institutional Review Committee (IRC) clearance — mandatory before ANY data collection", tip: "Apply 3 months before your data collection date." },
          { element: "✍️ Consent",       req: "Written informed consent in Nepali language" },
        ],
        chapters: [
          "📌 Chapter 1 — Introduction",
          "📚 Chapter 2 — Literature Review",
          "🔬 Chapter 3 — Methodology (include sample size formula, ethics)",
          "📊 Chapter 4 — Results",
          "💬 Chapter 5 — Discussion",
          "🎯 Chapter 6 — Conclusions & Recommendations",
          "📖 References (Vancouver/ICMJE numbered)",
          "📁 Annexes (IRC letter, consent forms, questionnaire, budget)",
        ],
        wordCount: [],
        keyPoints: [
          "Vancouver: references numbered [1], [2]… in citation order — not alphabetically",
          "IRC clearance letter must be included in your annexes — missing it means rejection",
          "Sample size must be justified with a formula in Chapter 3",
          "P-values: 3 decimal places — write p < 0.001, never p = 0.000",
        ],
        warnings: [
          "Collecting even one data point before IRC approval is an ethical violation — no exceptions",
          "IRC revisions take 4–6 weeks — apply at least 3 months before data collection",
          "Consent forms in English only will be rejected",
        ],
        proTips: [
          "Use a pre-validated questionnaire wherever possible — makes reliability testing much easier",
          "Keep original signed consent forms — you may be audited during viva",
          "Submit your IRC application as early as possible — multiple revision rounds are common",
        ],
      },
      {
        name: "Faculty of Law (FoL)", programs: "B.L, LL.B, LL.M",
        citation: "Chicago 17th Edition or OSCOLA",
        intro: "Law theses look different from any other thesis in Nepal — lots of footnotes at the bottom of pages. This is completely normal and expected. Unlike APA where you cite inline, law uses footnotes for every case and statute.",
        formatting: [
          { element: "🖊️ Font",          req: "Times New Roman 12pt (body); 10pt for footnotes" },
          { element: "📏 Spacing",       req: "1.5 lines" },
          { element: "📎 Footnotes",     req: "Mandatory for every case law citation — 10pt font at page bottom", tip: "Footnotes at the bottom of each page, not end-of-document endnotes." },
          { element: "📚 LL.M Sources",  req: "Separate Primary Source List required — minimum 40 academic sources" },
        ],
        chapters: [],
        wordCount: [],
        keyPoints: [
          "Case law format: Case Name, Year, Volume, Reporter, Page — e.g. Roe v Wade, 410 US 113 (1973)",
          "Statute: Short title, Year, Section — e.g. Contract Act, 2056, s.14",
          "LL.M: separate Primary Source List beyond the general bibliography",
        ],
        warnings: [
          "Using APA in-text citations instead of footnotes is a major formatting error in law",
          "Citing only textbooks without primary sources (cases, statutes) seriously weakens legal arguments",
        ],
        proTips: [
          "Use Zotero with a Chicago output style — manually managing footnotes across 80+ pages leads to errors",
          "Keep a running list of every case you cite — cross-referencing later is much faster",
        ],
      },
    ],
  },
  {
    id: "pu", name: "Pokhara University", short: "PU", emoji: "⛰️",
    established: "1997", students: "40,000+", campuses: "Gandaki Province",
    location: "Lekhnath, Kaski", primary: "APA 7th", color: "purple",
    headerGradient: "from-purple-600/30 via-purple-900/20 to-transparent",
    funFact: "PU is named after the Pokhara valley and serves the Gandaki region. It has one of the strictest plagiarism policies in Nepal — 15–20% Turnitin limit, enforced.",
    about: "PU has a strong reputation for research quality, especially in business and engineering. It's one of the stricter universities on plagiarism — the Turnitin limit is enforced, not just advised. If you're at PU, treat formatting seriously from Day 1.",
    faculties: [
      {
        name: "School of Business (SoB)", programs: "MBA, BBA, BBM",
        citation: "APA 7th Edition",
        intro: "PU SoB is research-oriented. Your Turnitin report is not optional — arrange access through your college if PU doesn't provide it directly. Run it at least 2 weeks before submission.",
        formatting: [
          { element: "📄 Paper & Font",  req: "A4, Times New Roman 12pt" },
          { element: "📏 Spacing",       req: "1.5 body; double for block quotes (40+ words)" },
          { element: "📐 Margins",       req: "Left 1.5 inch; others 1 inch" },
          { element: "📝 Abstract",      req: "200–300 words with 5–7 keywords" },
          { element: "🔍 Plagiarism",    req: "Turnitin < 20% — report signed by supervisor, attached to submission", tip: "References are excluded from the similarity count." },
        ],
        chapters: [
          "📌 Chapter 1 — Introduction",
          "📚 Chapter 2 — Literature Review",
          "🔬 Chapter 3 — Research Methodology",
          "📊 Chapter 4 — Data Analysis & Results",
          "🎯 Chapter 5 — Discussion, Conclusions & Recommendations",
          "📖 References (APA 7th)",
        ],
        wordCount: [
          { program: "MBA Dissertation", minimum: "15,000 words", typical: "18,000–22,000" },
          { program: "BBA Project",       minimum: "8,000 words",  typical: "10,000–14,000"  },
        ],
        keyPoints: [
          "Turnitin report must be signed by supervisor and submitted with thesis",
          "Block quotes (40+ words) are double-spaced and indented 0.5 inch",
          "Digital submission required alongside bound copies",
        ],
        warnings: [
          "Paraphrasing the same source repeatedly still flags on Turnitin",
          "Run Turnitin at least 2 weeks before submission — rewrites take time",
        ],
        proTips: [
          "If your similarity is 15–20%, go through it source by source and rewrite direct lifts",
          "State your research gap clearly at the end of Chapter 2 — examiners look for it",
        ],
      },
      {
        name: "School of Engineering (SoE)", programs: "B.E., M.Sc. Engineering",
        citation: "IEEE Numbered Format",
        intro: "Engineering projects at PU are technically thorough. Professional tools for diagrams aren't optional — blurry, hand-drawn, or low-resolution figures will be flagged in your viva.",
        formatting: [
          { element: "📏 Length",        req: "60–120 pages minimum" },
          { element: "🖊️ Font",         req: "Times New Roman 12pt; section headings 14pt bold" },
          { element: "📐 Spacing",       req: "1.5 lines" },
          { element: "📊 Diagrams",      req: "AutoCAD, MATLAB, professional tools — minimum 300 DPI", tip: "Screenshots from low-res monitors fail the 300 DPI requirement." },
          { element: "💾 Code",          req: "All code in appendix with documentation and README" },
        ],
        chapters: [],
        wordCount: [],
        keyPoints: [
          "All engineering diagrams must be from professional software at 300 DPI+",
          "Code must be in appendix AND on physical media",
          "Number every figure and always reference it in the text",
        ],
        warnings: [
          "Blurry or low-resolution diagrams are one of the most common examiner complaints",
        ],
        proTips: [
          "AutoCAD and MATLAB produce print-ready figures by default",
          "'As shown in Figure 3.2…' — always reference every figure in the body text",
        ],
      },
      {
        name: "School of Health & Allied Sciences", programs: "Nursing, Public Health",
        citation: "Vancouver (Numbered Superscripts)",
        intro: "Health research at PU requires ethics clearance from PU's own Ethical Review Board — not just any ethics committee. Make sure you apply to exactly the right one.",
        formatting: [
          { element: "📝 Abstract",    req: "Structured 250–300 words" },
          { element: "⚖️ Ethics",     req: "PU Ethical Review Board — mandatory before data collection" },
          { element: "📐 Sample Size",req: "Must be justified using power analysis — state 80% power minimum" },
          { element: "📊 Statistics", req: "SPSS, STATA, or R — output in appendices" },
        ],
        chapters: [],
        wordCount: [],
        keyPoints: [
          "Ethics clearance must be from PU's own board — not a generic approval",
          "Sample size needs power analysis in your methodology chapter",
          "Statistical software output belongs in appendices, not the main body",
        ],
        warnings: [
          "Getting the wrong ethics clearance letter (from a different board) is a frustrating mistake — confirm with your department",
        ],
        proTips: [
          "G*Power (free software) makes power analysis straightforward for sample size calculation",
          "Start learning SPSS early in your research year — it's widely used here",
        ],
      },
    ],
  },
  {
    id: "ku", name: "Kathmandu University", short: "KU", emoji: "🔬",
    established: "1991", students: "15,000+", campuses: "Autonomous",
    location: "Dhulikhel, Kavre", primary: "APA 7th / Harvard / IEEE", color: "cyan",
    headerGradient: "from-cyan-600/30 via-cyan-900/20 to-transparent",
    funFact: "KU is autonomous — it doesn't affiliate with TU. It has its own quality standards, and they're generally higher. Students here often publish internationally.",
    about: "KU punches above its weight for its size. It's genuinely research-focused with stricter plagiarism limits (15% vs the standard 20%). Students here often publish in international conferences — KU actively encourages and supports this.",
    faculties: [
      {
        name: "School of Management (SOM)", programs: "MBA, EMBA, BBA",
        citation: "APA 7th (Harvard also accepted)",
        intro: "KU SOM is serious about research rigour. The 15% Turnitin limit is stricter than anywhere else in Nepal, and the defense — closed-book oral, 3 examiners, 20–30 slides — requires real preparation.",
        formatting: [
          { element: "🖊️ Font & Spacing", req: "Times New Roman 12pt; 1.5 line spacing" },
          { element: "📐 Margins",         req: "Left 1.5 inch; others 1 inch" },
          { element: "🔍 Plagiarism",      req: "Turnitin < 15% — stricter than the 20% standard elsewhere", tip: "Literature review needs genuine paraphrasing, not surface rewording." },
          { element: "🎤 Defense",         req: "Closed-book oral exam — 3-member committee; 20–30 slide presentation" },
          { element: "📦 Submission",      req: "3 bound hard copies + 1 digital" },
        ],
        chapters: [],
        wordCount: [
          { program: "MBA Thesis", minimum: "18,000 words", typical: "18,000–25,000" },
        ],
        keyPoints: [
          "Research Concept Paper must be approved by your department before writing the full proposal",
          "KU welcomes mixed-methods research (surveys + interviews combined)",
          "Defense is closed-book — know your thesis well enough to answer without referring to it",
          "Your 20–30 slide deck: problem → objectives → methodology → key findings → contribution",
        ],
        warnings: [
          "The 15% limit catches people used to the 20% standard at other universities",
          "Skipping the Concept Paper approval step delays your whole timeline",
        ],
        proTips: [
          "Mixed-methods adds depth and is well-received at KU SOM",
          "List every assumption and limitation in your thesis — examiners go there first in viva",
          "Know your theoretical framework inside out — KU examiners frequently probe it",
        ],
      },
      {
        name: "School of Engineering (SOE)", programs: "M.Sc. Engineering, B.E.",
        citation: "IEEE Numbered References",
        intro: "KU Engineering expects original contribution. Your dissertation needs to add something new to the field, not just review what others have done. The poster + oral defense is a unique feature that sets KU SOE apart.",
        formatting: [
          { element: "📏 Length",              req: "60–80 pages minimum" },
          { element: "💡 Original Contribution",req: "Required — work must demonstrate new knowledge", tip: "Be ready to articulate exactly what is new about your work." },
          { element: "🎤 Defense",             req: "Poster presentation + formal oral defense" },
        ],
        chapters: [
          "📝 Abstract", "📌 Introduction", "📚 Related Work", "🔬 Methodology",
          "📊 Results", "💬 Discussion", "🎯 Conclusion", "📖 References", "📁 Appendices",
        ],
        wordCount: [],
        keyPoints: [
          "Research must demonstrate original contribution — review papers are not accepted",
          "Defense: poster presentation (visual explanation) + oral defense",
          "Conference submission to IEEE/Springer-indexed venues is strongly encouraged",
        ],
        warnings: [
          "Submitting a replication study as original research won't pass KU SOE's viva",
        ],
        proTips: [
          "Design your poster for a general audience — your committee includes people from different specializations",
          "Getting your work published at a conference before viva pre-validates your contribution",
        ],
      },
      {
        name: "School of Education (SOEd)", programs: "M.Ed, M.Phil Education",
        citation: "APA 7th",
        intro: "KU Education is one of the few places in Nepal that values critical and transformative research. If your work challenges conventional thinking about education, you're in the right place.",
        formatting: [
          { element: "📏 M.Phil Length",    req: "Minimum 25,000 words — must show original theoretical contribution" },
          { element: "🔬 Research Methods", req: "Transformative, Critical, Constructivist paradigms all accepted" },
          { element: "🎤 Defense",          req: "Two-stage: Internal review → External examiner" },
        ],
        chapters: [],
        wordCount: [
          { program: "M.Phil", minimum: "25,000 words", typical: "25,000–35,000" },
        ],
        keyPoints: [
          "M.Phil must show original theoretical contribution — not just applying existing theory",
          "Mixed-methods is actively welcomed",
          "Two-stage defense: internal review first, then external examiner",
        ],
        warnings: [
          "Survey-only M.Phil theses may not satisfy the original theoretical contribution requirement",
        ],
        proTips: [
          "Use your internal review as a full dress rehearsal — take the feedback seriously before the external examiner",
        ],
      },
    ],
  },
  {
    id: "puu", name: "Purbanchal University", short: "PuU", emoji: "🌄",
    established: "1994", students: "35,000+", campuses: "Koshi Province",
    location: "Biratnagar", primary: "APA 7th", color: "emerald",
    headerGradient: "from-emerald-600/30 via-emerald-900/20 to-transparent",
    funFact: "PuU serves the eastern region of Nepal and has grown significantly since 2022 when it adopted APA 7th across most faculties.",
    about: "PuU's guidelines largely mirror TU FOM standards — if you know TU, you're most of the way there. The cover colour is one of those small details that causes last-minute panic at the printing shop. Check it early.",
    faculties: [
      {
        name: "All Faculties — General Standards", programs: "Management, Science & Technology, Health Sciences",
        citation: "APA 7th (IEEE for CS/IT; Vancouver for Health)",
        intro: "PuU adopted APA 7th in 2022. Check the sample thesis your college provides — if it doesn't have DOI links on journal articles, the template is outdated.",
        formatting: [
          { element: "🖊️ Font & Size",  req: "Times New Roman 12pt (body), 14pt (chapter headings)" },
          { element: "📏 Spacing",       req: "1.5 lines" },
          { element: "📐 Margins",       req: "Left 1.5 inch; others 1 inch" },
          { element: "📏 Length",        req: "MBS/MBA: 80–150 pages; BBA: 50–80 pages" },
          { element: "🎨 Cover Colour",  req: "Maroon for management / Blue for science", tip: "Print one test copy before printing all three bound copies — wrong cover colour wastes money." },
          { element: "📦 Binding",       req: "Hard-bound for final; spiral for drafts" },
        ],
        chapters: [
          "📌 Chapter 1 — Introduction",
          "📚 Chapter 2 — Literature Review",
          "🔬 Chapter 3 — Research Methodology",
          "📊 Chapter 4 — Data Presentation & Analysis",
          "🎯 Chapter 5 — Summary, Conclusions & Recommendations",
          "📖 References (APA 7th)",
          "📁 Appendices",
        ],
        wordCount: [
          { program: "MBS/MBA", minimum: "80 pages",  typical: "80–150 pages" },
          { program: "BBA",     minimum: "50 pages",  typical: "50–80 pages"  },
        ],
        keyPoints: [
          "APA 7th adopted 2022 — older college templates may still use APA 6th",
          "Maroon cover (management) / Blue cover (science) — strictly enforced",
          "Health Sciences require ethics clearance before any data collection",
        ],
        warnings: [
          "Wrong cover colour discovered on submission day is a real and avoidable problem",
          "Some college-provided templates are still APA 6th — verify yours",
        ],
        proTips: [
          "Ask your library for a thesis approved in 2022 or later — not an older one — as your formatting reference",
          "Start the hard binding process early — binderies get very busy near submission season",
        ],
      },
    ],
  },
  {
    id: "mwu", name: "Mid-Western University", short: "MWU", emoji: "🏔️",
    established: "2010", students: "20,000+", campuses: "Karnali Province",
    location: "Surkhet", primary: "APA 7th", color: "amber",
    headerGradient: "from-amber-600/30 via-amber-900/20 to-transparent",
    funFact: "MWU serves Karnali Province, one of the most remote regions of Nepal. Its guidelines are designed to be accessible and closely follow TU FOM standards.",
    about: "MWU deliberately aligns its research guidelines with TU FOM to maintain consistency. If you can't find a specific requirement, TU FOM guidelines are a safe fallback — but always confirm with your faculty handbook.",
    faculties: [
      {
        name: "All Faculties — General Standards", programs: "Management, Science, Engineering, Education",
        citation: "APA 7th (IEEE preferred for CS/Engineering)",
        intro: "MWU's guidelines are well-documented and accessible. Your faculty handbook is your most reliable reference — get it from your department on Day 1 of your research year.",
        formatting: [
          { element: "🖊️ Font & Spacing", req: "Times New Roman 12pt; 1.5 line spacing" },
          { element: "📐 Margins",         req: "Left 1.5 inch; others 1 inch" },
          { element: "📝 Abstract",        req: "150–250 words with 4–6 keywords" },
          { element: "🎨 Cover Colour",    req: "Dark Blue for all programs" },
          { element: "📦 Submission",      req: "2 bound copies + 1 PDF on USB" },
        ],
        chapters: [],
        wordCount: [
          { program: "Master's Thesis",  minimum: "10,000 words", typical: "10,000–18,000" },
          { program: "PhD Dissertation", minimum: "60,000 words", typical: "60,000–90,000" },
        ],
        keyPoints: [
          "MWU requires only 2 bound copies (not 3 like TU)",
          "Dark blue cover colour across all programs",
          "Guidelines closely follow TU FOM — a safe baseline when in doubt",
        ],
        warnings: [
          "Don't assume MWU and TU requirements are identical — the number of copies, cover colour, and some formatting details differ",
        ],
        proTips: [
          "Get your faculty handbook from the department office on Day 1 — it's your most reliable source",
        ],
      },
    ],
  },
  {
    id: "fwu", name: "Far-Western University", short: "FWU", emoji: "🌿",
    established: "2010", students: "15,000+", campuses: "Sudurpashchim Province",
    location: "Mahendranagar", primary: "APA 7th", color: "pink",
    headerGradient: "from-pink-600/30 via-pink-900/20 to-transparent",
    funFact: "FWU has a distinctive viva-first policy — you defend your thesis first, make corrections, then get it bound and printed. Don't waste money binding before your viva.",
    about: "FWU serves Nepal's far-western region. One unique feature: you must pass your viva before submitting final bound copies. The defense happens first, corrections are made, and only then you print the final version.",
    faculties: [
      {
        name: "All Faculties — General Standards", programs: "Management, Education, Agriculture",
        citation: "APA 7th (Harvard accepted in some departments)",
        intro: "FWU's preliminary pages must appear in the exact prescribed order — examiners check this carefully. The viva-first process means you should account for post-defense correction time before your printing deadline.",
        formatting: [
          { element: "🖊️ Font & Spacing",    req: "Times New Roman 12pt; 1.5 lines" },
          { element: "📐 Margins",             req: "Left 1.5 inch; others 1 inch" },
          { element: "📏 Word Count",          req: "Master's: minimum 10,000 words" },
        ],
        chapters: [
          "📃 Title page", "✅ Supervisor's recommendation", "🏛️ Approval sheet",
          "🙏 Acknowledgements", "📝 Abstract", "📋 Table of Contents",
          "📊 List of Tables & Figures", "🔤 Abbreviations",
          "📌 Main Chapters (Introduction → Conclusions)",
          "📖 References", "📁 Appendices",
        ],
        wordCount: [
          { program: "Master's Thesis", minimum: "10,000 words", typical: "10,000–16,000" },
        ],
        keyPoints: [
          "Viva defense must be passed BEFORE printing final bound copies — make corrections first",
          "Preliminary pages must be in the exact order above",
          "Agriculture programs in some departments use CSE citation — verify with supervisor",
        ],
        warnings: [
          "Getting your thesis bound before your viva only to need corrections is a waste of money — always wait",
        ],
        proTips: [
          "Ask which citation format (Harvard or APA) your department actually uses before writing your first reference",
          "After viva, read the correction list carefully before printing — missing even one is a problem",
        ],
      },
    ],
  },
  {
    id: "afu", name: "Agriculture & Forestry University", short: "AFU", emoji: "🌾",
    established: "2010", students: "8,000+", campuses: "Nepal's only agriculture university",
    location: "Rampur, Chitwan", primary: "APA 7th / CSE", color: "lime",
    headerGradient: "from-lime-600/30 via-lime-900/20 to-transparent",
    funFact: "AFU is the only university in Nepal dedicated entirely to agriculture and forestry. Every single scientific name must be italicized — without exception. Examiners check for this.",
    about: "AFU has a strong field-research culture. Double spacing (unlike the 1.5 standard elsewhere) is used because examiners write notes in the margins. Your document will be longer than you expect — this is completely normal.",
    faculties: [
      {
        name: "All Programs", programs: "B.Sc. Agriculture, Forestry, B.V.Sc. & AH, M.Sc., PhD",
        citation: "APA 7th (CSE for some biology/ecology departments — confirm with supervisor)",
        intro: "AFU theses are field-heavy and data-rich. The double spacing makes room for examiner notes. Scientific names must be italicized every single time — there are no exceptions.",
        formatting: [
          { element: "🖊️ Font & Spacing",   req: "Times New Roman 12pt; Double spacing (thesis); 1.5 for seminar papers", tip: "Double spacing makes documents feel much longer — this is expected." },
          { element: "📐 Margins",           req: "Left 1.5 inch; others 1 inch" },
          { element: "🌿 Scientific Names",  req: "Italicized every time — binomial nomenclature always (e.g. Oryza sativa)", tip: "Use Find & Replace before submission to catch any you missed." },
          { element: "📐 Units",             req: "SI units mandatory — no imperial measurements anywhere" },
          { element: "🔢 Numbers",           req: "Below 10 spelled out (e.g. 'seven samples') except in tables and figures" },
        ],
        chapters: [
          "📌 Chapter 1 — Introduction",
          "📚 Chapter 2 — Literature Review",
          "🧪 Chapter 3 — Materials & Methods",
          "📊 Chapter 4 — Results & Discussion",
          "🎯 Chapter 5 — Summary, Conclusions & Recommendations",
          "📖 References (APA 7th or CSE)",
          "📁 Appendices (field data, lab results, statistical output)",
        ],
        wordCount: [
          { program: "M.Sc. Thesis", minimum: "15,000 words", typical: "15,000–25,000" },
        ],
        keyPoints: [
          "Every Latin name must be italicized every time — e.g. Oryza sativa, not Oryza Sativa",
          "SI units mandatory — metres not feet, kilograms not pounds",
          "Animal research requires IACUC clearance",
          "Statistical software: GenStat, SAS, SPSS, or R",
        ],
        warnings: [
          "Forgetting to italicize scientific names is flagged by every single examiner",
          "Using non-SI units (acres, pounds, inches) is a serious error",
          "Animal research without IACUC clearance is an ethical violation",
        ],
        proTips: [
          "Use Find & Replace in Word to check for unitalicized scientific names before submission",
          "Document field work with photos and GPS coordinates — it strengthens your methods section",
          "R is free and widely used in agricultural research — worth learning early",
        ],
      },
    ],
  },
  {
    id: "nsu", name: "Nepal Sanskrit University", short: "NSU", emoji: "📿",
    established: "1986", students: "12,000+", campuses: "Lumbini Province",
    location: "Beljhundi, Dang", primary: "APA 7th / Chicago 17th", color: "orange",
    headerGradient: "from-orange-600/30 via-orange-900/20 to-transparent",
    funFact: "PhD dissertations at NSU require trilingual abstracts — in Sanskrit, Nepali, and English. All three. Every time.",
    about: "NSU is unique in Nepal — it's where classical Sanskrit scholarship meets modern academic standards. PhD dissertations require trilingual abstracts and a Sanskrit summary (saṃkṣepa) regardless of the primary language of the thesis.",
    faculties: [
      {
        name: "All Programs", programs: "PhD Finance, MBA, Humanities, Sanskrit Studies",
        citation: "APA 7th (management & social sciences); Chicago 17th (Sanskrit & classical studies)",
        intro: "NSU operates at the intersection of ancient scholarship and modern academia. Devanagari font requirements and IAST transliteration standards are not optional for any Sanskrit content.",
        formatting: [
          { element: "🖊️ Font (English)",          req: "Times New Roman 12pt" },
          { element: "🕉️ Font (Devanagari)",        req: "Preeti or Mangal — no other fonts accepted", tip: "Make sure your supervisor's computer can read the font you choose." },
          { element: "🔤 Transliteration",           req: "IAST (International Alphabet of Sanskrit Transliteration) standard" },
          { element: "📏 Spacing (English)",         req: "1.5 lines" },
        ],
        chapters: [],
        wordCount: [
          { program: "PhD Dissertation", minimum: "60,000 words", typical: "60,000–80,000" },
        ],
        keyPoints: [
          "PhD requires trilingual abstract — Sanskrit, Nepali, and English — all three required",
          "Must include a Sanskrit summary (saṃkṣepa) regardless of primary thesis language",
          "Dissertations can be written in Nepali, Sanskrit, or English depending on faculty",
          "Chicago 17th (Notes-Bibliography) for Sanskrit and classical studies",
        ],
        warnings: [
          "Non-standard Devanagari fonts that examiners' systems can't display cause serious submission problems",
          "Missing the trilingual abstract requirement is not a minor omission — it's fundamental",
        ],
        proTips: [
          "Standardize on Preeti or Mangal from your very first page — switching fonts mid-document causes formatting chaos",
          "Use the IAST character map for diacritical marks — guessing leads to errors",
        ],
      },
    ],
  },
  {
    id: "bpkihs", name: "B.P. Koirala Institute of Health Sciences", short: "BPKIHS", emoji: "🏥",
    established: "1993", students: "5,000+", campuses: "Deemed University",
    location: "Dharan, Sunsari", primary: "Vancouver (ICMJE) — Strictly Enforced", color: "red",
    headerGradient: "from-red-600/30 via-red-900/20 to-transparent",
    funFact: "BPKIHS is Nepal's leading medical institute and the strictest in this entire guide. Vancouver referencing is not a preference — it's a strict requirement. No APA, no Chicago, no exceptions.",
    about: "BPKIHS operates at international medical research standards. The IRC approval process alone — 3 months to apply, 4–6 weeks for revisions — means you must plan your entire research timeline working backwards from your submission deadline.",
    faculties: [
      {
        name: "All Programs", programs: "MBBS, MD, MS, MPH, BDS, Nursing",
        citation: "Vancouver (ICMJE) — strictly enforced — numbered superscript/bracketed",
        intro: "BPKIHS is where you cannot afford to wing it. Every formatting rule here exists for a reason — mostly because Nepal's medical research needs to meet international publication standards. The IRC timeline alone should tell you how seriously they take this.",
        formatting: [
          { element: "🖊️ Font",          req: "Times New Roman 12pt (Arial 11pt accepted)" },
          { element: "📏 Spacing",       req: "Double spacing throughout — including the references section", tip: "Yes, even your references list is double-spaced. Don't compress it." },
          { element: "📐 Margins",       req: "1 inch ALL sides — NOT 1.5 inch left margin like other universities", tip: "This is different from every other university in this guide." },
          { element: "📝 Abstract",      req: "Structured: Objectives / Methods / Results / Conclusions — max 250 words", tip: "Each heading is a separate section. No citations inside." },
          { element: "📊 Tables",        req: "Title ABOVE table; three-line format preferred; every table referenced in text" },
          { element: "🖼️ Figures",       req: "Caption BELOW figure; numbered sequentially; minimum 300 DPI" },
          { element: "📉 P-values",      req: "3 decimal places — write p < 0.001, never p = 0.000", tip: "p = 0.000 is mathematically wrong." },
          { element: "⚖️ Ethics",        req: "IRC approval mandatory — apply 3 months before data collection" },
          { element: "✍️ Consent",       req: "Written consent in Nepali language — English-only rejected" },
        ],
        chapters: [
          "📋 Title page, Certification, Acknowledgements, Abstract, TOC, Lists, Abbreviations",
          "📌 Chapter 1 — Introduction",
          "📚 Chapter 2 — Literature Review",
          "🔬 Chapter 3 — Materials & Methodology (study design, sample size formula, ethics plan)",
          "📊 Chapter 4 — Results",
          "💬 Chapter 5 — Discussion",
          "🎯 Chapter 6 — Conclusion & Recommendations",
          "📖 References (Vancouver, numbered in citation order)",
          "📁 Annexes (IRC clearance letter, consent forms, questionnaire, budget)",
        ],
        wordCount: [],
        keyPoints: [
          "Vancouver: numbered [1], [2]… in citation order — NOT alphabetical",
          "IRC clearance letter MUST be in annexes — missing it = rejection",
          "Consent forms must be in Nepali language",
          "Adverse events during research must be reported to IRC immediately",
          "Keep all signed consent forms — you may be audited",
        ],
        warnings: [
          "Collecting even one data point before IRC approval is an ethical violation — no exceptions ever",
          "IRC revisions take 4–6 weeks — apply 3 full months before your data collection date",
          "Using APA or Chicago format = rejection. Vancouver only. Every time.",
          "p = 0.000 is wrong — always write p < 0.001",
        ],
        proTips: [
          "Submit IRC application as early as possible — multiple revision rounds are completely normal",
          "Use Endnote or Mendeley with Vancouver output style — manually managing numbered references in a long thesis leads to numbering errors",
          "Read published BPKIHS theses from the library — the best formatting guide you can find",
          "Keep all original signed consent forms in a secure folder",
        ],
      },
    ],
  },
];

/* ─── GENERAL STANDARDS ─── */
const generalStandards = [
  {
    id: "plagiarism", emoji: "🔍", title: "Plagiarism & Originality", color: "red",
    intro: "Every Nepali university uses Turnitin or similar tools. The threshold varies — but the consequences don't. A thesis above the limit gets sent back for full rewriting.",
    items: [
      "Standard threshold: < 20% (TU, PuU, MWU, FWU, AFU, NSU)",
      "Stricter: < 15% at KU and PU — know which one applies to you",
      "References and bibliography are excluded from the count",
      "Self-plagiarism counts — if reusing your own previous work, cite yourself",
      "Surface-level paraphrasing still flags — actually understand and restate the idea",
    ],
    visual: { label: "Typical limit", value: 20, strict: 15 },
  },
  {
    id: "references", emoji: "📚", title: "How Many References Do You Need?", color: "blue",
    intro: "Your reference count signals how seriously you engaged with existing knowledge. A thin bibliography is a red flag that examiners notice immediately.",
    items: [
      "Master's thesis: minimum 40–60 sources",
      "PhD dissertation: minimum 80–120 sources",
      "At least 60% from the past 10 years — show you know the current state of the field",
      "Primary sources (original studies, legal cases, data) preferred over secondary (textbooks)",
      "Grey literature (government reports, institutional documents) can be included — but shouldn't dominate",
    ],
    visual: { label: "Master's minimum", value: 40, max: 120 },
  },
  {
    id: "abstract", emoji: "📝", title: "Writing a Strong Abstract", color: "purple",
    intro: "Your abstract is the first thing examiners read. A well-written abstract creates confidence that the thesis that follows is worth reading. Write it last.",
    items: [
      "Standard abstract: 150–300 words — background, objectives, methods, findings, conclusion",
      "Structured abstract (health sciences): 250–350 words with fixed section headings",
      "Include 4–7 keywords below the abstract",
      "Never put citations inside the abstract",
      "Write it last — summarising a finished thesis is much easier than predicting one",
    ],
    visual: null,
  },
  {
    id: "submission", emoji: "📦", title: "Binding & Submission", color: "green",
    intro: "The final submission has specific physical requirements. Getting them wrong means a trip back to the printing shop under deadline pressure.",
    items: [
      "Typically 3 bound copies: examiner, library, department",
      "1 digital copy (USB or CD) — include a PDF version",
      "Spiral binding for drafts; hard binding for final submission",
      "Cover colour is often specified by faculty — always check before binding",
      "At FWU: pass viva first, make corrections, then print final bound copies",
    ],
    visual: null,
  },
  {
    id: "samplesize", emoji: "🔢", title: "Calculating Your Sample Size", color: "cyan",
    intro: "An unjustified sample size is one of the most common weaknesses in methodology chapters. You need a formula, not just a number.",
    items: [
      "Known population — Yamane's Formula: n = N ÷ (1 + Ne²) where e = 0.05",
      "Unknown/large population — Cochran's Formula: n ≈ 384 (95% confidence, 5% margin of error)",
      "Health sciences — Power Analysis using G*Power (free software), typically 80% power",
      "State your formula AND justify why you chose it in Chapter 3",
    ],
    visual: null,
  },
  {
    id: "reliability", emoji: "⚡", title: "Reliability & Validity", color: "amber",
    intro: "If your research uses a questionnaire, you must show it measures what it's supposed to (validity) and does so consistently (reliability).",
    items: [
      "Cronbach's Alpha ≥ 0.7 — minimum acceptable",
      "α ≥ 0.8 — good reliability",
      "α ≥ 0.9 — excellent reliability",
      "Report the exact α value for every scale in your methodology chapter",
      "Content validity: have subject experts review your questionnaire before finalising",
    ],
    visual: null,
  },
];

const citationGuide = [
  { emoji: "💼", discipline: "Management / Business / Social Sciences", format: "APA 7th", note: "Most common in Nepal", color: "blue" },
  { emoji: "💻", discipline: "Engineering / IT / Computer Science",      format: "IEEE",     note: "Numbered by citation order", color: "cyan" },
  { emoji: "🏥", discipline: "Health / Medical Sciences",                format: "Vancouver",note: "Strictly enforced at medical institutes", color: "red" },
  { emoji: "⚖️", discipline: "Law / Legal Studies",                      format: "Chicago 17th or OSCOLA", note: "Footnotes required for case law", color: "purple" },
  { emoji: "🌾", discipline: "Agriculture / Life Sciences",              format: "APA 7th or CSE", note: "Confirm with your supervisor", color: "lime" },
  { emoji: "📿", discipline: "Sanskrit / Classical Studies",             format: "Chicago 17th", note: "Notes-Bibliography style", color: "orange" },
];

/* ─── COLOR MAPS ─── */
const cBadge: Record<string,string> = {
  blue:"border-blue-500/30 bg-blue-500/10 text-blue-300", purple:"border-purple-500/30 bg-purple-500/10 text-purple-300",
  cyan:"border-cyan-500/30 bg-cyan-500/10 text-cyan-300", emerald:"border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  amber:"border-amber-500/30 bg-amber-500/10 text-amber-300", pink:"border-pink-500/30 bg-pink-500/10 text-pink-300",
  lime:"border-lime-500/30 bg-lime-500/10 text-lime-300", orange:"border-orange-500/30 bg-orange-500/10 text-orange-300",
  red:"border-red-500/30 bg-red-500/10 text-red-300",
};
const cIcon: Record<string,string> = {
  blue:"text-blue-400", purple:"text-purple-400", cyan:"text-cyan-400", emerald:"text-emerald-400",
  amber:"text-amber-400", pink:"text-pink-400", lime:"text-lime-400", orange:"text-orange-400", red:"text-red-400",
};
const cBg: Record<string,string> = {
  blue:"bg-blue-600", purple:"bg-purple-600", cyan:"bg-cyan-600", emerald:"bg-emerald-600",
  amber:"bg-amber-600", pink:"bg-pink-600", lime:"bg-lime-600", orange:"bg-orange-600", red:"bg-red-600",
};

/* ─── FACULTY CARD ─── */
function FacultyCard({ faculty }: { faculty: Faculty }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      <button onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors">
        <div>
          <p className="font-semibold text-white text-sm">{faculty.name}</p>
          <p className="text-xs text-slate-400 mt-0.5">{faculty.programs} &nbsp;·&nbsp; {faculty.citation}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }} transition={{ duration:0.28 }} className="overflow-hidden">
            <div className="border-t border-white/[0.06] px-5 py-5 space-y-6">

              {/* Intro note */}
              <div className="flex items-start gap-2.5 rounded-xl border border-blue-500/15 bg-blue-500/5 px-4 py-3">
                <span className="text-lg">💬</span>
                <p className="text-sm leading-relaxed text-slate-300">{faculty.intro}</p>
              </div>

              {/* Formatting */}
              {faculty.formatting.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">📋 Formatting Requirements</p>
                  <div className="overflow-x-auto rounded-lg border border-white/[0.07]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-white/[0.04] border-b border-white/[0.06]">
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 min-w-[160px]">Element</th>
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400">What you need to do</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {faculty.formatting.map(row => (
                          <tr key={row.element} className="hover:bg-white/[0.02]">
                            <td className="px-4 py-3 font-medium text-slate-200 align-top whitespace-nowrap text-xs">{row.element}</td>
                            <td className="px-4 py-3 text-slate-300 text-xs">
                              {row.req}
                              {row.tip && (
                                <p className="mt-1.5 flex items-start gap-1.5 text-amber-400/80">
                                  <Lightbulb className="h-3 w-3 flex-shrink-0 mt-0.5" />
                                  {row.tip}
                                </p>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Chapters */}
              {faculty.chapters.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">📖 Chapter Structure</p>
                  <div className="space-y-2">
                    {faculty.chapters.map((ch, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 min-w-[1.5rem] items-center justify-center rounded-full bg-blue-500/15 text-[10px] font-bold text-blue-400 mt-0.5">{i+1}</span>
                        <p className="text-sm text-slate-300 leading-relaxed">{ch}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Word count */}
              {faculty.wordCount.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">📏 Length Requirements</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {faculty.wordCount.map(wc => (
                      <div key={wc.program} className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-3">
                        <p className="text-xs font-bold text-white">{wc.program}</p>
                        <p className="text-xs text-blue-400 mt-1">Minimum: {wc.minimum}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Typical: {wc.typical}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key points */}
              {faculty.keyPoints.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">✅ What You Need to Know</p>
                  <ul className="space-y-2">
                    {faculty.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-400 mt-0.5" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {faculty.warnings.length > 0 && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">🚨 Common Mistakes to Avoid</p>
                  <ul className="space-y-2">
                    {faculty.warnings.map((w, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400 mt-0.5" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pro tips */}
              {faculty.proTips.length > 0 && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">⭐ Pro Tips from Our Experts</p>
                  <ul className="space-y-2">
                    {faculty.proTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Star className="h-4 w-4 flex-shrink-0 text-amber-400 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── UNIVERSITY PANEL ─── */
function UniversityPanel({ uni }: { uni: University }) {
  return (
    <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:0.32, ease:EASE }} className="space-y-4">

      {/* Header card */}
      <div className={cn("rounded-2xl border border-white/[0.09] overflow-hidden bg-gradient-to-br", uni.headerGradient, "bg-[#0a1628]")}>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] border border-white/[0.1] text-4xl">
              {uni.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-white">{uni.name}</h2>
                <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-bold", cBadge[uni.color])}>{uni.short}</span>
              </div>
              <p className="text-sm text-slate-400 mb-3">📍 {uni.location}</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon:"📅", label: `Est. ${uni.established}` },
                  { icon:"👥", label: uni.students },
                  { icon:"🏛️", label: uni.campuses },
                ].map(({ icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                    {icon} {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* About */}
          <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3">
            <p className="text-sm leading-relaxed text-slate-300">{uni.about}</p>
          </div>

          {/* Fun fact */}
          <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3">
            <span className="text-base">💡</span>
            <p className="text-xs leading-relaxed text-slate-300"><span className="font-semibold text-yellow-300">Did you know? </span>{uni.funFact}</p>
          </div>

          {/* Primary citation */}
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">Primary citation:</span>
            <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold", cBadge[uni.color])}>{uni.primary}</span>
          </div>
        </div>
      </div>

      {/* Faculty cards */}
      <div className="space-y-3">
        {uni.faculties.map(f => <FacultyCard key={f.name} faculty={f} />)}
      </div>

      {/* Advisory */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
        <span className="text-base flex-shrink-0">⚠️</span>
        <p className="text-sm text-slate-300">
          <span className="font-semibold text-amber-300">Always verify with your own supervisor.</span>{" "}
          Individual campuses and departments frequently have variations not listed here. These guidelines were verified for the 2024–25 academic year.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── MAIN PAGE ─── */
export function GuidelinesPage() {
  const [activeUni, setActiveUni] = useState("tu");
  const [search,    setSearch]    = useState("");
  const [openStd,   setOpenStd]   = useState<string|null>(null);

  const filtered   = universities.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.short.toLowerCase().includes(search.toLowerCase()));
  const activeData = universities.find(u => u.id === activeUni) ?? universities[0];

  return (
    <div className="min-h-screen pt-16 bg-mesh">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/8 blur-[140px]" />
          <div className="absolute right-0 bottom-0 h-[300px] w-[400px] rounded-full bg-purple-600/6 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
            className="mb-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
              <Sparkles className="h-3.5 w-3.5" /> Free Resource — Verified 2024–25
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.55, delay:0.1, ease:EASE }}
            className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-5">
            Nepal University{" "}
            <span className="gradient-text">Thesis Guidelines</span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.2, ease:EASE }}
            className="text-center text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-6">
            We know how frustrating it is to get conflicting formatting advice — from your supervisor,
            the college noticeboard, and a three-year-old PDF that may or may not still be current.
            This is your one clear reference, built for Nepali students.
          </motion.p>

          {/* Stats row */}
          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.45, delay:0.3 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-2xl mx-auto mb-8">
            {[
              { emoji:"🏛️", value:"10+",      label:"Universities" },
              { emoji:"📚", value:"30+",      label:"Programs" },
              { emoji:"📖", value:"5",        label:"Citation Formats" },
              { emoji:"✅", value:"2024–25",  label:"Last Verified" },
            ].map(({ emoji, value, label }) => (
              <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4 text-center">
                <div className="text-2xl mb-1">{emoji}</div>
                <p className="text-xl font-bold gradient-text">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Warning note */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.4, delay:0.4 }}
            className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-3 max-w-2xl mx-auto">
            <span className="text-lg flex-shrink-0">⚠️</span>
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-amber-300">One honest note:</span> guidelines change,
              and your campus may have variations. Always cross-check with your supervisor before finalising your format.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Citation quick-ref ── */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-white">🤔 Not Sure Which Citation Style to Use?</h2>
            <p className="mt-1 text-sm text-slate-400">Your citation format depends on your <span className="text-white font-medium">field of study</span> — not just your university. Find yours here before writing a single reference.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {citationGuide.map(({ emoji, discipline, format, note, color }) => (
              <div key={discipline} className={cn("rounded-xl border p-4 flex items-start gap-3", cBadge[color])}>
                <span className="text-2xl flex-shrink-0">{emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{discipline}</p>
                  <p className={cn("text-sm font-bold mt-0.5", cIcon[color])}>{format}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── University selector ── */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">🏛️ University-Specific Guidelines</h2>
            <p className="mt-1 text-sm text-slate-400">Select your university for formatting requirements, chapter structures, word counts, common mistakes, and expert tips.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[290px_1fr]">

            {/* Sidebar */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search universities…"
                  className="w-full rounded-xl border border-white/[0.09] bg-white/[0.04] py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none" />
              </div>
              <nav className="space-y-1">
                {filtered.map(uni => {
                  const isActive = activeUni === uni.id;
                  return (
                    <button key={uni.id} onClick={() => setActiveUni(uni.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all",
                        isActive ? `${cBg[uni.color]} text-white shadow-lg` : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                      )}>
                      <span className="text-xl flex-shrink-0">{uni.emoji}</span>
                      <span className="truncate flex-1">{uni.name}</span>
                      {isActive && <ChevronRight className="ml-auto h-4 w-4 flex-shrink-0" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Panel */}
            <div>
              <AnimatePresence mode="wait">
                <UniversityPanel key={activeUni} uni={activeData} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── General standards ── */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300">
              Applies to Every University
            </span>
            <h2 className="mt-4 text-2xl font-bold text-white">📐 General Academic Writing Standards</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              These apply across almost every Nepali university. Even if your supervisor doesn&apos;t mention them,
              your examiner will notice if you get them wrong. Click each card to expand.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {generalStandards.map(std => {
              const Icon = std.id === "plagiarism" ? Shield : std.id === "references" ? BookOpen :
                           std.id === "abstract" ? FileText : std.id === "submission" ? GraduationCap :
                           std.id === "samplesize" ? Users : CheckCircle2;
              const isOpen = openStd === std.id;
              return (
                <div key={std.id} className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
                  <button onClick={() => setOpenStd(isOpen ? null : std.id)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{std.emoji}</span>
                      <div>
                        <span className="text-sm font-semibold text-white">{std.title}</span>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration:0.2 }}>
                      <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
                        exit={{ height:0, opacity:0 }} transition={{ duration:0.22 }} className="overflow-hidden">
                        <div className="border-t border-white/[0.06] px-5 py-4 space-y-3">
                          <p className="text-sm text-slate-400 leading-relaxed">{std.intro}</p>

                          {/* Plagiarism visual bar */}
                          {std.id === "plagiarism" && (
                            <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 space-y-3">
                              <p className="text-xs font-semibold text-slate-400">Similarity thresholds</p>
                              <div>
                                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                                  <span>Standard (TU, PuU, MWU…)</span>
                                  <span className="text-red-400 font-bold">20%</span>
                                </div>
                                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                                  <div className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{ width:"100%" }} />
                                  <div className="h-full -mt-3 rounded-full bg-black/60" style={{ marginLeft:"20%", width:"80%" }} />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                                  <span>Strict (KU, PU)</span>
                                  <span className="text-orange-400 font-bold">15%</span>
                                </div>
                                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                                  <div className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{ width:"100%" }} />
                                  <div className="h-full -mt-3 rounded-full bg-black/60" style={{ marginLeft:"15%", width:"85%" }} />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Reliability visual */}
                          {std.id === "reliability" && (
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { label:"≥ 0.7", note:"Minimum", color:"text-yellow-400", bg:"bg-yellow-500/10 border-yellow-500/20" },
                                { label:"≥ 0.8", note:"Good",    color:"text-blue-400",   bg:"bg-blue-500/10 border-blue-500/20"   },
                                { label:"≥ 0.9", note:"Excellent",color:"text-green-400", bg:"bg-green-500/10 border-green-500/20" },
                              ].map(r => (
                                <div key={r.label} className={cn("rounded-lg border p-2.5 text-center", r.bg)}>
                                  <p className={cn("text-lg font-bold", r.color)}>{r.label}</p>
                                  <p className="text-xs text-slate-400 mt-0.5">{r.note}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          <ul className="space-y-2">
                            {std.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-400 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300">
              Side-by-Side
            </span>
            <h2 className="mt-4 text-2xl font-bold text-white">⚡ Quick Compare — All Universities</h2>
            <p className="mt-1 text-sm text-muted-foreground">Useful if you&apos;re transferring between universities or helping a friend at a different institution.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.04] border-b border-white/[0.07]">
                  {["University","Management","Engineering","Health / Medical","Font","Spacing","Left Margin"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-slate-300 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  ["🏛️ TU",  "APA 7th","IEEE","Vancouver","TNR 12pt","1.5","1.5 in"],
                  ["⛰️ PU",  "APA 7th","IEEE","Vancouver","TNR 12pt","1.5","1.5 in"],
                  ["🔬 KU",  "APA 7th","IEEE","Vancouver","TNR 12pt","1.5","1.5 in"],
                  ["🌄 PuU", "APA 7th","IEEE","Vancouver","TNR 12pt","1.5","1.5 in"],
                  ["🏔️ MWU","APA 7th","IEEE/APA","Vancouver","TNR 12pt","1.5","1.5 in"],
                  ["🌿 FWU", "APA 7th","IEEE","Vancouver","TNR 12pt","1.5","1.5 in"],
                  ["🌾 AFU", "APA 7th","APA 7th","Vancouver","TNR 12pt","Double","1.5 in"],
                  ["📿 NSU", "APA 7th","—","—","TNR 12pt","1.5","1.5 in"],
                  ["🏥 BPKIHS","—","—","Vancouver","TNR 12pt","Double","1 in"],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.025] transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className={cn("px-4 py-3", j===0 ? "font-semibold text-white whitespace-nowrap" : "text-slate-400")}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/[0.06] pb-20 md:pb-28 pt-16 md:pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:0.5 }}
            className="relative overflow-hidden rounded-3xl border border-blue-500/25 bg-gradient-to-br from-blue-950/60 to-purple-950/60 px-8 py-14 text-center">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/8 to-purple-600/8" />
            <div className="relative">
              <div className="mb-4 text-5xl">🎓</div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
                <Zap className="h-3.5 w-3.5" /> We Handle Everything
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Know the Rules.{" "}
                <span className="gradient-text">Let Us Apply Them.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
                You&apos;ve read the guidelines. Now imagine not having to worry about a single one of them.
                Our experts are fluent in APA 7th, IEEE, Vancouver, and Chicago — and they apply them
                correctly, every time. You focus on the ideas. We handle the rest.
              </p>

              {/* Trust row */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                {["✅ 100% Original","⚡ 3-hour turnaround","🔄 Free revisions","⭐ 4.9/5 rating"].map(t => (
                  <span key={t} className="flex items-center gap-1">{t}</span>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button variant="glow" size="lg" asChild>
                  <Link href="/register">Get a Free Quote <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <a href="https://wa.me/9779749231395" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-600/10 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-green-600/20">
                  <MessageCircle className="h-4 w-4 text-green-400" />
                  Chat on WhatsApp
                </a>
              </div>
              <p className="mt-4 text-xs text-slate-500">💬 We reply in under 2 minutes · Free quote · No obligation</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
