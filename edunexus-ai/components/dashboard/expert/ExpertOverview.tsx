"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Clock, TrendingUp,
  FileText, MessageSquare, Star, ToggleLeft, ToggleRight, Briefcase,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/widgets/StatCard";
import { EmptyState } from "@/components/dashboard/widgets/EmptyState";
import { cn } from "@/lib/utils";

const EXPERT_ORDERS: never[] = [];
const EXPERT_ACTIVITY: never[] = [];

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
        <StatCard label="Active Orders"    value="0"    detail="None assigned"        tone="blue"   icon={<FileText className="h-4 w-4" />} />
        <StatCard label="MTD Earnings"     value="रू 0" detail="No orders this month"  tone="green"  icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Avg. Rating"      value="—"    detail="No reviews yet"        tone="amber"  icon={<Star className="h-4 w-4" />} />
        <StatCard label="Completion Rate"  value="—"    detail="No orders completed"   tone="purple" icon={<CheckCircle2 className="h-4 w-4" />} />
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
          <EmptyState
            icon={<Briefcase className="h-8 w-8" />}
            title="No orders assigned yet"
            description="When the admin assigns you an order, it will appear here."
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Earnings breakdown */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">Earnings breakdown</h3>
            <div className="space-y-2.5">
              {[
                { label: "This week",  value: "रू 0", color: "bg-blue-500"   },
                { label: "This month", value: "रू 0", color: "bg-purple-500" },
                { label: "Last month", value: "रू 0", color: "bg-slate-600"  },
                { label: "Pending",    value: "रू 0", color: "bg-amber-500"  },
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
            <p className="text-xs text-slate-500">No upcoming deadlines.</p>
          </div>

          {/* Messages */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <div className="mb-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Messages</h3>
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
        <p className="text-sm text-slate-500">No recent activity.</p>
      </div>
    </div>
  );
}
