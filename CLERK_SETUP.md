# Clerk Authentication Setup Guide

## Fixing Infinite Redirect Loop

The infinite redirect loop usually occurs when your Clerk keys don't match. Follow these steps:

### 1. Verify Your Clerk Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **API Keys** section
4. Make sure you're copying the keys from the **same environment** (Development or Production)

### 2. Check Your Environment Variables

Your `.env.local` file should have:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... (or pk_live_...)
CLERK_SECRET_KEY=sk_test_... (or sk_live_...)
```

**Important:**
- Both keys must be from the **same environment** (both test or both live)
- The publishable key starts with `pk_`
- The secret key starts with `sk_`
- Make sure there are no extra spaces or characters

### 3. Configure Clerk Dashboard URLs

In your Clerk Dashboard → **Paths**:

**For Development:**
- Sign-in URL: `http://localhost:3000/sign-in`
- Sign-up URL: `http://localhost:3000/sign-up`
- After sign-in URL: `/dashboard`
- After sign-up URL: `/dashboard`

**For Production (Vercel):**
- Sign-in URL: `https://your-domain.vercel.app/sign-in`
- Sign-up URL: `https://your-domain.vercel.app/sign-up`
- After sign-in URL: `/dashboard`
- After sign-up URL: `/dashboard`

### 4. Clear Browser Cache

Sometimes cached redirects cause issues:
- Clear your browser cache
- Try in an incognito/private window
- Clear cookies for localhost

### 5. Restart Development Server

After updating environment variables:
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### 6. Verify Middleware Configuration

The middleware is configured to:
- Protect `/dashboard`, `/history`, `/profile`, `/billing`
- Allow public access to `/`, `/sign-in`, `/sign-up`
- Redirect authenticated users from sign-in/sign-up to dashboard

### Common Issues

**Issue:** Keys from different environments
- **Fix:** Use both test keys or both live keys

**Issue:** Missing CLERK_SECRET_KEY
- **Fix:** Add the secret key to `.env.local`

**Issue:** Wrong redirect URLs in Clerk dashboard
- **Fix:** Update the URLs to match your app

**Issue:** Cached redirects
- **Fix:** Clear browser cache and cookies

### Testing

1. Visit `http://localhost:3000/sign-in`
2. Sign in with your account
3. You should be redirected to `/dashboard`
4. No infinite loop should occur

If issues persist, check the browser console and network tab for error messages.
