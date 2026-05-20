import type { Metadata } from "next";
import { LayoutDashboard, FileText, Clock, CheckCircle2, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your orders and track progress.",
};

const quickStats = [
  { label: "Active Orders", value: "0", icon: Clock, color: "text-blue-400" },
  { label: "Completed", value: "0", icon: CheckCircle2, color: "text-green-400" },
  { label: "Drafts", value: "0", icon: FileText, color: "text-purple-400" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20">
              <LayoutDashboard className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back — manage your orders here.</p>
            </div>
          </div>
          <Button variant="glow" size="md" asChild>
            <Link href="/new-order">
              <Plus className="h-4 w-4" /> New Order
            </Link>
          </Button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          {quickStats.map(({ label, value, icon: Icon, color }) => (
            <Card key={label} variant="default" padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
                </div>
                <Icon className={`h-8 w-8 ${color} opacity-80`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        <Card variant="default" padding="lg" className="text-center py-16">
          <CardHeader className="items-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20">
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
            <CardTitle>No orders yet</CardTitle>
            <CardDescription className="max-w-sm mx-auto">
              Place your first order to get expert academic assistance delivered right
              here.
            </CardDescription>
          </CardHeader>
          <div className="mt-6">
            <Button variant="glow" asChild>
              <Link href="/new-order">
                <Plus className="h-4 w-4" /> Place Your First Order
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
