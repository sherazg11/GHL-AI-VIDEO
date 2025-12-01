import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { UsageCard } from "@/components/dashboard/usage-card";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        {/* Usage Stats */}
        <div className="mb-8">
          <UsageCard />
        </div>

        {/* Profile Form */}
        <div className="max-w-2xl">
          <ProfileForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
