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

// Runway ML API integration for video generation
async function generateVideoWithAI(imageBase64: string, prompt: string): Promise<string> {
  const RUNWAY_API_KEY = process.env.RUNWAY_API_KEY || 'key_f0ed6339b82188a01266836952ae8fcad8a4ba80d8d8f4b1b29cb5d554383b0860b02c22a40c2f8d70911c9812217ddc12b0df3666f497733847a8e896eb8f41'
  const RUNWAY_API_URL = 'https://api.runwayml.com/v1'

  try {
    // Try different Runway ML API endpoints based on common patterns
    // First, try the generations endpoint
    let generationResponse = await fetch(`${RUNWAY_API_URL}/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RUNWAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gen3a_turbo',
        prompt: prompt,
        image: imageBase64,
        duration: 5,
        aspect_ratio: '16:9',
      }),
    })

    // If that fails, try alternative endpoint structure
    if (!generationResponse.ok && generationResponse.status === 404) {
      generationResponse = await fetch(`${RUNWAY_API_URL}/video/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RUNWAY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          image: imageBase64,
        }),
      })
    }

    if (!generationResponse.ok) {
      const errorText = await generationResponse.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText || generationResponse.statusText }
      }
      throw new Error(errorData.error?.message || errorData.message || `Runway API error: ${generationResponse.status} ${generationResponse.statusText}`)
    }

    const generationData = await generationResponse.json()
    
    // Handle different response formats
    const generationId = generationData.id || generationData.generation_id || generationData.generationId
    
    // If video URL is returned directly
    if (generationData.video_url || generationData.videoUrl || generationData.url) {
      return generationData.video_url || generationData.videoUrl || generationData.url
    }
    
    if (generationData.output && (Array.isArray(generationData.output) ? generationData.output[0] : generationData.output)) {
      const output = Array.isArray(generationData.output) ? generationData.output[0] : generationData.output
      return typeof output === 'string' ? output : output.url || output.video_url
    }
    
    // If status indicates processing, poll for completion
    if (generationId && (generationData.status === 'pending' || generationData.status === 'processing' || generationData.status === 'queued')) {
      let attempts = 0
      const maxAttempts = 60 // 5 minutes max (5 second intervals)
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000)) // Wait 5 seconds
        
        const statusResponse = await fetch(`${RUNWAY_API_URL}/generations/${generationId}`, {
          headers: {
            'Authorization': `Bearer ${RUNWAY_API_KEY}`,
          },
        })
        
        if (!statusResponse.ok) {
          // Try alternative status endpoint
          const altStatusResponse = await fetch(`${RUNWAY_API_URL}/video/generations/${generationId}`, {
            headers: {
              'Authorization': `Bearer ${RUNWAY_API_KEY}`,
            },
          })
          
          if (!altStatusResponse.ok) {
            throw new Error('Failed to check generation status')
          }
          
          const statusData = await altStatusResponse.json()
          
          if (statusData.status === 'completed' || statusData.status === 'succeeded') {
            return statusData.video_url || statusData.videoUrl || statusData.output || statusData.url
          }
          
          if (statusData.status === 'failed' || statusData.status === 'error') {
            throw new Error(statusData.error?.message || statusData.message || 'Video generation failed')
          }
          
          attempts++
          continue
        }
        
        const statusData = await statusResponse.json()
        
        if (statusData.status === 'completed' || statusData.status === 'succeeded') {
          return statusData.video_url || statusData.videoUrl || statusData.output || statusData.url
        }
        
        if (statusData.status === 'failed' || statusData.status === 'error') {
          throw new Error(statusData.error?.message || statusData.message || 'Video generation failed')
        }
        
        attempts++
      }
      
      throw new Error('Video generation timed out after 5 minutes')
    }
    
    throw new Error('No video URL returned from Runway API. Response: ' + JSON.stringify(generationData))
    
  } catch (error) {
    console.error('Runway ML API error:', error)
    throw error instanceof Error ? error : new Error('Failed to generate video with Runway ML')
  }
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

    // Save image to local storage for reference
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

    // Generate video asynchronously using Runway ML API
    try {
      // Pass base64 image directly to Runway ML
      const videoUrl = await generateVideoWithAI(image, prompt)

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

      const errorMessage = error instanceof Error ? error.message : 'Video generation failed. Please try again.'
      console.error('Video generation error:', error)

      return NextResponse.json({
        error: errorMessage
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Video generation error:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}
