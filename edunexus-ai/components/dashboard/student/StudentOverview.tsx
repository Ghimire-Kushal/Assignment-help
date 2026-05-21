"use client";

import Link from "next/link";
import {
  ArrowRight, Bot, CreditCard, FileText, GraduationCap,
  MessageSquare, PlusCircle, TrendingUp,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/widgets/StatCard";
import { ProgressRing } from "@/components/dashboard/widgets/ProgressRing";
import { ActivityFeed } from "@/components/dashboard/widgets/ActivityFeed";
import { EmptyState } from "@/components/dashboard/widgets/EmptyState";
import { cn } from "@/lib/utils";

const AI_QUICK_ACTIONS = [
  { label: "Generate outline", icon: FileText, href: "/dashboard/student/ai-tools?tool=outline", color: "text-blue-400" },
  { label: "Citation helper", icon: GraduationCap, href: "/dashboard/student/ai-tools?tool=citation", color: "text-purple-400" },
  { label: "Topic ideas", icon: Bot, href: "/dashboard/student/ai-tools?tool=topic", color: "text-emerald-400" },
  { label: "Summarize text", icon: FileText, href: "/dashboard/student/ai-tools?tool=summarizer", color: "text-amber-400" },
];

export function StudentOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Good morning 👋</h1>
          <p className="mt-0.5 text-sm text-slate-400">Here&apos;s what&apos;s happening with your orders today.</p>
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
        <StatCard label="Active Orders" value="0" detail="No active orders" tone="blue" icon={<FileText className="h-4 w-4" />} />
        <StatCard label="Unread Messages" value="0" detail="All caught up" tone="purple" icon={<MessageSquare className="h-4 w-4" />} />
        <StatCard label="Semester Spend" value="रू 0" detail="No invoices yet" tone="green" icon={<CreditCard className="h-4 w-4" />} />
        <StatCard label="Completion Rate" value="—" detail="No orders yet" tone="amber" icon={<TrendingUp className="h-4 w-4" />} />
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
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
            <EmptyState
              icon={<FileText className="h-8 w-8" />}
              title="No active orders"
              description="Place your first order and it will appear here."
              action={
                <Link
                  href="/dashboard/student/create-request"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-500"
                >
                  <PlusCircle className="h-4 w-4" />
                  New order
                </Link>
              }
            />
          </div>
        </div>

        {/* Right: sidebar widgets */}
        <div className="space-y-4">
          {/* Progress overview */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">Semester progress</h3>
            <div className="flex items-center justify-around">
              <ProgressRing value={0} size={72} color="#3b82f6" label="0%" sublabel="In progress" />
              <ProgressRing value={0} size={72} color="#10b981" label="—" sublabel="Completion" />
              <ProgressRing value={0} size={72} color="#a855f7" label="0%" sublabel="Budget used" />
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
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <p className="mb-1 text-xs font-medium text-slate-400">Upcoming deadline</p>
            <p className="text-sm font-semibold text-slate-500">No deadlines yet</p>
            <p className="mt-0.5 text-xs text-slate-600">Your order deadlines will appear here.</p>
          </div>
        </div>
      </div>

      {/* Activity feed */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Recent activity</h2>
          <span className="text-xs text-slate-500">Last 7 days</span>
        </div>
        <ActivityFeed events={[]} maxItems={6} />
      </div>
    </div>
  );
}
