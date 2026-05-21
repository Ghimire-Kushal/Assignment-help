"use client";

import { useState } from "react";
import { MessageSquare, Search } from "lucide-react";
import { EmptyState } from "@/components/dashboard/widgets/EmptyState";

export function ExpertMessages() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex h-[calc(100vh-10rem)] overflow-hidden rounded-xl border border-white/[0.07]">
      {/* Conversation list */}
      <div className="w-72 flex-shrink-0 border-r border-white/[0.07] bg-white/[0.02]">
        <div className="border-b border-white/[0.07] p-4">
          <h2 className="mb-3 text-sm font-semibold text-white">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-white/[0.09] bg-white/[0.04] pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/40 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex h-full items-center justify-center p-6 text-xs text-slate-500">
          No conversations yet
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          icon={<MessageSquare className="h-8 w-8" />}
          title="No conversation selected"
          description="Select a conversation from the left or wait for a student to message you."
        />
      </div>
    </div>
  );
}
