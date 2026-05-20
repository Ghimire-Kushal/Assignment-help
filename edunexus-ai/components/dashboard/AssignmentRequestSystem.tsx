"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  FileArchive,
  FileText,
  GraduationCap,
  Paperclip,
  Sparkles,
  UploadCloud,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/shared/Card";
import { cn } from "@/lib/utils";

const subjects = [
  "Business",
  "Computer Science",
  "Nursing",
  "Psychology",
  "Economics",
  "Law",
  "Engineering",
  "Literature",
];

const academicLevels = [
  "High School",
  "Undergraduate",
  "Master's",
  "Doctoral",
  "Professional",
];

const allowedExtensions = ["pdf", "docx", "zip"];
const maxFileSize = 25 * 1024 * 1024;

type MockFile = {
  name: string;
  size: number;
  status: "accepted" | "rejected";
  message: string;
};

const seededFiles: MockFile[] = [
  {
    name: "research-brief.pdf",
    size: 2400000,
    status: "accepted",
    message: "Ready for review. This is a UI-only validation.",
  },
  {
    name: "lecture-notes.pages",
    size: 1800000,
    status: "rejected",
    message: "Unsupported type. Please use PDF, DOCX, or ZIP.",
  },
];

export function AssignmentRequestForm() {
  const [subject, setSubject] = useState("Business");
  const [level, setLevel] = useState("Undergraduate");
  const [deadline, setDeadline] = useState("2026-05-27T18:00");
  const [budget, setBudget] = useState("180");
  const [description, setDescription] = useState(
    "I need a structured research report with credible academic sources, clear headings, and APA 7 references."
  );
  const [files, setFiles] = useState<MockFile[]>(seededFiles);

  const summary = useMemo(() => {
    const parsedBudget = Number(budget || 0);
    const serviceFee = Math.max(12, Math.round(parsedBudget * 0.08));
    return {
      budget: parsedBudget,
      serviceFee,
      estimatedTotal: parsedBudget + serviceFee,
      validFiles: files.filter((file) => file.status === "accepted").length,
    };
  }, [budget, files]);

  function validateFiles(fileList: FileList | null) {
    if (!fileList) return;

    const nextFiles = Array.from(fileList).map((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!allowedExtensions.includes(extension)) {
        return {
          name: file.name,
          size: file.size,
          status: "rejected" as const,
          message: "Unsupported type. Please use PDF, DOCX, or ZIP.",
        };
      }

      if (file.size > maxFileSize) {
        return {
          name: file.name,
          size: file.size,
          status: "rejected" as const,
          message: "File is larger than the 25 MB mock limit.",
        };
      }

      return {
        name: file.name,
        size: file.size,
        status: "accepted" as const,
        message: "Looks good. File is staged in the UI only.",
      };
    });

    setFiles((current) => [...nextFiles, ...current].slice(0, 6));
  }

  return (
    <div className="space-y-6">
      <RequestHero />
      <div className="grid gap-6 xl:grid-cols-[1fr_23rem]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Card padding="md" className="rounded-lg">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Subject / category" icon={<BookOpen className="h-4 w-4" />}>
                <select
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="dashboard-input"
                >
                  {subjects.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </Field>

              <Field label="Academic level" icon={<GraduationCap className="h-4 w-4" />}>
                <select
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  className="dashboard-input"
                >
                  {academicLevels.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </Field>

              <Field label="Deadline" icon={<CalendarDays className="h-4 w-4" />}>
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(event) => setDeadline(event.target.value)}
                  className="dashboard-input"
                />
              </Field>

              <Field label="Budget" icon={<DollarSign className="h-4 w-4" />}>
                <input
                  type="number"
                  min="25"
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  className="dashboard-input"
                  placeholder="180"
                />
              </Field>
            </div>

            <Field label="Assignment description" icon={<FileText className="h-4 w-4" />} className="mt-5">
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={7}
                className="dashboard-input resize-none leading-6"
                placeholder="Describe the assignment, grading rubric, citation style, word count, and anything your expert should know."
              />
            </Field>

            <div className="mt-5">
              <FileUploadPanel files={files} onValidate={validateFiles} />
            </div>
          </Card>
        </motion.div>

        <OrderSummaryCard
          subject={subject}
          level={level}
          deadline={deadline}
          description={description}
          budget={summary.budget}
          serviceFee={summary.serviceFee}
          estimatedTotal={summary.estimatedTotal}
          validFiles={summary.validFiles}
        />
      </div>
    </div>
  );
}

function RequestHero() {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(37,99,235,.22),rgba(20,184,166,.09),rgba(168,85,247,.18))] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-blue-100">
            <Sparkles className="h-3.5 w-3.5" />
            Assignment request builder
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-white">Create a premium academic request</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Add the brief, constraints, files, deadline, and budget. Everything here is mock UI and ready for backend integration later.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {["PDF", "DOCX", "ZIP"].map((item) => (
            <span key={item} className="rounded-lg border border-white/10 bg-white/10 px-3 py-3 text-xs font-semibold text-white">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  className,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
        <span className="text-blue-300">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

