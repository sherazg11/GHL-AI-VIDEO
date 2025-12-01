import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { UsageCard } from "@/components/dashboard/usage-card";
import { HistoryTable } from "@/components/dashboard/history-table";
import VideoForm from "./VideoForm";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Create and manage your AI-generated UGC videos
          </p>
        </div>

        {/* Usage Stats */}
        <div className="mb-10 sm:mb-12">
          <UsageCard />
        </div>

        {/* Video Generation Form */}
        <div className="mb-12 sm:mb-16">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">Create New Video</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Upload a product image and description to generate a professional UGC video
            </p>
          </div>
          <VideoForm />
        </div>

        {/* Recent Videos */}
        <div>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">Recent Videos</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              View and download your previously generated videos
            </p>
          </div>
          <HistoryTable />
        </div>
      </div>
    </DashboardLayout>
  );
}