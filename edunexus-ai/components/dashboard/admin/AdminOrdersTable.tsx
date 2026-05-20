"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  useReactTable, getCoreRowModel, getSortedRowModel,
  getFilteredRowModel, getPaginationRowModel, flexRender,
  type ColumnDef, type SortingState,
} from "@tanstack/react-table";
import {
  ChevronUp, ChevronDown, ChevronsUpDown, Search,
  ChevronLeft, ChevronRight, Eye, UserCheck, Download,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/widgets/StatusBadge";

interface AdminOrder {
  id: string;
  orderNumber: string;
  student: string;
  subject: string;
  service: string;
  status: string;
  deadline: string;
  expert: string | null;
  amount: number;
  createdAt: string;
}

const MOCK_ORDERS: AdminOrder[] = [
  { id: "1", orderNumber: "ENX-1052", student: "Alex Johnson",   subject: "Computer Science",  service: "Research Paper", status: "in_progress", deadline: "2026-05-22", expert: "Dr. Sarah Chen",       amount: 149, createdAt: "2026-05-18" },
  { id: "2", orderNumber: "ENX-1051", student: "Maya Patel",     subject: "Business Studies", service: "Case Study",     status: "review",      deadline: "2026-05-23", expert: "Prof. James Wilson",   amount: 89,  createdAt: "2026-05-17" },
  { id: "3", orderNumber: "ENX-1050", student: "Chris Brown",    subject: "Psychology",        service: "Essay",          status: "pending",     deadline: "2026-05-25", expert: null,                   amount: 65,  createdAt: "2026-05-16" },
  { id: "4", orderNumber: "ENX-1049", student: "Sarah Miller",   subject: "Biology",           service: "Lab Report",     status: "completed",   deadline: "2026-05-15", expert: "Dr. Emma Rodriguez",   amount: 120, createdAt: "2026-05-10" },
  { id: "5", orderNumber: "ENX-1048", student: "James Wilson",   subject: "Literature",        service: "Dissertation",   status: "in_progress", deadline: "2026-05-30", expert: "Dr. Sarah Chen",       amount: 299, createdAt: "2026-05-14" },
  { id: "6", orderNumber: "ENX-1047", student: "Emily Davis",    subject: "Chemistry",         service: "Lab Report",     status: "cancelled",   deadline: "2026-05-12", expert: null,                   amount: 75,  createdAt: "2026-05-08" },
  { id: "7", orderNumber: "ENX-1046", student: "Robert Kim",     subject: "Economics",         service: "Research Paper", status: "revision",    deadline: "2026-05-21", expert: "Prof. James Wilson",   amount: 140, createdAt: "2026-05-13" },
  { id: "8", orderNumber: "ENX-1045", student: "Linda Chen",     subject: "Mathematics",       service: "Problem Set",    status: "completed",   deadline: "2026-05-10", expert: "Dr. Emma Rodriguez",   amount: 55,  createdAt: "2026-05-06" },
  { id: "9", orderNumber: "ENX-1044", student: "Tom Harris",     subject: "History",           service: "Essay",          status: "completed",   deadline: "2026-05-08", expert: "Prof. James Wilson",   amount: 80,  createdAt: "2026-05-03" },
  { id: "10",orderNumber: "ENX-1043", student: "Anna Lee",       subject: "Sociology",         service: "Case Study",     status: "pending",     deadline: "2026-05-28", expert: null,                   amount: 95,  createdAt: "2026-05-15" },
];

const STATUS_TABS = ["all", "pending", "in_progress", "review", "revision", "completed", "cancelled"] as const;

export function AdminOrdersTable() {
  const [sorting, setSorting]         = useState<SortingState>([]);
  const [globalFilter, setGlobal]     = useState("");
  const [statusFilter, setStatus]     = useState<string>("all");

  const filtered = useMemo(() =>
    statusFilter === "all" ? MOCK_ORDERS : MOCK_ORDERS.filter(o => o.status === statusFilter),
    [statusFilter]
  );

  const columns = useMemo<ColumnDef<AdminOrder>[]>(() => [
    {
      id: "order",
      header: "Order",
      accessorKey: "orderNumber",
      cell: ({ row }) => (
        <div>
          <p className="text-white font-mono font-semibold text-sm">{row.original.orderNumber}</p>
          <p className="text-slate-500 text-xs">{row.original.createdAt}</p>
        </div>
      ),
    },
    {
      id: "student",
      header: "Student",
      accessorKey: "student",
      cell: ({ getValue }) => (
        <span className="text-slate-300 text-sm">{getValue() as string}</span>
      ),
    },
    {
      id: "service",
      header: "Service",
      accessorKey: "service",
      cell: ({ row }) => (
        <div>
          <p className="text-slate-300 text-sm">{row.original.service}</p>
          <p className="text-slate-500 text-xs">{row.original.subject}</p>
        </div>
      ),
    },
    {
      id: "expert",
      header: "Expert",
      accessorKey: "expert",
      cell: ({ getValue }) => {
        const v = getValue() as string | null;
        return v
          ? <span className="text-blue-400 text-sm">{v}</span>
          : <span className="text-slate-600 text-sm italic">Unassigned</span>;
      },
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
    },
    {
      id: "deadline",
      header: "Deadline",
      accessorKey: "deadline",
      cell: ({ getValue }) => (
        <span className="text-slate-300 text-sm font-mono">{getValue() as string}</span>
      ),
    },
    {
      id: "amount",
      header: "Amount",
      accessorKey: "amount",
      cell: ({ getValue }) => (
        <span className="text-green-400 font-semibold text-sm">${getValue() as number}</span>
      ),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: () => (
        <div className="flex items-center gap-1">
          <button title="View" className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button title="Assign expert" className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-400/10 transition-all">
            <UserCheck className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ], []);

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

  const SortIcon = ({ id }: { id: string }) => {
    const col = table.getColumn(id);
    if (!col) return <ChevronsUpDown className="w-3 h-3 text-slate-600" />;
    if (col.getIsSorted() === "asc")  return <ChevronUp className="w-3 h-3 text-blue-400" />;
    if (col.getIsSorted() === "desc") return <ChevronDown className="w-3 h-3 text-blue-400" />;
    return <ChevronsUpDown className="w-3 h-3 text-slate-600" />;
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Orders</h1>
          <p className="text-slate-400 text-sm mt-0.5">{MOCK_ORDERS.length} total orders</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-white text-sm transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={globalFilter}
            onChange={e => setGlobal(e.target.value)}
            placeholder="Search orders, students, experts…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-slate-500 text-sm outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-1 flex-wrap">
        {STATUS_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setStatus(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
              statusFilter === tab
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white/[0.04] text-slate-400 hover:text-white"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03]">
              {table.getHeaderGroups().map(hg => (
                <tr key={hg.id}>
                  {hg.headers.map(h => (
                    <th
                      key={h.id}
                      onClick={h.column.getToggleSortingHandler()}
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {h.column.getCanSort() && <SortIcon id={h.id} />}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {table.getRowModel().rows.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} —{" "}
          {table.getFilteredRowModel().rows.length} orders
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1.5 rounded-lg disabled:opacity-30 text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <button
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                table.getState().pagination.pageIndex === i
                  ? "bg-blue-500 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1.5 rounded-lg disabled:opacity-30 text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
