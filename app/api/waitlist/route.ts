import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { Resend } from 'resend';
import { RateLimiter } from 'limiter';

// ==================== CONFIGURATION ====================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

// Validate environment variables at startup
const ENV_VARS = {
  supabaseUrl: supabaseUrl,
  supabaseKey: supabaseKey,
  resendApiKey: resendApiKey,
};

// Log missing env vars but don't crash - will handle gracefully in routes
Object.entries(ENV_VARS).forEach(([key, value]) => {
  if (!value) {
    console.warn(`⚠️ Missing environment variable: ${key}`);
  }
});

// ==================== RATE LIMITING ====================
interface RateLimiterRecord {
  limiter: RateLimiter;
  lastAccessed: number;
}

const limiters = new Map<string, RateLimiterRecord>();

// Clean up old limiters every hour to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of limiters.entries()) {
    // Remove limiters not accessed in the last 24 hours
    if (now - record.lastAccessed > 24 * 60 * 60 * 1000) {
      limiters.delete(ip);
    }
  }
}, 60 * 60 * 1000);

function getLimiter(clientIp: string): RateLimiter {
  const now = Date.now();
  const existing = limiters.get(clientIp);
  
  if (existing) {
    existing.lastAccessed = now;
    return existing.limiter;
  }

  // Create new limiter: 100 requests per hour
  const limiter = new RateLimiter({
    tokensPerInterval: 100,
    interval: 'hour',
  });

  limiters.set(clientIp, {
    limiter,
    lastAccessed: now,
  });

  return limiter;
}

// ==================== VALIDATION SCHEMA ====================
const WaitlistSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email is too short')
    .max(100, 'Email is too long'),
  name: z.string()
    .optional()
    .nullable()
    .transform(val => val?.trim() || null),
  userType: z.enum(['individual', 'professional', 'enterprise', 'student'])
    .default('individual'),
  source: z.string()
    .default('website')
    .transform(val => val?.trim() || 'website'),
  utm_source: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
});

// ==================== SUPABASE CLIENT ====================
let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase client initialized');
} else {
  console.error('❌ Supabase client not initialized - missing credentials');
}

// ==================== RESEND CLIENT ====================
let resend: Resend | null = null;

if (resendApiKey) {
  resend = new Resend(resendApiKey);
  console.log('✅ Resend client initialized');
} else {
  console.warn('⚠️ Resend client not initialized - emails disabled');
}

