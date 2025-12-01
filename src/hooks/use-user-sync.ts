"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function useUserSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      // Sync user with our database
      fetch('/api/user/sync', {
        method: 'POST',
      }).catch((error) => {
        console.error('Failed to sync user:', error);
      });
    }
  }, [user, isLoaded]);
}
