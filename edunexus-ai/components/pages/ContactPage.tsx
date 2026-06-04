"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  File,
  FileImage,
  FileText,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const serviceOptions = [
  "Assignment Help",
  "Essay Writing",
  "Research Paper",
  "Coding & CS Help",
  "Thesis / Dissertation",
  "Final Year Project",
  "Presentation Design",
  "Editing & Formatting",
  "AI Academic Assistance",
  "Other / Not Sure",
];

const contactFaqs = [
  {
    q: "How quickly do you respond to enquiries?",
    a: "Our live chat team responds in under 10 minutes during peak hours. Email responses are guaranteed within 1 hour. WhatsApp messages are typically answered within 10 minutes.",
  },
  {
    q: "Can I get a price quote before placing an order?",
    a: "Absolutely. Use the contact form or chat, describe your requirements, and we'll give you an exact quote within minutes — no obligation to proceed.",
  },
  {
    q: "What if my assignment is very urgent (under 3 hours)?",
    a: "Yes, we handle ultra-urgent orders. Message us via WhatsApp or live chat directly for the fastest response. Premium turnaround starts at 3 hours for most tasks.",
  },
  {
    q: "Do you offer free consultations?",
    a: "Yes. Book a free 15-minute consultation with one of our academic advisors to discuss your project, requirements, and best approach.",
  },
  {
    q: "Can I request a specific expert?",
    a: "Yes. If you've worked with an expert before and want them again, mention their ID or name in the contact form and we'll prioritise the match.",
  },
];

interface FormState {
  name: string;
  email: string;
  service: string;
  subject: string;
  deadline: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  service: "",
  subject: "",
  deadline: "",
  message: "",
};

/* ── Input component ─────────────────────────────────────── */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-blue-500/50 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-blue-500/20";

/* ── FAQ mini ────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((v) => !v)}
      className={cn(
        "cursor-pointer rounded-xl border px-5 py-4 transition-all duration-200",
        open
          ? "border-blue-500/25 bg-blue-500/5"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/10"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/zip",
  "application/x-zip-compressed",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "text/plain",
];

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
const MAX_FILES = 5;

function fileIcon(type: string) {
  if (type.startsWith("image/")) return FileImage;
  if (type === "application/pdf") return FileText;
  return File;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ── File Upload Zone ────────────────────────────────────── */
