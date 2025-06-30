import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyJWT } from '@/lib/jwt'

export async function GET() {
  const cookieStore =await  cookies()
  const token = cookieStore.get('auth_token')?.value

  if (!token) {
    return NextResponse.json({ isLoggedIn: false })
  }

  try {
    verifyJWT(token)
    return NextResponse.json({ isLoggedIn: true })
  } catch {
    return NextResponse.json({ isLoggedIn: false })
  }
}

