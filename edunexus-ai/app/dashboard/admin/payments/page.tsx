import { DashboardPageView } from "@/components/dashboard/DashboardViews";

export default function AdminPaymentsPage() {
  return (
    <DashboardPageView
      title="Payments"
      description="Mock finance dashboard for revenue, failed payments, refunds, payouts, and reconciliation."
      stats={[
        { label: "Revenue", value: "$42.8k", detail: "Month to date", tone: "green" },
        { label: "Pending", value: "$6.4k", detail: "Milestone holds", tone: "amber" },
        { label: "Refunds", value: "$910", detail: "3 requests", tone: "purple" },
        { label: "Payouts", value: "$18.2k", detail: "Expert payments", tone: "blue" },
      ]}
      rows={[
        { title: "INV-8812 Enterprise batch", description: "Bulk order payment received by card.", meta: "Paid" },
        { title: "Refund RF-220", description: "Partial refund request for missed milestone.", meta: "Review" },
        { title: "Expert payout batch", description: "Weekly payout file generated for finance.", meta: "Ready" },
      ]}
    />
  );
}

