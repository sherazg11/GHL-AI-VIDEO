import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { UsageCard } from "@/components/dashboard/usage-card";
import { HistoryTable } from "@/components/dashboard/history-table";
import VideoForm from "./VideoForm";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Create and manage your AI-generated UGC videos
          </p>
        </div>

        {/* Usage Stats */}
        <div className="mb-8">
          <UsageCard />
        </div>

        {/* Video Generation Form */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Create New Video</h2>
            <p className="text-muted-foreground">
              Upload a product image and description to generate a professional UGC video
            </p>
          </div>
          <VideoForm />
        </div>

        {/* Recent Videos */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Recent Videos</h2>
            <p className="text-muted-foreground">
              View and download your previously generated videos
            </p>
          </div>
          <HistoryTable />
        </div>
      </div>
    </DashboardLayout>
  );
}