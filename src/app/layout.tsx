import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { UserSyncProvider } from "@/components/providers/user-sync-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GHL UGC Video Generator",
  description: "1-click AI videos for GoHighLevel agencies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    >
      <html lang="en" className="dark">
        <body className={inter.className}>
          <UserSyncProvider>
            {children}
          </UserSyncProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}