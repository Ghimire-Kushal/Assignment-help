"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileText,
  GraduationCap,
  Info,
  Lightbulb,
  MessageCircle,
  Search,
  Shield,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/Button";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

/* ─────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────── */

interface FormatRow { element: string; req: string; tip?: string; }
interface WordCount  { program: string; minimum: string; typical: string; }
interface Faculty {
  name: string; programs: string; citation: string;
  intro: string;
  formatting: FormatRow[];
  chapters: string[];
  wordCount: WordCount[];
  keyPoints: string[];
  warnings: string[];
  proTips: string[];
}
interface University {
  id: string; name: string; short: string;
  established: string; students: string; campuses: string;
  location: string; primary: string; color: string;
  about: string;
  faculties: Faculty[];
}

const stats = [
  { value: "10+", label: "Universities Covered" },
  { value: "30+", label: "Programs & Faculties" },
  { value: "5",   label: "Citation Formats" },
  { value: "2024–25", label: "Last Verified" },
];

const universities: University[] = [
  {
    id: "tu",
    name: "Tribhuvan University",
    short: "TU",
    established: "1959",
    students: "500,000+",
    campuses: "60+",
    location: "Kirtipur, Kathmandu",
    primary: "APA 7th",
    color: "blue",
    about: "Nepal's oldest and largest university. If you're studying at almost any college in Nepal, there's a good chance you're affiliated with TU. Its sheer size means guidelines can vary between campuses — always cross-check with your own department, not just the central TU guidelines.",
    faculties: [
      {
        name: "Faculty of Management (FOM)",
        programs: "MBS, MBA, BBA",
        citation: "APA 7th Edition (adopted 2021)",
        intro: "TU FOM shifted to APA 7th in 2021. If your supervisor gives you an older template, double-check — those templates may still follow APA 6th. The changes between editions are small but examiners notice.",
        formatting: [
          { element: "Paper Size",       req: "A4 (210mm × 297mm)",                                  tip: "Always check your printer settings — most printers default to Letter, not A4." },
          { element: "Font",             req: "Times New Roman — 12pt body, 14pt chapter headings",   tip: "Don't mix fonts. Chapter headings are 14pt bold, everything else 12pt." },
          { element: "Line Spacing",     req: "1.5 lines throughout",                                 tip: "Set this in your paragraph style, not just by hitting Enter twice." },
          { element: "Left Margin",      req: "1.5 inch (binding side)",                              tip: "The extra 0.5 inch is for binding. Don't forget or your text will disappear into the spine." },
          { element: "Other Margins",    req: "1 inch (top / right / bottom)" },
          { element: "Paragraph Indent", req: "First line: 0.5 inch",                                 tip: "Use the paragraph indent setting, not the Tab key — Tab adds inconsistent spacing." },
          { element: "Page Numbers",     req: "Roman numerals (i, ii, iii…) for preliminary pages; Arabic (1, 2, 3…) for main content — top-right corner" },
          { element: "Alignment",        req: "Justified",                                            tip: "Justified means both left and right edges are aligned. Not left-aligned." },
        ],
        chapters: [
          "Preliminary Pages — Title page, Supervisor's Recommendation, Approval Sheet, Acknowledgements, Table of Contents, List of Tables, List of Figures, Abbreviations, Abstract",
          "Chapter I — Introduction (background, problem statement, objectives, research questions, significance, limitations, organisation of study)",
          "Chapter II — Review of Literature (theoretical framework, empirical review, research gap)",
          "Chapter III — Research Methodology (research design, population & sample, data collection instruments, reliability & validity, data analysis plan)",
          "Chapter IV — Presentation and Analysis of Data",
          "Chapter V — Summary, Conclusions and Recommendations",
          "References (APA 7th, alphabetical order, hanging indent 0.5 inch)",
          "Appendices (questionnaires, permission letters, raw data)",
        ],
        wordCount: [
          { program: "MBS Thesis",       minimum: "10,000 words", typical: "12,000–18,000 words" },
          { program: "MBA Dissertation", minimum: "15,000 words", typical: "18,000–25,000 words" },
          { program: "BBA Final Project",minimum: "6,000 words",  typical: "8,000–12,000 words"  },
          { program: "Research Proposal",minimum: "2,500 words",  typical: "3,000–5,000 words"   },
        ],
        keyPoints: [
          "In-text citations use the (Author, Year) format — e.g. (Sharma, 2022)",
          "DOI links are now mandatory for journal articles in APA 7th",
          "Up to 3 works by the same author in the same year are distinguished by adding a, b, c — e.g. (Sharma, 2022a)",
          "Hanging indents (0.5 inch) are required for every reference entry",
          "Viva defense is required before a 3-member committee — your supervisor is usually the chair",
          "Final submission: 3 bound hard copies + 1 digital copy (USB or CD)",
        ],
        warnings: [
          "Using an old APA 6th template is one of the most common formatting mistakes — TU officially adopted APA 7th in 2021",
          "Submitting without a plagiarism report is grounds for rejection at most campuses",
          "Forgetting to switch page numbering from Roman to Arabic at Chapter I is a surprisingly common error",
        ],
        proTips: [
          "Write your abstract last — it's much easier when the whole thesis is done",
          "Set up your heading styles (Heading 1, Heading 2) in MS Word before you start writing — your Table of Contents will auto-generate",
          "Back up your work somewhere off your laptop (Google Drive, USB) — losing your thesis file happens more often than you'd think",
        ],
      },
      {
        name: "Faculty of Education (FOE)",
        programs: "B.Ed, M.Ed, M.Phil Education",
        citation: "APA 7th Edition",
        intro: "Education faculty theses often deal with Nepali schools, communities, and local contexts — meaning many students write in Nepali with English abstracts. This is fully accepted at TU FOE.",
        formatting: [
          { element: "Paper Size",    req: "A4" },
          { element: "Font",         req: "Times New Roman 12pt" },
          { element: "Line Spacing", req: "Double-spaced main text (1.5 acceptable in some departments — confirm with your supervisor)" },
          { element: "Left Margin",  req: "1.5 inch" },
          { element: "Other Margins",req: "1 inch" },
          { element: "Page Numbers", req: "Roman numerals for preliminary pages; Arabic from Chapter I" },
        ],
        chapters: [
          "Chapter 1 — Introduction",
          "Chapter 2 — Review of Related Literature",
          "Chapter 3 — Methodology",
          "Chapter 4 — Analysis and Interpretation of Data",
          "Chapter 5 — Findings, Discussion, Conclusion & Recommendations",
          "References (APA 7th)",
          "Appendices",
        ],
        wordCount: [],
        keyPoints: [
          "Theses may be written in Nepali — English abstract is still required regardless",
          "When citing Nepali-language sources, transliterate author names using standard Roman script",
          "Mixed-methods research (combining surveys and interviews) is common and accepted",
        ],
        warnings: [
          "Spacing requirements vary between departments — some require double spacing, others accept 1.5. Don't assume.",
        ],
        proTips: [
          "If your research involves schools or children, ethics approval from your institution is strongly advisable even if not strictly enforced",
          "Qualitative theses in education often have longer methodology chapters — this is normal and expected",
        ],
      },
      {
        name: "Institute of Science & Technology (IOST)",
        programs: "BCA, B.Sc. CSIT, MCA",
        citation: "IEEE Numbered References",
        intro: "Tech and computer science projects at TU IOST are practical by nature — you're building something, not just writing about it. The thesis documents your work. IEEE references are numbered in citation order (not alphabetically like APA).",
        formatting: [
          { element: "Paper Size",    req: "A4" },
          { element: "Font",         req: "Times New Roman 12pt (Arial 11pt also acceptable)" },
          { element: "Line Spacing", req: "1.5 lines" },
          { element: "Left Margin",  req: "1.5 inch" },
          { element: "Other Margins",req: "1 inch" },
          { element: "Abstract",     req: "Maximum 200 words — concise summary of what you built and what it does", tip: "Don't put citations in the abstract." },
          { element: "Source Code",  req: "Full source code must be submitted on CD/DVD/pen drive with a user manual" },
        ],
        chapters: [
          "Preliminary Pages (Title, Certification, Approval, Abstract, Table of Contents, List of Figures/Tables)",
          "Chapter 1 — Introduction (background, problem statement, objectives, scope, project overview)",
          "Chapter 2 — Literature Review (existing systems, related work, theoretical background)",
          "Chapter 3 — System Analysis & Design (requirements analysis, system diagrams, database design, UI mockups)",
          "Chapter 4 — Implementation (development environment, tools used, key implementation details)",
          "Chapter 5 — Testing & Evaluation (test cases, results, user acceptance testing)",
          "Chapter 6 — Conclusion & Future Recommendations",
          "References (IEEE numbered format)",
          "Appendices (full source code, user manual, sample data)",
        ],
        wordCount: [],
        keyPoints: [
          "IEEE references are numbered [1], [2], [3]… in the order you first cite them — not alphabetically",
          "Your source code goes in the appendix AND on a physical media (CD/USB)",
          "Always include a README file with your code — document how to run the project",
          "Screenshots of your working system make Chapter 4 and 5 much stronger",
        ],
        warnings: [
          "Using APA format instead of IEEE is a common mistake for CS students — they look very different",
          "Leaving source code out of the submission is grounds for rejection",
        ],
        proTips: [
          "Take screenshots of your system at every development stage — you'll need them for the report",
          "Write Chapter 3 (System Design) before you start coding — it forces you to think architecture first",
          "Test with real users if possible — even 5 users for a UAT section strengthens your evaluation chapter significantly",
        ],
      },
      {
        name: "Institute of Medicine (IOM)",
        programs: "MBBS, Nursing (BN/MN), MPH, Pharmacy",
        citation: "Vancouver (ICMJE) — Numbered, Superscript or Bracketed",
        intro: "Medical and health sciences research at TU IOM comes with the highest level of ethical oversight. The structured abstract format and IRC approval process aren't optional — they're hard requirements that will stop your thesis if ignored.",
        formatting: [
          { element: "Font",         req: "Times New Roman 12pt" },
          { element: "Line Spacing", req: "Double spacing throughout (1.5 for MPH reports)" },
          { element: "Abstract",     req: "Structured — Background / Objectives / Methods / Results / Conclusions — maximum 300 words", tip: "Each heading is a separate section, not just flowing text." },
          { element: "Ethics",       req: "Mandatory Institutional Review Committee (IRC) clearance before any data collection", tip: "Apply at least 3 months before you plan to start collecting data." },
          { element: "Consent Forms",req: "Written informed consent required in Nepali language" },
        ],
        chapters: [
          "Chapter 1 — Introduction (background, rationale, research problem, objectives, hypotheses)",
          "Chapter 2 — Literature Review",
          "Chapter 3 — Methodology (study design, setting, population, sample size calculation, tools, data collection procedure, analysis plan, ethical considerations)",
          "Chapter 4 — Results",
          "Chapter 5 — Discussion",
          "Chapter 6 — Conclusions & Recommendations",
          "References (Vancouver/ICMJE, numbered in order of citation)",
          "Annexes (IRC clearance letter, consent forms, questionnaire, budget breakdown)",
        ],
        wordCount: [],
        keyPoints: [
          "Vancouver references are numbered [1], [2]… in the exact order you cite them in the text — not alphabetically",
          "Your IRC clearance letter must be included as an annex — without it, your thesis can be returned",
          "Sample size must be justified using a formula (Cochran's or population-specific)",
          "P-values reported to 3 decimal places — write p < 0.001 for very small values",
        ],
        warnings: [
          "Collecting any data before IRC approval — even a pilot survey — is an ethical violation",
          "IRC revisions take 4–6 weeks. Submit your application 3 full months before your data collection date",
          "Consent forms not in Nepali language will be rejected",
        ],
        proTips: [
          "Use a pre-validated questionnaire wherever possible — it makes reliability testing much easier",
          "Report Mean ± SD for continuous variables and percentages for categorical ones — this is the expected format",
          "Keep copies of all signed consent forms — you may be asked to produce them during viva",
        ],
      },
      {
        name: "Faculty of Law (FoL)",
        programs: "B.L, LL.B, LL.M",
        citation: "Chicago 17th Edition (Notes-Bibliography) or OSCOLA",
        intro: "Law theses are citation-heavy. Unlike APA or IEEE where you cite in the text, law requires footnotes for every case and statute. This changes how your pages look and feel — more footnotes at the bottom of pages is completely normal.",
        formatting: [
          { element: "Font",           req: "Times New Roman 12pt (body); 10pt for footnotes" },
          { element: "Line Spacing",   req: "1.5" },
          { element: "Footnotes",      req: "Mandatory for every case law citation — 10pt font", tip: "Footnotes appear at the bottom of the page, not at the end of the document." },
          { element: "LL.M References",req: "Separate Primary Source List required — minimum 40 academic sources" },
        ],
        chapters: [],
        wordCount: [],
        keyPoints: [
          "Case law citation format: Case Name, Year, Volume, Reporter, Page — e.g. Roe v Wade, 410 US 113 (1973)",
          "Statute citation format: Short title, Year, Section — e.g. Contract Act, 2056, s.14",
          "LL.M dissertations need a separate Primary Source List in addition to the general bibliography",
          "Chicago Notes-Bibliography style uses footnote numbers in the text and full citations at the bottom of the page",
        ],
        warnings: [
          "Using in-text citations (APA style) instead of footnotes is a major formatting error in law",
          "Citing only secondary sources (textbooks, articles) without primary sources (cases, statutes) weakens legal arguments significantly",
        ],
        proTips: [
          "Use Zotero or Mendeley to manage your legal citations — manually maintaining footnotes across 80+ pages is error-prone",
          "Keep a separate running list of every case you cite — cross-referencing is much faster at the end",
        ],
      },
    ],
  },
  {
    id: "pu",
    name: "Pokhara University",
    short: "PU",
    established: "1997",
    students: "40,000+",
    campuses: "Gandaki Province",
    location: "Lekhnath, Kaski",
    primary: "APA 7th",
    color: "purple",
    about: "PU has a strong reputation for research quality, especially in business and engineering. It's also one of the stricter universities on plagiarism — the 20% Turnitin limit is enforced, not just advised. If you're at PU, treat formatting seriously from Day 1.",
    faculties: [
      {
        name: "School of Business (SoB)",
        programs: "MBA, BBA, BBM",
        citation: "APA 7th Edition",
        intro: "PU SoB is one of the more research-oriented business schools in Nepal. Your supervisor will expect a Turnitin report — arrange access through your college if PU doesn't provide it directly.",
        formatting: [
          { element: "Paper & Font",    req: "A4, Times New Roman 12pt" },
          { element: "Line Spacing",    req: "1.5 (body); Double for block quotes (40+ words)" },
          { element: "Left Margin",     req: "1.5 inch" },
          { element: "Other Margins",   req: "1 inch" },
          { element: "Abstract",        req: "200–300 words with 5–7 keywords" },
          { element: "Plagiarism",      req: "Turnitin similarity < 20% — report must be signed by supervisor and attached", tip: "References are excluded from the similarity count." },
        ],
        chapters: [
          "Chapter 1 — Introduction",
          "Chapter 2 — Literature Review",
          "Chapter 3 — Research Methodology",
          "Chapter 4 — Data Analysis & Results",
          "Chapter 5 — Discussion, Conclusions & Recommendations",
          "References (APA 7th)",
        ],
        wordCount: [
          { program: "MBA Dissertation", minimum: "15,000 words", typical: "18,000–22,000 words" },
          { program: "BBA Project",       minimum: "8,000 words",  typical: "10,000–14,000 words" },
        ],
        keyPoints: [
          "Turnitin report (< 20%) must be signed by your supervisor and submitted alongside the thesis",
          "Block quotes (40+ words) are double-spaced and indented 0.5 inch from the left margin",
          "Digital submission alongside bound copies is required",
        ],
        warnings: [
          "Do not paraphrase the same source back-to-back multiple times — it still flags on Turnitin",
          "Your abstract and table of contents are included in the Turnitin check but excluded from the similarity score",
        ],
        proTips: [
          "Run Turnitin at least 2 weeks before submission — rewrites take time",
          "If your similarity is between 15–20%, go through it source by source and rewrite direct lifts in your own words",
          "Put your research gap clearly at the end of Chapter 2 — examiners look for it",
        ],
      },
      {
        name: "School of Engineering (SoE)",
        programs: "B.E., M.Sc. Engineering",
        citation: "IEEE Numbered Format",
        intro: "Engineering projects here are expected to be technically thorough. Professional tools for diagrams are not optional — hand-drawn or low-resolution figures will be flagged.",
        formatting: [
          { element: "Minimum Length",   req: "60–120 pages" },
          { element: "Font",             req: "Times New Roman 12pt; section headings 14pt bold" },
          { element: "Line Spacing",     req: "1.5" },
          { element: "Diagrams/Figures", req: "AutoCAD, MATLAB, or professional tools — minimum 300 DPI", tip: "Screenshots from low-resolution monitors don't meet the 300 DPI requirement." },
          { element: "Code Appendix",    req: "All source code in appendix with documentation and a README file" },
        ],
        chapters: [],
        wordCount: [],
        keyPoints: [
          "IEEE references are numbered [1], [2]… in order of first citation",
          "Source code must be in the appendix AND submitted on physical media",
          "All figures and diagrams must be generated with professional software at minimum 300 DPI",
        ],
        warnings: [
          "Blurry or low-resolution diagrams are a common examiner complaint — export at 300 DPI minimum",
        ],
        proTips: [
          "AutoCAD and MATLAB produce clean, print-ready figures by default",
          "Number every figure and table, and always reference them in the text ('As shown in Figure 3.2…')",
        ],
      },
      {
        name: "School of Health & Allied Sciences",
        programs: "Nursing, Public Health, Allied Health",
        citation: "Vancouver (Numbered Superscripts)",
        intro: "Health research at PU requires ethics clearance from the PU Ethical Review Board — not just any ethics board. Make sure you apply to the right committee.",
        formatting: [
          { element: "Abstract",    req: "Structured — 250–300 words with Background, Methods, Results, Conclusions" },
          { element: "Ethics",      req: "PU Ethical Review Board clearance — mandatory before data collection" },
          { element: "Sample Size", req: "Must be justified using power analysis — state the power level used (usually 80%)" },
          { element: "Statistics",  req: "SPSS, STATA, or R — output should be included in appendices" },
        ],
        chapters: [],
        wordCount: [],
        keyPoints: [
          "Ethics clearance must be from PU's own Ethical Review Board — not a generic approval",
          "Sample size justification using power analysis is required in your methodology chapter",
          "Statistical software output (tables, charts) belongs in the appendix, not the main body",
        ],
        warnings: [
          "Applying to the wrong ethics board and getting the wrong clearance letter is a frustrating mistake — confirm with your department first",
        ],
        proTips: [
          "G*Power (free software) makes power analysis straightforward — use it to calculate and document your sample size",
          "SPSS is widely used here — if you're not comfortable with it, start learning early in your research process",
        ],
      },
    ],
  },
  {
    id: "ku",
    name: "Kathmandu University",
    short: "KU",
    established: "1991",
    students: "15,000+",
    campuses: "Autonomous Research University",
    location: "Dhulikhel, Kavre",
    primary: "APA 7th / Harvard / IEEE",
    color: "cyan",
    about: "KU punches above its weight for a university of its size. It's genuinely research-focused, with stricter plagiarism limits than most Nepali universities (15% vs the standard 20%). Students here often publish in international conferences — KU actively encourages it.",
    faculties: [
      {
        name: "School of Management (SOM)",
        programs: "MBA, EMBA, BBA",
        citation: "APA 7th (Harvard also accepted)",
        intro: "KU SOM is serious about research rigour. The 15% Turnitin limit is stricter than anywhere else in Nepal, and the defense format — a closed-book oral before three examiners with a 20–30 slide presentation — requires real preparation.",
        formatting: [
          { element: "Font & Spacing",  req: "Times New Roman 12pt; 1.5 line spacing" },
          { element: "Left Margin",     req: "1.5 inch" },
          { element: "Other Margins",   req: "1 inch" },
          { element: "Plagiarism",      req: "Turnitin < 15% — stricter than the standard 20% at other Nepali universities", tip: "References are excluded. But your literature review needs to be genuinely paraphrased." },
          { element: "Defense",         req: "Closed-book oral examination before a 3-member committee; prepare a 20–30 slide presentation" },
          { element: "Submission",      req: "3 hard copies (bound) + 1 digital copy" },
        ],
        chapters: [],
        wordCount: [
          { program: "MBA Thesis", minimum: "18,000 words", typical: "18,000–25,000 words" },
        ],
        keyPoints: [
          "A Research Concept Paper must be approved by your department before you write the full proposal — don't skip this step",
          "KU actively encourages mixed-methods research (combining quantitative and qualitative)",
          "Defense is closed-book — you should know your own thesis well enough to answer questions without referring to it",
          "Your 20–30 slide defense presentation should cover: problem, objectives, methodology, key findings, contribution",
        ],
        warnings: [
          "The 15% Turnitin limit catches people who are used to the 20% standard at other universities",
          "Skipping the Research Concept Paper approval step will delay your whole timeline significantly",
        ],
        proTips: [
          "Prepare for your viva by listing every assumption and limitation in your work — examiners go there first",
          "Mixed-methods research (surveys + interviews) adds depth and is well-received at KU SOM",
          "Know your theoretical framework inside out — KU examiners frequently test it",
        ],
      },
      {
        name: "School of Engineering (SOE)",
        programs: "M.Sc. Engineering, B.E.",
        citation: "IEEE Numbered References",
        intro: "KU Engineering expects original contribution — your dissertation needs to add something new to the field, not just review what others have done. The poster + oral defense is a unique feature that sets KU SOE apart.",
        formatting: [
          { element: "Minimum Length",      req: "60–80 pages" },
          { element: "Original Contribution", req: "Required — work must demonstrate new knowledge or application", tip: "This is checked at defense. Be prepared to articulate exactly what is new about your work." },
          { element: "Defense Format",      req: "Poster presentation followed by formal oral defense" },
        ],
        chapters: [
          "Abstract", "Introduction", "Related Work", "Methodology",
          "Results", "Discussion", "Conclusion", "References", "Appendices",
        ],
        wordCount: [],
        keyPoints: [
          "Research must demonstrate an original contribution to the field — review papers are not accepted",
          "The defense has two parts: a poster presentation (explaining your work visually) + an oral defense",
          "Conference submission to IEEE/Springer-indexed venues is strongly encouraged — KU supports this",
        ],
        warnings: [
          "Submitting a review paper or replication study as original research will not pass KU SOE's viva",
        ],
        proTips: [
          "Design your poster for a general audience, not specialists — your committee includes people from different specializations",
          "Get your work published at a conference before your viva if you can — it pre-validates your contribution",
        ],
      },
      {
        name: "School of Education (SOEd)",
        programs: "M.Ed, M.Phil Education",
        citation: "APA 7th",
        intro: "KU Education is one of the few places in Nepal that genuinely values critical and transformative research paradigms. If your work challenges conventional thinking about education, you're in the right place.",
        formatting: [
          { element: "M.Phil Word Count",  req: "Minimum 25,000 words — must demonstrate original theoretical contribution" },
          { element: "Research Paradigms", req: "Transformative, Critical, Constructivist all accepted" },
          { element: "Defense",            req: "Two-stage: Internal review first, then External examiner" },
        ],
        chapters: [],
        wordCount: [
          { program: "M.Phil", minimum: "25,000 words", typical: "25,000–35,000 words" },
        ],
        keyPoints: [
          "M.Phil must demonstrate an original theoretical contribution — this is different from just applying existing theory",
          "Mixed-methods research is actively welcomed and supported",
          "Two-stage defense: internal review first (your department), then an external examiner",
        ],
        warnings: [
          "Descriptive, survey-only M.Phil theses may not satisfy the 'original theoretical contribution' requirement",
        ],
        proTips: [
          "Transformative research that questions existing educational assumptions tends to score very highly at KU SOEd",
          "Use your internal review stage as a rehearsal — take the feedback seriously before the external examiner",
        ],
      },
    ],
  },
  {
    id: "puu",
    name: "Purbanchal University",
    short: "PuU",
    established: "1994",
    students: "35,000+",
    campuses: "Koshi Province",
    location: "Biratnagar",
    primary: "APA 7th",
    color: "emerald",
    about: "PuU covers the Eastern region of Nepal and has grown significantly over the last decade. Its guidelines largely mirror TU FOM standards — if you know TU guidelines, you're most of the way there. Cover colour is one of those small details that gets overlooked and causes last-minute panic at the printing shop.",
    faculties: [
      {
        name: "All Faculties — General Standards",
        programs: "Management, Science & Technology, Health Sciences",
        citation: "APA 7th (IEEE for CS/IT; Vancouver for Health Sciences)",
        intro: "PuU adopted APA 7th Edition in 2022. If you're using a template from before that, it may follow APA 6th. Check the citation format of the sample thesis your college provides — if it doesn't have DOI links on journal articles, the template is outdated.",
        formatting: [
          { element: "Font & Size",    req: "Times New Roman 12pt (body), 14pt (chapter headings)" },
          { element: "Line Spacing",   req: "1.5" },
          { element: "Left Margin",    req: "1.5 inch" },
          { element: "Other Margins",  req: "1 inch" },
          { element: "Page Limits",    req: "MBS/MBA: 80–150 pages; BBA: 50–80 pages" },
          { element: "Cover Colour",   req: "Maroon (management programs) / Blue (science programs)", tip: "Print one test copy before printing all three bound copies — getting this wrong wastes money." },
          { element: "Binding",        req: "Hard-bound for final submission; spiral for drafts" },
        ],
        chapters: [
          "Chapter 1 — Introduction",
          "Chapter 2 — Literature Review",
          "Chapter 3 — Research Methodology",
          "Chapter 4 — Data Presentation & Analysis",
          "Chapter 5 — Summary, Conclusions & Recommendations",
          "References (APA 7th)",
          "Appendices",
        ],
        wordCount: [
          { program: "MBS/MBA",  minimum: "80 pages",  typical: "80–150 pages"  },
          { program: "BBA",      minimum: "50 pages",  typical: "50–80 pages"   },
        ],
        keyPoints: [
          "APA 7th Edition adopted in 2022 — older templates may use APA 6th",
          "Cover colour is strictly enforced: maroon for management, blue for science",
          "Health Sciences require ethics clearance before any data collection",
          "Both hard-bound copies and a digital copy are required for final submission",
        ],
        warnings: [
          "Printing the wrong cover colour and not noticing until submission day is a real and avoidable problem",
          "The APA 7th switch in 2022 means some college-provided templates are still wrong — verify",
        ],
        proTips: [
          "Ask your college library for a recently approved thesis (2022 or later) as your formatting reference — not older ones",
          "Start the hard binding process early — good binderies get busy around submission season",
        ],
      },
    ],
  },
  {
    id: "mwu",
    name: "Mid-Western University",
    short: "MWU",
    established: "2010",
    students: "20,000+",
    campuses: "Karnali Province",
    location: "Surkhet",
    primary: "APA 7th",
    color: "amber",
    about: "MWU serves the Karnali Province and has developed quickly since 2010. Its research guidelines closely follow TU FOM — a deliberate choice to maintain consistency. If you're at MWU and can't find a specific guideline, checking TU FOM guidelines is a safe backup. Always confirm with your faculty handbook though.",
    faculties: [
      {
        name: "All Faculties — General Standards",
        programs: "Management, Science, Engineering, Education",
        citation: "APA 7th (IEEE preferred for CS/Engineering)",
        intro: "MWU's guidelines are designed to be accessible for students who may have less prior research experience. The standards are rigorous but well-documented — use your faculty handbook as your primary reference.",
        formatting: [
          { element: "Font & Spacing",  req: "Times New Roman 12pt; 1.5 line spacing" },
          { element: "Left Margin",     req: "1.5 inch" },
          { element: "Other Margins",   req: "1 inch" },
          { element: "Abstract",        req: "150–250 words with 4–6 keywords" },
          { element: "Cover Colour",    req: "Dark Blue" },
          { element: "Submission",      req: "2 bound copies + 1 soft copy (PDF on USB)" },
        ],
        chapters: [],
        wordCount: [
          { program: "Master's Thesis",    minimum: "10,000 words",  typical: "10,000–18,000 words" },
          { program: "PhD Dissertation",   minimum: "60,000 words",  typical: "60,000–90,000 words" },
        ],
        keyPoints: [
          "MWU guidelines closely follow TU FOM — a safe baseline when in doubt",
          "Dark blue is the required cover colour across all programs",
          "Submission requires 2 bound copies + 1 PDF on USB (not 3 copies like TU)",
          "Always verify requirements with your specific faculty handbook",
        ],
        warnings: [
          "Don't assume MWU and TU requirements are identical — there are small but important differences like the number of bound copies",
        ],
        proTips: [
          "Get your faculty handbook from your department office on Day 1 of your research year — it's your most reliable reference",
        ],
      },
    ],
  },
  {
    id: "fwu",
    name: "Far-Western University",
    short: "FWU",
    established: "2010",
    students: "15,000+",
    campuses: "Sudurpashchim Province",
    location: "Mahendranagar",
    primary: "APA 7th",
    color: "pink",
    about: "FWU serves the far-western region of Nepal. Like MWU, its general guidelines are well-aligned with TU FOM standards. One distinctive feature: you must pass your viva before you can submit your final bound copies — the defense happens first, and corrections are often required before printing the final version.",
    faculties: [
      {
        name: "All Faculties — General Standards",
        programs: "Management, Education, Agriculture",
        citation: "APA 7th (Harvard accepted in some departments)",
        intro: "FWU's preliminary pages must appear in the exact prescribed order — examiners here check this carefully. The viva-first, print-later process means you should account for time to make corrections after your defense before getting the final copies bound.",
        formatting: [
          { element: "Font & Spacing",    req: "Times New Roman 12pt; 1.5 line spacing" },
          { element: "Left Margin",       req: "1.5 inch (binding)" },
          { element: "Other Margins",     req: "1 inch" },
          { element: "Thesis Word Count", req: "Master's: minimum 10,000 words" },
        ],
        chapters: [
          "Title page",
          "Supervisor's recommendation",
          "Approval sheet",
          "Acknowledgements",
          "Abstract",
          "Table of Contents",
          "List of Tables & Figures",
          "Abbreviations",
          "Main Chapters (Introduction → Conclusions)",
          "References",
          "Appendices",
        ],
        wordCount: [
          { program: "Master's Thesis", minimum: "10,000 words", typical: "10,000–16,000 words" },
        ],
        keyPoints: [
          "Viva defense must be passed before submitting final bound copies — make corrections first, then print",
          "Preliminary pages must appear in the exact order listed — check this before submission",
          "Agriculture programs in some departments use CSE citation format — always verify with your supervisor",
          "Harvard referencing is accepted in some departments as an alternative to APA 7th",
        ],
        warnings: [
          "Getting your thesis bound before your viva only to have corrections requested is a waste of money — wait until after",
        ],
        proTips: [
          "Ask your supervisor which citation format your department actually uses (Harvard or APA) before you write a single reference",
          "After your viva, read the examiner's corrections list carefully before printing — missing even one correction can cause re-submission",
        ],
      },
    ],
  },
  {
    id: "afu",
    name: "Agriculture & Forestry University",
    short: "AFU",
    established: "2010",
    students: "8,000+",
    campuses: "Nepal's Only Agriculture University",
    location: "Rampur, Chitwan",
    primary: "APA 7th / CSE",
    color: "lime",
    about: "AFU is Nepal's only dedicated agriculture university and has a strong research culture around field work, crop science, animal husbandry, and forestry. Its documentation requirements reflect this — you're expected to document your field work meticulously, and if your research involves animals, IACUC clearance is mandatory.",
    faculties: [
      {
        name: "All Programs",
        programs: "B.Sc. Agriculture, Forestry, B.V.Sc. & AH, M.Sc., PhD",
        citation: "APA 7th (CSE Name-Year for some biology/ecology departments — confirm with supervisor)",
        intro: "AFU theses are often field-heavy. Double spacing (unlike the 1.5 standard elsewhere) is used because examiners make handwritten notes in the margins. This means your document will be longer than you expect — budget extra pages.",
        formatting: [
          { element: "Font & Spacing",   req: "Times New Roman 12pt; Double spacing (thesis); 1.5 for seminar papers", tip: "Double spacing makes the document feel longer — this is expected, not a problem." },
          { element: "Left Margin",      req: "1.5 inch" },
          { element: "Other Margins",    req: "1 inch" },
          { element: "Scientific Names", req: "Always italicized — binomial nomenclature required (e.g. Oryza sativa)", tip: "Every single Latin name, every time it appears — not just the first mention." },
          { element: "Units",            req: "SI units mandatory throughout — no imperial measurements" },
          { element: "Numbers",          req: "Numbers below 10 are spelled out (e.g. 'seven samples') except in tables and figures" },
        ],
        chapters: [
          "Chapter 1 — Introduction (background, problem statement, rationale, objectives, hypotheses, significance)",
          "Chapter 2 — Literature Review",
          "Chapter 3 — Materials & Methods (study site, materials, experimental design, data collection, statistical analysis)",
          "Chapter 4 — Results & Discussion",
          "Chapter 5 — Summary, Conclusions & Recommendations",
          "References (APA 7th or CSE)",
          "Appendices (raw field data, lab results, statistical software output)",
        ],
        wordCount: [
          { program: "M.Sc. Thesis", minimum: "15,000 words", typical: "15,000–25,000 words" },
        ],
        keyPoints: [
          "Every Latin/scientific name must be italicized every time it appears — e.g. Oryza sativa, not Oryza Sativa",
          "SI units are mandatory — metres not feet, kilograms not pounds",
          "Animal research requires IACUC (Institutional Animal Care and Use Committee) clearance",
          "Field research data and lab results should be documented and included in appendices",
          "Statistical software used: GenStat, SAS, SPSS, or R",
        ],
        warnings: [
          "Forgetting to italicize scientific names is flagged by every examiner — it's basic convention and there's no excuse for it",
          "Using non-SI units (acres, pounds, inches) in an AFU thesis is considered a serious error",
          "Animal research without IACUC clearance is an ethical violation — don't start without it",
        ],
        proTips: [
          "Use the Find & Replace function in MS Word to search for any unitalicized scientific names before submission",
          "Document your field work with photos and GPS coordinates where possible — it strengthens your methods section",
          "R is free and widely used in agricultural research — learning even the basics for your statistical analysis pays off",
        ],
      },
    ],
  },
  {
    id: "nsu",
    name: "Nepal Sanskrit University",
    short: "NSU",
    established: "1986",
    students: "12,000+",
    campuses: "Lumbini Province",
    location: "Beljhundi, Dang",
    primary: "APA 7th / Chicago 17th",
    color: "orange",
    about: "NSU is unique in Nepal — it's not just a university that teaches Sanskrit, it's one where your thesis might literally be written in Sanskrit. PhD dissertations require trilingual abstracts in Sanskrit, Nepali, and English. If you're here, you already know this is a specialised academic world with its own conventions.",
    faculties: [
      {
        name: "All Programs",
        programs: "PhD Finance, MBA, Humanities, Sanskrit Studies",
        citation: "APA 7th (management & social sciences); Chicago 17th (Sanskrit & classical studies)",
        intro: "NSU operates at the intersection of classical scholarship and modern academic standards. The Devanagari font requirements (Preeti or Mangal) and IAST transliteration standards are not optional for Sanskrit content.",
        formatting: [
          { element: "Font (English)",          req: "Times New Roman 12pt" },
          { element: "Font (Devanagari)",        req: "Preeti or Mangal — no other Devanagari fonts accepted", tip: "Make sure your supervisor's computer can also read the font you choose." },
          { element: "Transliteration",          req: "IAST (International Alphabet of Sanskrit Transliteration) standard for Sanskrit romanization" },
          { element: "Line Spacing (English)",   req: "1.5" },
          { element: "Line Spacing (Devanagari)",req: "Per academic standard for the script — confirm with department" },
        ],
        chapters: [],
        wordCount: [
          { program: "PhD Dissertation", minimum: "60,000 words", typical: "60,000–80,000 words" },
        ],
        keyPoints: [
          "PhD dissertations require a trilingual abstract — in Sanskrit, Nepali, and English — all three are required",
          "Must include a Sanskrit summary (saṃkṣepa) regardless of the primary language of the thesis",
          "Dissertations may be written in Nepali, Sanskrit, or English depending on the faculty",
          "Chicago 17th (Notes-Bibliography) is used for Sanskrit and classical studies",
        ],
        warnings: [
          "Using a non-standard Devanagari font that the examiner's system can't display creates serious submission problems",
          "Missing the trilingual abstract requirement for a PhD is not a minor omission — it's a fundamental requirement",
        ],
        proTips: [
          "Standardize on Preeti or Mangal from the very first page — switching fonts mid-document causes formatting chaos",
          "IAST transliteration has exact rules for diacritical marks — use the IAST character map to avoid mistakes",
        ],
      },
    ],
  },
  {
    id: "bpkihs",
    name: "B.P. Koirala Institute of Health Sciences",
    short: "BPKIHS",
    established: "1993",
    students: "5,000+",
    campuses: "Deemed University",
    location: "Dharan, Sunsari",
    primary: "Vancouver (ICMJE) — Strictly Enforced",
    color: "red",
    about: "BPKIHS is Nepal's leading medical institute and probably the strictest university in this guide when it comes to format compliance. Vancouver referencing is the law here — no APA, no Chicago, no exceptions. The IRC approval process is also non-negotiable: research without it is an ethical violation, not just a procedural miss.",
    faculties: [
      {
        name: "All Programs",
        programs: "MBBS, MD, MS, MPH, BDS, Nursing",
        citation: "Vancouver (ICMJE) — numbered superscript or bracketed — strictly enforced",
        intro: "BPKIHS operates at the level of international medical research standards. The IRC (Institutional Review Committee) timeline alone — 3 months to apply, 4–6 weeks for revisions — means you need to plan your research timeline working backwards from your submission deadline.",
        formatting: [
          { element: "Font",          req: "Times New Roman 12pt (Arial 11pt also accepted)" },
          { element: "Line Spacing",  req: "Double spacing throughout — including the references section", tip: "Yes, even your references list is double-spaced. Don't compress it." },
          { element: "Margins",       req: "1 inch all sides (2.5 cm) — note: NOT 1.5 inch left margin like other universities" },
          { element: "Abstract",      req: "Structured: Objectives / Methods / Results / Conclusions — maximum 250 words", tip: "Each heading is a separate section. No citations in the abstract." },
          { element: "Tables",        req: "Table title goes ABOVE the table; three-line format preferred (top line, header line, bottom line); every table must be referenced in the text" },
          { element: "Figures",       req: "Figure caption goes BELOW the figure; numbered sequentially; minimum 300 DPI" },
          { element: "P-values",      req: "Reported to 3 decimal places — write p < 0.001 for very small values (not p = 0.000)" },
        ],
        chapters: [
          "Title page, Certification, Acknowledgements, Abstract, Table of Contents, List of Figures/Tables, Abbreviations",
          "Chapter 1 — Introduction (background, problem statement, rationale, objectives, hypotheses)",
          "Chapter 2 — Literature Review",
          "Chapter 3 — Materials & Methodology (study design, setting, population, sample size with formula, tools, data collection, analysis, ethical considerations)",
          "Chapter 4 — Results",
          "Chapter 5 — Discussion",
          "Chapter 6 — Conclusion & Recommendations",
          "References (Vancouver numbered in order of citation)",
          "Annexes (IRC clearance letter, consent forms, questionnaire, budget breakdown)",
        ],
        wordCount: [],
        keyPoints: [
          "Vancouver references are numbered [1], [2]… in the exact order you first cite them — not alphabetical like APA",
          "IRC clearance letter must be physically included in your annexes — a missing letter means rejection",
          "Consent forms must be in Nepali — English-only consent is not accepted",
          "Report Mean ± SD for continuous variables; percentages for categorical variables",
          "All adverse events during research must be reported to IRC immediately — this is a legal obligation",
        ],
        warnings: [
          "Collecting even a single data point before IRC approval is an ethical violation — there are no exceptions",
          "IRC revisions typically take 4–6 weeks. Apply at least 3 months before your data collection date",
          "Using APA or Chicago format instead of Vancouver will result in rejection — it is strictly enforced",
          "Writing p = 0.000 is mathematically wrong — always write p < 0.001",
        ],
        proTips: [
          "Submit your IRC application as early as possible — multiple rounds of revision are common",
          "Keep original signed consent forms in a secure folder — you may be audited",
          "Use Endnote or Mendeley with the Vancouver output style — manually managing numbered references in a long thesis leads to errors",
          "Read published BPKIHS theses from the library for the most accurate formatting examples",
        ],
      },
    ],
  },
];

