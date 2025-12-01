# GHL UGC Video Generator

## Project Overview

**GHL UGC Video Generator** is a comprehensive Next.js web application that enables GoHighLevel agencies to create AI-generated UGC (User-Generated Content) videos with a single click. The application features a complete user dashboard, usage tracking, video history management, and a modern, responsive design optimized for both desktop and mobile devices.

## Architecture Overview

The application follows a modern full-stack React-based architecture using Next.js 16 with the App Router. It implements robust authentication via Clerk, custom API routes for video generation, and Prisma with SQLite for data persistence. The frontend uses shadcn/ui components with Tailwind CSS for a professional, responsive design.

### Key Architecture Components

- **Frontend**: Next.js 16 with React 19 and TypeScript
- **Authentication**: Clerk for user management and authentication
- **Database**: Prisma ORM with SQLite
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Video Generation**: Custom API routes with placeholder AI integration
- **State Management**: React hooks with server/client components
- **Deployment**: Vercel-ready configuration

## Tech Stack

### Core Technologies
- **Framework**: Next.js 16.0.6 (App Router)
- **Language**: TypeScript 5.x
- **Runtime**: React 19.2.0 with React Compiler enabled
- **Database**: Prisma 5.22.0 with SQLite
- **Styling**: Tailwind CSS 4.x with shadcn/ui
- **Authentication**: Clerk Next.js 6.35.5

### UI Components & Libraries
- **UI Library**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Forms**: Native HTML with custom validation
- **Charts**: Built-in progress components

### Development Tools
- **Build Tool**: Next.js built-in bundler
- **Linting**: ESLint 9 with Next.js configuration
- **Type Checking**: TypeScript with strict mode
- **CSS Processing**: PostCSS with Tailwind CSS plugin
- **Database**: Prisma CLI for migrations

### Dependencies
```json
{
  "@clerk/nextjs": "^6.35.5",
  "@prisma/client": "^5.22.0",
  "@radix-ui/react-*": "Various UI primitives",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.555.0",
  "next": "16.0.6",
  "prisma": "^5.22.0",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "tailwind-merge": "^2.5.4",
  "tailwindcss-animate": "^1.0.7"
}
```

## Features and Modules

### Core Features

1. **Advanced User Authentication**
   - Sign-up and sign-in functionality via Clerk
   - Automatic user synchronization with database
   - Protected routes with middleware-based auth
   - User profile management

2. **Custom Video Generation System**
   - Image upload with validation
   - Custom API route (`/api/generate-video`)
   - Local image storage
   - Placeholder AI video generation (ready for OpenAI Sora, Runway, etc.)
   - Real-time generation status tracking

3. **Complete User Dashboard**
   - Usage tracking and limits per user
   - Video generation history with pagination
   - Download and playback functionality
   - Analytics widgets and progress bars
   - Responsive design for all devices

4. **Modern UI/UX Design**
   - Professional landing page with multiple sections
   - Gradient color scheme (cyan, black, purple)
   - Fully responsive mobile-first design
   - shadcn/ui component library integration
   - Smooth animations and transitions

5. **Data Management System**
   - Prisma ORM with SQLite database
   - User and video relationship modeling
   - CRUD operations for video history
   - Usage tracking and limits enforcement

### Key Components

#### Layout Components
- **Header** (`src/components/layout/header.tsx`): Navigation with authentication
- **Footer** (`src/components/layout/footer.tsx`): Site footer with links
- **DashboardLayout** (`src/components/layout/dashboard-layout.tsx`): Dashboard wrapper

#### Dashboard Components
- **UsageCard** (`src/components/dashboard/usage-card.tsx`): Monthly usage tracking
- **HistoryTable** (`src/components/dashboard/history-table.tsx`): Video history display
- **ProfileForm** (`src/components/dashboard/profile-form.tsx`): User profile management

#### UI Components (shadcn/ui)
- **Button**: Customizable button component with variants
- **Card**: Content containers with headers and footers
- **Progress**: Usage progress bars
- **Badge**: Status indicators
- **Input/Label**: Form components

#### Pages
- **Landing Page** (`src/app/page.tsx`): Marketing page with hero, features, pricing
- **Dashboard** (`src/app/dashboard/page.tsx`): Main user dashboard
- **History** (`src/app/history/page.tsx`): Dedicated history page
- **Profile** (`src/app/profile/page.tsx`): User profile settings
- **Billing** (`src/app/billing/page.tsx`): Subscription and plans

