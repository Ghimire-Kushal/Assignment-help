"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
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
import { useToast } from "@/hooks/useToast";
import { type BackendOrder, orderService } from "@/services/orderService";

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
  file?: File;
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
  const toast = useToast();
  const [subject, setSubject] = useState("Business");
  const [level, setLevel] = useState("Undergraduate");
  const [deadline, setDeadline] = useState("2026-05-27T18:00");
  const [budget, setBudget] = useState("180");
  const [description, setDescription] = useState(
    "I need a structured research report with credible academic sources, clear headings, and APA 7 references."
  );
  const [files, setFiles] = useState<MockFile[]>(seededFiles);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
        file,
      };
    });

    setFiles((current) => [...nextFiles, ...current].slice(0, 6));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setMessage(null);

    try {
      const order = await orderService.create({
        serviceType: "assignment",
        subject,
        topic: `${subject} assignment request`,
        description,
        deadline: new Date(deadline).toISOString(),
        budget: Number(budget || 0),
        academicLevel: mapAcademicLevel(level),
        citationStyle: "APA",
      });

      const uploadableFiles = files
        .filter((item) => item.status === "accepted" && item.file)
        .map((item) => item.file as File);

      if (uploadableFiles.length) {
        await orderService.uploadFiles(order._id ?? order.id, uploadableFiles);
      }

      const text = uploadableFiles.length
        ? "Assignment request submitted and files staged for backend upload."
        : "Assignment request submitted successfully.";
      setMessage({ type: "success", text });
      toast.success(text);
    } catch (error) {
      const text = error instanceof Error ? error.message : "Unable to submit assignment request.";
      setMessage({ type: "error", text });
      toast.error(text);
    } finally {
      setSubmitting(false);
    }
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
                
              />
            </Field>

            <div className="mt-5">
              <FileUploadPanel files={files} onValidate={validateFiles} />
            </div>

            {message ? (
              <div
                className={cn(
                  "mt-5 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm",
                  message.type === "success"
                    ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-100"
                    : "border-red-400/25 bg-red-500/10 text-red-100"
                )}
              >
                {message.type === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />}
                <span>{message.text}</span>
              </div>
            ) : null}
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
          submitting={submitting}
          onSubmit={handleSubmit}
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
  icon: ReactNode;
  className?: string;
  children: ReactNode;
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
  submitting,
  onSubmit,
}: {
  subject: string;
  level: string;
  deadline: string;
  description: string;
  budget: number;
  serviceFee: number;
  estimatedTotal: number;
  validFiles: number;
  submitting: boolean;
  onSubmit: () => void;
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

        <button
          onClick={onSubmit}
          disabled={submitting}
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-slate-950 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
          ) : null}
          Submit assignment request
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
  const toast = useToast();
  const [orders, setOrders] = useState<BackendOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<BackendOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadOrders() {
      setLoading(true);
      setError(null);

      try {
        const response = await orderService.getMyOrders();
        if (!mounted) return;
        setOrders(response.orders);
        setSelectedOrder(response.orders[0] ?? null);
      } catch (err) {
        const text = err instanceof Error ? err.message : "Unable to load orders.";
        if (!mounted) return;
        setError(text);
        toast.error(text);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadOrders();

    return () => {
      mounted = false;
    };
  }, [toast]);

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
            {[`Active ${orders.filter((order) => !["completed", "cancelled", "refunded"].includes(order.status)).length}`, `Review ${orders.filter((order) => order.status === "review").length}`, `Done ${orders.filter((order) => order.status === "completed").length}`].map((item) => (
              <span key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-center text-xs text-slate-200">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 2xl:grid-cols-[1fr_24rem]">
        <OrdersTable orders={orders} loading={loading} error={error} onSelect={setSelectedOrder} />
        <div className="space-y-6">
          <OrderTimeline order={selectedOrder} loading={loading} />
          <Card padding="md" className="rounded-lg">
            <h3 className="text-base font-semibold text-white">Status badges</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["pending", "confirmed", "in_progress", "review", "completed", "revision"].map((status) => (
                <StatusBadge key={status} status={status} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function OrdersTable({
  orders,
  loading,
  error,
  onSelect,
}: {
  orders: BackendOrder[];
  loading: boolean;
  error: string | null;
  onSelect: (order: BackendOrder) => void;
}) {
  return (
    <Card padding="none" className="overflow-hidden rounded-lg">
      <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold text-white">Assignment orders</h3>
        <span className="text-xs text-slate-500">Mock table data only</span>
      </div>
      {loading ? (
        <OrdersSkeleton />
      ) : error ? (
        <OrdersEmptyState title="Could not load orders" description={error} />
      ) : orders.length === 0 ? (
        <OrdersEmptyState title="No orders yet" description="Submit your first assignment request to see live order tracking here." />
      ) : (
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
            {orders.map((order, index) => (
              <motion.tr
                key={order._id ?? order.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="cursor-pointer hover:bg-white/[0.025]"
                onClick={() => onSelect(order)}
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-white">{order.orderNumber ?? order.id}</p>
                  <p className="mt-1 text-xs text-slate-500">{order.topic ?? order.title ?? "Assignment request"}</p>
                </td>
                <td className="px-5 py-4 text-slate-300">{order.subject}</td>
                <td className="px-5 py-4 text-slate-300">{formatDate(order.deadline)}</td>
                <td className="px-5 py-4 text-slate-300">${order.budget ?? order.finalPrice ?? 0}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-teal-300" style={{ width: `${statusProgress(order.status)}%` }} />
                    </div>
                    <span className="text-xs text-slate-400">{statusProgress(order.status)}%</span>
                    <OrderDetailsModal order={order} />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </Card>
  );
}

function OrderTimeline({ order, loading }: { order: BackendOrder | null; loading: boolean }) {
  const timeline = getTimeline(order);

  return (
    <Card padding="md" className="rounded-lg">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white">Tracking timeline</h3>
          <p className="mt-1 text-xs text-slate-500">{order ? `${order.orderNumber ?? order.id} selected` : "No order selected"}</p>
        </div>
        <Clock className="h-4 w-4 text-slate-400" />
      </div>
      {loading ? (
        <div className="mt-5 space-y-4">
          {[0, 1, 2, 3].map((item) => <div key={item} className="h-10 animate-pulse rounded-lg bg-white/10" />)}
        </div>
      ) : !order ? (
        <p className="mt-5 text-sm leading-6 text-slate-400">Orders loaded from the backend will show status history here.</p>
      ) : (
      <div className="mt-5 space-y-4">
        {timeline.map((item, index) => (
          <div key={item.label} className="grid grid-cols-[1.25rem_1fr] gap-3">
            <div className="relative flex justify-center">
              <span
                className={cn(
                  "mt-1 h-3 w-3 rounded-full border",
                  item.done ? "border-emerald-300 bg-emerald-400" : "border-slate-500 bg-slate-800"
                )}
              />
              {index < timeline.length - 1 ? <span className="absolute top-5 h-[calc(100%+0.5rem)] w-px bg-white/10" /> : null}
            </div>
            <div className="pb-3">
              <p className={cn("text-sm font-medium", item.done ? "text-white" : "text-slate-400")}>{item.label}</p>
              <p className="mt-1 text-xs text-slate-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
      )}
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const classes: Record<string, string> = {
    pending: "border-slate-400/20 bg-slate-400/10 text-slate-200",
    confirmed: "border-blue-400/20 bg-blue-500/10 text-blue-200",
    in_progress: "border-purple-400/20 bg-purple-500/10 text-purple-200",
    review: "border-amber-400/20 bg-amber-500/10 text-amber-200",
    completed: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
    revision: "border-red-400/20 bg-red-500/10 text-red-200",
    Draft: "border-slate-400/20 bg-slate-400/10 text-slate-200",
    Quoted: "border-blue-400/20 bg-blue-500/10 text-blue-200",
    "In Progress": "border-purple-400/20 bg-purple-500/10 text-purple-200",
    Review: "border-amber-400/20 bg-amber-500/10 text-amber-200",
    Delivered: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
    Revision: "border-red-400/20 bg-red-500/10 text-red-200",
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium", classes[status])}>
      {status === "revision" || status === "Revision" ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
      {humanizeStatus(status)}
    </span>
  );
}

function OrdersSkeleton() {
  return (
    <div className="space-y-3 p-5">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="grid gap-3 rounded-lg border border-white/10 p-4 sm:grid-cols-[1fr_8rem_7rem_8rem]">
          <span className="h-4 animate-pulse rounded bg-white/10" />
          <span className="h-4 animate-pulse rounded bg-white/10" />
          <span className="h-4 animate-pulse rounded bg-white/10" />
          <span className="h-4 animate-pulse rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}

function OrdersEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.06] text-blue-200">
        <FileText className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

function OrderDetailsModal({ order }: { order: BackendOrder }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        onClick={(event) => event.stopPropagation()}
        className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-200 hover:bg-white/[0.08]"
      >
        Details
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/65" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[min(92vw,38rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-white/10 bg-[#101527] p-5 shadow-2xl">
          <Dialog.Title className="text-lg font-semibold text-white">{order.orderNumber ?? order.id}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-6 text-slate-400">
            {order.topic ?? order.title ?? "Assignment request"} • {order.subject}
          </Dialog.Description>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <SummaryTile label="Status" value={humanizeStatus(order.status)} />
            <SummaryTile label="Deadline" value={formatDate(order.deadline)} />
            <SummaryTile label="Budget" value={`$${order.budget ?? order.finalPrice ?? 0}`} />
            <SummaryTile label="Academic level" value={humanizeStatus(order.academicLevel ?? "undergraduate")} />
          </div>
          <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Description</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{order.description}</p>
          </div>
          <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Client files</p>
            <div className="mt-3 space-y-2">
              {order.clientFiles?.length ? order.clientFiles.map((file) => (
                <div key={file._id ?? file.id ?? file.filename} className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate text-slate-200">{file.filename}</span>
                  <span className="text-xs text-slate-500">{formatBytes(file.sizeBytes ?? 0)}</span>
                </div>
              )) : <p className="text-sm text-slate-400">No files attached yet.</p>}
            </div>
          </div>
          <Dialog.Close className="mt-5 h-10 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-500">
            Close
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function mapAcademicLevel(level: string) {
  const map: Record<string, string> = {
    "High School": "high_school",
    Undergraduate: "undergraduate",
    "Master's": "masters",
    Doctoral: "phd",
    Professional: "other",
  };
  return map[level] ?? "undergraduate";
}

function statusProgress(status: string) {
  const map: Record<string, number> = {
    pending: 12,
    confirmed: 28,
    in_progress: 58,
    review: 82,
    revision: 68,
    completed: 100,
    cancelled: 100,
    refunded: 100,
  };
  return map[status] ?? 12;
}

function getTimeline(order: BackendOrder | null) {
  if (!order) return [];
  const history = order.statusHistory ?? [];
  const currentProgress = statusProgress(order.status);
  const steps = [
    { status: "pending", label: "Request submitted", threshold: 12 },
    { status: "confirmed", label: "Order confirmed", threshold: 28 },
    { status: "in_progress", label: "Expert working", threshold: 58 },
    { status: "review", label: "Ready for review", threshold: 82 },
    { status: "completed", label: "Final delivery", threshold: 100 },
  ];

  return steps.map((step) => {
    const item = history.find((entry) => entry.status === step.status);
    return {
      label: step.label,
      time: item?.changedAt ? formatDate(item.changedAt) : step.status === "pending" ? formatDate(order.createdAt) : "Pending",
      done: currentProgress >= step.threshold,
    };
  });
}

function humanizeStatus(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(value?: string) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

function formatBytes(bytes: number) {
  if (!bytes) return "0 KB";
  const size = bytes / 1024 / 1024;
  return size >= 1 ? `${size.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}