const generalStandards = [
  {
    id: "plagiarism",
    title: "Plagiarism & Originality",
    icon: Shield,
    color: "red",
    intro: "Plagiarism is taken seriously at every Nepali university. Most will reject a thesis or send it back for full rewriting if the similarity score is too high.",
    items: [
      "Standard threshold: < 20% similarity on Turnitin (applies to TU, PuU, MWU, FWU)",
      "Stricter threshold: < 15% at KU and PU — check which university you're at",
      "References and bibliography are excluded from the count by default",
      "Self-plagiarism counts too — if you're reusing your own previous work (assignments, proposals), cite yourself",
      "Don't just paraphrase sentence by sentence — summarise whole paragraphs in your own understanding",
    ],
  },
  {
    id: "references",
    title: "How Many References Do You Need?",
    icon: BookOpen,
    color: "blue",
    intro: "The number of references signals how thoroughly you've engaged with the existing literature. Examiners notice — and a thin reference list is a red flag.",
    items: [
      "Master's thesis: minimum 40–60 sources",
      "PhD dissertation: minimum 80–120 sources",
      "At least 60% of your sources should be from the past 10 years — show that you know the current state of the field",
      "Primary sources (original studies, data, legal cases) are preferred over secondary sources (textbooks, review articles)",
      "Grey literature (government reports, institutional documents) can be included but shouldn't dominate your list",
    ],
  },
  {
    id: "abstract",
    title: "Writing a Strong Abstract",
    icon: FileText,
    color: "purple",
    intro: "Your abstract is the first thing examiners and readers see. A well-written abstract gives them confidence that the thesis that follows is worth reading.",
    items: [
      "Standard abstract: 150–300 words — covers background, objectives, methods, findings, and conclusion",
      "Structured abstract (medical/health sciences): 250–350 words with fixed headings (Background / Objectives / Methods / Results / Conclusions)",
      "Include 4–7 keywords below the abstract — these help with library indexing",
      "Never put citations in the abstract",
      "Write the abstract last — it's much easier to summarise a finished thesis than to predict it",
    ],
  },
  {
    id: "submission",
    title: "Binding & Submission",
    icon: GraduationCap,
    color: "green",
    intro: "The final submission is not just handing in a document — there are specific physical requirements. Get them wrong and you'll be back at the printing shop.",
    items: [
      "Typically 3 bound hard copies: one for the examiner, one for the library, one for your department",
      "1 digital copy (USB or CD) — include a PDF version",
      "Spiral binding for drafts and proposals; hard binding for the final submission",
      "Cover colour often specified by faculty — always check before going to the bindery",
      "At some universities (FWU), you must pass your viva before printing the final bound copies",
    ],
  },
  {
    id: "samplesize",
    title: "Calculating Sample Size",
    icon: Info,
    color: "cyan",
    intro: "One of the most common weaknesses examiners identify in Methodology chapters is an unjustified sample size. You need a formula and a reason.",
    items: [
      "Known population — Yamane's Formula: n = N ÷ (1 + Ne²) — where N is population, e is margin of error (usually 0.05)",
      "Unknown/large population — Cochran's Formula: n ≈ 384 (for 95% confidence, 5% margin of error)",
      "Health sciences — Power Analysis: use G*Power (free software) to calculate sample size at 80% power",
      "Always state which formula you used and why in your methodology chapter — don't just state the number",
    ],
  },
  {
    id: "reliability",
    title: "Reliability & Validity",
    icon: CheckCircle2,
    color: "amber",
    intro: "If your research uses a questionnaire, you need to demonstrate it measures what it's supposed to measure (validity) and does so consistently (reliability).",
    items: [
      "Cronbach's Alpha (α) ≥ 0.7 — minimum acceptable reliability for a research tool",
      "α ≥ 0.8 — good reliability",
      "α ≥ 0.9 — excellent reliability",
      "Report the exact α value for every scale in your questionnaire, in your methodology chapter",
      "Content validity: have your questionnaire reviewed by subject matter experts before finalising it",
    ],
  },
];