function FileUploadPanel({
  files,
  onValidate,
}: {
  files: MockFile[];
  onValidate: (files: FileList | null) => void;
}) {
  return (
    <div className="space-y-4">
      <label className="group flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-blue-400/40 bg-blue-500/[0.06] p-6 text-center transition hover:border-blue-300 hover:bg-blue-500/[0.1]">
        <input
          type="file"
          multiple
          accept=".pdf,.docx,.zip,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip"
          onChange={(event) => onValidate(event.target.files)}
          className="sr-only"
        />
        <UploadCloud className="h-9 w-9 text-blue-200 transition group-hover:-translate-y-1" />
        <p className="mt-3 text-sm font-semibold text-white">Drop files here or browse</p>
        <p className="mt-1 text-xs text-slate-400">PDF, DOCX, or ZIP only. Mock validation limit: 25 MB per file.</p>
      </label>

      <div className="grid gap-3">
        {files.map((file) => (
          <div
            key={`${file.name}-${file.size}-${file.message}`}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-3",
              file.status === "accepted"
                ? "border-emerald-400/20 bg-emerald-500/[0.06]"
                : "border-red-400/20 bg-red-500/[0.06]"
            )}
          >
            <div className="mt-0.5 text-slate-200">
              {file.name.endsWith(".zip") ? <FileArchive className="h-5 w-5" /> : <Paperclip className="h-5 w-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{file.name}</p>
              <p className="mt-1 text-xs text-slate-400">{formatBytes(file.size)}</p>
              <div
                className={cn(
                  "mt-2 flex items-center gap-2 text-xs",
                  file.status === "accepted" ? "text-emerald-200" : "text-red-200"
                )}
              >
                {file.status === "accepted" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                {file.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderSummaryCard({
  subject,
  level,
  deadline,
  description,
  budget,
  serviceFee,
  estimatedTotal,
  validFiles,
}: {
  subject: string;
  level: string;
  deadline: string;
  description: string;
  budget: number;
  serviceFee: number;
  estimatedTotal: number;
  validFiles: number;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="xl:sticky xl:top-24 xl:self-start"
    >
      <Card padding="md" className="rounded-lg border-blue-400/20 bg-blue-500/[0.045]">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">Order summary</h3>
          <span className="rounded-md border border-amber-400/25 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-100">
            Draft
          </span>
        </div>

        <div className="mt-5 space-y-4">
          <SummaryRow label="Subject" value={subject} />
          <SummaryRow label="Level" value={level} />
          <SummaryRow label="Deadline" value={deadline ? new Date(deadline).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "Not set"} />
          <SummaryRow label="Valid files" value={`${validFiles} staged`} />
          <SummaryRow label="Budget" value={`$${budget || 0}`} />
          <SummaryRow label="Service fee" value={`$${serviceFee}`} />
        </div>

        <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs text-slate-400">Estimated total</p>
          <p className="mt-1 text-3xl font-semibold text-white">${estimatedTotal}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Estimate only. Checkout and payment logic will connect later.
          </p>
        </div>

        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Brief strength</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 transition-all"
              style={{ width: `${Math.min(100, 42 + description.length / 8 + validFiles * 8)}%` }}
            />
          </div>
        </div>

        <button className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-slate-950 transition hover:bg-blue-100">
          Save mock request
        </button>
      </Card>
    </motion.aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-right text-sm font-medium text-white">{value}</span>
    </div>
  );
}

export function MyOrdersWorkspace() {
  const selectedOrder = mockOrders[0];

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">My Orders</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Track requests, deadlines, files, payment state, and expert progress with mock assignment data.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Active 4", "Review 2", "Done 18"].map((item) => (
              <span key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-center text-xs text-slate-200">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 2xl:grid-cols-[1fr_24rem]">
        <OrdersTable />
        <div className="space-y-6">
          <OrderTimeline order={selectedOrder} />
          <Card padding="md" className="rounded-lg">
            <h3 className="text-base font-semibold text-white">Status badges</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Draft", "Quoted", "In Progress", "Review", "Delivered", "Revision"].map((status) => (
                <StatusBadge key={status} status={status} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function OrdersTable() {
  return (
    <Card padding="none" className="overflow-hidden rounded-lg">
      <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold text-white">Assignment orders</h3>
        <span className="text-xs text-slate-500">Mock table data only</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3 font-medium">Subject</th>
              <th className="px-5 py-3 font-medium">Deadline</th>
              <th className="px-5 py-3 font-medium">Budget</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {mockOrders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="hover:bg-white/[0.025]"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-white">{order.id}</p>
                  <p className="mt-1 text-xs text-slate-500">{order.title}</p>
                </td>
                <td className="px-5 py-4 text-slate-300">{order.subject}</td>
                <td className="px-5 py-4 text-slate-300">{order.deadline}</td>
                <td className="px-5 py-4 text-slate-300">${order.budget}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-teal-300" style={{ width: `${order.progress}%` }} />
                    </div>
                    <span className="text-xs text-slate-400">{order.progress}%</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function OrderTimeline({ order }: { order: (typeof mockOrders)[number] }) {
  return (
    <Card padding="md" className="rounded-lg">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white">Tracking timeline</h3>
          <p className="mt-1 text-xs text-slate-500">{order.id} selected</p>
        </div>
        <Clock className="h-4 w-4 text-slate-400" />
      </div>
      <div className="mt-5 space-y-4">
        {order.timeline.map((item, index) => (
          <div key={item.label} className="grid grid-cols-[1.25rem_1fr] gap-3">
            <div className="relative flex justify-center">
              <span
                className={cn(
                  "mt-1 h-3 w-3 rounded-full border",
                  item.done ? "border-emerald-300 bg-emerald-400" : "border-slate-500 bg-slate-800"
                )}
              />
              {index < order.timeline.length - 1 ? <span className="absolute top-5 h-[calc(100%+0.5rem)] w-px bg-white/10" /> : null}
            </div>
            <div className="pb-3">
              <p className={cn("text-sm font-medium", item.done ? "text-white" : "text-slate-400")}>{item.label}</p>
              <p className="mt-1 text-xs text-slate-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const classes: Record<string, string> = {
    Draft: "border-slate-400/20 bg-slate-400/10 text-slate-200",
    Quoted: "border-blue-400/20 bg-blue-500/10 text-blue-200",
    "In Progress": "border-purple-400/20 bg-purple-500/10 text-purple-200",
    Review: "border-amber-400/20 bg-amber-500/10 text-amber-200",
    Delivered: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
    Revision: "border-red-400/20 bg-red-500/10 text-red-200",
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium", classes[status])}>
      {status === "Revision" ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
      {status}
    </span>
  );
}

function formatBytes(bytes: number) {
  if (!bytes) return "0 KB";
  const size = bytes / 1024 / 1024;
  return size >= 1 ? `${size.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

const mockOrders = [
  {
    id: "ENX-1048",
    title: "Research methodology paper",
    subject: "Business",
    deadline: "May 27, 6:00 PM",
    budget: 180,
    status: "Review",
    progress: 82,
    timeline: [
      { label: "Request submitted", time: "May 20, 9:14 AM", done: true },
      { label: "Quote approved", time: "May 20, 10:05 AM", done: true },
      { label: "Expert assigned", time: "May 20, 11:30 AM", done: true },
      { label: "Draft uploaded", time: "May 22, 4:18 PM", done: true },
      { label: "Final delivery", time: "Pending", done: false },
    ],
  },
  {
    id: "ENX-1042",
    title: "Economics case study",
    subject: "Economics",
    deadline: "May 29, 2:00 PM",
    budget: 140,
    status: "In Progress",
    progress: 54,
    timeline: [
      { label: "Request submitted", time: "May 18, 7:40 PM", done: true },
      { label: "Quote approved", time: "May 18, 8:10 PM", done: true },
      { label: "Expert assigned", time: "May 19, 9:00 AM", done: true },
      { label: "Draft uploaded", time: "Pending", done: false },
      { label: "Final delivery", time: "Pending", done: false },
    ],
  },
  {
    id: "ENX-1037",
    title: "Nursing reflection",
    subject: "Nursing",
    deadline: "Delivered",
    budget: 95,
    status: "Delivered",
    progress: 100,
    timeline: [
      { label: "Request submitted", time: "May 12, 1:20 PM", done: true },
      { label: "Quote approved", time: "May 12, 2:05 PM", done: true },
      { label: "Expert assigned", time: "May 12, 4:40 PM", done: true },
      { label: "Draft uploaded", time: "May 14, 8:00 PM", done: true },
      { label: "Final delivery", time: "May 15, 9:30 AM", done: true },
    ],
  },
  {
    id: "ENX-1029",
    title: "Python data analysis project",
    subject: "Computer Science",
    deadline: "May 31, 11:59 PM",
    budget: 220,
    status: "Quoted",
    progress: 18,
    timeline: [
      { label: "Request submitted", time: "May 20, 2:55 PM", done: true },
      { label: "Quote approved", time: "Pending", done: false },
      { label: "Expert assigned", time: "Pending", done: false },
      { label: "Draft uploaded", time: "Pending", done: false },
      { label: "Final delivery", time: "Pending", done: false },
    ],
  },
];

