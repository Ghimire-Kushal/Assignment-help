import {
  Activity,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CreditCard,
  Download,
  FileArchive,
  FileText,
  Headphones,
  Home,
  Inbox,
  MessageSquare,
  PlusCircle,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

export type DashboardRole = "student" | "admin" | "expert";

export const roleProfiles = {
  student: {
    name: "Aarav Sharma",
    email: "aarav@student.edu",
    initials: "AS",
    label: "Student Portal",
  },
  admin: {
    name: "Maya Thompson",
    email: "maya@edunexus.ai",
    initials: "MT",
    label: "Admin Console",
  },
  expert: {
    name: "Dr. Sarah Chen",
    email: "sarah.chen@edunexus.ai",
    initials: "SC",
    label: "Expert Portal",
  },
} satisfies Record<DashboardRole, {
  name: string;
  email: string;
  initials: string;
  label: string;
}>;

export const studentNavItems = [
  { title: "Overview", href: "/dashboard/student", icon: Home },
  { title: "My Orders", href: "/dashboard/student/orders", icon: FileText },
  { title: "Create Request", href: "/dashboard/student/create-request", icon: PlusCircle },
  { title: "Messages", href: "/dashboard/student/messages", icon: MessageSquare },
  { title: "Payments", href: "/dashboard/student/payments", icon: CreditCard },
  { title: "Downloads", href: "/dashboard/student/downloads", icon: Download },
  { title: "AI Assistant", href: "/dashboard/student/ai-assistant", icon: Bot },
];

export const adminNavItems = [
  { title: "Overview", href: "/dashboard/admin", icon: ShieldCheck },
  { title: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { title: "Manage Orders", href: "/dashboard/admin/orders", icon: Inbox },
  { title: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
  { title: "Support Tickets", href: "/dashboard/admin/support-tickets", icon: Headphones },
  { title: "File Manager", href: "/dashboard/admin/file-manager", icon: FileArchive },
  { title: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { title: "Activity Logs", href: "/dashboard/admin/activity-logs", icon: Activity },
];

export const notifications = [
  {
    title: "Order ENX-1048 moved to review",
    description: "Your research draft is ready for notes.",
    time: "8 min ago",
  },
  {
    title: "Payment confirmed",
    description: "Invoice INV-3321 has been marked paid.",
    time: "1 hr ago",
  },
  {
    title: "New support reply",
    description: "The writing team replied to your clarification.",
    time: "Yesterday",
  },
];

export const studentStats = [
  { label: "Active Orders", value: "4", detail: "2 due this week", tone: "blue" },
  { label: "Unread Messages", value: "12", detail: "3 from experts", tone: "purple" },
  { label: "Paid Invoices", value: "$840", detail: "Current semester", tone: "green" },
  { label: "Downloads", value: "28", detail: "Final files ready", tone: "amber" },
];

export const adminStats = [
  { label: "Open Orders", value: "128", detail: "18 urgent", tone: "blue" },
  { label: "Active Users", value: "2,418", detail: "+9.4% this month", tone: "green" },
  { label: "Revenue", value: "$42.8k", detail: "Mock MTD total", tone: "purple" },
  { label: "Tickets", value: "37", detail: "6 waiting on admin", tone: "amber" },
];