const citationTable = [
  { discipline: "Management / Social Sciences / Business", format: "APA 7th Edition", note: "Most common format in Nepal" },
  { discipline: "Engineering / IT / Computer Science",      format: "IEEE Numbered",    note: "References numbered by citation order" },
  { discipline: "Health / Medical Sciences",                format: "Vancouver (ICMJE)", note: "Strictly enforced at medical institutes" },
  { discipline: "Law / Legal Studies",                      format: "Chicago 17th or OSCOLA", note: "Footnotes required for case law" },
  { discipline: "Agriculture / Life Sciences",              format: "APA 7th or CSE",    note: "Check with your supervisor" },
  { discipline: "Sanskrit / Classical Studies",             format: "Chicago 17th",      note: "Notes-Bibliography style" },
];

/* ─────────────────────────────────────────────
   COLOR MAPS
───────────────────────────────────────────── */
const colorBadge: Record<string, string> = {
  blue:    "border-blue-500/30 bg-blue-500/10 text-blue-300",
  purple:  "border-purple-500/30 bg-purple-500/10 text-purple-300",
  cyan:    "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  amber:   "border-amber-500/30 bg-amber-500/10 text-amber-300",
  pink:    "border-pink-500/30 bg-pink-500/10 text-pink-300",
  lime:    "border-lime-500/30 bg-lime-500/10 text-lime-300",
  orange:  "border-orange-500/30 bg-orange-500/10 text-orange-300",
  red:     "border-red-500/30 bg-red-500/10 text-red-300",
  green:   "border-green-500/30 bg-green-500/10 text-green-300",
};
const colorIcon: Record<string, string> = {
  blue: "text-blue-400", purple: "text-purple-400", cyan: "text-cyan-400",
  emerald: "text-emerald-400", amber: "text-amber-400", pink: "text-pink-400",
  lime: "text-lime-400", orange: "text-orange-400", red: "text-red-400",
  green: "text-green-400",
};
const colorActiveBg: Record<string, string> = {
  blue: "bg-blue-600", purple: "bg-purple-600", cyan: "bg-cyan-600",
  emerald: "bg-emerald-600", amber: "bg-amber-600", pink: "bg-pink-600",
  lime: "bg-lime-600", orange: "bg-orange-600", red: "bg-red-600",
};

