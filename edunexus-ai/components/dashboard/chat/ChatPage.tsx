"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Check, CheckCheck, Paperclip, Search,
  Send, SmilePlus, MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/dashboard/widgets/EmptyState";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  body: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  timestamp: Date;
  readBy: string[];
  attachments?: { name: string; size: string; type: string }[];
  isSystem?: boolean;
}

interface Conversation {
  id: string;
  orderId: string;
  orderNumber: string;
  subject: string;
  participant: { id: string; name: string; initials: string; role: string; online: boolean };
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const ME = { id: "student-1", name: "Aarav Sharma", initials: "AS" };

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    orderId: "1",
    orderNumber: "EDU-00012",
    subject: "Business Ethics Case Study",
    participant: { id: "expert-1", name: "Dr. Marcus Ellis", initials: "ME", role: "Expert", online: true },
    lastMessage: "I've reviewed the rubric. A few questions about the sample size.",
    lastTime: "8m ago",
    unread: 2,
    messages: [
      { id: "m1", body: "Hi! I've been assigned to your Business Ethics case study.", senderId: "expert-1", senderName: "Dr. Marcus Ellis", senderInitials: "ME", timestamp: new Date(Date.now() - 3600000 * 5), readBy: ["student-1", "expert-1"] },
      { id: "m2", body: "Great! Can you let me know your estimated timeline?", senderId: "student-1", senderName: "Aarav Sharma", senderInitials: "AS", timestamp: new Date(Date.now() - 3600000 * 4), readBy: ["student-1", "expert-1"] },
      { id: "m3", body: "I'm planning to submit the first draft within 48 hours. I'll cover the ethical frameworks in Chapter 1 first.", senderId: "expert-1", senderName: "Dr. Marcus Ellis", senderInitials: "ME", timestamp: new Date(Date.now() - 3600000 * 3), readBy: ["student-1", "expert-1"] },
      { id: "m4", body: "I've reviewed the rubric. A few questions about the sample size.", senderId: "expert-1", senderName: "Dr. Marcus Ellis", senderInitials: "ME", timestamp: new Date(Date.now() - 600000), readBy: ["expert-1"] },
      { id: "m5", body: "Also, do you want me to include primary sources only or can I use secondary references?", senderId: "expert-1", senderName: "Dr. Marcus Ellis", senderInitials: "ME", timestamp: new Date(Date.now() - 500000), readBy: ["expert-1"] },
    ],
  },
  {
    id: "c2",
    orderId: "2",
    orderNumber: "EDU-00011",
    subject: "Quantum Computing Research",
    participant: { id: "expert-2", name: "Prof. Sarah Chen", initials: "SC", role: "Expert", online: false },
    lastMessage: "The paper is ready for your review.",
    lastTime: "34m ago",
    unread: 0,
    messages: [
      { id: "m6", body: "Your quantum computing research paper has been completed. Please review the attached draft.", senderId: "expert-2", senderName: "Prof. Sarah Chen", senderInitials: "SC", timestamp: new Date(Date.now() - 2000000), readBy: ["student-1", "expert-2"] },
      { id: "m7", body: "The paper is ready for your review.", senderId: "expert-2", senderName: "Prof. Sarah Chen", senderInitials: "SC", timestamp: new Date(Date.now() - 1800000), readBy: ["student-1", "expert-2"], attachments: [{ name: "quantum_computing_final.pdf", size: "2.4 MB", type: "pdf" }] },
    ],
  },
  {
    id: "c3",
    orderId: "c3",
    orderNumber: "SUPPORT",
    subject: "Support — Billing question",
    participant: { id: "admin-1", name: "Support Team", initials: "ST", role: "Admin", online: true },
    lastMessage: "We've processed your refund request.",
    lastTime: "2h ago",
    unread: 1,
    messages: [
      { id: "m8", body: "Hello! How can we help you today?", senderId: "admin-1", senderName: "Support Team", senderInitials: "ST", timestamp: new Date(Date.now() - 7200000), readBy: ["student-1", "admin-1"], isSystem: false },
      { id: "m9", body: "We've processed your refund request.", senderId: "admin-1", senderName: "Support Team", senderInitials: "ST", timestamp: new Date(Date.now() - 7000000), readBy: ["admin-1"] },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function MessageBubble({ msg, isMe }: { msg: Message; isMe: boolean }) {
  const time = msg.timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  if (msg.isSystem) {
    return (
      <div className="flex justify-center">
        <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1 text-xs text-slate-500">
          {msg.body}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-end gap-2", isMe ? "flex-row-reverse" : "flex-row")}
    >
      {!isMe && (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white">
          {msg.senderInitials}
        </div>
      )}
      <div className={cn("max-w-[75%] space-y-1", isMe ? "items-end" : "items-start")}>
        {!isMe && (
          <p className="px-1 text-[11px] text-slate-500">{msg.senderName}</p>
        )}
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isMe
              ? "rounded-br-sm bg-blue-600 text-white"
              : "rounded-bl-sm bg-white/[0.07] text-slate-100"
          )}
        >
          {msg.body}
          {msg.attachments?.map((att) => (
            <div
              key={att.name}
              className={cn(
                "mt-2 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs",
                isMe ? "border-white/20 bg-blue-700/40" : "border-white/[0.08] bg-white/[0.05]"
              )}
            >
              <Paperclip className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{att.name}</span>
              <span className="flex-shrink-0 opacity-60">{att.size}</span>
            </div>
          ))}
        </div>
        <div className={cn("flex items-center gap-1 px-1", isMe ? "flex-row-reverse" : "flex-row")}>
          <span className="text-[10px] text-slate-600">{time}</span>
          {isMe && (
            msg.readBy.length > 1
              ? <CheckCheck className="h-3 w-3 text-blue-400" />
              : <Check className="h-3 w-3 text-slate-500" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ConversationItem({
  conv,
  isActive,
  onClick,
}: {
  conv: Conversation;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors",
        isActive ? "bg-blue-600/15 border border-blue-500/20" : "hover:bg-white/[0.04]"
      )}
    >
      <div className="relative flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-xs font-bold text-white">
          {conv.participant.initials}
        </div>
        {conv.participant.online && (
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#070912] bg-emerald-500" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1">
          <p className="truncate text-sm font-medium text-white">{conv.participant.name}</p>
          <span className="flex-shrink-0 text-[11px] text-slate-500">{conv.lastTime}</span>
        </div>
        <p className="text-[11px] text-blue-400/70">{conv.orderNumber}</p>
        <p className="mt-0.5 truncate text-xs text-slate-500">{conv.lastMessage}</p>
      </div>
      {conv.unread > 0 && (
        <div className="flex h-5 min-w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
          {conv.unread}
        </div>
      )}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeConv = conversations.find((c) => c.id === activeId);

  const filteredConvs = conversations.filter(
    (c) =>
      c.participant.name.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase()) ||
      c.orderNumber.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, activeConv?.messages.length]);

  const simulateTyping = useCallback(() => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  }, []);

  function sendMessage() {
    if (!draft.trim() || !activeId) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      body: draft.trim(),
      senderId: ME.id,
      senderName: ME.name,
      senderInitials: ME.initials,
      timestamp: new Date(),
      readBy: [ME.id],
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: draft.trim(), lastTime: "now" }
          : c
      )
    );
    setDraft("");
    simulateTyping();

    // Mock reply after 2.5s
    setTimeout(() => {
      const replies = [
        "Got it, I'll work on that right away.",
        "Thanks for the clarification! I'll update the draft accordingly.",
        "Understood. I'll have the revisions ready within a few hours.",
      ];
      const reply: Message = {
        id: `m-reply-${Date.now()}`,
        body: replies[Math.floor(Math.random() * replies.length)],
        senderId: activeConv!.participant.id,
        senderName: activeConv!.participant.name,
        senderInitials: activeConv!.participant.initials,
        timestamp: new Date(),
        readBy: [activeConv!.participant.id],
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? { ...c, messages: [...c.messages, reply], lastMessage: reply.body, lastTime: "now" }
            : c
        )
      );
    }, 2500);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-white/[0.07]">
      {/* Sidebar */}
      <AnimatePresence>
        {(showSidebar || !activeId) && (
          <motion.div
            initial={activeId ? { x: -300, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex flex-col border-r border-white/[0.07] bg-[#0b1020]",
              activeId ? "absolute inset-y-0 left-0 z-10 w-80 lg:relative lg:z-auto lg:w-72" : "w-full lg:w-72"
            )}
          >
            <div className="border-b border-white/[0.07] p-4">
              <h2 className="mb-3 text-sm font-semibold text-white">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 w-full rounded-lg border border-white/[0.08] bg-white/[0.04] pl-8 pr-3 text-xs text-white placeholder:text-slate-500 focus:border-blue-500/30 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredConvs.length === 0 ? (
                <p className="p-4 text-center text-xs text-slate-500">No conversations found.</p>
              ) : (
                filteredConvs.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conv={conv}
                    isActive={activeId === conv.id}
                    onClick={() => { setActiveId(conv.id); setShowSidebar(false); }}
                  />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat pane */}
      {activeConv ? (
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/[0.07] bg-[#0b1020]/60 px-4 py-3">
            <button
              onClick={() => setShowSidebar(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/[0.06] lg:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-xs font-bold text-white">
                {activeConv.participant.initials}
              </div>
              {activeConv.participant.online && (
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-[#0b1020] bg-emerald-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{activeConv.participant.name}</p>
              <p className="text-[11px] text-slate-500">
                {activeConv.participant.online ? "Online now" : "Offline"} · {activeConv.orderNumber}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {activeConv.messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                isMe={msg.senderId === ME.id}
              />
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white">
                  {activeConv.participant.initials}
                </div>
                <div className="flex gap-1 rounded-2xl bg-white/[0.07] px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                      className="h-1.5 w-1.5 rounded-full bg-slate-400"
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/[0.07] bg-[#0b1020]/60 p-3">
            <div className="flex items-end gap-2 rounded-xl border border-white/[0.09] bg-white/[0.04] px-3 py-2">
              <button className="mb-1 flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors">
                <Paperclip className="h-4 w-4" />
              </button>
              <textarea
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message… (Enter to send)"
                rows={1}
                className="max-h-24 flex-1 resize-none bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                style={{ height: "auto" }}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = Math.min(el.scrollHeight, 96) + "px";
                }}
              />
              <button className="mb-1 flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors">
                <SmilePlus className="h-4 w-4" />
              </button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={sendMessage}
                disabled={!draft.trim()}
                className="mb-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition-opacity disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <EmptyState
            icon={<MessageSquare className="h-8 w-8" />}
            title="Select a conversation"
            description="Choose a conversation from the list to start messaging your expert or support team."
          />
        </div>
      )}
    </div>
  );
}
