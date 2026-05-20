"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Clock, DollarSign,
  FileText, MessageSquare, Star, ToggleLeft, ToggleRight,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/widgets/StatCard";
import { StatusBadge } from "@/components/dashboard/widgets/StatusBadge";
import { CountdownTimer } from "@/components/dashboard/widgets/CountdownTimer";
import { ActivityFeed } from "@/components/dashboard/widgets/ActivityFeed";
import { cn } from "@/lib/utils";

const EXPERT_ORDERS = [
  { id: "e1", orderNumber: "EDU-00012", subject: "Business Ethics Case Study", client: "Aarav S.", status: "in_progress", deadline: new Date(Date.now() + 2 * 86400000), progress: 65, earnings: 180 },
  { id: "e2", orderNumber: "EDU-00011", subject: "Quantum Computing Research", client: "Lena K.",  status: "review",      deadline: new Date(Date.now() + 4 * 3600000),  progress: 100, earnings: 285 },
  { id: "e3", orderNumber: "EDU-00015", subject: "MBA Marketing Analysis",     client: "Raj P.",   status: "confirmed",   deadline: new Date(Date.now() + 6 * 86400000), progress: 0,   earnings: 210 },
  { id: "e4", orderNumber: "EDU-00014", subject: "Sociology Literature Review",client: "Emma T.",  status: "revision",    deadline: new Date(Date.now() + 1 * 86400000), progress: 90,  earnings: 95 },
];

const EXPERT_ACTIVITY = [
  { id: "1", type: "order_completed" as const,    title: "Order submitted",       description: "Submitted PhD thesis for EDU-00010",   time: "1 hr ago",   meta: "+$340" },
  { id: "2", type: "message_received" as const,   title: "Student replied",       description: "Aarav confirmed the structure is good.", time: "3 hr ago",   meta: "EDU-00012" },
  { id: "3", type: "revision_requested" as const, title: "Revision requested",    description: "Emma T. needs changes on Sociology paper", time: "Yesterday",  meta: "EDU-00014" },
  { id: "4", type: "payment_succeeded" as const,  title: "Earnings credited",     description: "Payment for EDU-00010 received",         time: "2 days ago", meta: "+$340" },
];

function ExpertOrderRow({ order }: { order: typeof EXPERT_ORDERS[0] }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 hover:border-white/[0.12] transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-white">{order.subject}</p>
          <StatusBadge status={order.status} />
        </div>
        <p className="mt-0.5 text-xs text-slate-500">{order.orderNumber} · Client: {order.client}</p>
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Progress</span>
            <span className="text-[11px] text-slate-300">{order.progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${order.progress}%` }}
              transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={cn("h-full rounded-full", order.progress === 100 ? "bg-emerald-500" : "bg-blue-500")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="text-sm font-semibold text-emerald-400">${order.earnings}</span>
        <CountdownTimer deadline={order.deadline} compact />
        <Link href="/dashboard/expert/orders" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
          Open <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

export function ExpertOverview() {
  const [available, setAvailable] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Expert Dashboard</h1>
          <p className="mt-0.5 text-sm text-slate-400">Manage your assigned orders, earnings, and availability.</p>
        </div>
        <button
          onClick={() => setAvailable((v) => !v)}
          className={cn(
            "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
            available
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
              : "border-white/[0.09] bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
          )}
        >
          {available ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
          {available ? "Available" : "Unavailable"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Active Orders" value="4" detail="2 urgent" tone="blue" icon={<FileText className="h-4 w-4" />} />
        <StatCard label="MTD Earnings" value="$1,240" detail="11 orders" tone="green" icon={<DollarSign className="h-4 w-4" />} trend={{ value: 18, label: "vs last month" }} />
        <StatCard label="Avg. Rating" value="4.9" detail="Based on 87 reviews" tone="amber" icon={<Star className="h-4 w-4" />} />
        <StatCard label="Completion Rate" value="98%" detail="49 of 50 orders" tone="purple" icon={<CheckCircle2 className="h-4 w-4" />} />
      </div>

      {/* Main grid */}
      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        {/* Assigned orders */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Assigned orders</h2>
            <Link href="/dashboard/expert/orders" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {EXPERT_ORDERS.map((order) => (
            <ExpertOrderRow key={order.id} order={order} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Earnings breakdown */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">Earnings breakdown</h3>
            <div className="space-y-2.5">
              {[
                { label: "This week",  value: "$420",    color: "bg-blue-500" },
                { label: "This month", value: "$1,240",  color: "bg-purple-500" },
                { label: "Last month", value: "$1,050",  color: "bg-slate-600" },
                { label: "Pending",    value: "$560",    color: "bg-amber-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2 w-2 rounded-full", item.color)} />
                    <span className="text-xs text-slate-400">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming deadlines */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <div className="mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">Upcoming deadlines</h3>
            </div>
            <div className="space-y-2">
              {EXPERT_ORDERS.filter(o => o.status !== "review").slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2">
                  <p className="truncate text-xs text-slate-300">{order.orderNumber}</p>
                  <CountdownTimer deadline={order.deadline} compact />
                </div>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <div className="mb-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Messages</h3>
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">3</span>
            </div>
            <Link href="/dashboard/expert/messages" className="block text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View all conversations →
            </Link>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
        <h2 className="mb-4 text-base font-semibold text-white">Recent activity</h2>
        <ActivityFeed events={EXPERT_ACTIVITY} />
      </div>
    </div>
  );
}
