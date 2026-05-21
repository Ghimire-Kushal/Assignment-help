"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownToLine, Building2, CheckCircle, CreditCard, Receipt, RefreshCw, ShieldCheck, Smartphone, TrendingUp, X } from "lucide-react";
import { StatCard } from "@/components/dashboard/widgets/StatCard";
import { StatusBadge } from "@/components/dashboard/widgets/StatusBadge";
import { EmptyState } from "@/components/dashboard/widgets/EmptyState";
import { cn } from "@/lib/utils";

type AddMethodType = "esewa" | "khalti" | "mypay" | "connectips" | "card" | "bank";

const PAYMENT_METHOD_OPTIONS: { type: AddMethodType; label: string; sub: string; color: string; icon: "smart" | "card" | "bank" }[] = [
  { type: "esewa",      label: "eSewa",            sub: "Nepal's most popular e-wallet",  color: "text-green-400",  icon: "smart" },
  { type: "khalti",     label: "Khalti",            sub: "Fast digital wallet",             color: "text-purple-400", icon: "smart" },
  { type: "mypay",      label: "MyPay",             sub: "Secure mobile payment",           color: "text-blue-400",   icon: "smart" },
  { type: "connectips", label: "ConnectIPS",        sub: "Interbank payment system",        color: "text-cyan-400",   icon: "bank"  },
  { type: "card",       label: "Debit / ATM Card",  sub: "Visa, Mastercard — local banks",  color: "text-slate-400",  icon: "card"  },
  { type: "bank",       label: "Bank Transfer",     sub: "Direct bank — 1-2 business days", color: "text-slate-400",  icon: "bank"  },
];

function AddMethodModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<AddMethodType>("esewa");
  const [phone, setPhone] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const wallets: AddMethodType[] = ["esewa", "khalti", "mypay", "connectips"];
  const isWallet = wallets.includes(selected);

  function handleSave() {
    setDone(true);
    setTimeout(onClose, 1400);
  }

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#0f1117] shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
          <h3 className="text-base font-semibold text-white">Add Payment Method</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center gap-3 py-10 px-5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="h-7 w-7 text-emerald-400" />
            </div>
            <p className="text-white font-semibold">Method added successfully!</p>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Method selector */}
            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_METHOD_OPTIONS.map((opt) => {
                const IconEl = opt.icon === "smart" ? Smartphone : opt.icon === "card" ? CreditCard : Building2;
                return (
                  <button
                    key={opt.type}
                    onClick={() => setSelected(opt.type)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all",
                      selected === opt.type
                        ? "border-blue-500/60 bg-blue-500/10"
                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16]"
                    )}
                  >
                    <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg", selected === opt.type ? "bg-blue-500/20 text-blue-400" : "bg-white/[0.05] text-slate-400")}>
                      <IconEl className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className={cn("text-xs font-medium truncate", selected === opt.type ? "text-white" : "text-slate-300")}>{opt.label}</p>
                      <p className="text-[10px] text-slate-500 truncate">{opt.sub}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Input area */}
            {isWallet && (
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Registered Mobile Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none"
                />
              </div>
            )}

            {selected === "card" && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Cardholder Name</label>
                  <input value={cardName} onChange={(e) => setCardName(e.target.value)} className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Card Number</label>
                  <input value={cardNum} onChange={(e) => setCardNum(e.target.value)} maxLength={19} className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-sm text-white font-mono placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Expiry (MM/YY)</label>
                    <input value={expiry} onChange={(e) => setExpiry(e.target.value)} maxLength={7} className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">CVC</label>
                    <input value={cvc} onChange={(e) => setCvc(e.target.value)} maxLength={4} type="password" className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none" />
                  </div>
                </div>
              </div>
            )}

            {selected === "bank" && (
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 space-y-2 text-sm">
                {[["Account Name", "ScholarSync Nepal"], ["Bank", "Nepal Bank Ltd."], ["Account No.", "••••••••7823"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between">
                    <span className="text-slate-500">{l}</span>
                    <span className="text-white font-mono">{v}</span>
                  </div>
                ))}
                <p className="text-xs text-amber-400 pt-2 border-t border-white/[0.06]">⚠ Bank transfers take 1-2 business days.</p>
              </div>
            )}

            <button
              onClick={handleSave}
              className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
            >
              Save Method
            </button>
            <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3 text-green-400" /> Secured with 256-bit SSL encryption
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}

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

const MOCK_TRANSACTIONS: Transaction[] = [];

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
          <p className="text-sm font-semibold text-white">रू {tx.amount.toLocaleString("ne-NP")}</p>
          <p className="text-[11px] uppercase text-slate-500">NPR</p>
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
  const [showAddMethod, setShowAddMethod] = useState(false);
  const totalSpent = MOCK_TRANSACTIONS.filter(t => t.status === "succeeded").reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-white">Payments</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Spent" value={`रू ${totalSpent.toLocaleString("ne-NP")}`} detail="Lifetime" tone="blue" icon={<CreditCard className="h-4 w-4" />} />
        <StatCard label="This Month" value="रू 0" detail="No transactions" tone="green" icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Pending" value={`रू ${UNPAID.reduce((s, t) => s + t.amount, 0).toLocaleString("ne-NP")}`} detail={`${UNPAID.length} invoice${UNPAID.length !== 1 ? "s" : ""}`} tone="amber" icon={<Receipt className="h-4 w-4" />} />
        <StatCard label="Refunds" value="रू 0" detail="No refunds" tone="purple" icon={<RefreshCw className="h-4 w-4" />} />
      </div>

      {/* Pending payments alert */}
      {UNPAID.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/[0.07] p-4">
          <Receipt className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-300">Payment required</p>
            <p className="text-xs text-amber-400/70">You have {UNPAID.length} unpaid invoice{UNPAID.length !== 1 ? "s" : ""} totaling रू {UNPAID.reduce((s, t) => s + t.amount, 0).toLocaleString("ne-NP")}. Pay now to avoid order delays.</p>
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
          <button
            onClick={() => setShowAddMethod(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.12] py-4 text-sm text-slate-400 transition hover:border-blue-500/30 hover:text-blue-400"
          >
            <ShieldCheck className="h-4 w-4" /> Add payment method
          </button>
          <p className="text-center text-xs text-slate-500">
            Payments are secured. We never store your card details.
          </p>
        </div>
      )}

      <AnimatePresence>
        {showAddMethod && <AddMethodModal onClose={() => setShowAddMethod(false)} />}
      </AnimatePresence>
    </div>
  );
}
