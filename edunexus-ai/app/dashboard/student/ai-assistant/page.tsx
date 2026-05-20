import { DashboardPageView } from "@/components/dashboard/DashboardViews";

export default function AIAssistantPage() {
  return (
    <DashboardPageView
      title="AI Assistant"
      description="Mock AI workspace for outlines, citations, brief checks, study plans, and request preparation."
      stats={[
        { label: "Prompts", value: "64", detail: "This month", tone: "purple" },
        { label: "Outlines", value: "14", detail: "Saved to requests", tone: "blue" },
        { label: "Citations", value: "92", detail: "Formatted examples", tone: "green" },
        { label: "Checks", value: "21", detail: "Rubric scans", tone: "amber" },
      ]}
      rows={[
        { title: "Generate an essay outline", description: "Build sections from a prompt, rubric, and reading list.", meta: "Tool" },
        { title: "Check assignment brief", description: "Extract deliverables, deadlines, formatting, and risks.", meta: "Tool" },
        { title: "Citation helper", description: "Create mock APA, MLA, Harvard, or Chicago examples.", meta: "Tool" },
      ]}
    />
  );
}

