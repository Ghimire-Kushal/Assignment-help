"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, RotateCcw, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServicePrice {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  originalPrice: number;
  minPrice: number;
  maxPrice: number;
}

const INITIAL_PRICING: ServicePrice[] = [
  { id: "1",  name: "Assignment Help",      category: "Writing",    unit: "page",    price: 1200, originalPrice: 1200, minPrice: 800,  maxPrice: 3000  },
  { id: "2",  name: "Essay Writing",         category: "Writing",    unit: "page",    price: 1500, originalPrice: 1500, minPrice: 1000, maxPrice: 4000  },
  { id: "3",  name: "Research Paper",        category: "Writing",    unit: "page",    price: 1900, originalPrice: 1900, minPrice: 1200, maxPrice: 5000  },
  { id: "4",  name: "Dissertation",          category: "Writing",    unit: "page",    price: 2000, originalPrice: 2000, minPrice: 1500, maxPrice: 6000  },
  { id: "5",  name: "Coding & CS Help",      category: "Technical",  unit: "task",    price: 2500, originalPrice: 2500, minPrice: 1500, maxPrice: 8000  },
  { id: "6",  name: "Math & STEM",           category: "Technical",  unit: "task",    price: 1500, originalPrice: 1500, minPrice: 900,  maxPrice: 4000  },
  { id: "7",  name: "Final Year Project",    category: "Technical",  unit: "project", price: 2400, originalPrice: 2400, minPrice: 1500, maxPrice: 10000 },
  { id: "8",  name: "Presentation Design",   category: "Design",     unit: "slide",   price: 1500, originalPrice: 1500, minPrice: 500,  maxPrice: 3000  },
  { id: "9",  name: "Editing & Formatting",  category: "Writing",    unit: "page",    price: 700,  originalPrice: 700,  minPrice: 400,  maxPrice: 2000  },
  { id: "10", name: "AI Academic Assistance",category: "AI",         unit: "session", price: 900,  originalPrice: 900,  minPrice: 500,  maxPrice: 2500  },
];

function PriceRow({ service, onChange }: { service: ServicePrice; onChange: (id: string, price: number) => void }) {
  const diff = service.price - service.originalPrice;
  const pct  = service.originalPrice > 0 ? Math.round((diff / service.originalPrice) * 100) : 0;

  return (
    <motion.div
      layout
      className="flex flex-wrap items-center gap-4 border-b border-white/[0.05] px-5 py-4 last:border-0"
    >
      <div className="min-w-[180px] flex-1">
        <p className="text-sm font-medium text-white">{service.name}</p>
        <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-slate-400">{service.category}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(service.id, Math.max(service.minPrice, service.price - 100))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.1] text-slate-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
        >
          <ChevronDown className="h-4 w-4" />
        </button>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">रू</span>
          <input
            type="number"
            value={service.price}
            min={service.minPrice}
            max={service.maxPrice}
            step={100}
            onChange={e => onChange(service.id, Math.min(service.maxPrice, Math.max(service.minPrice, Number(e.target.value))))}
            className="w-28 rounded-xl border border-white/[0.1] bg-white/[0.04] py-2 pl-7 pr-3 text-sm text-white focus:border-blue-500/50 focus:outline-none"
          />
        </div>

        <button
          onClick={() => onChange(service.id, Math.min(service.maxPrice, service.price + 100))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.1] text-slate-400 transition hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-400"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
      </div>

      <span className="text-xs text-slate-500">per {service.unit}</span>

      <div className="ml-auto text-right">
        {diff !== 0 && (
          <span className={cn(
            "text-xs font-semibold",
            diff > 0 ? "text-green-400" : "text-red-400"
          )}>
            {diff > 0 ? "+" : ""}{pct}% from base
          </span>
        )}
        {diff === 0 && <span className="text-xs text-slate-600">No change</span>}
      </div>
    </motion.div>
  );
}

export function AdminPricing() {
  const [prices, setPrices] = useState<ServicePrice[]>(INITIAL_PRICING);
  const [saved, setSaved] = useState(false);

  function handleChange(id: string, price: number) {
    setPrices(prev => prev.map(s => s.id === id ? { ...s, price } : s));
    setSaved(false);
  }

  function resetAll() {
    setPrices(prev => prev.map(s => ({ ...s, price: s.originalPrice })));
    setSaved(false);
  }

  function saveAll() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const changedCount = prices.filter(s => s.price !== s.originalPrice).length;

  const categories = Array.from(new Set(prices.map(s => s.category)));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Pricing Control</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {changedCount > 0 ? `${changedCount} price${changedCount > 1 ? "s" : ""} modified` : "All prices at base rate"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetAll}
            className="flex items-center gap-2 rounded-xl border border-white/[0.1] px-4 py-2.5 text-sm text-slate-400 transition hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset All
          </button>
          <button
            onClick={saveAll}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition",
              saved ? "bg-green-600 hover:bg-green-500" : "bg-blue-600 hover:bg-blue-500"
            )}
          >
            <Save className="h-3.5 w-3.5" />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Summary */}
      {changedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-xl border border-amber-500/25 bg-amber-500/[0.07] px-4 py-3 text-sm text-amber-300"
        >
          <span className="font-medium">{changedCount} unsaved change{changedCount > 1 ? "s" : ""}.</span>
          <span className="text-amber-400/70">Click Save Changes to apply.</span>
        </motion.div>
      )}

      {/* Pricing by category */}
      {categories.map(cat => (
        <div key={cat} className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06]">
            <h2 className="text-sm font-semibold text-white">{cat}</h2>
          </div>
          {prices.filter(s => s.category === cat).map(service => (
            <PriceRow key={service.id} service={service} onChange={handleChange} />
          ))}
        </div>
      ))}

      <p className="text-xs text-slate-600 text-center">
        Price ranges: system enforces min/max limits per service. Changes take effect on new orders only.
      </p>
    </div>
  );
}
