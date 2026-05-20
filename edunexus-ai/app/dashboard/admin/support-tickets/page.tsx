import { DashboardPageView } from "@/components/dashboard/DashboardViews";

export default function SupportTicketsPage() {
  return (
    <DashboardPageView
      title="Support Tickets"
      description="Placeholder support desk for student issues, expert escalations, refund requests, and SLA tracking."
      stats={[
        { label: "Open", value: "37", detail: "6 urgent", tone: "amber" },
        { label: "Assigned", value: "21", detail: "With agents", tone: "blue" },
        { label: "Resolved", value: "186", detail: "This month", tone: "green" },
        { label: "SLA Risk", value: "4", detail: "Needs action", tone: "purple" },
      ]}
      rows={[
        { title: "SUP-881 Deadline extension", description: "Student requested revised delivery timing.", meta: "Urgent" },
        { title: "SUP-876 File access issue", description: "Download link not visible on completed order.", meta: "Open" },
        { title: "SUP-864 Expert clarification", description: "Support awaiting student confirmation.", meta: "Waiting" },
      ]}
    />
  );
}

