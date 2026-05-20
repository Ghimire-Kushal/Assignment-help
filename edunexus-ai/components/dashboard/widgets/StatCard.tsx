"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  detail?: string;
  trend?: { value: number; label: string };
  icon?: React.ReactNode;
  tone?: "blue" | "purple" | "green" | "amber" | "red";
  loading?: boolean;
  onClick?: () => void;
}

const toneMap = {
  blue: {
    icon: "bg-blue-500/15 text-blue-400",
    badge: "text-blue-300",
    glow: "group-hover:shadow-blue-500/10",
    border: "hover:border-blue-500/20",
  },
  purple: {
    icon: "bg-purple-500/15 text-purple-400",
    badge: "text-purple-300",
    glow: "group-hover:shadow-purple-500/10",
    border: "hover:border-purple-500/20",
  },
  green: {
    icon: "bg-emerald-500/15 text-emerald-400",
    badge: "text-emerald-300",
    glow: "group-hover:shadow-emerald-500/10",
    border: "hover:border-emerald-500/20",
  },
  amber: {
    icon: "bg-amber-500/15 text-amber-400",
    badge: "text-amber-300",
    glow: "group-hover:shadow-amber-500/10",
    border: "hover:border-amber-500/20",
  },
  red: {
    icon: "bg-red-500/15 text-red-400",
    badge: "text-red-300",
    glow: "group-hover:shadow-red-500/10",
    border: "hover:border-red-500/20",
  },
};

export function StatCard({ label, value, detail, trend, icon, tone = "blue", loading, onClick }: StatCardProps) {
  const colors = toneMap[tone];

  if (loading) {
    return (
      <div className="animate-pulse rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-white/[0.08]" />
          <div className="h-9 w-9 rounded-lg bg-white/[0.08]" />
        </div>
        <div className="mt-4 h-7 w-16 rounded bg-white/[0.08]" />
        <div className="mt-2 h-3 w-32 rounded bg-white/[0.06]" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-200",
        colors.border,
        `group-hover:shadow-lg ${colors.glow}`,
        onClick && "cursor-pointer"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-400">{label}</p>
        {icon && (
          <div className={cn("flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg", colors.icon)}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-2xl font-bold tabular-nums text-white"
        >
          {value}
        </motion.p>
        {detail && (
          <p className={cn("mt-1 text-xs font-medium", colors.badge)}>{detail}</p>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1">
          {trend.value >= 0 ? (
            <TrendingUp className="h-3 w-3 text-emerald-400" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-400" />
          )}
          <span className={cn("text-xs", trend.value >= 0 ? "text-emerald-400" : "text-red-400")}>
            {trend.value >= 0 ? "+" : ""}{trend.value}% {trend.label}
          </span>
        </div>
      )}

      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent" />
    </motion.div>
  );
}
