"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, File, FileText, Image, Archive, X, Download,
  Eye, Trash2, Search, FolderOpen, Clock, CheckCircle,
  AlertCircle, Grid3X3, List,
} from "lucide-react";

type FileCategory = "all" | "finals" | "drafts" | "sources" | "receipts";
type ViewMode = "grid" | "list";

interface ManagedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  category: FileCategory;
  orderNumber: string;
  uploadedAt: string;
  status: "ready" | "processing" | "error";
  version?: number;
}

const MOCK_FILES: ManagedFile[] = [
  { id: "f1",  name: "research-paper-final.docx",    type: "docx", size: "124 KB", category: "finals",   orderNumber: "ENX-1048", uploadedAt: "2026-05-18", status: "ready",      version: 3  },
  { id: "f2",  name: "case-study-sources.zip",        type: "zip",  size: "2.1 MB", category: "sources",  orderNumber: "ENX-1048", uploadedAt: "2026-05-17", status: "ready"                     },
  { id: "f3",  name: "invoice-3321.pdf",              type: "pdf",  size: "48 KB",  category: "receipts", orderNumber: "ENX-1045", uploadedAt: "2026-05-15", status: "ready"                     },
  { id: "f4",  name: "essay-draft-v2.docx",           type: "docx", size: "88 KB",  category: "drafts",   orderNumber: "ENX-1052", uploadedAt: "2026-05-20", status: "ready",      version: 2  },
  { id: "f5",  name: "psychology-final-submission.pdf",type: "pdf", size: "210 KB", category: "finals",   orderNumber: "ENX-1044", uploadedAt: "2026-05-10", status: "ready",      version: 1  },
  { id: "f6",  name: "reference-notes.txt",           type: "txt",  size: "12 KB",  category: "sources",  orderNumber: "ENX-1050", uploadedAt: "2026-05-16", status: "ready"                     },
  { id: "f7",  name: "lab-report-annotated.pdf",      type: "pdf",  size: "340 KB", category: "finals",   orderNumber: "ENX-1049", uploadedAt: "2026-05-12", status: "ready",      version: 1  },
  { id: "f8",  name: "essay-draft-v1.docx",           type: "docx", size: "75 KB",  category: "drafts",   orderNumber: "ENX-1052", uploadedAt: "2026-05-19", status: "ready",      version: 1  },
  { id: "f9",  name: "payment-receipt-3299.pdf",      type: "pdf",  size: "32 KB",  category: "receipts", orderNumber: "ENX-1044", uploadedAt: "2026-05-10", status: "ready"                     },
  { id: "f10", name: "dissertation-chapter1.docx",    type: "docx", size: "195 KB", category: "drafts",   orderNumber: "ENX-1048", uploadedAt: "2026-05-21", status: "processing"                },
];

const EXT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf:  FileText,
  docx: FileText,
  txt:  FileText,
  zip:  Archive,
  png:  Image,
  jpg:  Image,
};

const EXT_COLORS: Record<string, string> = {
  pdf:  "text-red-400 bg-red-400/10",
  docx: "text-blue-400 bg-blue-400/10",
  txt:  "text-slate-400 bg-slate-400/10",
  zip:  "text-amber-400 bg-amber-400/10",
  png:  "text-green-400 bg-green-400/10",
  jpg:  "text-green-400 bg-green-400/10",
};

const CATEGORIES: { key: FileCategory; label: string }[] = [
  { key: "all",      label: "All Files"    },
  { key: "finals",   label: "Finals"       },
  { key: "drafts",   label: "Drafts"       },
  { key: "sources",  label: "Sources"      },
  { key: "receipts", label: "Receipts"     },
];

interface UploadItem {
  id: string;
  name: string;
  progress: number;
  done: boolean;
}