function FileUploadZone({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      setError(null);
      const next = [...files];
      Array.from(incoming).forEach((f) => {
        if (!ACCEPTED_TYPES.includes(f.type)) {
          setError(`"${f.name}" is not a supported file type.`);
          return;
        }
        if (f.size > MAX_FILE_SIZE) {
          setError(`"${f.name}" exceeds the 25 MB limit.`);
          return;
        }
        if (next.length >= MAX_FILES) {
          setError(`You can attach up to ${MAX_FILES} files.`);
          return;
        }
        if (!next.find((x) => x.name === f.name && x.size === f.size)) {
          next.push(f);
        }
      });
      onChange(next);
    },
    [files, onChange]
  );

  const remove = (idx: number) => {
    const next = files.filter((_, i) => i !== idx);
    onChange(next);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200",
          dragOver
            ? "border-blue-500/60 bg-blue-500/10"
            : "border-white/[0.12] bg-white/[0.02] hover:border-blue-500/40 hover:bg-blue-500/5"
        )}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Upload className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Drop files here or <span className="text-blue-400">browse</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            PDF, Word, Excel, PPT, Images, ZIP · Max 25 MB per file · Up to {MAX_FILES} files
          </p>
        </div>
        {/* File type badges */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {["PDF", "DOCX", "XLSX", "PPTX", "JPG / PNG", "ZIP"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_TYPES.join(",")}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
          onClick={(e) => { (e.target as HTMLInputElement).value = ""; }}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1.5">
          <X className="h-3 w-3 flex-shrink-0" />
          {error}
        </p>
      )}

      {/* Attached files list */}
      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          {files.map((f, i) => {
            const Icon = fileIcon(f.type);
            return (
              <div
                key={`${f.name}-${i}`}
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                  <Icon className="h-4 w-4 text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(f.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  aria-label="Remove file"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
          <p className="text-right text-xs text-muted-foreground">
            {files.length} / {MAX_FILES} files attached
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────── */
export function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("name",     form.name);
      fd.append("email",    form.email);
      fd.append("service",  form.service);
      fd.append("deadline", form.deadline);
      fd.append("subject",  form.subject);
      fd.append("message",  form.message);
      attachments.forEach((f) => fd.append("files", f));

      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (!res.ok) throw new Error("send_failed");
    } catch {
      const subj = encodeURIComponent(`[ScholarSync Nepal Contact] ${form.subject || "New Inquiry"}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n` +
        `Service: ${form.service || "Not specified"}\nDeadline: ${form.deadline || "Not specified"}\n` +
        `Subject: ${form.subject}\n\nMessage:\n${form.message}` +
        (attachments.length ? `\n\nAttachments: ${attachments.map((f) => f.name).join(", ")}` : "")
      );
      window.open(`mailto:scholarsyncnepal@gmail.com?subject=${subj}&body=${body}`, "_blank");
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-16 bg-mesh">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/8 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
              <MessageSquare className="h-3.5 w-3.5" />
              We respond in under 10 minutes
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Get in Touch{" "}
            <span className="gradient-text">With Our Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="mt-4 text-muted-foreground leading-relaxed"
          >
            Have a question, need a quote, or want to discuss a large project? We&apos;re here
            24/7 — reach us any way that works for you.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

            {/* ── Contact form ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="glass rounded-2xl border border-white/[0.08] p-8"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 border border-green-500/25">
                      <CheckCircle2 className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                    <p className="mt-3 max-w-sm text-muted-foreground">
                      Thanks for reaching out. Our team will reply to{" "}
                      <span className="font-medium text-foreground">{form.email}</span> within
                      the next hour — usually much sooner.
                    </p>
                    <Button
                      variant="secondary"
                      size="md"
                      className="mt-6"
                      onClick={() => {
                        setSubmitted(false);
                        setForm(initialForm);
                        setAttachments([]);
                      }}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Send a Message</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Fill in the form below and we&apos;ll be in touch shortly.
                      </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full Name" required>
                        <input
                          name="name"
                          type="text"
                          required
                          placeholder="Ram Bahadur Thapa"
                          value={form.name}
                          onChange={handleChange}
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Email Address" required>
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="you@university.edu.np"
                          value={form.email}
                          onChange={handleChange}
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Service Required">
                        <select
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className={cn(inputCls, "appearance-none cursor-pointer")}
                        >
                          <option value="">Choose a service…</option>
                          {serviceOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Deadline">
                        <input
                          name="deadline"
                          type="date"
                          value={form.deadline}
                          onChange={handleChange}
                          className={cn(inputCls, "cursor-pointer")}
                        />
                      </Field>
                    </div>

                    <Field label="Subject / Topic" required>
                      <input
                        name="subject"
                        type="text"
                        required
                        placeholder="e.g. Data Structures assignment — need help by Friday"
                        value={form.subject}
                        onChange={handleChange}
                        className={inputCls}
                      />
                    </Field>

                    <Field label="Message" required>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Describe your assignment, word count, deadline, and any specific requirements…"
                        value={form.message}
                        onChange={handleChange}
                        className={cn(inputCls, "resize-y min-h-[120px]")}
                      />
                    </Field>

                    {/* File upload */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        Attachments <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>
                      </label>
                      <FileUploadZone files={attachments} onChange={setAttachments} />
                    </div>

                    <Button
                      type="submit"
                      variant="glow"
                      size="lg"
                      loading={loading}
                      className="w-full justify-center"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy" className="text-blue-400 hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── Right sidebar ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
              className="flex flex-col gap-4"
            >
              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/9749231395"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-green-500/30 bg-green-600/10 px-6 py-5 transition-all duration-200 hover:border-green-500/50 hover:bg-green-600/15"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-600 shadow-lg shadow-green-600/25">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">Chat on WhatsApp</p>
                  <p className="text-sm text-muted-foreground">+977 9749231395 · Avg. response: 10 min</p>
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </a>

              {/* Instagram CTA */}
              <a
                href="https://www.instagram.com/kushalghimire57/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-pink-500/25 bg-pink-600/8 px-6 py-5 transition-all duration-200 hover:border-pink-500/40 hover:bg-pink-600/12"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">Follow on Instagram</p>
                  <p className="text-sm text-muted-foreground">@kushalghimire57</p>
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </a>

              {/* Contact info */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Other Ways to Reach Us</h3>
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "scholarsyncnepal@gmail.com",
                    sub: "Response within 1 hour",
                    href: "mailto:scholarsyncnepal@gmail.com",
                    color: "text-blue-400",
                    bg: "bg-blue-500/10",
                  },
                  {
                    icon: Phone,
                    label: "Phone / WhatsApp",
                    value: "+977 9749231395",
                    sub: "Message anytime",
                    href: "https://wa.me/9749231395",
                    color: "text-green-400",
                    bg: "bg-green-500/10",
                  },
                  {
                    icon: Clock,
                    label: "Support Hours",
                    value: "24 / 7 / 365",
                    sub: "Always available",
                    href: null,
                    color: "text-purple-400",
                    bg: "bg-purple-500/10",
                  },
                ].map(({ icon: Icon, label, value, sub, href, color, bg }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${bg}`}>
                      <Icon className={`h-4 w-4 ${color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm font-semibold text-foreground hover:text-blue-400 transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-foreground">{value}</p>
                      )}
                      <p className="text-xs text-muted-foreground">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 space-y-3">
                <h3 className="font-semibold text-foreground">Follow Us</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: MessageCircle, label: "WhatsApp",  href: "https://wa.me/9749231395",                   color: "text-green-400 bg-green-500/10 hover:bg-green-500/20 border-green-500/20" },
                    { icon: Camera,        label: "Instagram", href: "https://www.instagram.com/kushalghimire57/", color: "text-pink-400 bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/20"     },
                    { icon: Code2,         label: "GitHub",    href: "https://github.com/Ghimire-Kushal",          color: "text-slate-300 bg-slate-500/10 hover:bg-slate-500/20 border-slate-500/20" },
                  ].map(({ icon: Icon, label, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${color}`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-medium">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response promise */}
              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-semibold text-foreground">Our Promise</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Every message gets a personal response — not a bot. We aim to reply within
                  10 minutes via chat and within 1 hour via email, 24/7.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Universities section */}
      <section className="border-t border-white/[0.06] pb-0 pt-16 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300">
              Nepal Coverage
            </span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              We Support Students From All Major Nepali Universities
            </h2>
            <p className="mt-3 text-muted-foreground text-sm max-w-xl mx-auto">
              Whether you study at TU, KU, PU, or any affiliated campus — our experts know your curriculum, grading style, and submission formats.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.04] border-b border-white/[0.07]">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">University Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Official Email Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {[
                    { name: "Tribhuvan University (TU)",                   location: "Kirtipur, Kathmandu", email: "info@tu.edu.np"                      },
                    { name: "Kathmandu University (KU)",                   location: "Dhulikhel, Kavre",   email: "info@ku.edu.np"                      },
                    { name: "Pokhara University (PU)",                     location: "Pokhara, Kaski",     email: "info@pu.edu.np"                      },
                    { name: "Purbanchal University",                       location: "Biratnagar",         email: "vice-chancellor@purbuniv.edu.np"     },
                    { name: "Agriculture and Forestry University (AFU)",   location: "Rampur, Chitwan",    email: "info@afu.edu.np"                     },
                    { name: "Nepal Sanskrit University",                   location: "Beljhundi, Dang",    email: "info@nsu.edu.np"                     },
                  ].map((uni, i) => (
                    <motion.tr
                      key={uni.name}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="hover:bg-white/[0.025] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-foreground">{uni.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-muted-foreground">{uni.location}</span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`mailto:${uni.email}`}
                          className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-blue-300 hover:text-blue-200 hover:border-blue-500/30 transition-all"
                        >
                          {uni.email}
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground pb-16">
            Studying at an affiliated college or a different university?{" "}
            <a href="https://wa.me/9749231395" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Contact us directly
            </a>{" "}
            — we cover all campuses.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.06] pb-20 md:pb-28 pt-16 md:pt-20 bg-dark-900/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
              Quick Answers
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Before You Reach Out
            </h2>
          </div>
          <div className="space-y-3">
            {contactFaqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
