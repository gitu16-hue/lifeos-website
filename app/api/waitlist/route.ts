import { NextResponse } from 'next/server';

// Dynamic import for Supabase - only loads when needed
let supabaseInstance: any = null;

async function getSupabase() {
  if (supabaseInstance) return supabaseInstance;
  
  try {
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase environment variables missing - using mock mode');
      return null;
    }
    
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
    return supabaseInstance;
  } catch (error) {
    console.warn('Failed to initialize Supabase:', error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await getSupabase();
    const body = await request.json();
    const { email, name, userType } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock success
    if (!supabase) {
      console.log('Using mock mode for waitlist signup:', email);
      return NextResponse.json(
        { 
          success: true,
          message: 'Successfully joined waitlist (demo mode)',
          position: Math.floor(Math.random() * 1000) + 5000,
          email: email,
          mock: true
        },
        { status: 200 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          name: name || null,
          user_type: userType || 'individual',
          source: 'website',
          created_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (error) {
      // Check for duplicate email
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waitlist' },
          { status: 409 }
        );
      }

      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Successfully joined waitlist',
        position: data.id,
        email: data.email
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await getSupabase();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock response
    if (!supabase) {
      return NextResponse.json(
        { 
          exists: false,
          mock: true,
          message: 'Supabase not configured - demo mode'
        },
        { status: 200 }
      );
    }

    const { data, error } = await supabase
      .from('waitlist')
      .select('id, created_at')
      .eq('email', email)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { exists: false },
        { status: 200 }
      );
    }

    // Get position (count of entries with smaller id)
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .lt('id', data.id);

    return NextResponse.json({
      exists: true,
      position: (count || 0) + 1,
      joinedAt: data.created_at
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}