"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, CreditCard, FileText, MessageSquare, RotateCcw, ShieldCheck, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export type ActivityEvent = {
  id: string;
  type: "order_created" | "order_completed" | "message_received" | "payment_succeeded" | "revision_requested" | "file_uploaded" | "status_changed" | "support";
  title: string;
  description: string;
  time: string;
  meta?: string;
};

const ICON_MAP: Record<ActivityEvent["type"], { icon: React.ElementType; color: string }> = {
  order_created:      { icon: FileText,      color: "text-blue-400 bg-blue-500/10" },
  order_completed:    { icon: CheckCircle2,  color: "text-emerald-400 bg-emerald-500/10" },
  message_received:   { icon: MessageSquare, color: "text-purple-400 bg-purple-500/10" },
  payment_succeeded:  { icon: CreditCard,    color: "text-emerald-400 bg-emerald-500/10" },
  revision_requested: { icon: RotateCcw,    color: "text-amber-400 bg-amber-500/10" },
  file_uploaded:      { icon: Upload,        color: "text-cyan-400 bg-cyan-500/10" },
  status_changed:     { icon: Clock,         color: "text-slate-400 bg-slate-500/10" },
  support:            { icon: ShieldCheck,   color: "text-orange-400 bg-orange-500/10" },
};

export const MOCK_ACTIVITY: ActivityEvent[] = [];

interface ActivityFeedProps {
  events?: ActivityEvent[];
  className?: string;
  maxItems?: number;
}

export function ActivityFeed({ events = MOCK_ACTIVITY, className, maxItems = 6 }: ActivityFeedProps) {
  const items = events.slice(0, maxItems);

  if (items.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-10 text-center", className)}>
        <Clock className="mb-3 h-8 w-8 text-slate-600" />
        <p className="text-sm font-medium text-slate-400">No recent activity</p>
        <p className="mt-1 text-xs text-slate-600">Activity will appear here once you place orders.</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-1", className)}>
      {items.map((event, i) => {
        const { icon: Icon, color } = ICON_MAP[event.type];
        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-white/[0.03]"
          >
            <div className={cn("mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg", color)}>
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-white">{event.title}</p>
                <span className="flex-shrink-0 text-[11px] text-slate-500">{event.time}</span>
              </div>
              <p className="mt-0.5 truncate text-xs text-slate-400">{event.description}</p>
            </div>
            {event.meta && (
              <span className="flex-shrink-0 rounded border border-white/[0.07] bg-white/[0.04] px-1.5 py-0.5 text-[11px] text-slate-400">
                {event.meta}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
