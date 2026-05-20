"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, Check, CheckCheck, Trash2, X,
  Package, MessageSquare, CreditCard, AlertCircle, Star, Info,
} from "lucide-react";

type NotifType = "order" | "message" | "payment" | "alert" | "review" | "system";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  actionLabel?: string;
}

const ICON_MAP: Record<NotifType, React.ComponentType<{ className?: string }>> = {
  order: Package,
  message: MessageSquare,
  payment: CreditCard,
  alert: AlertCircle,
  review: Star,
  system: Info,
};

const COLOR_MAP: Record<NotifType, string> = {
  order:   "text-blue-400 bg-blue-400/10",
  message: "text-purple-400 bg-purple-400/10",
  payment: "text-green-400 bg-green-400/10",
  alert:   "text-red-400 bg-red-400/10",
  review:  "text-amber-400 bg-amber-400/10",
  system:  "text-slate-400 bg-slate-400/10",
};

const MOCK: Notification[] = [
  { id: "n1", type: "order",   title: "Order Assigned",      body: "ENX-1048 has been assigned to Dr. Sarah Chen.",                       time: "2m ago",  read: false, actionLabel: "View Order"      },
  { id: "n2", type: "message", title: "New Message",         body: "Dr. Sarah Chen sent a message about your research paper.",             time: "15m ago", read: false, actionLabel: "Open Chat"       },
  { id: "n3", type: "payment", title: "Payment Confirmed",   body: "Payment of $89.00 for ENX-1045 has been processed successfully.",      time: "1h ago",  read: false                                  },
  { id: "n4", type: "order",   title: "Draft Ready",         body: "Your essay draft is ready for review. Request revisions if needed.",   time: "3h ago",  read: true,  actionLabel: "Download Draft"  },
  { id: "n5", type: "review",  title: "Rate Your Expert",    body: "How was your experience with Prof. James Wilson on ENX-1040?",         time: "1d ago",  read: true,  actionLabel: "Leave Review"    },
  { id: "n6", type: "alert",   title: "Deadline Approaching",body: "ENX-1052 deadline is in 18 hours. Please ensure everything is ready.", time: "2d ago",  read: true                                   },
  { id: "n7", type: "system",  title: "System Maintenance",  body: "Scheduled maintenance Saturday 3–5 AM UTC. Brief downtime expected.",  time: "3d ago",  read: true                                   },
];

export function NotificationCenter() {
  const [items, setItems] = useState<Notification[]>(MOCK);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = items.filter(n => !n.read).length;
  const displayed   = filter === "unread" ? items.filter(n => !n.read) : items;

  const markRead  = (id: string) => setItems(p => p.map(n => n.id === id ? { ...n, read: true } : n));
  const markAll   = ()           => setItems(p => p.map(n => ({ ...n, read: true })));
  const remove    = (id: string) => setItems(p => p.filter(n => n.id !== id));
  const clearRead = ()           => setItems(p => p.filter(n => !n.read));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "You're all caught up"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {unreadCount > 0 && (
            <button onClick={markAll} className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors">
              <CheckCheck className="w-4 h-4" /> Mark all read
            </button>
          )}
          <button onClick={clearRead} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-300 transition-colors">
            <Trash2 className="w-4 h-4" /> Clear read
          </button>
        </div>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] w-fit">
        {(["all", "unread"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === tab ? "bg-blue-500 text-white shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            {tab === "all" ? `All (${items.length})` : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {displayed.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/[0.04] flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-white font-medium">No notifications</p>
              <p className="text-slate-500 text-sm mt-1">
                {filter === "unread" ? "All caught up — nothing unread!" : "Nothing here yet."}
              </p>
            </motion.div>
          ) : (
            displayed.map((n, i) => {
              const Icon  = ICON_MAP[n.type];
              const color = COLOR_MAP[n.type];
              return (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ delay: i * 0.035 }}
                  className={`relative flex gap-4 p-4 rounded-xl border transition-colors ${
                    n.read
                      ? "bg-white/[0.02] border-white/[0.05]"
                      : "bg-white/[0.05] border-blue-500/20"
                  }`}
                >
                  {!n.read && (
                    <span className="absolute top-4 right-12 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  )}

                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${n.read ? "text-slate-300" : "text-white"}`}>
                        {n.title}
                      </p>
                      <span className="text-xs text-slate-500 whitespace-nowrap flex-shrink-0">{n.time}</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-0.5 leading-relaxed">{n.body}</p>
                    {n.actionLabel && (
                      <button className="mt-2 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        {n.actionLabel} →
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 flex-shrink-0">
                    {!n.read && (
                      <button
                        onClick={() => markRead(n.id)}
                        title="Mark as read"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-green-400 hover:bg-green-400/10 transition-all"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => remove(n.id)}
                      title="Dismiss"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
