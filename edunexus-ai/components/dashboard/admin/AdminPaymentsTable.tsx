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
  ChevronLeft, ChevronRight, Download, RefreshCw,
  TrendingUp, DollarSign, AlertCircle, CheckCircle,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/widgets/StatusBadge";

interface AdminPayment {
  id: string;
  transactionId: string;
  student: string;
  orderNumber: string;
  amount: number;
  method: string;
  status: string;
  date: string;
  gateway: string;
}

const MOCK_PAYMENTS: AdminPayment[] = [];

const STATUS_TABS = ["all", "completed", "pending", "failed", "refunded"] as const;

const STATS = [
  { label: "Total Revenue",  value: "रू 0",  sub: "This month",    icon: DollarSign, color: "text-green-400 bg-green-400/10"  },
  { label: "Transactions",   value: "0",      sub: "All time",      icon: TrendingUp, color: "text-blue-400 bg-blue-400/10"    },
  { label: "Pending",        value: "रू 0",  sub: "No pending",    icon: AlertCircle,color: "text-amber-400 bg-amber-400/10"  },
  { label: "Refunded",       value: "रू 0",  sub: "No refunds",    icon: RefreshCw,  color: "text-red-400 bg-red-400/10"      },
];

export function AdminPaymentsTable() {
  const [sorting, setSorting]     = useState<SortingState>([]);
  const [globalFilter, setGlobal] = useState("");
  const [statusFilter, setStatus] = useState<string>("all");

  const filtered = useMemo(() =>
    statusFilter === "all" ? MOCK_PAYMENTS : MOCK_PAYMENTS.filter(p => p.status === statusFilter),
    [statusFilter]
  );

  const columns = useMemo<ColumnDef<AdminPayment>[]>(() => [
    {
      id: "txn",
      header: "Transaction",
      accessorKey: "transactionId",
      cell: ({ row }) => (
        <div>
          <p className="text-white font-mono font-semibold text-sm">{row.original.transactionId}</p>
          <p className="text-slate-500 text-xs">{row.original.date}</p>
        </div>
      ),
    },
    {
      id: "student",
      header: "Student",
      accessorKey: "student",
      cell: ({ getValue }) => <span className="text-slate-300 text-sm">{getValue() as string}</span>,
    },
    {
      id: "order",
      header: "Order",
      accessorKey: "orderNumber",
      cell: ({ getValue }) => (
        <span className="text-blue-400 font-mono text-sm">{getValue() as string}</span>
      ),
    },
    {
      id: "amount",
      header: "Amount",
      accessorKey: "amount",
      cell: ({ getValue }) => (
        <span className="text-green-400 font-bold text-sm">रू {(getValue() as number).toLocaleString("ne-NP")}</span>
      ),
    },
    {
      id: "method",
      header: "Method",
      accessorKey: "method",
      cell: ({ row }) => (
        <div>
          <p className="text-slate-300 text-sm">{row.original.method}</p>
          <p className="text-slate-500 text-xs">{row.original.gateway}</p>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          {row.original.status === "completed" && (
            <button title="Issue refund" className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 transition-all">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
          <button title="View receipt" className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
            <CheckCircle className="w-3.5 h-3.5" />
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
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments</h1>
          <p className="text-slate-400 text-sm mt-0.5">{MOCK_PAYMENTS.length} total transactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-white text-sm transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              <p className="text-xs text-slate-600 mt-0.5">{s.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={globalFilter}
            onChange={e => setGlobal(e.target.value)}
            placeholder="Search transactions, students…"
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
            {tab}
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
          {table.getFilteredRowModel().rows.length} transactions
        </span>
        <div className="flex items-center gap-1">
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}
            className="p-1.5 rounded-lg disabled:opacity-30 text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <button key={i} onClick={() => table.setPageIndex(i)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                table.getState().pagination.pageIndex === i
                  ? "bg-blue-500 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
              }`}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}
            className="p-1.5 rounded-lg disabled:opacity-30 text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
