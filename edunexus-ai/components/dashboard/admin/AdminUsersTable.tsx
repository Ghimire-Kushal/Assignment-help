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
import { motion } from "framer-motion";
import {
  ArrowUpDown, ChevronLeft, ChevronRight, Download,
  MoreHorizontal, Search, ShieldOff, UserCheck, UserX,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/widgets/StatusBadge";
import { StatCard } from "@/components/dashboard/widgets/StatCard";
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

const MOCK_USERS: User[] = [
  { id: "u1",  name: "Aarav Sharma",    email: "aarav@student.edu",   role: "student", status: "active",   orders: 12, spent: 840,  joined: new Date("2024-01-15"), country: "Nepal" },
  { id: "u2",  name: "Lena Kovacs",     email: "lena@uni.edu",        role: "student", status: "active",   orders: 8,  spent: 620,  joined: new Date("2024-02-20"), country: "Hungary" },
  { id: "u3",  name: "Raj Patel",       email: "raj@college.edu",     role: "student", status: "active",   orders: 5,  spent: 390,  joined: new Date("2024-03-05"), country: "India" },
  { id: "u4",  name: "Emma Thompson",   email: "emma@campus.edu",     role: "student", status: "inactive", orders: 3,  spent: 180,  joined: new Date("2024-04-12"), country: "UK" },
  { id: "u5",  name: "Dr. Marcus Ellis",email: "marcus@edunexus.ai",  role: "expert",  status: "active",   orders: 87, spent: 0,    joined: new Date("2023-11-01"), country: "USA" },
  { id: "u6",  name: "Prof. Sarah Chen",email: "sarah@edunexus.ai",   role: "expert",  status: "active",   orders: 64, spent: 0,    joined: new Date("2023-10-15"), country: "Canada" },
  { id: "u7",  name: "James Okoro",     email: "james@edunexus.ai",   role: "expert",  status: "active",   orders: 42, spent: 0,    joined: new Date("2024-01-08"), country: "Nigeria" },
  { id: "u8",  name: "Maya Thompson",   email: "maya@edunexus.ai",    role: "admin",   status: "active",   orders: 0,  spent: 0,    joined: new Date("2023-09-01"), country: "USA" },
  { id: "u9",  name: "Priya Nair",      email: "priya@student.edu",   role: "student", status: "active",   orders: 19, spent: 1240, joined: new Date("2023-12-01"), country: "India" },
  { id: "u10", name: "Carlos Mendez",   email: "carlos@uni.edu",      role: "student", status: "active",   orders: 7,  spent: 530,  joined: new Date("2024-03-18"), country: "Mexico" },
];

const ROLE_COLORS: Record<string, string> = {
  student: "border-blue-500/25 bg-blue-500/10 text-blue-300",
  expert:  "border-purple-500/25 bg-purple-500/10 text-purple-300",
  admin:   "border-amber-500/25 bg-amber-500/10 text-amber-300",
};

export function AdminUsersTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = useMemo(
    () => roleFilter === "all" ? MOCK_USERS : MOCK_USERS.filter((u) => u.role === roleFilter),
    [roleFilter]
  );

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
        cell: ({ getValue }) => <span className="font-medium text-white">${(getValue() as number).toLocaleString()}</span>,
      },
      {
        accessorKey: "country",
        header: "Country",
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
            <button title="Activate" className="rounded p-1 text-slate-500 hover:bg-white/[0.06] hover:text-emerald-400"><UserCheck className="h-3.5 w-3.5" /></button>
            <button title="Deactivate" className="rounded p-1 text-slate-500 hover:bg-white/[0.06] hover:text-red-400"><UserX className="h-3.5 w-3.5" /></button>
            <button title="More" className="rounded p-1 text-slate-500 hover:bg-white/[0.06] hover:text-white"><MoreHorizontal className="h-3.5 w-3.5" /></button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-white">User Management</h1>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Users" value={MOCK_USERS.length} detail="+12 this month" tone="blue" />
        <StatCard label="Students" value={MOCK_USERS.filter(u => u.role === "student").length} detail="Active learners" tone="purple" />
        <StatCard label="Experts" value={MOCK_USERS.filter(u => u.role === "expert").length} detail="Available" tone="green" />
        <StatCard label="Admins" value={MOCK_USERS.filter(u => u.role === "admin").length} detail="Full access" tone="amber" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search users…"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-9 w-full rounded-lg border border-white/[0.09] bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/40 focus:outline-none"
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-white/[0.07] bg-white/[0.03] p-0.5">
          {["all", "student", "expert", "admin"].map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)} className={cn("rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors", roleFilter === r ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white")}>
              {r}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors">
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
        {table.getSelectedRowModel().rows.length > 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5">
            <span className="text-xs text-blue-300">{table.getSelectedRowModel().rows.length} selected</span>
            <button className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors">
              <ShieldOff className="h-3 w-3" /> Deactivate
            </button>
          </motion.div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/[0.07]">
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
      </div>
    </div>
  );
}
