import { DashboardPageView } from "@/components/dashboard/DashboardViews";

export default function ActivityLogsPage() {
  return (
    <DashboardPageView
      title="Activity Logs"
      description="Audit trail placeholder for admin actions, status changes, exports, uploads, and security events."
      stats={[
        { label: "Events", value: "8,921", detail: "Last 30 days", tone: "blue" },
        { label: "Admin Actions", value: "612", detail: "Role scoped", tone: "purple" },
        { label: "Warnings", value: "19", detail: "Policy checks", tone: "amber" },
        { label: "Resolved", value: "98%", detail: "Event coverage", tone: "green" },
      ]}
      rows={[
        { title: "Order ENX-2049 reassigned", description: "Maya Thompson changed expert owner.", meta: "Today" },
        { title: "Finance export generated", description: "Payment CSV prepared for reconciliation.", meta: "Today" },
        { title: "Support ticket status updated", description: "SUP-881 moved from urgent to waiting.", meta: "Yesterday" },
      ]}
    />
  );
}

