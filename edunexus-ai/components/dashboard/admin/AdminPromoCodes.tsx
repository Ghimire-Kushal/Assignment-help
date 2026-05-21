"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Plus, Tag, Trash2, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface PromoCode {
  id: string;
  code: string;
  type: "percent" | "flat";
  value: number;
  minOrder: number;
  uses: number;
  maxUses: number;
  active: boolean;
  expires: string;
}

const INITIAL_CODES: PromoCode[] = [
  { id: "1", code: "WELCOME20",  type: "percent", value: 20, minOrder: 1000,  uses: 12, maxUses: 100, active: true,  expires: "2026-12-31" },
  { id: "2", code: "SAVE500",    type: "flat",    value: 500,minOrder: 2000,  uses: 5,  maxUses: 50,  active: true,  expires: "2026-08-31" },
  { id: "3", code: "STUDENT10",  type: "percent", value: 10, minOrder: 500,   uses: 34, maxUses: 200, active: true,  expires: "2026-12-31" },
  { id: "4", code: "SUMMER25",   type: "percent", value: 25, minOrder: 1500,  uses: 50, maxUses: 50,  active: false, expires: "2026-06-30" },
];

interface CreateModalProps {
  onClose: () => void;
  onCreate: (code: Omit<PromoCode, "id" | "uses">) => void;
}

function CreateModal({ onClose, onCreate }: CreateModalProps) {
  const [form, setForm] = useState({
    code: "",
    type: "percent" as "percent" | "flat",
    value: 10,
    minOrder: 1000,
    maxUses: 100,
    active: true,
    expires: "2026-12-31",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.code.trim()) return;
    onCreate({ ...form, code: form.code.toUpperCase().trim() });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#0e1525] p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Create Promo Code</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Code</label>
            <input
              value={form.code}
              onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))}
              className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 font-mono text-sm text-white focus:border-blue-500/50 focus:outline-none"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Discount Type</label>
              <select
                value={form.type}
                onChange={e => setForm(p => ({ ...p, type: e.target.value as "percent" | "flat" }))}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-sm text-white focus:border-blue-500/50 focus:outline-none"
              >
                <option value="percent">Percentage (%)</option>
                <option value="flat">Flat (रू)</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                {form.type === "percent" ? "Discount %" : "Discount रू"}
              </label>
              <input
                type="number"
                value={form.value}
                onChange={e => setForm(p => ({ ...p, value: Number(e.target.value) }))}
                min={1} max={form.type === "percent" ? 99 : 99999}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-sm text-white focus:border-blue-500/50 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Min. Order (रू)</label>
              <input
                type="number"
                value={form.minOrder}
                onChange={e => setForm(p => ({ ...p, minOrder: Number(e.target.value) }))}
                min={0}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-sm text-white focus:border-blue-500/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Max Uses</label>
              <input
                type="number"
                value={form.maxUses}
                onChange={e => setForm(p => ({ ...p, maxUses: Number(e.target.value) }))}
                min={1}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-sm text-white focus:border-blue-500/50 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Expiry Date</label>
            <input
              type="date"
              value={form.expires}
              onChange={e => setForm(p => ({ ...p, expires: e.target.value }))}
              className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-sm text-white focus:border-blue-500/50 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.active}
                onChange={e => setForm(p => ({ ...p, active: e.target.checked }))}
                className="accent-blue-500"
              />
              Active immediately
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-white/[0.1] py-2.5 text-sm text-slate-400 transition hover:text-white">
              Cancel
            </button>
            <button type="submit" className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500">
              Create Code
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

export function AdminPromoCodes() {
  const [codes, setCodes] = useState<PromoCode[]>(INITIAL_CODES);
  const [showCreate, setShowCreate] = useState(false);

  function handleCreate(newCode: Omit<PromoCode, "id" | "uses">) {
    setCodes(prev => [
      { ...newCode, id: String(Date.now()), uses: 0 },
      ...prev,
    ]);
  }

  function toggleActive(id: string) {
    setCodes(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  }

  function deleteCode(id: string) {
    setCodes(prev => prev.filter(c => c.id !== id));
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Promo Codes</h1>
          <p className="text-sm text-slate-400 mt-0.5">{codes.filter(c => c.active).length} active codes</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <Plus className="h-4 w-4" />
          Create Code
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Codes",  value: codes.length,                       color: "text-blue-400"  },
          { label: "Active",       value: codes.filter(c => c.active).length,  color: "text-green-400" },
          { label: "Total Uses",   value: codes.reduce((s, c) => s + c.uses, 0), color: "text-purple-400" },
          { label: "Inactive",     value: codes.filter(c => !c.active).length, color: "text-slate-400" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Codes table */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Tag className="h-4 w-4 text-blue-400" />
            All Promo Codes
          </h2>
        </div>
        <div className="divide-y divide-white/[0.05]">
          <AnimatePresence>
            {codes.map(code => (
              <motion.div
                key={code.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center gap-3 px-5 py-4"
              >
                {/* Code + copy */}
                <div className="flex items-center gap-2 min-w-[140px]">
                  <span className="font-mono text-sm font-bold text-white">{code.code}</span>
                  <button
                    onClick={() => copyToClipboard(code.code)}
                    className="text-slate-500 hover:text-slate-300 transition"
                    title="Copy code"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Discount */}
                <span className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                  code.type === "percent"
                    ? "bg-blue-500/15 text-blue-300"
                    : "bg-emerald-500/15 text-emerald-300"
                )}>
                  {code.type === "percent" ? `${code.value}% off` : `रू ${code.value.toLocaleString("ne-NP")} off`}
                </span>

                {/* Min order */}
                <span className="text-xs text-slate-500">Min रू {code.minOrder.toLocaleString("ne-NP")}</span>

                {/* Uses */}
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-20 rounded-full bg-white/[0.08]">
                    <div
                      className="h-1.5 rounded-full bg-blue-500"
                      style={{ width: `${Math.min((code.uses / code.maxUses) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{code.uses}/{code.maxUses}</span>
                </div>

                {/* Expires */}
                <span className="text-xs text-slate-500">Expires {code.expires}</span>

                {/* Status toggle */}
                <button
                  onClick={() => toggleActive(code.id)}
                  className={cn(
                    "relative h-5 w-9 rounded-full transition-colors flex-shrink-0",
                    code.active ? "bg-green-500" : "bg-white/[0.12]"
                  )}
                >
                  <div className={cn(
                    "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                    code.active ? "translate-x-4" : "translate-x-0.5"
                  )} />
                </button>

                <span className="text-xs text-slate-500">{code.active ? "Active" : "Inactive"}</span>

                {/* Delete */}
                <button
                  onClick={() => deleteCode(code.id)}
                  className="ml-auto text-slate-500 hover:text-red-400 transition"
                  title="Delete code"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {codes.length === 0 && (
            <div className="py-16 text-center text-slate-500 text-sm">
              No promo codes yet. Create your first one.
            </div>
          )}
        </div>
      </div>

      {showCreate && (
        <CreateModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />
      )}
    </div>
  );
}
