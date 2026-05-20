"use client";

import { cn } from "@/lib/utils";

type Status =
  | "pending" | "confirmed" | "in_progress" | "review"
  | "revision" | "completed" | "cancelled" | "refunded"
  | "open" | "resolved" | "closed" | "succeeded" | "failed"
  | "active" | "inactive";

const STATUS_CONFIG: Record<Status, { label: string; className: string; dot: string }> = {
  pending:     { label: "Pending",     className: "border-amber-500/25 bg-amber-500/10 text-amber-300",   dot: "bg-amber-400" },
  confirmed:   { label: "Confirmed",   className: "border-blue-500/25 bg-blue-500/10 text-blue-300",      dot: "bg-blue-400" },
  in_progress: { label: "In Progress", className: "border-purple-500/25 bg-purple-500/10 text-purple-300", dot: "bg-purple-400" },
  review:      { label: "In Review",   className: "border-cyan-500/25 bg-cyan-500/10 text-cyan-300",       dot: "bg-cyan-400" },
  revision:    { label: "Revision",    className: "border-orange-500/25 bg-orange-500/10 text-orange-300", dot: "bg-orange-400" },
  completed:   { label: "Completed",   className: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300", dot: "bg-emerald-400" },
  cancelled:   { label: "Cancelled",   className: "border-red-500/25 bg-red-500/10 text-red-300",          dot: "bg-red-400" },
  refunded:    { label: "Refunded",    className: "border-slate-500/25 bg-slate-500/10 text-slate-300",    dot: "bg-slate-400" },
  open:        { label: "Open",        className: "border-blue-500/25 bg-blue-500/10 text-blue-300",       dot: "bg-blue-400" },
  resolved:    { label: "Resolved",    className: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300", dot: "bg-emerald-400" },
  closed:      { label: "Closed",      className: "border-slate-500/25 bg-slate-500/10 text-slate-300",    dot: "bg-slate-400" },
  succeeded:   { label: "Paid",        className: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300", dot: "bg-emerald-400" },
  failed:      { label: "Failed",      className: "border-red-500/25 bg-red-500/10 text-red-300",          dot: "bg-red-400" },
  active:      { label: "Active",      className: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300", dot: "bg-emerald-400" },
  inactive:    { label: "Inactive",    className: "border-slate-500/25 bg-slate-500/10 text-slate-300",    dot: "bg-slate-400" },
};

interface StatusBadgeProps {
  status: Status | string;
  className?: string;
  showDot?: boolean;
  size?: "sm" | "md";
}

export function StatusBadge({ status, className, showDot = true, size = "sm" }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status as Status] ?? {
    label: status.replace(/_/g, " "),
    className: "border-slate-500/25 bg-slate-500/10 text-slate-300",
    dot: "bg-slate-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium capitalize",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        config.className,
        className
      )}
    >
      {showDot && <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />}
      {config.label}
    </span>
  );
}
