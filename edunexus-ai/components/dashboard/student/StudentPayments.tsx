"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownToLine, CreditCard, Receipt, RefreshCw, ShieldCheck, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/widgets/StatCard";
import { StatusBadge } from "@/components/dashboard/widgets/StatusBadge";
import { EmptyState } from "@/components/dashboard/widgets/EmptyState";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  orderId: string;
  orderNumber: string;
  description: string;
  amount: number;
  currency: string;
  status: "succeeded" | "pending" | "failed" | "refunded";
  method: "stripe" | "paypal" | "bank_transfer";
  date: Date;
  receiptAvailable: boolean;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "p1",  orderId: "1",  orderNumber: "EDU-00012", description: "Thesis — Business Ethics",              amount: 240,  currency: "USD", status: "succeeded", method: "stripe",       date: new Date(Date.now() - 5 * 86400000),  receiptAvailable: true  },
  { id: "p2",  orderId: "2",  orderNumber: "EDU-00011", description: "Research Paper — Quantum Computing",   amount: 380,  currency: "USD", status: "succeeded", method: "stripe",       date: new Date(Date.now() - 8 * 86400000),  receiptAvailable: true  },
  { id: "p3",  orderId: "3",  orderNumber: "EDU-00010", description: "Assignment — Marketing Strategy",      amount: 90,   currency: "USD", status: "succeeded", method: "paypal",       date: new Date(Date.now() - 2 * 86400000),  receiptAvailable: true  },
  { id: "p4",  orderId: "4",  orderNumber: "EDU-00009", description: "Research Paper — Sociology",           amount: 130,  currency: "USD", status: "succeeded", method: "stripe",       date: new Date(Date.now() - 12 * 86400000), receiptAvailable: true  },
  { id: "p5",  orderId: "5",  orderNumber: "EDU-00008", description: "Essay — Literature Review",            amount: 60,   currency: "USD", status: "succeeded", method: "bank_transfer", date: new Date(Date.now() - 20 * 86400000), receiptAvailable: true  },
  { id: "p6",  orderId: "8",  orderNumber: "EDU-00005", description: "Assignment — Financial Management",    amount: 110,  currency: "USD", status: "pending",   method: "stripe",       date: new Date(Date.now() - 1 * 86400000),  receiptAvailable: false },
];

const METHOD_ICON: Record<Transaction["method"], React.ReactNode> = {
  stripe:       <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/></svg>,
  paypal:       <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082H9.825l-1.335 8.466h3.254l.922-5.85h1.876c4.783 0 7.894-2.274 8.896-6.796a5.17 5.17 0 0 0-.216-1.615z"/></svg>,
  bank_transfer: <CreditCard className="h-4 w-4" />,
};

function TransactionRow({ tx }: { tx: Transaction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between gap-4 border-b border-white/[0.05] px-4 py-3.5 last:border-0 hover:bg-white/[0.02]"
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg",
          tx.status === "succeeded" ? "bg-emerald-500/10 text-emerald-400" :
          tx.status === "pending"   ? "bg-amber-500/10 text-amber-400" :
          tx.status === "failed"    ? "bg-red-500/10 text-red-400" :
          "bg-slate-500/10 text-slate-400"
        )}>
          {METHOD_ICON[tx.method]}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{tx.description}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-slate-500">{tx.orderNumber}</p>
            <span className="text-slate-600">·</span>
            <p className="text-xs text-slate-500">{tx.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge status={tx.status} />
        <div className="text-right">
          <p className="text-sm font-semibold text-white">${tx.amount}</p>
          <p className="text-[11px] uppercase text-slate-500">{tx.currency}</p>
        </div>
        {tx.receiptAvailable && (
          <button
            title="Download receipt"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.07] text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowDownToLine className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

const UNPAID = MOCK_TRANSACTIONS.filter((t) => t.status === "pending");

export function StudentPayments() {
  const [activeTab, setActiveTab] = useState<"history" | "methods">("history");
  const totalSpent = MOCK_TRANSACTIONS.filter(t => t.status === "succeeded").reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-white">Payments</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Spent" value={`$${totalSpent}`} detail="Lifetime" tone="blue" icon={<CreditCard className="h-4 w-4" />} />
        <StatCard label="This Semester" value="$840" detail="4 transactions" tone="green" icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Pending" value={`$${UNPAID.reduce((s, t) => s + t.amount, 0)}`} detail={`${UNPAID.length} invoice${UNPAID.length !== 1 ? "s" : ""}`} tone="amber" icon={<Receipt className="h-4 w-4" />} />
        <StatCard label="Refunds" value="$0" detail="No refunds" tone="purple" icon={<RefreshCw className="h-4 w-4" />} />
      </div>

      {/* Pending payments alert */}
      {UNPAID.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/[0.07] p-4">
          <Receipt className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-300">Payment required</p>
            <p className="text-xs text-amber-400/70">You have {UNPAID.length} unpaid invoice{UNPAID.length !== 1 ? "s" : ""} totaling ${UNPAID.reduce((s, t) => s + t.amount, 0)}. Pay now to avoid order delays.</p>
          </div>
          <button className="flex-shrink-0 rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-500/30">
            Pay now
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-white/[0.07] bg-white/[0.03] p-1">
        {(["history", "methods"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-all",
              activeTab === tab
                ? "bg-blue-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            )}
          >
            {tab === "history" ? "Transaction history" : "Payment methods"}
          </button>
        ))}
      </div>

      {activeTab === "history" ? (
        <div className="overflow-hidden rounded-xl border border-white/[0.07]">
          <div className="border-b border-white/[0.07] bg-white/[0.03] px-4 py-3 text-xs font-medium text-slate-400">
            {MOCK_TRANSACTIONS.length} transactions
          </div>
          {MOCK_TRANSACTIONS.length === 0 ? (
            <EmptyState icon={<CreditCard className="h-8 w-8" />} title="No transactions yet" description="Your payment history will appear here." />
          ) : (
            MOCK_TRANSACTIONS.map((tx) => <TransactionRow key={tx.id} tx={tx} />)
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Saved card */}
          <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">•••• •••• •••• 4242</p>
                <p className="text-xs text-slate-400">Visa · Expires 08/26</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">Default</span>
              <button className="text-xs text-slate-400 hover:text-red-400 transition-colors">Remove</button>
            </div>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.12] py-4 text-sm text-slate-400 transition hover:border-blue-500/30 hover:text-blue-400">
            <ShieldCheck className="h-4 w-4" /> Add payment method
          </button>
          <p className="text-center text-xs text-slate-500">
            Payments are secured by Stripe. We never store your card details.
          </p>
        </div>
      )}
    </div>
  );
}
