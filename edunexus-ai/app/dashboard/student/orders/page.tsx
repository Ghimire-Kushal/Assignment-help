import { DashboardPageView } from "@/components/dashboard/DashboardViews";

export default function MyOrdersPage() {
  return (
    <DashboardPageView
      title="My Orders"
      description="Track academic requests, delivery status, revisions, and assigned experts with placeholder order data."
      stats={[
        { label: "In Progress", value: "4", detail: "2 drafts due soon", tone: "blue" },
        { label: "Under Review", value: "2", detail: "Awaiting your notes", tone: "purple" },
        { label: "Completed", value: "18", detail: "This academic year", tone: "green" },
        { label: "Drafts", value: "3", detail: "Saved requests", tone: "amber" },
      ]}
      rows={[
        { title: "ENX-1048 Research methodology paper", description: "2,500 words with APA references.", meta: "Review" },
        { title: "ENX-1042 Economics case study", description: "Expert assigned and gathering sources.", meta: "In progress" },
        { title: "ENX-1037 Nursing reflection", description: "Final document delivered to downloads.", meta: "Complete" },
      ]}
    />
  );
}

