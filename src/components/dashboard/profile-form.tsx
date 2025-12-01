"use client";

import { useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function ProfileForm() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // In a real app, you would update the user profile
    // For now, we'll just simulate a successful update
    setTimeout(() => {
      setMessage("Profile updated successfully!");
      setLoading(false);
    }, 1000);
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center">
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <Image
              src={user.imageUrl}
              alt="Profile"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-medium">{user.fullName || 'User'}</h3>
              <p className="text-sm text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>

          {/* Account Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                First Name
              </Label>
              <Input
                id="firstName"
                defaultValue={user.firstName || ''}
                placeholder="Enter your first name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Last Name
              </Label>
              <Input
                id="lastName"
                defaultValue={user.lastName || ''}
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={user.primaryEmailAddress?.emailAddress || ''}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed here. Contact support if needed.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Member Since
            </Label>
            <Input
              value={user.createdAt ? formatDate(new Date(user.createdAt)) : 'N/A'}
              disabled
              className="bg-muted"
            />
          </div>

          {message && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">{message}</p>
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
