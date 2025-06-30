import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import { verifyJWT } from '@/lib/jwt'

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
    }

    const payload = verifyJWT(token)
    if (!payload || typeof payload.email !== 'string') {
      return NextResponse.json({ message: 'Invalid token payload' }, { status: 401 })
    }
    const email = payload.email

    const { error } = await supabase
      .from('service_form')
      .delete()
      .eq('id', id)
      .eq('email', email)

    if (error) {
      console.error('Supabase delete error:', error.message)
      return NextResponse.json({ message: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    console.error('Unhandled API error:', (error as Error).message)
    return NextResponse.json({ message: (error as Error).message }, { status: 500 })
  }
}