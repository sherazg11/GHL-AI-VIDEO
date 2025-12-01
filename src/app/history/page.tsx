import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { HistoryTable } from "@/components/dashboard/history-table";
import { UsageCard } from "@/components/dashboard/usage-card";

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Video History
          </h1>
          <p className="text-muted-foreground">
            View and manage all your generated UGC videos
          </p>
        </div>

        {/* Usage Stats */}
        <div className="mb-8">
          <UsageCard />
        </div>

        {/* History Table */}
        <HistoryTable />
      </div>
    </DashboardLayout>
  );
}
