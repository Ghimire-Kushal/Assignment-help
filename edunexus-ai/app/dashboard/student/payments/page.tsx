import { DashboardPageView } from "@/components/dashboard/DashboardViews";

export default function StudentPaymentsPage() {
  return (
    <DashboardPageView
      title="Payments"
      description="Mock billing area for invoices, receipts, credits, refunds, and upcoming payment milestones."
      stats={[
        { label: "Paid", value: "$840", detail: "Current semester", tone: "green" },
        { label: "Due", value: "$120", detail: "One milestone", tone: "amber" },
        { label: "Credits", value: "$45", detail: "Available balance", tone: "blue" },
        { label: "Receipts", value: "16", detail: "Download ready", tone: "purple" },
      ]}
      rows={[
        { title: "INV-3321 Research methodology", description: "Milestone 2 payment confirmed.", meta: "Paid" },
        { title: "INV-3315 Economics case study", description: "Final milestone pending approval.", meta: "Due" },
        { title: "Credit adjustment", description: "Loyalty credit added to account.", meta: "$45" },
      ]}
    />
  );
}

