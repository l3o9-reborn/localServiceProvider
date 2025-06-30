import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { verifyJWT } from '@/lib/jwt'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) {
      return NextResponse.json({ services: [], message: 'Not authenticated' }, { status: 401 })
    }

    const payload = verifyJWT(token)
    if (!payload || typeof payload.email !== 'string') {
      return NextResponse.json({ message: 'Invalid token payload' }, { status: 401 })
    }
    const email = payload.email

    // Fetch only services created by this email
    const { data, error } = await supabase
      .from('service_form')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ services: [], message: error.message }, { status: 500 })
    }

    return NextResponse.json({ services: data })
  } catch (error) {
    const err = error as Error
    return NextResponse.json({ services: [], message: err.message }, { status: 500 })
  }
}