// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if trying to access admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      const redirectUrl = new URL('/auth', req.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Check if user has admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profile?.role !== 'admin') {
      // Redirect to home or show unauthorized
      const redirectUrl = new URL('/', req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};