## Folder Structure

```
ghl-ugc-video/
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── dev.db                     # SQLite database (generated)
├── public/                        # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── api/                   # API routes
│   │   │   ├── generate-video/    # Video generation endpoint
│   │   │   │   └── route.ts
│   │   │   ├── history/           # History CRUD operations
│   │   │   │   └── route.ts
│   │   │   └── user/
│   │   │       └── sync/          # User database sync
│   │   │           └── route.ts
│   │   ├── billing/               # Billing page
│   │   │   └── page.tsx
│   │   ├── dashboard/             # Protected dashboard
│   │   │   ├── page.tsx
│   │   │   └── VideoForm.tsx
│   │   ├── history/               # History page
│   │   │   └── page.tsx
│   │   ├── profile/               # Profile page
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Landing page
│   ├── components/                # Reusable components
│   │   ├── dashboard/             # Dashboard-specific components
│   │   │   ├── history-table.tsx
│   │   │   ├── profile-form.tsx
│   │   │   └── usage-card.tsx
│   │   ├── layout/                # Layout components
│   │   │   ├── dashboard-layout.tsx
│   │   │   ├── footer.tsx
│   │   │   └── header.tsx
│   │   ├── providers/             # Context providers
│   │   │   └── user-sync-provider.tsx
│   │   └── ui/                    # shadcn/ui components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── progress.tsx
│   ├── hooks/                     # Custom hooks
│   │   └── use-user-sync.ts
│   └── lib/                       # Utilities
│       ├── db.ts                  # Database client
│       └── utils.ts               # Helper functions
├── uploads/                       # User uploaded images (generated)
├── middleware.ts                  # Authentication middleware
├── .env.local                     # Environment variables
├── .gitignore                     # Git ignore rules
├── eslint.config.mjs              # ESLint configuration
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Lockfile
├── postcss.config.mjs             # PostCSS configuration
├── README.md                      # Project README
└── tsconfig.json                  # TypeScript configuration
```

## Database Schema

### User Model
```prisma
model User {
  id          String   @id @default(cuid())
  clerkId     String   @unique
  email       String?
  firstName   String?
  lastName    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Usage tracking
  videoLimit    Int     @default(10)
  videosUsed    Int     @default(0)
  lastResetDate DateTime @default(now())

  // Relations
  videos Video[]
}
```

### Video Model
```prisma
model Video {
  id          String   @id @default(cuid())
  title       String?
  prompt      String
  imageUrl    String?
  videoUrl    String?
  status      String   @default("PENDING")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Video Status Values
- `PENDING`: Video generation requested
- `PROCESSING`: AI generation in progress
- `COMPLETED`: Video successfully generated
- `FAILED`: Generation failed

## API Endpoints

### Video Generation API (`/api/generate-video`)
- **Method**: POST
- **Authentication**: Required (Clerk)
- **Request Body**:
  ```json
  {
    "image": "data:image/jpeg;base64,...",
    "prompt": "Description for video generation"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "videoId": "video-id",
    "videoUrl": "https://..."
  }
  ```

### History API (`/api/history`)
- **Method**: GET - Fetch user's video history
- **Method**: POST - Delete specific video
- **Authentication**: Required (Clerk)

### User Sync API (`/api/user/sync`)
- **Method**: POST
- **Authentication**: Required (Clerk)
- **Purpose**: Synchronize Clerk user with database

## Authentication Flow

### Route Protection
1. **Middleware** (`middleware.ts`): Protects routes using Clerk's `createRouteMatcher`
2. **Public Routes**: `/`, `/sign-in`, `/sign-up`
3. **Protected Routes**: `/dashboard`, `/history`, `/profile`, `/billing`
4. **Auto-redirect**: Authenticated users redirected from auth pages to dashboard

### User Synchronization
1. **Hook** (`useUserSync`): Automatically syncs users on login
2. **API Call**: Creates/updates user record in database
3. **Data Mapping**: Maps Clerk user data to local User model

## Installation Steps

### Prerequisites
- Node.js 18+ and npm
- Clerk account and application setup

### Local Development Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd ghl-ugc-video
   npm install
   ```

2. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Environment Configuration**
   Create `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. **Configure Clerk Application**
   - Set up application at clerk.com
   - Configure sign-in/sign-up URLs
   - Add environment variables

5. **Run Development Server**
   ```bash
   npm run dev
   ```

## Environment Variables

### Required Variables
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk client-side key
- `CLERK_SECRET_KEY`: Clerk server-side key

### Database
- SQLite database created automatically in `prisma/dev.db`
- No additional configuration needed for development

## Deployment Process

### Vercel Deployment (Recommended)

1. **Repository Setup**
   - Connect GitHub repository to Vercel
   - Configure build settings

2. **Environment Variables**
   - Add Clerk keys to Vercel environment
   - Configure production Clerk URLs

3. **Database**
   - SQLite works in serverless environments
   - Database file included in deployment

4. **Build Commands**
   - Build: `npm run build`
   - Install: `npm install`

### Production Considerations
- **Database**: SQLite suitable for moderate usage
- **File Storage**: Local uploads work on Vercel
- **AI Integration**: Replace placeholder with real API

## Usage Examples

### Video Generation Flow

1. **Upload Image**: User selects product image via file input
2. **Enter Prompt**: Descriptive text for video generation
3. **API Call**: Frontend calls `/api/generate-video`
4. **Processing**: Image saved, video generation initiated
5. **Response**: Video URL returned when complete

### Code Example - Video Generation

```typescript
const generateVideo = async () => {
  const res = await fetch("/api/generate-video", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image, prompt })
  });

  const data = await res.json();
  if (data.success) {
    // Handle successful generation
    setVideoUrl(data.videoUrl);
  }
};
```

### Usage Tracking

```typescript
// Check user limits before generation
const user = await db.user.findUnique({
  where: { clerkId: userId }
});

if (user.videosUsed >= user.videoLimit) {
  // Handle limit exceeded
}
```

## Configuration Details

### Next.js Configuration (`next.config.ts`)
```typescript
const nextConfig: NextConfig = {
  reactCompiler: true, // Performance optimization
};
```

### Prisma Configuration (`prisma/schema.prisma`)
- SQLite database for development/production
- User and Video models with relationships
- Default values and constraints

### Tailwind CSS Configuration
- Custom color scheme (cyan, black, purple)
- shadcn/ui theme integration
- Dark mode support

## Security Considerations

### Authentication & Authorization
- Clerk handles all authentication
- Middleware protects sensitive routes
- User-specific data isolation

### Data Validation
- Input sanitization on API endpoints
- File upload restrictions
- Rate limiting via usage tracking

### File Storage
- Local file system for development
- Images stored in `/uploads` directory
- File access controlled by user permissions

## Development Workflow

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run db:generate`: Generate Prisma client
- `npm run db:push`: Update database schema
- `npm run db:studio`: Open Prisma Studio

### Database Management
- **Migrations**: `npx prisma db push` for schema changes
- **Studio**: `npm run db:studio` for database GUI
- **Reset**: Delete `prisma/dev.db` and run `npm run db:push`

## Future Enhancements

### AI Integration
- Replace placeholder with OpenAI Sora API
- Add Runway ML or Luma AI integration
- Implement video customization options

### Advanced Features
- Batch video generation
- Video templates and styles
- Advanced analytics dashboard
- Team collaboration features

### Infrastructure
- PostgreSQL for production scaling
- Cloud file storage (AWS S3, Cloudinary)
- Redis for caching and sessions

### Business Features
- Stripe payment integration
- Advanced subscription tiers
- Usage analytics and reporting
- GoHighLevel CRM integration

## API Integration Guide

### Replacing Video Generation Placeholder

1. **Choose AI Provider**: OpenAI Sora, Runway ML, etc.
2. **Update API Route**: Modify `/api/generate-video/route.ts`
3. **Authentication**: Add API keys to environment
4. **File Upload**: Implement cloud storage if needed

Example implementation:
```typescript
// Replace placeholder function
async function generateVideoWithAI(imagePath: string, prompt: string): Promise<string> {
  // Call actual AI API
  const response = await fetch('https://api.openai.com/v1/videos/generations', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ /* AI API parameters */ })
  });

  const result = await response.json();
  return result.video_url;
}
```

## Support and Maintenance

### Dependencies Management
- Regular security updates for all packages
- Prisma and Next.js version compatibility
- Clerk authentication updates

### Monitoring & Analytics
- Vercel Analytics for performance
- Clerk dashboard for user management
- Database query monitoring

### Backup & Recovery
- SQLite database file backup
- User data export capabilities
- File storage redundancy

---

**Version**: 2.0.0
**Last Updated**: December 2025
**Architecture**: Full-Stack Next.js with Database
**Maintained by**: GoHighLevel Agency Solutions
