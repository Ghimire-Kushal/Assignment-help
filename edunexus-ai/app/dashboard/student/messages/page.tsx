import { DashboardPageView } from "@/components/dashboard/DashboardViews";

export default function MessagesPage() {
  return (
    <DashboardPageView
      title="Messages"
      description="Central inbox placeholder for conversations with experts, support, and AI-generated request updates."
      stats={[
        { label: "Unread", value: "12", detail: "3 expert replies", tone: "purple" },
        { label: "Threads", value: "28", detail: "Across all orders", tone: "blue" },
        { label: "Support", value: "2", detail: "Open conversations", tone: "amber" },
        { label: "Resolved", value: "41", detail: "Archived threads", tone: "green" },
      ]}
      rows={[
        { title: "Dr. Ellis replied to ENX-1048", description: "Asked for clarification on survey sample size.", meta: "Unread" },
        { title: "Support team", description: "Confirmed deadline extension for your case study.", meta: "Open" },
        { title: "AI Assistant", description: "Prepared three thesis options for your literature review.", meta: "Saved" },
      ]}
    />
  );
}

