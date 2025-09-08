// /middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = [
  '/beaserviceprovider',
  '/getservice',
  '/your-contacts',
]

const authPages = ['/login']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const pathname = request.nextUrl.pathname

  // Prevent logged-in users from visiting login/signup
  if (token && authPages.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Protect these routes
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  )

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Apply middleware only to protected paths + auth pages
export const config = {
  matcher: [
    ...protectedPaths.map((path) => `${path}/:path*`),
    '/login'
  ],
}
