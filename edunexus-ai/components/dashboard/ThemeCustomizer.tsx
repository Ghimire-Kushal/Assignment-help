"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Moon, RefreshCw, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AccentColor = "blue" | "green" | "red" | "purple" | "dark" | "orange" | "glass" | "minimal";
type Appearance = "light" | "dark" | "system";
type ComponentShape = "rounded" | "square";
type LayoutDensity = "normal" | "compact";
type SidebarMode = "expanded" | "collapsed";

interface ThemeSettings {
  accent: AccentColor;
  appearance: Appearance;
  shape: ComponentShape;
  density: LayoutDensity;
  sidebar: SidebarMode;
  animations: boolean;
}

const DEFAULTS: ThemeSettings = {
  accent: "glass",
  appearance: "dark",
  shape: "rounded",
  density: "compact",
  sidebar: "collapsed",
  animations: true,
};

const ACCENT_OPTIONS: { value: AccentColor; label: string; color: string }[] = [
  { value: "blue",    label: "Blue",    color: "bg-blue-500"    },
  { value: "green",   label: "Green",   color: "bg-emerald-500" },
  { value: "red",     label: "Red",     color: "bg-red-500"     },
  { value: "purple",  label: "Purple",  color: "bg-purple-500"  },
  { value: "dark",    label: "Dark",    color: "bg-indigo-800"  },
  { value: "orange",  label: "Orange",  color: "bg-orange-500"  },
  { value: "glass",   label: "Glass",   color: "bg-sky-400/60 border-2 border-sky-300 ring-2 ring-sky-200/30" },
  { value: "minimal", label: "Minimal", color: "bg-slate-600"   },
];

const STORAGE_KEY = "edunexus_theme";

function load(): ThemeSettings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch { return DEFAULTS; }
}

function save(s: ThemeSettings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

interface ThemeCustomizerProps {
  open: boolean;
  onClose: () => void;
}

export function ThemeCustomizer({ open, onClose }: ThemeCustomizerProps) {
  const [settings, setSettings] = useState<ThemeSettings>(DEFAULTS);

  useEffect(() => { setSettings(load()); }, []);

  function update<K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) {
    const next = { ...settings, [key]: value };
    setSettings(next);
    save(next);
  }

  function reset() {
    setSettings(DEFAULTS);
    save(DEFAULTS);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[min(340px,95vw)] flex-col border-l border-white/[0.1] bg-[#0e1525] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/[0.08] p-5">
              <div>
                <h2 className="text-lg font-bold text-white">Theme Customizer</h2>
                <p className="text-sm text-slate-400">Personalize your panel</p>
              </div>
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/[0.08] hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-7">

              {/* Accent Color */}
              <section>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Accent Color</p>
                <div className="grid grid-cols-4 gap-3">
                  {ACCENT_OPTIONS.map((a) => (
                    <button
                      key={a.value}
                      onClick={() => update("accent", a.value)}
                      className="flex flex-col items-center gap-1.5 group"
                    >
                      <div className={cn(
                        "h-12 w-12 rounded-full transition-all",
                        a.color,
                        settings.accent === a.value
                          ? "ring-2 ring-white ring-offset-2 ring-offset-[#0e1525] scale-110"
                          : "opacity-70 group-hover:opacity-100 group-hover:scale-105"
                      )} />
                      <span className={cn(
                        "text-[11px] font-medium",
                        settings.accent === a.value ? "text-white" : "text-slate-400"
                      )}>{a.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Appearance */}
              <section>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Appearance</p>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: "light" as Appearance, label: "Light", icon: Sun },
                    { value: "dark"  as Appearance, label: "Dark",  icon: Moon },
                    { value: "system" as Appearance, label: "System", icon: Monitor },
                  ]).map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => update("appearance", value)}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all",
                        settings.appearance === value
                          ? "border-blue-500/60 bg-blue-500/10 text-blue-300"
                          : "border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-white/[0.16] hover:text-white"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Component Shape */}
              <section>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Component Shape</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { value: "rounded" as ComponentShape, label: "Rounded" },
                    { value: "square"  as ComponentShape, label: "Square"  },
                  ]).map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => update("shape", value)}
                      className={cn(
                        "py-2.5 text-sm font-medium border transition-all",
                        value === "rounded" ? "rounded-xl" : "rounded-sm",
                        settings.shape === value
                          ? "border-blue-500/60 bg-blue-500/10 text-blue-300"
                          : "border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-white/[0.16] hover:text-white"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Layout Density */}
              <section>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Layout Density</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { value: "normal"  as LayoutDensity, label: "Normal"  },
                    { value: "compact" as LayoutDensity, label: "Compact" },
                  ]).map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => update("density", value)}
                      className={cn(
                        "rounded-xl border py-2.5 text-sm font-medium transition-all",
                        settings.density === value
                          ? "border-blue-500/60 bg-blue-500/10 text-blue-300"
                          : "border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-white/[0.16] hover:text-white"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Sidebar */}
              <section>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Sidebar</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { value: "expanded"  as SidebarMode, label: "Expanded"  },
                    { value: "collapsed" as SidebarMode, label: "Collapsed" },
                  ]).map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => update("sidebar", value)}
                      className={cn(
                        "rounded-xl border py-2.5 text-sm font-medium transition-all",
                        settings.sidebar === value
                          ? "border-blue-500/60 bg-blue-500/10 text-blue-300"
                          : "border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-white/[0.16] hover:text-white"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Animations toggle */}
              <section>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Animations</span>
                  <button
                    onClick={() => update("animations", !settings.animations)}
                    className={cn(
                      "relative h-6 w-11 rounded-full transition-colors",
                      settings.animations ? "bg-blue-500" : "bg-white/[0.12]"
                    )}
                  >
                    <div className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                      settings.animations ? "translate-x-5" : "translate-x-0.5"
                    )} />
                  </button>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="border-t border-white/[0.08] p-4">
              <button
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] py-2.5 text-sm font-medium text-slate-400 transition hover:border-white/20 hover:text-white"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset to Defaults
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
