"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Bot, CreditCard, FileText, GraduationCap,
  MessageSquare, PlusCircle, Star, TrendingUp, User,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/widgets/StatCard";
import { ProgressRing } from "@/components/dashboard/widgets/ProgressRing";
import { CountdownTimer } from "@/components/dashboard/widgets/CountdownTimer";
import { ActivityFeed, MOCK_ACTIVITY } from "@/components/dashboard/widgets/ActivityFeed";
import { StatusBadge } from "@/components/dashboard/widgets/StatusBadge";
import { cn } from "@/lib/utils";

const MOCK_ACTIVE_ORDERS = [
  {
    id: "1",
    orderNumber: "EDU-00012",
    subject: "Business Ethics",
    serviceType: "thesis",
    status: "in_progress",
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    progress: 65,
    expert: { name: "Dr. Marcus Ellis", initials: "ME", rating: 4.9 },
  },
  {
    id: "2",
    orderNumber: "EDU-00011",
    subject: "Quantum Computing Research",
    serviceType: "research_paper",
    status: "review",
    deadline: new Date(Date.now() + 4 * 60 * 60 * 1000),
    progress: 100,
    expert: { name: "Prof. Sarah Chen", initials: "SC", rating: 5.0 },
  },
  {
    id: "3",
    orderNumber: "EDU-00010",
    subject: "Marketing Strategy",
    serviceType: "assignment",
    status: "confirmed",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    progress: 10,
    expert: null,
  },
];

const AI_QUICK_ACTIONS = [
  { label: "Generate outline", icon: FileText, href: "/dashboard/student/ai-tools?tool=outline", color: "text-blue-400" },
  { label: "Citation helper", icon: GraduationCap, href: "/dashboard/student/ai-tools?tool=citation", color: "text-purple-400" },
  { label: "Topic ideas", icon: Bot, href: "/dashboard/student/ai-tools?tool=topic", color: "text-emerald-400" },
  { label: "Summarize text", icon: FileText, href: "/dashboard/student/ai-tools?tool=summarizer", color: "text-amber-400" },
];

function OrderCard({ order }: { order: typeof MOCK_ACTIVE_ORDERS[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.05]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-white">{order.subject}</p>
            <StatusBadge status={order.status} />
          </div>
          <p className="mt-0.5 text-xs text-slate-500">{order.orderNumber} · {order.serviceType.replace(/_/g, " ")}</p>
        </div>
        <Link
          href={`/dashboard/student/orders`}
          className="flex-shrink-0 rounded-lg p-1.5 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/[0.08] hover:text-white"
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Progress</span>
            <span className="text-[11px] font-medium text-slate-300">{order.progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${order.progress}%` }}
              transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.3 }}
              className={cn(
                "h-full rounded-full",
                order.progress === 100 ? "bg-emerald-500" :
                order.progress >= 60 ? "bg-blue-500" : "bg-purple-500"
              )}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        {order.expert ? (
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white">
              {order.expert.initials}
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-300">{order.expert.name}</p>
              <div className="flex items-center gap-0.5">
                <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                <span className="text-[10px] text-slate-500">{order.expert.rating}</span>
              </div>
            </div>
          </div>
        ) : (
          <span className="text-xs text-slate-500">Awaiting expert assignment</span>
        )}
        <CountdownTimer deadline={order.deadline} compact />
      </div>
    </motion.div>
  );
}

export function StudentOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Good morning 👋</h1>
          <p className="mt-0.5 text-sm text-slate-400">Here's what's happening with your orders today.</p>
        </div>
        <Link
          href="/dashboard/student/create-request"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-500 active:scale-95"
        >
          <PlusCircle className="h-4 w-4" />
          New order
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Active Orders" value="4" detail="2 due this week" tone="blue" icon={<FileText className="h-4 w-4" />} trend={{ value: 12, label: "vs last month" }} />
        <StatCard label="Unread Messages" value="12" detail="3 from experts" tone="purple" icon={<MessageSquare className="h-4 w-4" />} />
        <StatCard label="Semester Spend" value="$840" detail="4 invoices paid" tone="green" icon={<CreditCard className="h-4 w-4" />} trend={{ value: 8, label: "vs last sem" }} />
        <StatCard label="Completion Rate" value="96%" detail="24 of 25 orders" tone="amber" icon={<TrendingUp className="h-4 w-4" />} />
      </div>

      {/* Main grid */}
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        {/* Left: Active orders */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Active orders</h2>
            <Link href="/dashboard/student/orders" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_ACTIVE_ORDERS.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Right: sidebar widgets */}
        <div className="space-y-4">
          {/* Progress overview */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">Semester progress</h3>
            <div className="flex items-center justify-around">
              <ProgressRing value={65} size={72} color="#3b82f6" label="65%" sublabel="In progress" />
              <ProgressRing value={96} size={72} color="#10b981" label="96%" sublabel="Completion" />
              <ProgressRing value={42} size={72} color="#a855f7" label="42%" sublabel="Budget used" />
            </div>
          </div>

          {/* AI Quick actions */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <div className="mb-3 flex items-center gap-2">
              <Bot className="h-4 w-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-white">AI quick actions</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {AI_QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] p-2.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
                >
                  <action.icon className={cn("h-3.5 w-3.5 flex-shrink-0", action.color)} />
                  {action.label}
                </Link>
              ))}
            </div>
            <Link
              href="/dashboard/student/ai-tools"
              className="mt-3 flex items-center justify-center gap-1.5 text-xs text-blue-400 hover:text-blue-300"
            >
              Open AI workspace <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Next deadline */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-5">
            <p className="mb-1 text-xs font-medium text-amber-400">Urgent deadline</p>
            <p className="text-sm font-semibold text-white">Quantum Computing Research</p>
            <p className="mt-0.5 text-xs text-slate-400">EDU-00011 · Research Paper</p>
            <div className="mt-3">
              <CountdownTimer deadline={new Date(Date.now() + 4 * 60 * 60 * 1000)} />
            </div>
          </div>
        </div>
      </div>

      {/* Activity feed */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Recent activity</h2>
          <span className="text-xs text-slate-500">Last 7 days</span>
        </div>
        <ActivityFeed events={MOCK_ACTIVITY} maxItems={6} />
      </div>
    </div>
  );
}
