import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',  // Dashboard and all sub-routes
  '/history(.*)',    // History page
  '/profile(.*)',    // Profile page
  '/billing(.*)',    // Billing page
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Only redirect authenticated users away from sign-in/sign-up pages
  // Allow them to access the landing page
  if (userId && (req.nextUrl.pathname.startsWith('/sign-in') || req.nextUrl.pathname.startsWith('/sign-up'))) {
    const url = new URL('/dashboard', req.url);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};