// ==================== POST HANDLER ====================
export async function POST(request: Request) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  
  console.log(`[${requestId}] 📥 POST /api/waitlist started`);

  try {
    // ========== RATE LIMITING ==========
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    // Skip rate limiting for localhost in development
    if (process.env.NODE_ENV !== 'development' || clientIp !== 'unknown') {
      const limiter = getLimiter(clientIp);
      const hasTokens = await limiter.tryRemoveTokens(1);

      if (!hasTokens) {
        console.warn(`[${requestId}] ⚠️ Rate limit exceeded for IP: ${clientIp}`);
        return NextResponse.json(
          { 
            error: 'Too many requests. Please try again later.',
            code: 'RATE_LIMIT_EXCEEDED'
          },
          { 
            status: 429,
            headers: {
              'Retry-After': '3600',
              'X-RateLimit-Limit': '100',
              'X-RateLimit-Remaining': '0',
            }
          }
        );
      }
    }

    // ========== CHECK SUPABASE CONNECTION ==========
    if (!supabase) {
      console.error(`[${requestId}] ❌ Supabase client not available`);
      return NextResponse.json(
        { 
          error: 'Service temporarily unavailable',
          code: 'SERVICE_UNAVAILABLE'
        },
        { status: 503 }
      );
    }

    // ========== PARSE REQUEST BODY ==========
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error(`[${requestId}] ❌ Invalid JSON body:`, e);
      return NextResponse.json(
        { 
          error: 'Invalid request body',
          code: 'INVALID_JSON'
        },
        { status: 400 }
      );
    }

    // ========== VALIDATE INPUT ==========
    const validationResult = WaitlistSchema.safeParse(body);

    if (!validationResult.success) {
      console.warn(`[${requestId}] ⚠️ Validation failed:`, validationResult.error.errors);
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          code: 'VALIDATION_ERROR',
          details: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const { email, name, userType, source, utm_source, utm_medium, utm_campaign } = validationResult.data;

    // ========== CHECK FOR EXISTING EMAIL ==========
    try {
      const { data: existingUser, error: checkError } = await supabase
        .from('waitlist')
        .select('id, created_at')
        .eq('email', email)
        .maybeSingle();

      if (checkError) {
        console.error(`[${requestId}] ❌ Database check error:`, checkError);
        throw checkError;
      }

      if (existingUser) {
        console.log(`[${requestId}] ⚠️ Duplicate email attempt: ${email}`);
        return NextResponse.json(
          { 
            error: 'This email is already on the waitlist',
            code: 'DUPLICATE_EMAIL',
            joinedAt: existingUser.created_at,
          },
          { status: 409 }
        );
      }
    } catch (error) {
      console.error(`[${requestId}] ❌ Database check failed:`, error);
      return NextResponse.json(
        { 
          error: 'Failed to check waitlist status',
          code: 'DATABASE_CHECK_FAILED'
        },
        { status: 500 }
      );
    }

    // ========== INSERT INTO DATABASE ==========
    let data;
    try {
      const insertData: any = {
        email,
        name: name || null,
        user_type: userType,
        source,
        created_at: new Date().toISOString(),
        metadata: {
          ip: clientIp,
          user_agent: request.headers.get('user-agent'),
          timestamp: new Date().toISOString(),
        },
      };

      // Add UTM params if present
      if (utm_source) insertData.utm_source = utm_source;
      if (utm_medium) insertData.utm_medium = utm_medium;
      if (utm_campaign) insertData.utm_campaign = utm_campaign;

      const { data: inserted, error: insertError } = await supabase
        .from('waitlist')
        .insert([insertData])
        .select()
        .single();

      if (insertError) {
        console.error(`[${requestId}] ❌ Insert error:`, insertError);
        throw insertError;
      }

      data = inserted;
      console.log(`[${requestId}] ✅ Inserted: ${email} (ID: ${data.id})`);
    } catch (error: any) {
      // Handle specific database errors
      if (error.code === '23505') { // Unique violation
        return NextResponse.json(
          { 
            error: 'This email is already on the waitlist',
            code: 'DUPLICATE_EMAIL'
          },
          { status: 409 }
        );
      }

      if (error.code === '23502') { // Not null violation
        return NextResponse.json(
          { 
            error: 'Missing required fields',
            code: 'MISSING_FIELDS'
          },
          { status: 400 }
        );
      }

      console.error(`[${requestId}] ❌ Database error:`, error);
      return NextResponse.json(
        { 
          error: 'Failed to join waitlist',
          code: 'DATABASE_ERROR'
        },
        { status: 500 }
      );
    }

    // ========== GET POSITION AND COUNTS ==========
    let totalCount = 0;
    let position = 0;
    
    try {
      const [{ count: total }, { count: pos }] = await Promise.all([
        supabase.from('waitlist').select('*', { count: 'exact', head: true }),
        supabase.from('waitlist').select('*', { count: 'exact', head: true }).lt('id', data.id)
      ]);

      totalCount = total || 0;
      position = (pos || 0) + 1;
    } catch (error) {
      console.error(`[${requestId}] ⚠️ Failed to get position data:`, error);
      // Continue without position data - not critical
    }

    // ========== SEND CONFIRMATION EMAIL (NON-BLOCKING) ==========
    if (resend) {
      sendConfirmationEmail(requestId, email, name, position)
        .catch(error => console.error(`[${requestId}] ❌ Email send failed:`, error));
    } else {
      console.log(`[${requestId}] ⚠️ Email not sent - Resend not configured`);
    }

    // ========== SUCCESS RESPONSE ==========
    const responseTime = Date.now() - startTime;
    console.log(`[${requestId}] ✅ Success (${responseTime}ms)`);

    return NextResponse.json(
      { 
        success: true,
        message: 'Successfully joined the waitlist!',
        data: {
          id: data.id,
          position,
          totalCount,
          email: data.email,
        }
      },
      { 
        status: 200,
        headers: {
          'X-Response-Time': `${responseTime}ms`,
          'X-Request-ID': requestId,
        }
      }
    );

  } catch (error) {
    console.error(`[${requestId}] ❌ Unhandled error:`, error);
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred',
        code: 'INTERNAL_SERVER_ERROR',
        requestId,
      },
      { status: 500 }
    );
  }
}

