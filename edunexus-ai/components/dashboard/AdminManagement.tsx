"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import {
  Archive,
  BarChart3,
  CheckCircle2,
  Clock,
  CreditCard,
  FileArchive,
  Folder,
  Headphones,
  Search,
  SlidersHorizontal,
  UploadCloud,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { Card } from "@/components/shared/Card";
import { cn } from "@/lib/utils";

const orders = [
  { id: "ENX-2049", title: "Dissertation chapter", student: "Aarav Sharma", expert: "Unassigned", subject: "Business", deadline: "May 23", budget: "रू 56,000", status: "New", progress: 12 },
  { id: "ENX-2043", title: "Finance report", student: "Leah Carter", expert: "Dr. Nina Patel", subject: "Finance", deadline: "May 24", budget: "रू 34,500", status: "Review", progress: 78 },
  { id: "ENX-2038", title: "Python analysis", student: "Omar Singh", expert: "Kai Morgan", subject: "Computer Science", deadline: "May 26", budget: "रू 41,200", status: "In Progress", progress: 54 },
  { id: "ENX-2031", title: "Nursing reflection", student: "Mina Chen", expert: "Dr. Ellis Park", subject: "Nursing", deadline: "Delivered", budget: "रू 12,600", status: "Delivered", progress: 100 },
] satisfies Array<Record<string, string | number>>;

const users = [
  { name: "Aarav Sharma", role: "Student", email: "aarav@student.edu", orders: "4", status: "Active", joined: "May 2026" },
  { name: "Dr. Nina Patel", role: "Expert", email: "nina@experts.ai", orders: "31", status: "Verified", joined: "Jan 2026" },
  { name: "Maya Thompson", role: "Admin", email: "maya@scholarsyncnepal.com", orders: "0", status: "Active", joined: "Nov 2025" },
  { name: "Kai Morgan", role: "Expert", email: "kai@experts.ai", orders: "18", status: "Review", joined: "Mar 2026" },
];

const payments = [
  { invoice: "INV-8812", order: "ENX-2049", customer: "Aarav Sharma", amount: "रू 56,000", method: "Card", status: "Paid", date: "May 20" },
  { invoice: "INV-8809", order: "ENX-2043", customer: "Leah Carter", amount: "रू 34,500", method: "Wallet", status: "Pending", date: "May 19" },
  { invoice: "INV-8794", order: "ENX-2038", customer: "Omar Singh", amount: "रू 41,200", method: "Card", status: "Failed", date: "May 18" },
  { invoice: "INV-8781", order: "ENX-2031", customer: "Mina Chen", amount: "रू 12,600", method: "Card", status: "Paid", date: "May 16" },
];

const tickets = [
  { id: "SUP-881", subject: "Deadline extension", requester: "Aarav Sharma", priority: "Urgent", status: "Open", owner: "Team A" },
  { id: "SUP-876", subject: "File access issue", requester: "Leah Carter", priority: "Normal", status: "Assigned", owner: "Team B" },
  { id: "SUP-864", subject: "Expert clarification", requester: "Dr. Nina Patel", priority: "Normal", status: "Resolved", owner: "Team A" },
  { id: "SUP-852", subject: "Refund request", requester: "Omar Singh", priority: "High", status: "Review", owner: "Finance" },
];

const files = [
  { name: "assignment-briefs", kind: "Folder", size: "2.4 GB", owner: "Students", status: "Synced" },
  { name: "deliverables", kind: "Folder", size: "8.1 GB", owner: "Experts", status: "Synced" },
  { name: "moderation-queue.zip", kind: "Archive", size: "480 MB", owner: "Admin", status: "Pending" },
  { name: "finance-export-may.csv", kind: "File", size: "1.8 MB", owner: "Finance", status: "Locked" },
];

const revenueData = [
  { label: "Jan", value: 24 },
  { label: "Feb", value: 31 },
  { label: "Mar", value: 29 },
  { label: "Apr", value: 38 },
  { label: "May", value: 43 },
  { label: "Jun", value: 48 },
];

const orderData = [
  { label: "New", value: 28 },
  { label: "Assigned", value: 42 },
  { label: "Progress", value: 64 },
  { label: "Review", value: 31 },
  { label: "Done", value: 86 },
];

