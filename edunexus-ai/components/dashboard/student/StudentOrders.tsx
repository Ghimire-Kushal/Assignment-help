"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ChevronRight, Download, FileText, Filter,
  MessageSquare, PlusCircle, RotateCcw, Search, Star, Upload,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/widgets/StatusBadge";
import { CountdownTimer } from "@/components/dashboard/widgets/CountdownTimer";
import { EmptyState } from "@/components/dashboard/widgets/EmptyState";
import { SkeletonTable } from "@/components/dashboard/widgets/SkeletonCard";
import { cn } from "@/lib/utils";

type OrderStatus = "pending" | "confirmed" | "in_progress" | "review" | "revision" | "completed" | "cancelled";

interface MockOrder {
  id: string;
  orderNumber: string;
  subject: string;
  serviceType: string;
  academicLevel: string;
  status: OrderStatus;
  deadline: Date;
  wordCount: number;
  price: number;
  isPaid: boolean;
  expert: { name: string; initials: string; rating: number } | null;
  createdAt: Date;
}

const MOCK_ORDERS: MockOrder[] = [];

const STATUS_FILTERS = ["all", "pending", "confirmed", "in_progress", "review", "revision", "completed", "cancelled"] as const;

function OrderRow({ order, isExpanded, onToggle }: {
  order: MockOrder;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer border-b border-white/[0.05] transition-colors hover:bg-white/[0.03]"
      >
        <td className="px-4 py-3.5">
          <div className="flex items-center gap-2">
            <ChevronRight className={cn("h-4 w-4 flex-shrink-0 text-slate-500 transition-transform", isExpanded && "rotate-90")} />
            <div>
              <p className="text-sm font-medium text-white">{order.subject}</p>
              <p className="text-[11px] text-slate-500">{order.orderNumber}</p>
            </div>
          </div>
        </td>
        <td className="hidden px-4 py-3.5 text-xs text-slate-400 sm:table-cell">
          {order.serviceType.replace(/_/g, " ")}
        </td>
        <td className="px-4 py-3.5">
          <StatusBadge status={order.status} />
        </td>
        <td className="hidden px-4 py-3.5 lg:table-cell">
          <CountdownTimer deadline={order.deadline} compact />
        </td>
        <td className="hidden px-4 py-3.5 text-sm text-slate-300 sm:table-cell">
          रू {order.price.toLocaleString("ne-NP")}
        </td>
        <td className="px-4 py-3.5">
          {order.expert ? (
            <div className="flex items-center gap-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white">
                {order.expert.initials}
              </span>
              <span className="hidden text-xs text-slate-300 lg:block">{order.expert.name.split(" ")[0]}</span>
            </div>
          ) : (
            <span className="text-xs text-slate-500">—</span>
          )}
        </td>
      </tr>
      <AnimatePresence>
        {isExpanded && (
          <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <td colSpan={6} className="border-b border-white/[0.05] bg-white/[0.02] px-4 py-4">
              <div className="flex flex-wrap gap-3">
                <div className="flex-1 space-y-1 text-xs text-slate-400">
                  <p><span className="text-slate-500">Level:</span> {order.academicLevel.replace(/_/g, " ")}</p>
                  {order.wordCount > 0 && <p><span className="text-slate-500">Words:</span> {order.wordCount.toLocaleString()}</p>}
                  <p><span className="text-slate-500">Deadline:</span> {order.deadline.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                  <p><span className="text-slate-500">Payment:</span> {order.isPaid ? "✓ Paid" : "⚠ Unpaid"}</p>
                  {order.expert && (
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500">Expert:</span> {order.expert.name}
                      <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                      <span>{order.expert.rating}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  {order.status === "review" && (
                    <button className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-500/20">
                      <RotateCcw className="h-3 w-3" /> Request revision
                    </button>
                  )}
                  {order.status === "completed" && (
                    <button className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20">
                      <Download className="h-3 w-3" /> Download files
                    </button>
                  )}
                  {order.status !== "cancelled" && (
                    <Link
                      href="/dashboard/student/messages"
                      className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08]"
                    >
                      <MessageSquare className="h-3 w-3" /> Message expert
                    </Link>
                  )}
                  {!order.isPaid && order.status !== "cancelled" && (
                    <Link
                      href="/dashboard/student/payments"
                      className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300 transition hover:bg-blue-500/20"
                    >
                      Pay now
                    </Link>
                  )}
                  {order.status === "in_progress" && (
                    <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08]">
                      <Upload className="h-3 w-3" /> Upload files
                    </button>
                  )}
                </div>
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

export function StudentOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<typeof STATUS_FILTERS[number]>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_ORDERS.filter((o) => {
      const matchSearch = o.subject.toLowerCase().includes(search.toLowerCase()) ||
        o.orderNumber.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">My Orders</h1>
          <p className="mt-0.5 text-sm text-slate-400">{MOCK_ORDERS.length} total · {MOCK_ORDERS.filter(o => ["in_progress","confirmed","review","revision"].includes(o.status)).length} active</p>
        </div>
        <Link
          href="/dashboard/student/create-request"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 active:scale-95 transition-all"
        >
          <PlusCircle className="h-4 w-4" /> New order
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-white/[0.09] bg-white/[0.04] pl-9 pr-4 text-sm text-foreground placeholder:text-slate-500 focus:border-blue-500/40 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
          />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-white/[0.07] bg-white/[0.03] p-0.5">
          <Filter className="ml-2 h-3.5 w-3.5 text-slate-500" />
          {STATUS_FILTERS.slice(0, 5).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors",
                statusFilter === s
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {s === "in_progress" ? "In Progress" : s}
            </button>
          ))}
          <select
            onChange={(e) => setStatusFilter(e.target.value as typeof STATUS_FILTERS[number])}
            value={STATUS_FILTERS.slice(5).includes(statusFilter as typeof STATUS_FILTERS[number]) ? statusFilter : ""}
            className="rounded-md bg-transparent px-2 py-1 text-xs text-slate-400 focus:outline-none"
          >
            <option value="">More</option>
            {STATUS_FILTERS.slice(5).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <SkeletonTable rows={6} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-8 w-8" />}
          title="No orders found"
          description={search ? "No orders match your search." : "You haven&apos;t placed any orders yet."}
          action={
            <Link href="/dashboard/student/create-request" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
              <PlusCircle className="h-4 w-4" /> Place first order
            </Link>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/[0.07]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Order</th>
                  <th className="hidden px-4 py-3 text-left text-xs font-medium text-slate-400 sm:table-cell">Service</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Status</th>
                  <th className="hidden px-4 py-3 text-left text-xs font-medium text-slate-400 lg:table-cell">Deadline</th>
                  <th className="hidden px-4 py-3 text-left text-xs font-medium text-slate-400 sm:table-cell">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Expert</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    isExpanded={expandedId === order.id}
                    onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-white/[0.07] px-4 py-3 text-xs text-slate-500">
            Showing {filtered.length} of {MOCK_ORDERS.length} orders
          </div>
        </div>
      )}
    </div>
  );
}