/* ─────────────────────────────────────────────
   FACULTY CARD
───────────────────────────────────────────── */
function FacultyCard({ faculty }: { faculty: Faculty }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
      >
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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.06] px-5 py-5 space-y-6">

              {/* Faculty intro */}
              <div className="flex items-start gap-2.5 rounded-xl border border-blue-500/15 bg-blue-500/5 px-4 py-3">
                <Info className="h-4 w-4 flex-shrink-0 text-blue-400 mt-0.5" />
                <p className="text-sm leading-relaxed text-slate-300">{faculty.intro}</p>
              </div>

              {/* Formatting table */}
              {faculty.formatting.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Formatting Requirements</p>
                  <div className="overflow-x-auto rounded-lg border border-white/[0.07]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-white/[0.04] border-b border-white/[0.06]">
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 min-w-[140px]">Element</th>
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400">Requirement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {faculty.formatting.map(row => (
                          <tr key={row.element} className="hover:bg-white/[0.02]">
                            <td className="px-4 py-3 font-medium text-slate-200 align-top whitespace-nowrap">{row.element}</td>
                            <td className="px-4 py-3 text-slate-300">
                              {row.req}
                              {row.tip && (
                                <p className="mt-1 flex items-start gap-1.5 text-xs text-amber-400/80">
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

              {/* Chapter structure */}
              {faculty.chapters.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Chapter Structure</p>
                  <ol className="space-y-2">
                    {faculty.chapters.map((ch, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <span className="flex h-5 w-5 min-w-[1.25rem] items-center justify-center rounded-full bg-blue-500/15 text-[10px] font-bold text-blue-400 mt-0.5">{i + 1}</span>
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Word count */}
              {faculty.wordCount.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Word Count / Length Requirements</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {faculty.wordCount.map(wc => (
                      <div key={wc.program} className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-3">
                        <p className="text-xs font-semibold text-white">{wc.program}</p>
                        <p className="text-xs text-blue-400 mt-1">Minimum: {wc.minimum}</p>
                        <p className="text-xs text-slate-500">Typical range: {wc.typical}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key points */}
              {faculty.keyPoints.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">What You Need to Know</p>
                  <ul className="space-y-2">
                    {faculty.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-400 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {faculty.warnings.length > 0 && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-2">Common Mistakes to Avoid</p>
                  {faculty.warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400 mt-0.5" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Pro tips */}
              {faculty.proTips.length > 0 && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Pro Tips from Our Experts</p>
                  {faculty.proTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Star className="h-4 w-4 flex-shrink-0 text-amber-400 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   UNIVERSITY PANEL
───────────────────────────────────────────── */
function UniversityPanel({ uni }: { uni: University }) {
  const badge = colorBadge[uni.color] ?? colorBadge.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: EASE }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-bold text-white">{uni.name}</h2>
              <span className={cn("rounded-full border px-3 py-1 text-xs font-bold", badge)}>{uni.short}</span>
            </div>
            <p className="mt-1 text-sm text-slate-400">{uni.location}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            <span>📅 Est. {uni.established}</span>
            <span>👥 {uni.students}</span>
            <span>🏛 {uni.campuses}</span>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-white/[0.05] bg-white/[0.02] px-4 py-3">
          <p className="text-sm leading-relaxed text-slate-300">{uni.about}</p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-slate-500">Primary citation style:</span>
          <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-semibold", badge)}>{uni.primary}</span>
        </div>
      </div>

      {/* Faculty cards */}
      <div className="space-y-3">
        {uni.faculties.map(faculty => (
          <FacultyCard key={faculty.name} faculty={faculty} />
        ))}
      </div>

      {/* Advisory */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
        <AlertCircle className="h-4 w-4 flex-shrink-0 text-amber-400 mt-0.5" />
        <p className="text-sm text-slate-300">
          <span className="font-semibold text-amber-300">Always verify with your own supervisor</span> — individual campuses and departments often have specific variations not reflected here. These guidelines were last verified for the 2024–25 academic year.
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   GENERAL STANDARD CARD
───────────────────────────────────────────── */
function StandardCard({ std }: { std: typeof generalStandards[0] }) {
  const [open, setOpen] = useState(false);
  const Icon = std.icon;

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={cn("flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.05]", colorIcon[std.color])}>
            <Icon className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold text-white">{std.title}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.06] px-5 py-4 space-y-3">
              <p className="text-sm text-slate-400 leading-relaxed">{std.intro}</p>
              <ul className="space-y-2">
                {std.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-400 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export function GuidelinesPage() {
  const [activeUni, setActiveUni] = useState("tu");
  const [search, setSearch]       = useState("");

  const filtered = universities.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.short.toLowerCase().includes(search.toLowerCase())
  );
  const activeData = universities.find(u => u.id === activeUni) ?? universities[0];

  return (
    <div className="min-h-screen pt-16 bg-mesh">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/8 blur-[130px]" />
          <div className="absolute right-0 bottom-0 h-[300px] w-[400px] rounded-full bg-purple-600/6 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              Free Resource — Verified 2024–25
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Nepal University{" "}
            <span className="gradient-text">Thesis & Research Guidelines</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto"
          >
            We know how frustrating it is to get conflicting formatting advice — from your supervisor,
            your college notice board, and a four-year-old PDF that may or may not still be current.
            This guide pulls together the actual requirements for every major Nepali university,
            verified for 2024–25, with practical tips from people who&apos;ve done this before.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-3 text-left max-w-2xl mx-auto"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-amber-400 mt-0.5" />
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-amber-300">One important note:</span> guidelines
              do change, and individual campuses often have their own variations. Always cross-check
              with your supervisor or department before finalising your format.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.4 }}
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
                <p className="text-2xl font-bold gradient-text">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Citation quick-ref ── */}
      <section className="pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
            <div className="border-b border-white/[0.06] px-6 py-4">
              <h2 className="text-base font-semibold text-white">Not Sure Which Citation Style to Use? Start Here.</h2>
              <p className="mt-1 text-sm text-slate-400">
                Your citation format depends on your <span className="text-white">field of study</span> — not just your university.
                Use this table to find yours before you write a single reference.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-white/[0.04]">
                  {citationTable.map(({ discipline, format, note }) => (
                    <tr key={discipline} className="hover:bg-white/[0.025] transition-colors">
                      <td className="px-6 py-3.5 font-medium text-slate-200">{discipline}</td>
                      <td className="px-6 py-3.5">
                        <span className="rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">{format}</span>
                      </td>
                      <td className="px-6 py-3.5 text-xs text-slate-500 hidden sm:table-cell">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── University selector + content ── */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">University-Specific Guidelines</h2>
            <p className="mt-1 text-sm text-slate-400">Select your university to see formatting requirements, chapter structures, word counts, common mistakes, and pro tips.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

            {/* Sidebar */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search universities…"
                  className="w-full rounded-xl border border-white/[0.09] bg-white/[0.04] py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none"
                />
              </div>
              <nav className="space-y-1">
                {filtered.map(uni => {
                  const isActive = activeUni === uni.id;
                  const activeBg = colorActiveBg[uni.color] ?? "bg-blue-600";
                  const badge    = colorBadge[uni.color] ?? colorBadge.blue;
                  return (
                    <button
                      key={uni.id}
                      onClick={() => setActiveUni(uni.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all",
                        isActive ? `${activeBg} text-white shadow-lg` : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                      )}
                    >
                      <span className={cn("rounded-md border px-1.5 py-0.5 text-[10px] font-bold flex-shrink-0", isActive ? "border-white/30 bg-white/15 text-white" : badge)}>
                        {uni.short}
                      </span>
                      <span className="truncate">{uni.name}</span>
                      {isActive && <ChevronRight className="ml-auto h-4 w-4 flex-shrink-0" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
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
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">General Academic Writing Standards</h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed">
              These rules apply across almost every Nepali university regardless of faculty.
              Even if your supervisor doesn&apos;t mention them, your examiner will notice if you get them wrong.
              Click each card to expand.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {generalStandards.map(std => <StandardCard key={std.id} std={std} />)}
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300">
              Side-by-Side View
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Quick-Compare All Universities</h2>
            <p className="mt-3 text-sm text-muted-foreground">Useful if you&apos;re transferring between universities or advising a friend at a different institution.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.04] border-b border-white/[0.07]">
                  {["University", "Management / Social Sci.", "Engineering / CS", "Health / Medical", "Font", "Spacing", "Left Margin"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-slate-300 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  ["TU (FOM)",          "APA 7th",  "IEEE",          "Vancouver", "TNR 12pt", "1.5",    "1.5 in"],
                  ["Pokhara (PU)",      "APA 7th",  "IEEE",          "Vancouver", "TNR 12pt", "1.5",    "1.5 in"],
                  ["Kathmandu (KU)",    "APA 7th",  "IEEE",          "Vancouver", "TNR 12pt", "1.5",    "1.5 in"],
                  ["Purbanchal (PuU)",  "APA 7th",  "IEEE",          "Vancouver", "TNR 12pt", "1.5",    "1.5 in"],
                  ["Mid-Western (MWU)", "APA 7th",  "IEEE / APA 7th","Vancouver", "TNR 12pt", "1.5",    "1.5 in"],
                  ["Far-Western (FWU)", "APA 7th",  "IEEE",          "Vancouver", "TNR 12pt", "1.5",    "1.5 in"],
                  ["AFU",               "APA 7th",  "APA 7th",       "Vancouver", "TNR 12pt", "Double", "1.5 in"],
                  ["NSU",               "APA 7th",  "—",             "—",         "TNR 12pt", "1.5",    "1.5 in"],
                  ["BPKIHS",            "—",        "—",             "Vancouver", "TNR 12pt", "Double", "1 in"],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.025] transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className={cn("px-4 py-3", j === 0 ? "font-semibold text-white whitespace-nowrap" : "text-slate-400")}>{cell}</td>
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-blue-500/25 bg-gradient-to-br from-blue-950/60 to-purple-950/60 px-8 py-14"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/8 to-purple-600/8" />
            <div className="relative">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
                <Zap className="h-3.5 w-3.5" />
                We Handle Everything
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Know the Rules. Let Us Apply Them.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
                You&apos;ve read the guidelines. Now imagine not having to worry about a single one
                of them. Our experts are fluent in every format on this page — APA 7th, IEEE,
                Vancouver, Chicago — and they apply them correctly, every time. You focus on
                the ideas. We handle the formatting, citations, and structure.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button variant="glow" size="lg" asChild>
                  <Link href="/register">
                    Get a Free Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <a
                  href="https://wa.me/9779749231395"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-600/10 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-green-600/20"
                >
                  <MessageCircle className="h-4 w-4 text-green-400" />
                  Chat on WhatsApp
                </a>
              </div>
              <p className="mt-5 text-xs text-slate-500">We reply in under 2 minutes · Free quote · No obligation</p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