export function AdminOverviewManagement() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Admin command center" description="Operational overview for orders, revenue, users, support, files, and quality control." />
      <AnalyticsCards />
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Revenue chart" subtitle="Mock monthly revenue in thousands" data={revenueData} tone="green" />
        <ChartCard title="Orders chart" subtitle="Mock order volume by status" data={orderData} tone="blue" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <ManageOrdersPanel compact />
        <LoadingAndEmptyStates />
      </div>
    </div>
  );
}

export function ManageOrdersPanel({ compact = false }: { compact?: boolean }) {
  return (
    <AdminTableView
      title="Manage orders"
      description="Search, filter, assign experts, and update order statuses with mock order records."
      searchPlaceholder="Search orders, students, experts..."
      rows={orders}
      filterKey="status"
      actions={<OrderActions />}
      columns={[
        ["id", "Order"],
        ["title", "Assignment"],
        ["student", "Student"],
        ["expert", "Expert"],
        ["deadline", "Deadline"],
        ["budget", "Budget"],
        ["status", "Status"],
      ]}
      compact={compact}
    />
  );
}

export function ManageUsersPanel() {
  return (
    <AdminTableView
      title="Manage users"
      description="Mock user directory for students, experts, admins, roles, and account review states."
      searchPlaceholder="Search users, roles, email..."
      rows={users}
      filterKey="role"
      columns={[
        ["name", "Name"],
        ["role", "Role"],
        ["email", "Email"],
        ["orders", "Orders"],
        ["status", "Status"],
        ["joined", "Joined"],
      ]}
    />
  );
}

export function PaymentRecordsPanel() {
  return (
    <AdminTableView
      title="Payment records"
      description="Mock finance records for invoices, methods, statuses, reconciliation, and failed charges."
      searchPlaceholder="Search invoices, orders, customers..."
      rows={payments}
      filterKey="status"
      columns={[
        ["invoice", "Invoice"],
        ["order", "Order"],
        ["customer", "Customer"],
        ["amount", "Amount"],
        ["method", "Method"],
        ["status", "Status"],
        ["date", "Date"],
      ]}
    />
  );
}

export function SupportTicketsPanel() {
  return (
    <AdminTableView
      title="Support tickets"
      description="Mock support queue for customer issues, expert escalations, priorities, ownership, and resolution status."
      searchPlaceholder="Search tickets, requesters, owners..."
      rows={tickets}
      filterKey="status"
      columns={[
        ["id", "Ticket"],
        ["subject", "Subject"],
        ["requester", "Requester"],
        ["priority", "Priority"],
        ["status", "Status"],
        ["owner", "Owner"],
      ]}
    />
  );
}

