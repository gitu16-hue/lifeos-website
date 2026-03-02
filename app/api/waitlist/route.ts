import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { waitlistSchema } from '@/lib/validations/waitlist'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = waitlistSchema.parse(body)
    const supabase = await createClient() // Add await here
    
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: validatedData.email,
          name: validatedData.name || null,
          user_type: validatedData.userType,
          source: validatedData.source,
        }
      ])
      .select()
      .single()
    
    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waitlist' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        message: 'Successfully joined waitlist',
        position: data.id,
        email: data.email
      },
      { status: 200 }
    )
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  
  if (!email) {
    return NextResponse.json(
      { error: 'Email is required' },
      { status: 400 }
    )
  }
  
  const supabase = await createClient() // Add await here
  
  const { data, error } = await supabase
    .from('waitlist')
    .select('id, created_at')
    .eq('email', email)
    .single()
  
  if (error || !data) {
    return NextResponse.json(
      { exists: false },
      { status: 200 }
    )
  }
  
  const { count } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })
    .lt('id', data.id)
  
  return NextResponse.json({
    exists: true,
    position: (count || 0) + 1,
    joinedAt: data.created_at
  })
}