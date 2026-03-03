import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  const results = {
    url: supabaseUrl,
    urlValid: supabaseUrl?.startsWith('https://') && supabaseUrl?.includes('.supabase.co'),
    keyExists: !!supabaseKey,
  };

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ ...results, error: 'Missing env vars' });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('waitlist')
      .select('count', { count: 'exact', head: true });

    return NextResponse.json({
      ...results,
      connection: error ? 'failed' : 'success',
      error: error?.message,
    });
  } catch (error: any) {
    return NextResponse.json({
      ...results,
      connection: 'error',
      error: error.message,
    });
  }
}