export function FileManagerPanel() {
  const [query, setQuery] = useState("");
  const filteredFiles = files.filter((file) => Object.values(file).join(" ").toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <AdminHeader title="File manager" description="Browse mock assignment briefs, deliverables, archives, exports, and moderation queues." />
      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <Card padding="md" className="rounded-lg">
          <h3 className="text-sm font-semibold text-white">Storage areas</h3>
          <div className="mt-4 space-y-2">
            {["Assignment Briefs", "Deliverables", "Payment Exports", "Moderation Queue"].map((item) => (
              <button key={item} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white">
                <Folder className="h-4 w-4 text-blue-300" />
                {item}
              </button>
            ))}
          </div>
          <button className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-blue-400/30 bg-blue-500/10 text-sm font-medium text-blue-100">
            <UploadCloud className="h-4 w-4" />
            Mock upload area
          </button>
        </Card>
        <Card padding="none" className="overflow-hidden rounded-lg">
          <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base font-semibold text-white">Files</h3>
            <SearchBox value={query} onChange={setQuery} placeholder="Search files..." />
          </div>
          <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredFiles.map((file) => (
              <motion.div key={file.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] text-blue-200">
                    {file.kind === "Archive" ? <FileArchive className="h-5 w-5" /> : file.kind === "Folder" ? <Folder className="h-5 w-5" /> : <Archive className="h-5 w-5" />}
                  </span>
                  <StatusBadge status={file.status} />
                </div>
                <p className="mt-4 truncate text-sm font-medium text-white">{file.name}</p>
                <p className="mt-1 text-xs text-slate-500">{file.size} • {file.owner}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function AnalyticsPanel() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Analytics" description="Mock reporting workspace for revenue, order volume, support demand, and delivery health." />
      <AnalyticsCards />
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Revenue chart" subtitle="Projected monthly revenue" data={revenueData} tone="green" />
        <ChartCard title="Orders chart" subtitle="Order flow by status" data={orderData} tone="blue" />
      </div>
    </div>
  );
}

function AdminTableView({
  title,
  description,
  searchPlaceholder,
  rows,
  columns,
  filterKey,
  actions,
  compact,
}: {
  title: string;
  description: string;
  searchPlaceholder: string;
  rows: Array<Record<string, string | number>>;
  columns: [string, string][];
  filterKey: string;
  actions?: ReactNode;
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filterOptions = ["All", ...Array.from(new Set(rows.map((row) => String(row[filterKey]))))];
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesQuery = Object.values(row).join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "All" || String(row[filterKey]) === filter;
      return matchesQuery && matchesFilter;
    });
  }, [filter, filterKey, query, rows]);
  const visibleColumns = compact ? columns.slice(0, 5) : columns;

  return (
    <div className="space-y-6">
      {!compact ? <AdminHeader title={title} description={description} /> : null}
      <Card padding="none" className="overflow-hidden rounded-lg">
        <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <p className="mt-1 text-xs text-slate-500">Mock data only</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchBox value={query} onChange={setQuery} placeholder={searchPlaceholder} />
            <FilterSelect value={filter} options={filterOptions} onChange={setFilter} />
            {actions}
          </div>
        </div>
        {filteredRows.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  {visibleColumns.map(([, label]) => (
                    <th key={label} className="px-5 py-3 font-medium">{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredRows.map((row, rowIndex) => (
                  <motion.tr key={String(Object.values(row)[0])} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: rowIndex * 0.035 }} className="hover:bg-white/[0.025]">
                    {visibleColumns.map(([key]) => (
                      <td key={key} className="px-5 py-4 text-slate-300">
                        {key === "status" ? <StatusBadge status={String(row[key])} /> : <span className={key === visibleColumns[0][0] ? "font-medium text-white" : ""}>{row[key]}</span>}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No matching records" description="Try changing the search query or filter selection." />
        )}
      </Card>
    </div>
  );
}

function AnalyticsCards() {
  const cards = [
    { label: "Revenue", value: "रू 57L", detail: "+12.4% month over month", icon: CreditCard },
    { label: "Open Orders", value: "128", detail: "18 marked urgent", icon: BarChart3 },
    { label: "Active Users", value: "2,418", detail: "224 joined this month", icon: Users },
    { label: "Support Tickets", value: "37", detail: "6 at SLA risk", icon: Headphones },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div key={card.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
          <Card padding="md" className="rounded-lg">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">{card.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
                <p className="mt-1 text-xs text-slate-500">{card.detail}</p>
              </div>
              <span className="rounded-md border border-blue-400/20 bg-blue-500/10 p-2 text-blue-200">
                <card.icon className="h-4 w-4" />
              </span>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function ChartCard({ title, subtitle, data, tone }: { title: string; subtitle: string; data: { label: string; value: number }[]; tone: "blue" | "green" }) {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <Card padding="md" className="rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>
        <BarChart3 className="h-4 w-4 text-slate-400" />
      </div>
      <div className="mt-6 flex h-64 items-end gap-3">
        {data.map((item, index) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / max) * 100}%` }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={cn("w-full rounded-t-lg", tone === "green" ? "bg-emerald-400/75" : "bg-blue-400/75")}
            />
            <span className="text-xs text-slate-500">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function OrderActions() {
  return (
    <div className="flex gap-2">
      <AssignExpertModal />
      <UpdateStatusModal />
    </div>
  );
}

function AssignExpertModal() {
  return (
    <AdminModal
      trigger="Assign expert"
      title="Assign expert"
      description="Mock workflow for assigning an expert to an order. No backend action is performed."
      icon={<UserCheck className="h-4 w-4" />}
    >
      <div className="grid gap-4">
        <label className="text-sm text-slate-300">Order<select className="dashboard-input mt-2"><option>ENX-2049 • Dissertation chapter</option><option>ENX-2038 • Python analysis</option></select></label>
        <label className="text-sm text-slate-300">Expert<select className="dashboard-input mt-2"><option>Dr. Nina Patel • Business</option><option>Kai Morgan • Computer Science</option><option>Dr. Ellis Park • Nursing</option></select></label>
        <button className="h-10 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-500">Save mock assignment</button>
      </div>
    </AdminModal>
  );
}

function UpdateStatusModal() {
  return (
    <AdminModal
      trigger="Update status"
      title="Update order status"
      description="Mock workflow for moving an order through the delivery pipeline."
      icon={<CheckCircle2 className="h-4 w-4" />}
    >
      <div className="grid gap-4">
        <label className="text-sm text-slate-300">Order<select className="dashboard-input mt-2"><option>ENX-2043 • Finance report</option><option>ENX-2049 • Dissertation chapter</option></select></label>
        <label className="text-sm text-slate-300">Status<select className="dashboard-input mt-2"><option>Assigned</option><option>In Progress</option><option>Review</option><option>Delivered</option><option>Overdue</option></select></label>
        <textarea className="dashboard-input min-h-28 resize-none" placeholder="Internal status note..." />
        <button className="h-10 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-500">Save mock status</button>
      </div>
    </AdminModal>
  );
}

function AdminModal({ trigger, title, description, icon, children }: { trigger: string; title: string; description: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-blue-400/30 bg-blue-500/10 px-3 text-sm font-medium text-blue-100 hover:bg-blue-500/15">
        {icon}
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/65" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-[#101527] p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-semibold text-white">{title}</Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-slate-400">{description}</Dialog.Description>
            </div>
            <Dialog.Close className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>
          <div className="mt-5">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label className="relative block min-w-0 sm:w-72">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="dashboard-input h-10 pl-9 text-sm" />
    </label>
  );
}

function FilterSelect({ value, options, onChange }: { value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="flex items-center gap-2">
      <SlidersHorizontal className="h-4 w-4 text-slate-500" />
      <select value={value} onChange={(event) => onChange(event.target.value)} className="dashboard-input h-10 min-w-36 py-0 text-sm">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    New: "border-blue-400/20 bg-blue-500/10 text-blue-200",
    Assigned: "border-cyan-400/20 bg-cyan-500/10 text-cyan-200",
    "In Progress": "border-purple-400/20 bg-purple-500/10 text-purple-200",
    Review: "border-amber-400/20 bg-amber-500/10 text-amber-200",
    Delivered: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
    Overdue: "border-red-400/20 bg-red-500/10 text-red-200",
    Paid: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
    Pending: "border-amber-400/20 bg-amber-500/10 text-amber-200",
    Failed: "border-red-400/20 bg-red-500/10 text-red-200",
    Open: "border-blue-400/20 bg-blue-500/10 text-blue-200",
    Resolved: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
    Active: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
    Verified: "border-blue-400/20 bg-blue-500/10 text-blue-200",
    Synced: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
    Locked: "border-slate-400/20 bg-slate-500/10 text-slate-200",
  };
  return <span className={cn("inline-flex rounded-md border px-2.5 py-1 text-xs font-medium", styles[status] ?? "border-white/10 bg-white/[0.04] text-slate-300")}>{status}</span>;
}

function LoadingAndEmptyStates() {
  return (
    <div className="grid gap-6">
      <Card padding="md" className="rounded-lg">
        <h3 className="text-base font-semibold text-white">Loading skeletons</h3>
        <div className="mt-4 space-y-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="h-10 w-10 animate-pulse rounded-lg bg-white/10" />
              <span className="h-3 flex-1 animate-pulse rounded bg-white/10" />
              <span className="h-3 w-16 animate-pulse rounded bg-white/10" />
            </div>
          ))}
        </div>
      </Card>
      <EmptyState title="Empty state example" description="Filtered admin views show this pattern when no mock records match." />
    </div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.025] p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.06] text-slate-300">
        <Clock className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

function AdminHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}
