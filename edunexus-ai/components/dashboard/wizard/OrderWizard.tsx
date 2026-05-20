"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BookOpen, Calendar, CheckCircle2,
  Clock, DollarSign, FileText, Loader2, PaperclipIcon,
  Settings, Upload, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";

// ─── Typess ────────────────────────────────────────────────────────────────────

const SERVICE_TYPES = [
  { id: "assignment",        label: "Assignment",         icon: "📝", desc: "Essays, reports, structured homework" },
  { id: "essay",             label: "Essay",              icon: "✍️", desc: "Argumentative, analytical, reflective" },
  { id: "thesis",            label: "Thesis / Dissertation", icon: "🎓", desc: "Full thesis, chapters, proposal" },
  { id: "research_paper",    label: "Research Paper",    icon: "🔬", desc: "Academic journal-style research" },
  { id: "final_year_project",label: "Final Year Project", icon: "🏗️", desc: "Capstone, FYP, senior project" },
  { id: "presentation",      label: "Presentation",      icon: "📊", desc: "PowerPoint, slides, speaker notes" },
  { id: "editing",           label: "Editing",            icon: "✂️", desc: "Grammar, structure, flow improvements" },
  { id: "ai_assistance",     label: "AI Assistance",     icon: "🤖", desc: "AI review, tools, prompt engineering" },
];

const ACADEMIC_LEVELS = ["High School", "Undergraduate", "Masters", "PhD", "Other"];
const CITATION_STYLES = ["APA 7th", "MLA 9th", "Harvard", "Chicago", "Vancouver", "IEEE", "None"];

interface WizardData {
  serviceType: string;
  academicLevel: string;
  subject: string;
  topic: string;
  description: string;
  wordCount: number;
  pageCount: number;
  deadline: string;
  citationStyle: string;
  referenceCount: number;
  requiresTurnitin: boolean;
  requiresAIDetection: boolean;
  isUrgent: boolean;
  budget: number;
  files: File[];
}

const INITIAL: WizardData = {
  serviceType: "",
  academicLevel: "Undergraduate",
  subject: "",
  topic: "",
  description: "",
  wordCount: 2000,
  pageCount: 8,
  deadline: "",
  citationStyle: "APA 7th",
  referenceCount: 0,
  requiresTurnitin: false,
  requiresAIDetection: false,
  isUrgent: false,
  budget: 0,
  files: [],
};

const STEPS = [
  { id: 1, label: "Service",   icon: BookOpen  },
  { id: 2, label: "Details",   icon: FileText  },
  { id: 3, label: "Deadline",  icon: Calendar  },
  { id: 4, label: "Options",   icon: Settings  },
  { id: 5, label: "Files",     icon: Upload    },
  { id: 6, label: "Pricing",   icon: DollarSign },
  { id: 7, label: "Review",    icon: CheckCircle2 },
];

// ─── Price calculation ────────────────────────────────────────────────────────

function calcPrice(data: WizardData): number {
  const BASE_PER_WORD: Record<string, number> = {
    assignment: 0.030, essay: 0.032, thesis: 0.038, research_paper: 0.035,
    final_year_project: 0.040, presentation: 0.025, editing: 0.012, ai_assistance: 0.020,
  };
  const LEVEL_MULT: Record<string, number> = {
    "High School": 0.8, "Undergraduate": 1.0, "Masters": 1.25, "PhD": 1.5, "Other": 1.0,
  };

  const base = (data.wordCount || 2000) * (BASE_PER_WORD[data.serviceType] ?? 0.03);
  const levelMult = LEVEL_MULT[data.academicLevel] ?? 1;
  let total = base * levelMult;

  if (data.requiresTurnitin) total += 8;
  if (data.requiresAIDetection) total += 8;

  // Urgency multiplier based on deadline
  if (data.deadline) {
    const daysLeft = (new Date(data.deadline).getTime() - Date.now()) / 86400000;
    if (daysLeft < 1) total *= 2.0;
    else if (daysLeft < 3) total *= 1.5;
    else if (daysLeft < 7) total *= 1.2;
  }

  return Math.round(total);
}

// ─── Step components ──────────────────────────────────────────────────────────

