import { supabase } from '@/lib/supabase'
import { sendMagicLink } from '@/lib/mailer'
import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const token = nanoid()
  const expires_at = new Date(Date.now() + 1000 * 60 * 15).toISOString()

  await supabase.from('magic_tokens').insert({
    email,
    token,
    expires_at,
    used: false,
  })

  await sendMagicLink(email, token)

  return NextResponse.json({ message: 'Magic link sent to your Email' })
}
