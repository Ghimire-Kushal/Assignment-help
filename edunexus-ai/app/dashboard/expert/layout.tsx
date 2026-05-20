import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function ExpertDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="student">{children}</DashboardShell>;
}
