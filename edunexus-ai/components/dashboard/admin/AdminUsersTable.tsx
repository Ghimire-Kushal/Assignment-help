"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpDown, ChevronLeft, ChevronRight, Download,
  MoreHorizontal, Search, ShieldOff, UserCheck, UserPlus, UserX, X, CheckCircle,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/widgets/StatusBadge";
import { StatCard } from "@/components/dashboard/widgets/StatCard";
import { EmptyState } from "@/components/dashboard/widgets/EmptyState";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin" | "expert";
  status: "active" | "inactive";
  orders: number;
  spent: number;
  joined: Date;
  country: string;
}

const ROLE_COLORS: Record<string, string> = {
  student: "border-blue-500/25 bg-blue-500/10 text-blue-300",
  expert:  "border-purple-500/25 bg-purple-500/10 text-purple-300",
  admin:   "border-amber-500/25 bg-amber-500/10 text-amber-300",
};

const NEPAL_DISTRICTS = [
  "Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Biratnagar",
  "Butwal", "Dharan", "Birgunj", "Hetauda", "Nepalgunj",
];

interface CreateUserModalProps {
  onClose: () => void;
  onAdd: (user: User) => void;
}

function CreateUserModal({ onClose, onAdd }: CreateUserModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "student" as User["role"],
    status: "active" as User["status"],
    country: "Nepal",
    district: "Kathmandu",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const newUser: User = {
      id:      `u${Date.now()}`,
      name:    form.name.trim(),
      email:   form.email.trim().toLowerCase(),
      role:    form.role,
      status:  form.status,
      orders:  0,
      spent:   0,
      joined:  new Date(),
      country: `Nepal — ${form.district}`,
    };

    setDone(true);
    setTimeout(() => {
      onAdd(newUser);
      onClose();
    }, 1000);
  }

  const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-slate-400">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );

  const inputCls = "w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:outline-none transition-colors";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#0f1117] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15">
              <UserPlus className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Add New User</h3>
              <p className="text-[11px] text-slate-500">Create a new account manually</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center gap-3 py-12 px-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 250, delay: 0.05 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20"
            >
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </motion.div>
            <p className="text-white font-semibold">User created successfully!</p>
            <p className="text-xs text-slate-500">They will receive a welcome email.</p>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: "" })); }}
                  className={cn(inputCls, errors.name && "border-red-500/50")}
                />
              </Field>
              <Field label="Email Address" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: "" })); }}
                  className={cn(inputCls, errors.email && "border-red-500/50")}
                />
              </Field>
            </div>

            {/* Role */}
            <Field label="Role">
              <div className="grid grid-cols-3 gap-2">
                {(["student", "expert", "admin"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setForm(p => ({ ...p, role: r }))}
                    className={cn(
                      "rounded-xl border py-2.5 text-xs font-medium capitalize transition-all",
                      form.role === r
                        ? r === "student" ? "border-blue-500/60 bg-blue-500/15 text-blue-300"
                          : r === "expert" ? "border-purple-500/60 bg-purple-500/15 text-purple-300"
                          : "border-amber-500/60 bg-amber-500/15 text-amber-300"
                        : "border-white/[0.08] text-slate-400 hover:border-white/[0.16]"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </Field>

            {/* District + Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="District (Nepal)">
                <select
                  value={form.district}
                  onChange={(e) => setForm(p => ({ ...p, district: e.target.value }))}
                  className={cn(inputCls, "appearance-none cursor-pointer")}
                >
                  {NEPAL_DISTRICTS.map(d => <option key={d} value={d} className="bg-[#0f1117]">{d}</option>)}
                </select>
              </Field>
              <Field label="Account Status">
                <div className="flex gap-2">
                  {(["active", "inactive"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setForm(p => ({ ...p, status: s }))}
                      className={cn(
                        "flex-1 rounded-xl border py-2.5 text-xs font-medium capitalize transition-all",
                        form.status === s
                          ? s === "active"
                            ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300"
                            : "border-slate-500/60 bg-slate-500/15 text-slate-300"
                          : "border-white/[0.08] text-slate-400 hover:border-white/[0.16]"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            {/* Info note */}
            <p className="rounded-xl border border-blue-500/20 bg-blue-500/[0.06] px-3 py-2.5 text-xs text-blue-300">
              A temporary password will be generated and sent to the email address.
            </p>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-white/[0.09] py-2.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
              >
                Create User
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function AdminUsersTable() {
  const [users, setUsers]           = useState<User[]>([]);
  const [sorting, setSorting]       = useState<SortingState>([]);
  const [globalFilter, setGlobal]   = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);

  const filtered = useMemo(
    () => roleFilter === "all" ? users : users.filter((u) => u.role === roleFilter),
    [users, roleFilter]
  );

  function handleAdd(user: User) {
    setUsers(prev => [user, ...prev]);
  }

  function toggleStatus(id: string) {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));
  }

  function removeUser(id: string) {
    setUsers(prev => prev.filter(u => u.id !== id));
  }

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input type="checkbox" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} className="accent-blue-500" />
        ),
        cell: ({ row }) => (
          <input type="checkbox" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} className="accent-blue-500" />
        ),
        size: 40,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()} className="flex items-center gap-1 hover:text-white">
            Name <ArrowUpDown className="h-3 w-3" />
          </button>
        ),
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-white">{row.original.name}</p>
            <p className="text-xs text-slate-500">{row.original.email}</p>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ getValue }) => (
          <span className={cn("rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize", ROLE_COLORS[getValue() as string])}>
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
      },
      {
        accessorKey: "orders",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()} className="flex items-center gap-1 hover:text-white">
            Orders <ArrowUpDown className="h-3 w-3" />
          </button>
        ),
        cell: ({ getValue }) => <span className="text-slate-300">{getValue() as number}</span>,
      },
      {
        accessorKey: "spent",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()} className="flex items-center gap-1 hover:text-white">
            Spent <ArrowUpDown className="h-3 w-3" />
          </button>
        ),
        cell: ({ getValue }) => <span className="font-medium text-white">रू {(getValue() as number).toLocaleString("ne-NP")}</span>,
      },
      {
        accessorKey: "country",
        header: "Location",
        cell: ({ getValue }) => <span className="text-slate-400">{getValue() as string}</span>,
      },
      {
        accessorKey: "joined",
        header: "Joined",
        cell: ({ getValue }) => (
          <span className="text-slate-400">{(getValue() as Date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <button
              title={row.original.status === "active" ? "Deactivate" : "Activate"}
              onClick={() => toggleStatus(row.original.id)}
              className="rounded p-1 text-slate-500 hover:bg-white/[0.06] hover:text-emerald-400"
            >
              <UserCheck className="h-3.5 w-3.5" />
            </button>
            <button
              title="Remove user"
              onClick={() => removeUser(row.original.id)}
              className="rounded p-1 text-slate-500 hover:bg-white/[0.06] hover:text-red-400"
            >
              <UserX className="h-3.5 w-3.5" />
            </button>
            <button title="More" className="rounded p-1 text-slate-500 hover:bg-white/[0.06] hover:text-white">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>
        ),
      },
    ],
    [users]
  );

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobal,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-white">User Management</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 active:scale-95 transition-all"
        >
          <UserPlus className="h-4 w-4" /> Add New User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Users"  value={users.length}                                     detail={users.length === 0 ? "No users yet" : `${users.length} registered`} tone="blue"   />
        <StatCard label="Students"     value={users.filter(u => u.role === "student").length}   detail="Active learners"                                                    tone="purple" />
        <StatCard label="Experts"      value={users.filter(u => u.role === "expert").length}    detail="Available"                                                          tone="green"  />
        <StatCard label="Admins"       value={users.filter(u => u.role === "admin").length}     detail="Full access"                                                        tone="amber"  />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search users…"
            value={globalFilter}
            onChange={(e) => setGlobal(e.target.value)}
            className="h-9 w-full rounded-lg border border-white/[0.09] bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/40 focus:outline-none"
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-white/[0.07] bg-white/[0.03] p-0.5">
          {["all", "student", "expert", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={cn("rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors", roleFilter === r ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white")}
            >
              {r}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors">
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
        {table.getSelectedRowModel().rows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5"
          >
            <span className="text-xs text-blue-300">{table.getSelectedRowModel().rows.length} selected</span>
            <button className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors">
              <ShieldOff className="h-3 w-3" /> Deactivate
            </button>
          </motion.div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/[0.07]">
        {users.length === 0 ? (
          <EmptyState
            icon={<UserPlus className="h-8 w-8" />}
            title="No users yet"
            description="Add your first user using the button above."
            action={
              <button
                onClick={() => setShowCreate(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
              >
                <UserPlus className="h-4 w-4" /> Add New User
              </button>
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="border-b border-white/[0.07] bg-white/[0.03]">
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="px-4 py-3 text-left text-xs font-medium text-slate-400">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row, i) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/[0.05] hover:bg-white/[0.03] last:border-0"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-3">
              <p className="text-xs text-slate-500">
                Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
                {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.07] text-slate-400 hover:bg-white/[0.06] disabled:opacity-40">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: table.getPageCount() }, (_, i) => (
                  <button key={i} onClick={() => table.setPageIndex(i)} className={cn("h-7 w-7 rounded-lg border text-xs", table.getState().pagination.pageIndex === i ? "border-blue-500/40 bg-blue-600 text-white" : "border-white/[0.07] text-slate-400 hover:bg-white/[0.06]")}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.07] text-slate-400 hover:bg-white/[0.06] disabled:opacity-40">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Create User Modal */}
      <AnimatePresence>
        {showCreate && (
          <CreateUserModal
            onClose={() => setShowCreate(false)}
            onAdd={handleAdd}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
