import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16 Proxy (replaces deprecated middleware convention)
 *
 * Adds security headers to ALL responses (including /api).
 * @see https://nextjs.org/docs/messages/middleware-to-proxy
 */
export default function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // HSTS — force HTTPS for 1 year, include subdomains, preload-eligible
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  // CSP — tightened: removed unsafe-eval; kept unsafe-inline for Next.js runtime
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https:; frame-ancestors 'none';"
  );

  return response;
}

// Apply security headers to EVERY route (no exclusion for /api).
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
