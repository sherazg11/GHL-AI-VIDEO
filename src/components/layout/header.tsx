"use client"

import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
            GHL UGC Video
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/history"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            History
          </Link>
          <Link
            href="/profile"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Profile
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
            GHL UGC Video
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#features"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Testimonials
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
