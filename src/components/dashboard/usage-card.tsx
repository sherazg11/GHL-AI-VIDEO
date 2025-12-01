"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Video, Zap } from "lucide-react";

interface UserUsage {
  videosUsed: number;
  videoLimit: number;
}

export function UsageCard() {
  const [usage, setUsage] = useState<UserUsage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const response = await fetch('/api/history');
        if (response.ok) {
          const data = await response.json();
          setUsage(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch usage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Usage Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!usage) return null;

  const usagePercentage = (usage.videosUsed / usage.videoLimit) * 100;
  const remainingVideos = usage.videoLimit - usage.videosUsed;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Monthly Usage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Videos Generated</span>
          <span className="font-medium">{usage.videosUsed} / {usage.videoLimit}</span>
        </div>

        <Progress value={usagePercentage} className="h-3" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {remainingVideos} videos remaining this month
            </span>
          </div>
          <div className="text-sm font-medium">
            {usagePercentage.toFixed(0)}% used
          </div>
        </div>

        {usagePercentage >= 80 && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              You're approaching your monthly limit. Consider upgrading your plan for more videos.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
