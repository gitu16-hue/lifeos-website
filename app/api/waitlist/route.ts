import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { Resend } from 'resend';
import { RateLimiter } from 'limiter';

// Initialize services
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

// Create rate limiters map for different IPs
const limiters = new Map();

function getLimiter(clientIp: string) {
  if (!limiters.has(clientIp)) {
    // Create new limiter for this IP: 100 requests per hour
    limiters.set(clientIp, new RateLimiter({
      tokensPerInterval: 100,
      interval: 'hour'
    }));
  }
  return limiters.get(clientIp);
}

// Validation schema using Zod
const WaitlistSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional().nullable(),
  userType: z.enum(['individual', 'professional', 'enterprise', 'student']).default('individual'),
  source: z.string().default('website'),
  utm_source: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
});

// Initialize Resend for email notifications
const resend = resendApiKey ? new Resend(resendApiKey) : null;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function POST(request: Request) {
  const startTime = Date.now();
  
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const limiter = getLimiter(clientIp);
    const hasTokens = await limiter.tryRemoveTokens(1);

    if (!hasTokens) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = WaitlistSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const { email, name, userType, source, utm_source, utm_medium, utm_campaign } = validationResult.data;

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { 
          error: 'This email is already on the waitlist',
          code: 'DUPLICATE_EMAIL'
        },
        { status: 409 }
      );
    }

    // Insert into Supabase with metadata
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          name: name || null,
          user_type: userType,
          source,
          utm_source,
          utm_medium,
          utm_campaign,
          created_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error:', {
        code: error.code,
        message: error.message,
        details: error.details,
      });

      return NextResponse.json(
        { 
          error: 'Failed to join waitlist',
          code: 'DATABASE_ERROR'
        },
        { status: 500 }
      );
    }

    // Get total count and position
    const { count: totalCount } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    const { count: position } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .lt('id', data.id);

    // Send confirmation email (non-blocking)
    if (resend) {
      sendConfirmationEmail(email, name, (position || 0) + 1).catch(console.error);
    }

    const responseTime = Date.now() - startTime;
    console.log(`✅ Waitlist signup successful - ${email} (${responseTime}ms)`);

    return NextResponse.json(
      { 
        success: true,
        message: 'Successfully joined waitlist',
        data: {
          id: data.id,
          position: (position || 0) + 1,
          totalCount: totalCount || 0,
          email: data.email,
        }
      },
      { 
        status: 200,
        headers: {
          'X-Response-Time': `${responseTime}ms`,
        }
      }
    );

  } catch (error) {
    console.error('❌ Server error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        code: 'SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const includeStats = searchParams.get('stats') === 'true';

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Get user data
    const { data, error } = await supabase
      .from('waitlist')
      .select('id, created_at, user_type, source')
      .eq('email', email)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json(
        { exists: false },
        { status: 200 }
      );
    }

    // Get position
    const { count: position } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .lt('id', data.id);

    let stats = {};
    if (includeStats) {
      const { count: total } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

      const today = new Date().toISOString().split('T')[0];
      const { count: todayCount } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today);

      stats = {
        total,
        today: todayCount,
      };
    }

    return NextResponse.json({
      exists: true,
      data: {
        id: data.id,
        position: (position || 0) + 1,
        joinedAt: data.created_at,
        userType: data.user_type,
        source: data.source,
        ...stats,
      }
    });

  } catch (error) {
    console.error('❌ Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper: Send confirmation email
async function sendConfirmationEmail(email: string, name: string | null, position: number) {
  if (!resend) return;

  try {
    await resend.emails.send({
      from: 'LifeOS <waitlist@lifeos.ai>',
      to: [email],
      subject: 'Welcome to the LifeOS Waitlist! 🚀',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #6C5CE7, #00F5D4); padding: 40px 20px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 32px;">LifeOS</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Neural Operating System</p>
            </div>
            
            <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #6C5CE7; margin-top: 0;">You're on the list! 🎉</h2>
              
              <p>Hi ${name || 'there'},</p>
              
              <p>Thank you for joining the LifeOS waitlist. You're <strong style="color: #6C5CE7; font-size: 24px;">#${position}</strong> in line!</p>
              
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h3 style="color: #333; margin-top: 0;">What's next?</h3>
                <ul style="padding-left: 20px;">
                  <li>📧 We'll notify you when it's your turn</li>
                  <li>🎁 Early access members get lifetime discounts</li>
                  <li>💬 Join our community for updates</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://twitter.com/lifeos" style="display: inline-block; padding: 12px 24px; background: #6C5CE7; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Follow us on Twitter</a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              
              <p style="color: #999; font-size: 12px; text-align: center;">
                © 2026 LifeOS. All rights reserved.<br>
                <a href="https://lifeos.ai/unsubscribe" style="color: #999;">Unsubscribe</a>
              </p>
            </div>
          </body>
        </html>
      `
    });
    
    console.log(`📧 Confirmation email sent to ${email}`);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
}