import { ArrowUpRight, CalendarDays, CheckCircle2, Clock, FileText } from "lucide-react";
import { Card } from "@/components/shared/Card";
import { adminStats, studentStats } from "./dashboardData";

type Stat = {
  label: string;
  value: string;
  detail: string;
  tone: string;
};

const toneClasses: Record<string, string> = {
  blue: "border-blue-500/20 bg-blue-500/10 text-blue-200",
  purple: "border-purple-500/20 bg-purple-500/10 text-purple-200",
  green: "border-emerald-500/20 bg-emerald-500/10 text-emerald-200",
  amber: "border-amber-500/20 bg-amber-500/10 text-amber-200",
};

export function DashboardOverview({ role }: { role: "student" | "admin" }) {
  const stats = role === "admin" ? adminStats : studentStats;
  const title = role === "admin" ? "Command center" : "Welcome back, Aarav";
  const description =
    role === "admin"
      ? "Monitor platform operations, revenue, support, and order flow from one workspace."
      : "Track requests, messages, files, and payments without leaving your study workflow.";

  return (
    <div className="space-y-6">
      <DashboardHeader title={title} description={description} action={role === "admin" ? "Export Report" : "Create Request"} />
      <StatsGrid stats={stats} />
      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <Card padding="md" className="rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Recent activity</h2>
            <Clock className="h-4 w-4 text-slate-400" />
          </div>
          <div className="mt-4 space-y-3">
            {activityFor(role).map((item) => (
              <div key={item.title} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card padding="md" className="rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Upcoming</h2>
            <CalendarDays className="h-4 w-4 text-slate-400" />
          </div>
          <div className="mt-4 space-y-4">
            {["Literature review deadline", "Payment reconciliation", "Weekly quality audit"].map((item, index) => (
              <div key={item} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                <span className="text-sm text-slate-300">{item}</span>
                <span className="text-xs text-slate-500">{index + 1}d</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function DashboardPageView({
  title,
  description,
  stats,
  rows,
}: {
  title: string;
  description: string;
  stats: Stat[];
  rows: { title: string; description: string; meta: string }[];
}) {
  return (
    <div className="space-y-6">
      <DashboardHeader title={title} description={description} />
      <StatsGrid stats={stats} />
      <Card padding="none" className="overflow-hidden rounded-lg">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="text-base font-semibold text-white">Mock records</h2>
        </div>
        <div className="divide-y divide-white/10">
          {rows.map((row) => (
            <div key={row.title} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.05] text-blue-300">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{row.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{row.description}</p>
                </div>
              </div>
              <span className="w-fit rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
                {row.meta}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function DashboardHeader({ title, description, action }: { title: string; description: string; action?: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
      </div>
      {action ? (
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500">
          {action} <ArrowUpRight className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} padding="md" className="rounded-lg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
            </div>
            <span className={`rounded-md border p-2 ${toneClasses[stat.tone]}`}>
              <CheckCircle2 className="h-4 w-4" />
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function activityFor(role: "student" | "admin") {
  if (role === "admin") {
    return [
      { title: "New expert assigned", description: "Order ENX-2049 moved into production." },
      { title: "Refund request reviewed", description: "Finance team added notes to ticket SUP-881." },
      { title: "Storage audit completed", description: "12 stale files flagged for cleanup." },
    ];
  }

  return [
    { title: "Expert uploaded a draft", description: "Business ethics essay is ready for review." },
    { title: "AI assistant created an outline", description: "Saved under your sociology request." },
    { title: "Payment receipt generated", description: "Invoice INV-3321 is available to download." },
  ];
}

