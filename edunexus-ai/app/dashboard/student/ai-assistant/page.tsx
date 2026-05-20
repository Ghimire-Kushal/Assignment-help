import { Suspense } from "react";
import { AIToolsPage } from "@/components/dashboard/ai/AIToolsPage";

export default function AIAssistantPage() {
  return (
    <Suspense fallback={<div className="animate-pulse h-96 rounded-xl bg-white/[0.04]" />}>
      <AIToolsPage />
    </Suspense>
  );
}
