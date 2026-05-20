import { DashboardPageView } from "@/components/dashboard/DashboardViews";

export default function CreateRequestPage() {
  return (
    <DashboardPageView
      title="Create Request"
      description="A backend-free request builder placeholder for assignment details, deadlines, files, and AI suggestions."
      stats={[
        { label: "Templates", value: "9", detail: "Essay, report, code, more", tone: "blue" },
        { label: "Saved Drafts", value: "3", detail: "Ready to finish", tone: "amber" },
        { label: "Avg. Quote", value: "14m", detail: "Mock response time", tone: "green" },
        { label: "AI Checks", value: "24", detail: "Outline prompts used", tone: "purple" },
      ]}
      rows={[
        { title: "Upload assignment brief", description: "Collect requirements, rubric, word count, and citation style.", meta: "Step 1" },
        { title: "Choose expert level", description: "Compare standard, advanced, and premium mock tiers.", meta: "Step 2" },
        { title: "Review generated outline", description: "AI Assistant can prepare a starting structure before checkout.", meta: "Step 3" },
      ]}
    />
  );
}

