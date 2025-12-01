import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// Mark this route as dynamic to prevent static generation
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get user's video history
    const videos = await db.video.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 50 // Limit to last 50 videos
    })

    return NextResponse.json({
      videos,
      user: {
        videosUsed: user.videosUsed,
        videoLimit: user.videoLimit
      }
    })
  } catch (error) {
    console.error('History fetch error:', error)
    return NextResponse.json({
      error: 'Failed to fetch history'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { videoId } = await request.json()

    if (!videoId) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 })
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Verify video belongs to user
    const video = await db.video.findFirst({
      where: {
        id: videoId,
        userId: user.id
      }
    })

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    // Delete video (soft delete by marking as failed or remove entirely)
    await db.video.delete({
      where: { id: videoId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('History delete error:', error)
    return NextResponse.json({
      error: 'Failed to delete video'
    }, { status: 500 })
  }
}
