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
  ChevronLeft, ChevronRight, MessageSquare, UserCheck,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/widgets/StatusBadge";

interface AdminTicket {
  id: string;
  ticketId: string;
  student: string;
  subject: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: string;
  assignedTo: string | null;
  createdAt: string;
  lastReply: string;
}

const PRIORITY_COLORS: Record<string, string> = {
  low:    "text-slate-400 bg-slate-400/10",
  medium: "text-blue-400 bg-blue-400/10",
  high:   "text-amber-400 bg-amber-400/10",
  urgent: "text-red-400 bg-red-400/10",
};

const MOCK_TICKETS: AdminTicket[] = [
  { id: "1",  ticketId: "TKT-0021", student: "Alex Johnson",  subject: "Order ENX-1052 delayed",         category: "Order Issue",    priority: "urgent", status: "open",        assignedTo: "Support Agent A", createdAt: "2026-05-18", lastReply: "2h ago"  },
  { id: "2",  ticketId: "TKT-0020", student: "Maya Patel",    subject: "Refund request for ENX-1047",    category: "Billing",        priority: "high",   status: "in_progress", assignedTo: "Support Agent B", createdAt: "2026-05-17", lastReply: "5h ago"  },
  { id: "3",  ticketId: "TKT-0019", student: "Chris Brown",   subject: "Cannot upload assignment files", category: "Technical",      priority: "medium", status: "open",        assignedTo: null,              createdAt: "2026-05-16", lastReply: "1d ago"  },
  { id: "4",  ticketId: "TKT-0018", student: "Sarah Miller",  subject: "Expert not responding",          category: "Expert Issue",   priority: "high",   status: "in_progress", assignedTo: "Support Agent A", createdAt: "2026-05-15", lastReply: "12h ago" },
  { id: "5",  ticketId: "TKT-0017", student: "James Wilson",  subject: "Wrong citation format used",     category: "Quality",        priority: "medium", status: "resolved",    assignedTo: "Support Agent B", createdAt: "2026-05-14", lastReply: "2d ago"  },
  { id: "6",  ticketId: "TKT-0016", student: "Emily Davis",   subject: "Account login issues",           category: "Account",        priority: "low",    status: "closed",      assignedTo: "Support Agent A", createdAt: "2026-05-12", lastReply: "3d ago"  },
  { id: "7",  ticketId: "TKT-0015", student: "Robert Kim",    subject: "Discount code not applying",     category: "Billing",        priority: "low",    status: "resolved",    assignedTo: "Support Agent B", createdAt: "2026-05-13", lastReply: "2d ago"  },
  { id: "8",  ticketId: "TKT-0014", student: "Linda Chen",    subject: "Payment charged twice",          category: "Billing",        priority: "urgent", status: "in_progress", assignedTo: "Support Agent A", createdAt: "2026-05-10", lastReply: "8h ago"  },
  { id: "9",  ticketId: "TKT-0013", student: "Tom Harris",    subject: "Need plagiarism report",         category: "Order Issue",    priority: "medium", status: "open",        assignedTo: null,              createdAt: "2026-05-08", lastReply: "4d ago"  },
  { id: "10", ticketId: "TKT-0012", student: "Anna Lee",      subject: "Change deadline request",        category: "Order Issue",    priority: "high",   status: "closed",      assignedTo: "Support Agent B", createdAt: "2026-05-07", lastReply: "5d ago"  },
];

const STATUS_TABS = ["all", "open", "in_progress", "resolved", "closed"] as const;
const PRIORITY_TABS = ["all", "urgent", "high", "medium", "low"] as const;

export function AdminTicketsTable() {
  const [sorting, setSorting]         = useState<SortingState>([]);
  const [globalFilter, setGlobal]     = useState("");
  const [statusFilter, setStatus]     = useState<string>("all");
  const [priorityFilter, setPriority] = useState<string>("all");

  const filtered = useMemo(() => {
    let data = MOCK_TICKETS;
    if (statusFilter   !== "all") data = data.filter(t => t.status   === statusFilter);
    if (priorityFilter !== "all") data = data.filter(t => t.priority === priorityFilter);
    return data;
  }, [statusFilter, priorityFilter]);

  const columns = useMemo<ColumnDef<AdminTicket>[]>(() => [
    {
      id: "ticket",
      header: "Ticket",
      accessorKey: "ticketId",
      cell: ({ row }) => (
        <div>
          <p className="text-white font-mono font-semibold text-sm">{row.original.ticketId}</p>
          <p className="text-slate-500 text-xs">{row.original.createdAt}</p>
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
      id: "subject",
      header: "Subject",
      accessorKey: "subject",
      cell: ({ row }) => (
        <div className="max-w-[220px]">
          <p className="text-slate-300 text-sm truncate">{row.original.subject}</p>
          <p className="text-slate-500 text-xs">{row.original.category}</p>
        </div>
      ),
    },
    {
      id: "priority",
      header: "Priority",
      accessorKey: "priority",
      cell: ({ getValue }) => {
        const p = getValue() as string;
        return (
          <span className={`px-2 py-0.5 rounded-md text-xs font-semibold capitalize ${PRIORITY_COLORS[p]}`}>
            {p}
          </span>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
    },
    {
      id: "assignedTo",
      header: "Assigned",
      accessorKey: "assignedTo",
      cell: ({ getValue }) => {
        const v = getValue() as string | null;
        return v
          ? <span className="text-blue-400 text-xs">{v}</span>
          : <span className="text-slate-600 text-xs italic">Unassigned</span>;
      },
    },
    {
      id: "lastReply",
      header: "Last Reply",
      accessorKey: "lastReply",
      cell: ({ getValue }) => <span className="text-slate-400 text-sm">{getValue() as string}</span>,
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: () => (
        <div className="flex items-center gap-1">
          <button title="Reply" className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
          <button title="Assign agent" className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-400/10 transition-all">
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

  const openUrgent = MOCK_TICKETS.filter(t => t.priority === "urgent" && t.status === "open").length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Support Tickets</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {MOCK_TICKETS.length} total —{" "}
            {openUrgent > 0 && (
              <span className="text-red-400 font-semibold">{openUrgent} urgent open</span>
            )}
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          value={globalFilter}
          onChange={e => setGlobal(e.target.value)}
          placeholder="Search tickets, students, subjects…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-slate-500 text-sm outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex gap-1">
          {STATUS_TABS.map(tab => (
            <button key={tab} onClick={() => setStatus(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                statusFilter === tab ? "bg-blue-500 text-white" : "bg-white/[0.04] text-slate-400 hover:text-white"
              }`}>
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {PRIORITY_TABS.map(tab => (
            <button key={tab} onClick={() => setPriority(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                priorityFilter === tab ? "bg-purple-500 text-white" : "bg-white/[0.04] text-slate-400 hover:text-white"
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03]">
              {table.getHeaderGroups().map(hg => (
                <tr key={hg.id}>
                  {hg.headers.map(h => (
                    <th key={h.id} onClick={h.column.getToggleSortingHandler()}
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer select-none">
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
                <motion.tr key={row.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-white/[0.03] transition-colors">
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
          {table.getFilteredRowModel().rows.length} tickets
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
