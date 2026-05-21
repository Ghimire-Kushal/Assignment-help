"use client";

import { Star } from "lucide-react";
import { EmptyState } from "@/components/dashboard/widgets/EmptyState";

export function ExpertReviews() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">Reviews</h1>
        <p className="mt-0.5 text-sm text-slate-400">Feedback from students you have helped.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Average Rating", value: "—", sub: "No reviews yet" },
          { label: "Total Reviews",  value: "0",  sub: "All time" },
          { label: "5-Star Reviews", value: "0",  sub: "All time" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 text-center">
            <p className="text-xs text-slate-500">{c.label}</p>
            <p className="mt-1 text-3xl font-bold text-white">{c.value}</p>
            <p className="mt-0.5 text-xs text-slate-500">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Reviews list */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02]">
        <div className="border-b border-white/[0.07] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Student reviews</h3>
        </div>
        <EmptyState
          icon={<Star className="h-8 w-8" />}
          title="No reviews yet"
          description="Reviews from students will appear here after you complete orders."
        />
      </div>
    </div>
  );
}
