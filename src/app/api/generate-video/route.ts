import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// Mark this route as dynamic to prevent static generation
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Helper function to save base64 image
async function saveBase64Image(base64Data: string, filename: string): Promise<string> {
  // Remove data URL prefix if present
  const base64 = base64Data.replace(/^data:image\/[a-z]+;base64,/, '')

  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), 'uploads')
  try {
    await mkdir(uploadsDir, { recursive: true })
  } catch (error) {
    // Directory might already exist, ignore error
    console.log('Uploads directory creation:', error)
  }

  // Generate unique filename
  const uniqueFilename = `${Date.now()}-${filename}`
  const filePath = path.join(uploadsDir, uniqueFilename)

  // Convert base64 to buffer and save
  const buffer = Buffer.from(base64, 'base64')
  await writeFile(filePath, buffer)

  return `/uploads/${uniqueFilename}`
}

// Placeholder function for AI video generation
// Replace with actual AI API integration (OpenAI Sora, Runway, etc.)
async function generateVideoWithAI(imagePath: string, prompt: string): Promise<string> {
  // This is a placeholder - replace with actual AI API call
  // For now, we'll simulate a delay and return a mock video URL
  await new Promise(resolve => setTimeout(resolve, 3000))

  // Mock video generation - in real implementation, this would:
  // 1. Upload image to AI service
  // 2. Send prompt to generate video
  // 3. Return the generated video URL

  // For demo purposes, return a placeholder video URL
  return `https://example.com/generated-video-${Date.now()}.mp4`
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
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

    // Check usage limits
    if (user.videosUsed >= user.videoLimit) {
      return NextResponse.json({
        error: 'Monthly video limit reached. Upgrade your plan to generate more videos.'
      }, { status: 429 })
    }

    const { image, prompt } = await request.json()

    if (!image || !prompt) {
      return NextResponse.json({
        error: 'Image and prompt are required'
      }, { status: 400 })
    }

    // Save image to local storage
    const imageUrl = await saveBase64Image(image, 'product-image.jpg')

    // Create video record in database
    const video = await db.video.create({
      data: {
        userId: user.id,
        prompt,
        imageUrl,
        status: 'PROCESSING'
      }
    })

    // Generate video asynchronously (in production, this would be a background job)
    try {
      const videoUrl = await generateVideoWithAI(imageUrl, prompt)

      // Update video record with completed status
      await db.video.update({
        where: { id: video.id },
        data: {
          videoUrl,
          status: 'COMPLETED'
        }
      })

      // Update user's video usage count
      await db.user.update({
        where: { id: user.id },
        data: {
          videosUsed: { increment: 1 }
        }
      })

      return NextResponse.json({
        success: true,
        videoId: video.id,
        videoUrl
      })
    } catch (error) {
      // Update video status to failed
      await db.video.update({
        where: { id: video.id },
        data: { status: 'FAILED' }
      })

      return NextResponse.json({
        error: 'Video generation failed. Please try again.'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Video generation error:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}
