import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// Mark this route as dynamic to prevent static generation
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get detailed user info from Clerk
    const clerkUser = await currentUser()
    if (!clerkUser) {
      return NextResponse.json({ error: 'User not found in Clerk' }, { status: 404 })
    }

    // Check if user already exists in our database
    const existingUser = await db.user.findUnique({
      where: { clerkId: userId }
    })

    if (existingUser) {
      return NextResponse.json({ user: existingUser })
    }

    // Create new user in database
    const newUser = await db.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        videoLimit: 10, // Default monthly limit
        videosUsed: 0
      }
    })

    return NextResponse.json({ user: newUser })
  } catch (error) {
    console.error('User sync error:', error)
    return NextResponse.json({
      error: 'Failed to sync user'
    }, { status: 500 })
  }
}
