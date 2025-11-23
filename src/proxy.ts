// middleware.ts or middleware.js
import { withAuth } from "next-auth/middleware";

// Protect all specified routes
export default withAuth({
  // Redirect unauthenticated users to this path
  pages: {
    signIn: '/login',
  },
  // Define authorization logic (only allow if a JWT token is present)
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// The config object MUST be updated to exclude the NextAuth API routes
export const config = {
  // Use a negative lookahead regex to match all protected paths, 
  // BUT exclude the /api/auth paths and static assets.
  // The protected routes are: '/', '/TTResultsTable', '/TTchart', '/profile', '/settings'
  matcher: [
    // This pattern matches the protected paths, but excludes /api/auth/
    '/((?!api/auth).*)', 
  ],
};