export function FileManager() {
  const [files, setFiles]           = useState<ManagedFile[]>(MOCK_FILES);
  const [category, setCategory]     = useState<FileCategory>("all");
  const [search, setSearch]         = useState("");
  const [view, setView]             = useState<ViewMode>("grid");
  const [dragging, setDragging]     = useState(false);
  const [uploads, setUploads]       = useState<UploadItem[]>([]);
  const [previewFile, setPreview]   = useState<ManagedFile | null>(null);
  const fileInputRef                = useRef<HTMLInputElement>(null);

  const filtered = files.filter(f => {
    const matchCat = category === "all" || f.category === category;
    const matchSrc = f.name.toLowerCase().includes(search.toLowerCase()) ||
                     f.orderNumber.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSrc;
  });

  const simulateUpload = useCallback((fileList: FileList) => {
    const newUploads: UploadItem[] = Array.from(fileList).map(f => ({
      id:       Math.random().toString(36).slice(2),
      name:     f.name,
      progress: 0,
      done:     false,
    }));
    setUploads(prev => [...prev, ...newUploads]);

    newUploads.forEach(u => {
      let prog = 0;
      const interval = setInterval(() => {
        prog += Math.random() * 22 + 8;
        if (prog >= 100) {
          prog = 100;
          clearInterval(interval);
          setUploads(prev => prev.map(item => item.id === u.id ? { ...item, progress: 100, done: true } : item));
          setTimeout(() => {
            setUploads(prev => prev.filter(item => item.id !== u.id));
          }, 1800);
        } else {
          setUploads(prev => prev.map(item => item.id === u.id ? { ...item, progress: prog } : item));
        }
      }, 200);
    });
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) simulateUpload(e.dataTransfer.files);
  }, [simulateUpload]);

  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));

  const FileIcon = ({ type, size = "w-5 h-5" }: { type: string; size?: string }) => {
    const Icon  = EXT_ICONS[type] ?? File;
    const color = EXT_COLORS[type] ?? "text-slate-400 bg-slate-400/10";
    return (
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className={size} />
      </div>
    );
  };

  const StatusIcon = ({ status }: { status: ManagedFile["status"] }) => {
    if (status === "processing") return <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "2s" }} />;
    if (status === "error")      return <AlertCircle className="w-3.5 h-3.5 text-red-400" />;
    return <CheckCircle className="w-3.5 h-3.5 text-green-400" />;
  };

  const stats = [
    { label: "Total Files", value: files.length.toString(),                                          color: "text-blue-400"   },
    { label: "Finals",      value: files.filter(f => f.category === "finals").length.toString(),     color: "text-green-400"  },
    { label: "Drafts",      value: files.filter(f => f.category === "drafts").length.toString(),     color: "text-purple-400" },
    { label: "Receipts",    value: files.filter(f => f.category === "receipts").length.toString(),   color: "text-amber-400"  },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">File Manager</h1>
          <p className="text-slate-400 text-sm mt-0.5">Your documents, drafts, receipts and source packs</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
        >
          <Upload className="w-4 h-4" /> Upload Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={e => e.target.files && simulateUpload(e.target.files)}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          dragging
            ? "border-blue-500 bg-blue-500/10"
            : "border-white/[0.08] hover:border-blue-500/40 hover:bg-white/[0.02]"
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
          <Upload className={`w-6 h-6 ${dragging ? "text-blue-400 scale-110" : "text-blue-500"} transition-transform`} />
        </div>
        <p className="text-white font-medium">Drop files here or click to upload</p>
        <p className="text-slate-500 text-sm mt-1">PDF, DOCX, TXT, ZIP, images — up to 50 MB each</p>
      </div>

      {/* Upload progress toasts */}
      <AnimatePresence>
        {uploads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-2"
          >
            {uploads.map(u => (
              <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                <FolderOpen className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{u.name}</p>
                  <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-blue-500"
                      animate={{ width: `${u.progress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>
                {u.done
                  ? <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  : <span className="text-xs text-slate-500 flex-shrink-0">{Math.round(u.progress)}%</span>
                }
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                category === c.key
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white/[0.04] text-slate-400 hover:text-white"
              }`}
            >
              {c.label}
              {c.key !== "all" && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({files.filter(f => f.category === c.key).length})
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search files…"
              className="pl-8 pr-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-slate-500 text-sm outline-none focus:border-blue-500/50 transition-colors w-44"
            />
          </div>
          <div className="flex gap-1 p-1 rounded-lg bg-white/[0.04]">
            <button onClick={() => setView("grid")}
              className={`p-1.5 rounded-md transition-all ${view === "grid" ? "bg-white/[0.1] text-white" : "text-slate-500 hover:text-white"}`}>
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setView("list")}
              className={`p-1.5 rounded-md transition-all ${view === "list" ? "bg-white/[0.1] text-white" : "text-slate-500 hover:text-white"}`}>
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* File grid / list */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((file, i) => (
              <motion.div
                key={file.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04 }}
                className="group p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.05] transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <FileIcon type={file.type} />
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setPreview(file)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-green-400 hover:bg-green-400/10 transition-all">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => removeFile(file.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-white text-sm font-medium truncate">{file.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">{file.orderNumber} · {file.size}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-slate-600">{file.uploadedAt}</span>
                  <div className="flex items-center gap-1">
                    {file.version && (
                      <span className="text-xs text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded-md">v{file.version}</span>
                    )}
                    <StatusIcon status={file.status} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.08] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03]">
              <tr>
                {["File", "Order", "Category", "Size", "Uploaded", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((file, i) => (
                <motion.tr key={file.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-white/[0.03] transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <FileIcon type={file.type} size="w-4 h-4" />
                      <span className="text-white text-sm truncate max-w-[180px]">{file.name}</span>
                      {file.version && <span className="text-xs text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded-md">v{file.version}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-blue-400 font-mono text-sm">{file.orderNumber}</span></td>
                  <td className="px-4 py-3"><span className="text-slate-400 capitalize text-sm">{file.category}</span></td>
                  <td className="px-4 py-3"><span className="text-slate-400 text-sm">{file.size}</span></td>
                  <td className="px-4 py-3"><span className="text-slate-500 text-sm font-mono">{file.uploadedAt}</span></td>
                  <td className="px-4 py-3"><StatusIcon status={file.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setPreview(file)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-green-400 hover:bg-green-400/10 transition-all"><Download className="w-3.5 h-3.5" /></button>
                      <button onClick={() => removeFile(file.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <FolderOpen className="w-12 h-12 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">No files found</p>
          <p className="text-slate-600 text-sm mt-1">Try a different category or search term.</p>
        </div>
      )}

      {/* File Preview Modal */}
      <AnimatePresence>
        {previewFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-[#0f0f1e] border border-white/[0.1] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
                <h3 className="text-white font-semibold truncate pr-4">{previewFile.name}</h3>
                <button onClick={() => setPreview(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="aspect-video rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col items-center justify-center gap-3">
                  <FileText className="w-16 h-16 text-slate-700" />
                  <p className="text-slate-500 text-sm">
                    {previewFile.type.toUpperCase()} preview not available in demo
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["Order",    previewFile.orderNumber ],
                    ["Size",     previewFile.size        ],
                    ["Category", previewFile.category    ],
                    ["Uploaded", previewFile.uploadedAt  ],
                  ].map(([label, value]) => (
                    <div key={label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <p className="text-slate-500 text-xs mb-1">{label}</p>
                      <p className="text-white font-medium capitalize">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors">
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <button onClick={() => { removeFile(previewFile.id); setPreview(null); }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors border border-red-500/20">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
