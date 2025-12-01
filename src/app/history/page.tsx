import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { HistoryTable } from "@/components/dashboard/history-table";
import { UsageCard } from "@/components/dashboard/usage-card";

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Video History
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            View and manage all your generated UGC videos
          </p>
        </div>

        {/* Usage Stats */}
        <div className="mb-10 sm:mb-12">
          <UsageCard />
        </div>

        {/* History Table */}
        <HistoryTable />
      </div>
    </DashboardLayout>
  );
}
