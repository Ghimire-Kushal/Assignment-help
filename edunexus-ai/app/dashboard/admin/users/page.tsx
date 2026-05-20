import { DashboardPageView } from "@/components/dashboard/DashboardViews";

export default function ManageUsersPage() {
  return (
    <DashboardPageView
      title="Manage Users"
      description="Mock user administration for students, experts, support agents, roles, and account health."
      stats={[
        { label: "Students", value: "2,418", detail: "+224 this month", tone: "green" },
        { label: "Experts", value: "184", detail: "26 online", tone: "blue" },
        { label: "Admins", value: "12", detail: "Role protected", tone: "purple" },
        { label: "Flagged", value: "7", detail: "Needs review", tone: "amber" },
      ]}
      rows={[
        { title: "Aarav Sharma", description: "Student account with 4 active orders.", meta: "Active" },
        { title: "Dr. Nina Patel", description: "Expert profile specializing in business research.", meta: "Verified" },
        { title: "Support Agent Team A", description: "Shared queue access for first-response support.", meta: "Team" },
      ]}
    />
  );
}

