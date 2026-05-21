import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "ScholarSync Nepal dashboard workspace.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}

