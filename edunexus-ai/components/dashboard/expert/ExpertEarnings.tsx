"use client";

import { CreditCard, TrendingUp, Wallet, ArrowDownToLine } from "lucide-react";
import { StatCard } from "@/components/dashboard/widgets/StatCard";
import { EmptyState } from "@/components/dashboard/widgets/EmptyState";

export function ExpertEarnings() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">Earnings</h1>
        <p className="mt-0.5 text-sm text-slate-400">Track your income and withdrawal history.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Earned"    value="रू 0" detail="All time"          tone="green"  icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="This Month"      value="रू 0" detail="No orders"         tone="blue"   icon={<CreditCard className="h-4 w-4" />} />
        <StatCard label="Pending Payout"  value="रू 0" detail="Awaiting transfer" tone="amber"  icon={<Wallet className="h-4 w-4" />} />
        <StatCard label="Withdrawn"       value="रू 0" detail="Lifetime"          tone="purple" icon={<ArrowDownToLine className="h-4 w-4" />} />
      </div>

      {/* Earnings breakdown */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h3 className="mb-4 text-sm font-semibold text-white">Monthly breakdown</h3>
          <EmptyState
            icon={<TrendingUp className="h-7 w-7" />}
            title="No earnings yet"
            description="Complete your first order to start earning."
          />
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h3 className="mb-4 text-sm font-semibold text-white">Payout history</h3>
          <EmptyState
            icon={<Wallet className="h-7 w-7" />}
            title="No payouts yet"
            description="Your withdrawal history will appear here."
          />
        </div>
      </div>

      {/* Bank info */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">Payout account</h3>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-400">No payout account linked yet.</p>
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">
            <Wallet className="h-4 w-4" /> Link Bank Account
          </button>
        </div>
      </div>
    </div>
  );
}
