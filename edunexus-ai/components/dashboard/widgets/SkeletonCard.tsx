"use client";

import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  rows?: number;
  showAvatar?: boolean;
}

function Pulse({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded bg-white/[0.07]", className)} />;
}

export function SkeletonCard({ className, rows = 3, showAvatar = false }: SkeletonCardProps) {
  return (
    <div className={cn("rounded-xl border border-white/[0.07] bg-white/[0.03] p-5", className)}>
      <div className="flex items-center gap-3">
        {showAvatar && <Pulse className="h-10 w-10 rounded-full" />}
        <div className="flex-1 space-y-2">
          <Pulse className="h-4 w-40" />
          <Pulse className="h-3 w-24" />
        </div>
      </div>
      <div className="mt-4 space-y-2.5">
        {Array.from({ length: rows }).map((_, i) => (
          <Pulse key={i} className={cn("h-3", i % 3 === 2 ? "w-2/3" : "w-full")} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.07]">
      <div className="border-b border-white/[0.07] bg-white/[0.03] px-5 py-3">
        <div className="flex gap-4">
          {[120, 80, 60, 90].map((w) => (
            <div key={w} className="animate-pulse rounded bg-white/[0.07] h-3" style={{ width: w }} />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-white/[0.05] px-5 py-4 last:border-0">
          <Pulse className="h-4 w-4 rounded" />
          <Pulse className="h-3 w-32" />
          <Pulse className="h-3 w-20" />
          <Pulse className="h-5 w-16 rounded-full" />
          <div className="ml-auto">
            <Pulse className="h-3 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}
