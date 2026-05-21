"use client";

import { useState } from "react";
import { Briefcase, Filter, Search } from "lucide-react";
import { EmptyState } from "@/components/dashboard/widgets/EmptyState";
import { cn } from "@/lib/utils";

const STATUS_FILTERS = ["all", "confirmed", "in_progress", "review", "revision", "completed"] as const;

export function ExpertOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<typeof STATUS_FILTERS[number]>("all");

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">My Orders</h1>
        <p className="mt-0.5 text-sm text-slate-400">0 total · 0 active</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-white/[0.09] bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/40 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-white/[0.07] bg-white/[0.03] p-0.5">
          <Filter className="ml-2 h-3.5 w-3.5 text-slate-500" />
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors",
                statusFilter === s ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              {s === "in_progress" ? "In Progress" : s}
            </button>
          ))}
        </div>
      </div>

      <EmptyState
        icon={<Briefcase className="h-8 w-8" />}
        title="No orders assigned yet"
        description="Orders assigned to you by the admin will appear here."
      />
    </div>
  );
}