function StepServiceType({ data, onChange }: { data: WizardData; onChange: (k: keyof WizardData, v: unknown) => void }) {
  return (
    <div>
      <h2 className="mb-1 text-lg font-bold text-white">What type of service do you need?</h2>
      <p className="mb-5 text-sm text-slate-400">Select the category that best matches your assignment.</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SERVICE_TYPES.map((s) => (
          <button
            key={s.id}
            onClick={() => onChange("serviceType", s.id)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all duration-150",
              data.serviceType === s.id
                ? "border-blue-500/50 bg-blue-500/10 shadow-md shadow-blue-500/10"
                : "border-white/[0.07] bg-white/[0.03] hover:border-white/[0.14] hover:bg-white/[0.06]"
            )}
          >
            <span className="text-2xl">{s.icon}</span>
            <p className="text-sm font-medium text-white">{s.label}</p>
            <p className="text-[11px] text-slate-500">{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepDetails({ data, onChange }: { data: WizardData; onChange: (k: keyof WizardData, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white">Assignment details</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Subject / Discipline <span className="text-red-400">*</span></label>
          <input type="text" value={data.subject} onChange={(e) => onChange("subject", e.target.value)} placeholder="e.g. Environmental Economics" className="input-field" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Academic level</label>
          <select value={data.academicLevel} onChange={(e) => onChange("academicLevel", e.target.value)} className="select-field">
            {ACADEMIC_LEVELS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">Topic / Title (optional)</label>
        <input type="text" value={data.topic} onChange={(e) => onChange("topic", e.target.value)} placeholder="e.g. Impact of AI on healthcare diagnostics" className="input-field" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">Description / Instructions <span className="text-red-400">*</span></label>
        <textarea value={data.description} onChange={(e) => onChange("description", e.target.value)} placeholder="Describe the assignment requirements, rubric, formatting, and any specific instructions from your professor…" rows={5} className="textarea-field" />
        <p className="mt-1 text-xs text-slate-500">{data.description.length}/5000 characters</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Word count</label>
          <div className="relative">
            <input type="number" value={data.wordCount} onChange={(e) => onChange("wordCount", parseInt(e.target.value) || 0)} min={0} className="input-field pr-16" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">words</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">≈ {Math.ceil(data.wordCount / 275)} pages (double-spaced)</p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Citation style</label>
          <select value={data.citationStyle} onChange={(e) => onChange("citationStyle", e.target.value)} className="select-field">
            {CITATION_STYLES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

function StepDeadline({ data, onChange }: { data: WizardData; onChange: (k: keyof WizardData, v: unknown) => void }) {
  const QUICK_OPTIONS = [
    { label: "6 hours", hours: 6, urgent: true },
    { label: "12 hours", hours: 12, urgent: true },
    { label: "24 hours", hours: 24, urgent: true },
    { label: "3 days",  hours: 72 },
    { label: "5 days",  hours: 120 },
    { label: "7 days",  hours: 168 },
    { label: "14 days", hours: 336 },
    { label: "30 days", hours: 720 },
  ];

  const daysLeft = data.deadline ? (new Date(data.deadline).getTime() - Date.now()) / 86400000 : null;
  const urgencyMult = !daysLeft ? null : daysLeft < 1 ? 2.0 : daysLeft < 3 ? 1.5 : daysLeft < 7 ? 1.2 : 1.0;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-white">When do you need it?</h2>
        <p className="mt-1 text-sm text-slate-400">Shorter deadlines have an urgency multiplier applied to the price.</p>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {QUICK_OPTIONS.map((opt) => {
          const date = new Date(Date.now() + opt.hours * 3600000).toISOString().slice(0, 16);
          return (
            <button
              key={opt.label}
              onClick={() => { onChange("deadline", date); onChange("isUrgent", !!opt.urgent); }}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl border py-3 text-xs font-medium transition-all",
                data.deadline === date
                  ? "border-blue-500/50 bg-blue-500/10 text-blue-300"
                  : opt.urgent
                  ? "border-red-500/20 bg-red-500/[0.05] text-slate-400 hover:border-red-500/40"
                  : "border-white/[0.07] text-slate-400 hover:border-white/[0.14]"
              )}
            >
              {opt.urgent && <Clock className="h-3 w-3 text-red-400" />}
              {opt.label}
            </button>
          );
        })}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">Or pick a custom date & time</label>
        <input
          type="datetime-local"
          value={data.deadline}
          onChange={(e) => onChange("deadline", e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
          className="input-field"
        />
      </div>
      {urgencyMult && urgencyMult > 1 && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-500/25 bg-amber-500/[0.07] p-3 text-sm text-amber-300">
          <Clock className="h-4 w-4 flex-shrink-0" />
          Urgency multiplier: <strong>×{urgencyMult}</strong> — rush orders are prioritized and priced accordingly.
        </div>
      )}
    </div>
  );
}

function StepOptions({ data, onChange }: { data: WizardData; onChange: (k: keyof WizardData, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white">Additional options</h2>
      {[
        { key: "requiresTurnitin", label: "Turnitin originality report", desc: "Include a plagiarism check report (+$8)", icon: "🛡️" },
        { key: "requiresAIDetection", label: "AI detection report", desc: "Include an AI content detection scan (+$8)", icon: "🤖" },
      ].map(({ key, label, desc, icon }) => (
        <label key={key} className="flex cursor-pointer items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 transition hover:bg-white/[0.05]">
          <input
            type="checkbox"
            checked={data[key as keyof WizardData] as boolean}
            onChange={(e) => onChange(key as keyof WizardData, e.target.checked)}
            className="h-4 w-4 accent-blue-500"
          />
          <span className="text-xl">{icon}</span>
          <div>
            <p className="text-sm font-medium text-white">{label}</p>
            <p className="text-xs text-slate-400">{desc}</p>
          </div>
        </label>
      ))}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">Number of references / sources</label>
        <input type="number" value={data.referenceCount} onChange={(e) => onChange("referenceCount", parseInt(e.target.value) || 0)} min={0} placeholder="0" className="input-field max-w-xs" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">Budget (optional)</label>
        <div className="relative max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
          <input type="number" value={data.budget || ""} onChange={(e) => onChange("budget", parseFloat(e.target.value) || 0)} placeholder="0.00" className="input-field pl-7" />
        </div>
        <p className="mt-1 text-xs text-slate-500">Leave blank to use the calculated price.</p>
      </div>
    </div>
  );
}

function StepFiles({ data, onChange }: { data: WizardData; onChange: (k: keyof WizardData, v: unknown) => void }) {
  const [dragging, setDragging] = useState(false);

  function handleFiles(newFiles: FileList | null) {
    if (!newFiles) return;
    const arr = Array.from(newFiles).slice(0, 5 - data.files.length);
    onChange("files", [...data.files, ...arr]);
  }

  function removeFile(i: number) {
    onChange("files", data.files.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">Upload files (optional)</h2>
        <p className="mt-1 text-sm text-slate-400">Upload rubrics, lecture notes, previous drafts, or any reference material. Max 5 files, 20 MB each.</p>
      </div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-10 text-center transition-all",
          dragging ? "border-blue-500/60 bg-blue-500/[0.06]" : "border-white/[0.1] hover:border-white/[0.2]"
        )}
      >
        <Upload className={cn("h-8 w-8", dragging ? "text-blue-400" : "text-slate-500")} />
        <div>
          <p className="text-sm font-medium text-white">Drag & drop files here</p>
          <p className="text-xs text-slate-500">or click to browse</p>
        </div>
        <input type="file" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.png,.zip" onChange={(e) => handleFiles(e.target.files)} className="hidden" id="file-upload" />
        <label htmlFor="file-upload" className="cursor-pointer rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.08]">
          Browse files
        </label>
      </div>
      {data.files.length > 0 && (
        <div className="space-y-2">
          {data.files.map((file, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
              <div className="flex items-center gap-2">
                <PaperclipIcon className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-white">{file.name}</span>
                <span className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
              </div>
              <button onClick={() => removeFile(i)} className="text-slate-500 hover:text-red-400 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StepPricing({ data }: { data: WizardData }) {
  const price = calcPrice(data);
  const lineItems = [
    { label: `${data.wordCount.toLocaleString()} words × base rate`, value: Math.round(data.wordCount * 0.03) },
    { label: `${data.academicLevel} level multiplier`, value: price - Math.round(data.wordCount * 0.03) - (data.requiresTurnitin ? 8 : 0) - (data.requiresAIDetection ? 8 : 0) },
    ...(data.requiresTurnitin ? [{ label: "Turnitin report", value: 8 }] : []),
    ...(data.requiresAIDetection ? [{ label: "AI detection report", value: 8 }] : []),
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white">Price estimate</h2>
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 space-y-3">
        {lineItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-slate-400">{item.label}</span>
            <span className="text-white">${item.value}</span>
          </div>
        ))}
        <div className="border-t border-white/[0.07] pt-3 flex items-center justify-between">
          <span className="font-semibold text-white">Estimated total</span>
          <span className="text-xl font-bold text-white">${price}</span>
        </div>
      </div>
      <p className="text-xs text-slate-500">Final price confirmed after expert review. You pay only after confirmation. Refunds available within 48 hours of delivery.</p>
      <div className="grid grid-cols-3 gap-3">
        {[["🛡️", "Plagiarism-free guarantee"], ["⏱️", "On-time delivery"], ["♾️", "Free revisions"]].map(([icon, label]) => (
          <div key={label as string} className="flex flex-col items-center gap-1 rounded-xl border border-white/[0.07] py-3 text-center">
            <span className="text-xl">{icon}</span>
            <p className="text-[11px] text-slate-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepReview({ data }: { data: WizardData }) {
  const price = calcPrice(data);
  const svc = SERVICE_TYPES.find((s) => s.id === data.serviceType);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white">Review & submit</h2>
      <div className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.07] bg-white/[0.03]">
        {[
          ["Service", `${svc?.icon ?? ""} ${svc?.label ?? "—"}`],
          ["Subject", data.subject || "—"],
          ["Topic", data.topic || "—"],
          ["Academic level", data.academicLevel],
          ["Word count", data.wordCount.toLocaleString()],
          ["Citation style", data.citationStyle],
          ["Deadline", data.deadline ? new Date(data.deadline).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"],
          ["Files", data.files.length ? `${data.files.length} file(s)` : "None"],
          ["Add-ons", [data.requiresTurnitin && "Turnitin", data.requiresAIDetection && "AI Detection"].filter(Boolean).join(", ") || "None"],
          ["Estimated price", `$${price}`],
        ].map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4 px-4 py-3">
            <span className="flex-shrink-0 text-sm text-slate-400">{label}</span>
            <span className="text-right text-sm font-medium text-white">{value}</span>
          </div>
        ))}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">Additional notes for your expert</label>
        <textarea rows={3} placeholder="Any last-minute instructions or clarifications…" className="textarea-field" />
      </div>
    </div>
  );
}

// ─── Main wizard ──────────────────────────────────────────────────────────────

export function OrderWizard() {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const onChange = useCallback((k: keyof WizardData, v: unknown) => {
    setData((prev) => ({ ...prev, [k]: v }));
  }, []);

  function canNext(): boolean {
    if (step === 1) return !!data.serviceType;
    if (step === 2) return !!data.subject.trim() && !!data.description.trim();
    if (step === 3) return !!data.deadline;
    return true;
  }

  function next() { setDirection(1); setStep((s) => Math.min(s + 1, STEPS.length)); }
  function prev() { setDirection(-1); setStep((s) => Math.max(s - 1, 1)); }

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Order placed! Our team will confirm shortly.");
    setTimeout(() => router.push("/dashboard/student/orders"), 2500);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 py-16 text-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Order submitted!</h2>
          <p className="mt-2 text-sm text-slate-400">We'll confirm your order within 30 minutes. Redirecting to your orders…</p>
        </div>
      </motion.div>
    );
  }

  const STEP_COMPONENTS = [
    <StepServiceType key={1} data={data} onChange={onChange} />,
    <StepDetails     key={2} data={data} onChange={onChange} />,
    <StepDeadline    key={3} data={data} onChange={onChange} />,
    <StepOptions     key={4} data={data} onChange={onChange} />,
    <StepFiles       key={5} data={data} onChange={onChange} />,
    <StepPricing     key={6} data={data} />,
    <StepReview      key={7} data={data} />,
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Place a new order</h1>
        <p className="mt-0.5 text-sm text-slate-400">Step {step} of {STEPS.length}</p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between overflow-x-auto pb-1">
          {STEPS.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-1 min-w-0">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-all",
                step > s.id ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400" :
                step === s.id ? "border-blue-500/50 bg-blue-500/15 text-blue-400 shadow-sm shadow-blue-500/20" :
                "border-white/[0.1] text-slate-500"
              )}>
                {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : s.id}
              </div>
              <span className="hidden text-[10px] text-slate-500 sm:block">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.4 }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.2 }}
          >
            {STEP_COMPONENTS[step - 1]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          disabled={step === 1}
          className="flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.08] disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {step < STEPS.length ? (
          <button
            onClick={next}
            disabled={!canNext()}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-95 disabled:opacity-50"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:from-blue-500 hover:to-purple-500 active:scale-95 disabled:opacity-60"
          >
            {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Placing order…</> : <><CheckCircle2 className="h-4 w-4" /> Place order</>}
          </button>
        )}
      </div>
    </div>
  );
}
