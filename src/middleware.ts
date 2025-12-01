import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',           // Landing page
  '/sign-in',    // Sign in page
  '/sign-up',    // Sign up page
]);

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',  // Dashboard and all sub-routes
  '/history(.*)',    // History page
  '/profile(.*)',    // Profile page
  '/billing(.*)',    // Billing page
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Redirect authenticated users away from auth pages
  if (isPublicRoute(req) && (await auth()).userId) {
    // If user is signed in and trying to access public routes,
    // redirect to dashboard
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