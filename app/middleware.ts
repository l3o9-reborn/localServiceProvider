// /middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  // Protect these routes
  const protectedPaths = ['/beaserviceprovider', '/getservice']
  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Enable middleware only for protected routes
export const config = {
  matcher: ['/beaserviceprovider', '/getservice', '/your-contacts'],
}