// ==================== GET HANDLER ====================
export async function GET(request: Request) {
  const requestId = Math.random().toString(36).substring(7);
  
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const includeStats = searchParams.get('stats') === 'true';

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required', code: 'EMAIL_REQUIRED' },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Service unavailable', code: 'SERVICE_UNAVAILABLE' },
        { status: 503 }
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
      const [{ count: total }, { count: todayCount }] = await Promise.all([
        supabase.from('waitlist').select('*', { count: 'exact', head: true }),
        supabase.from('waitlist')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', new Date().toISOString().split('T')[0]),
      ]);

      stats = {
        total: total || 0,
        today: todayCount || 0,
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
    console.error(`[${requestId}] ❌ GET error:`, error);
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

// ==================== EMAIL HELPER ====================
async function sendConfirmationEmail(requestId: string, email: string, name: string | null, position: number) {
  if (!resend) return;

  try {
    const { data, error } = await resend.emails.send({
      from: 'LifeOS <waitlist@lifeos.ai>',
      to: [email],
      subject: 'Welcome to the LifeOS Waitlist! 🚀',
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to LifeOS</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
              <!-- Header with gradient -->
              <div style="background: linear-gradient(135deg, #6C5CE7, #00F5D4); padding: 48px 24px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 36px; font-weight: 700; letter-spacing: -0.5px;">LifeOS</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 16px;">Neural Operating System</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 48px 40px;">
                <div style="text-align: center; margin-bottom: 32px;">
                  <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #6C5CE7, #00F5D4); border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 40px;">🎉</span>
                  </div>
                  <h2 style="color: #6C5CE7; margin: 0 0 8px; font-size: 28px;">You're on the list!</h2>
                  <p style="color: #666; margin: 0; font-size: 16px;">Hi ${name || 'there'}, thanks for joining the LifeOS waitlist.</p>
                </div>
                
                <div style="background: linear-gradient(135deg, rgba(108,92,231,0.1), rgba(0,245,212,0.1)); padding: 24px; border-radius: 12px; margin-bottom: 32px; text-align: center;">
                  <p style="margin: 0 0 8px; color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your position in line</p>
                  <p style="margin: 0; font-size: 48px; font-weight: 700; background: linear-gradient(135deg, #6C5CE7, #00F5D4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1;">#${position}</p>
                </div>
                
                <div style="margin-bottom: 32px;">
                  <h3 style="color: #333; margin: 0 0 16px; font-size: 18px;">What's next?</h3>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                      <span style="width: 32px; height: 32px; background: #6C5CE7; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">📧</span>
                      <span style="color: #666;">We'll notify you when it's your turn for early access</span>
                    </li>
                    <li style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                      <span style="width: 32px; height: 32px; background: #00F5D4; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #0A0A0A; font-size: 18px;">🎁</span>
                      <span style="color: #666;">Early access members get exclusive lifetime discounts</span>
                    </li>
                    <li style="display: flex; align-items: center; gap: 12px;">
                      <span style="width: 32px; height: 32px; background: #9D7BFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">💬</span>
                      <span style="color: #666;">Join our community for exclusive updates</span>
                    </li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 40px 0 32px;">
                  <a href="https://twitter.com/lifeos" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #6C5CE7, #00F5D4); color: white; text-decoration: none; border-radius: 30px; font-weight: 600; font-size: 16px; transition: transform 0.2s;">Follow us on Twitter</a>
                </div>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
                
                <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                  © 2026 LifeOS. All rights reserved.<br>
                  <a href="https://lifeos.ai/unsubscribe?email=${encodeURIComponent(email)}" style="color: #999;">Unsubscribe</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `
    });

    if (error) {
      console.error(`[${requestId}] ❌ Resend error:`, error);
    } else {
      console.log(`[${requestId}] 📧 Confirmation email sent to ${email}`);
    }
  } catch (error) {
    console.error(`[${requestId}] ❌ Email send failed:`, error);
    // Don't throw - email failures shouldn't break the flow
  }
}