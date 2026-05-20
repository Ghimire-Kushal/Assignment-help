import { DashboardPageView } from "@/components/dashboard/DashboardViews";

export default function DownloadsPage() {
  return (
    <DashboardPageView
      title="Downloads"
      description="Placeholder file hub for completed assignments, drafts, receipts, and source packs."
      stats={[
        { label: "Files", value: "28", detail: "Available now", tone: "blue" },
        { label: "Finals", value: "9", detail: "Delivered outputs", tone: "green" },
        { label: "Drafts", value: "11", detail: "Version history", tone: "purple" },
        { label: "Receipts", value: "8", detail: "Billing records", tone: "amber" },
      ]}
      rows={[
        { title: "Research-paper-final.docx", description: "Final submission pack for ENX-1048.", meta: "DOCX" },
        { title: "case-study-sources.zip", description: "Annotated references and reading notes.", meta: "ZIP" },
        { title: "invoice-3321.pdf", description: "Payment receipt and service summary.", meta: "PDF" },
      ]}
    />
  );
}

