import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createJWT } from '@/lib/jwt'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
   const redirect = req.nextUrl.searchParams.get('redirect') || `${req.nextUrl.origin}`

  if (!token) {
  return NextResponse.redirect(`${req.nextUrl.origin}/login?error=Missing token`)
}

  const { data: record, error } = await supabase
    .from('magic_tokens')
    .select('*')
    .eq('token', token)
    .single()

  if (error || !record || record.used || new Date() > new Date(record.expires_at  + 'Z')) {
    console.log({ error, record, now: new Date(), expires_at: record?.expires_at, used: record?.used });
  return NextResponse.redirect(`${req.nextUrl.origin}/login?error=Invalid or expired token`)
  }

  // Mark token as used
  await supabase.from('magic_tokens').update({ used: true }).eq('token', token)

  const jwt = createJWT({ email: record.email })

  // Use absolute URL for redirect
   const redirectUrl = redirect.startsWith('http')
    ? redirect
    : `${req.nextUrl.origin}${redirect}`


  const response = NextResponse.redirect(redirectUrl)
  response.cookies.set('auth_token', jwt, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  })

  return response
}
