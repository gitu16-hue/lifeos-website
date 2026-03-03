import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { Resend } from 'resend';

// ==================== CONFIGURATION ====================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

// Log environment status on startup
console.log('🚀 API Route initialized:', {
  environment: process.env.NODE_ENV,
  platform: process.env.VERCEL ? 'vercel' : 'local',
  supabaseUrl: supabaseUrl ? '✅ present' : '❌ missing',
  supabaseKey: supabaseKey ? '✅ present' : '❌ missing',
  resendKey: resendApiKey ? '✅ present' : '❌ missing',
});

// ==================== SIMPLE RATE LIMITER ====================
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimits = new Map<string, RateLimitRecord>();

// Clean up old records every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimits.entries()) {
    if (now > record.resetTime) {
      rateLimits.delete(key);
    }
  }
}, 60 * 60 * 1000);

function checkRateLimit(identifier: string): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 100;

  const record = rateLimits.get(identifier);

  if (!record || now > record.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimits.set(identifier, newRecord);
    return { success: true, remaining: maxRequests - 1, resetTime: newRecord.resetTime };
  }

  if (record.count < maxRequests) {
    record.count++;
    return { success: true, remaining: maxRequests - record.count, resetTime: record.resetTime };
  }

  return { success: false, remaining: 0, resetTime: record.resetTime };
}

// ==================== VALIDATION SCHEMA ====================
const WaitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(5).max(100),
  name: z.string().optional().nullable().transform(val => val?.trim() || null),
  userType: z.enum(['individual', 'professional', 'enterprise', 'student']).default('individual'),
  source: z.string().default('website').transform(val => val?.trim() || 'website'),
  utm_source: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
});

// ==================== SUPABASE CLIENT WITH TIMEOUT ====================
let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseKey) {
  // Create Supabase client with timeout handling
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      fetch: (url, options) => {
        // Add timeout of 15 seconds to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        return fetch(url, {
          ...options,
          signal: controller.signal,
        }).finally(() => clearTimeout(timeoutId));
      },
    },
  });
  console.log('✅ Supabase client initialized with timeout');
} else {
  console.error('❌ Supabase client not initialized - missing credentials');
}

// ==================== RESEND CLIENT ====================
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// ==================== POST HANDLER ====================
export async function POST(request: Request) {
  const requestId = Math.random().toString(36).substring(7);
  const startTime = Date.now();
  
  console.log(`[${requestId}] 📥 POST /api/waitlist started`);

  try {
    // ========== RATE LIMITING ==========
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    const { success: rateLimitSuccess, remaining, resetTime } = checkRateLimit(clientIp);

    if (!rateLimitSuccess) {
      console.warn(`[${requestId}] ⚠️ Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.', code: 'RATE_LIMIT_EXCEEDED' },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '100',
            'X-RateLimit-Remaining': '0',
          }
        }
      );
    }

    // ========== CHECK SUPABASE ==========
    if (!supabase) {
      console.error(`[${requestId}] ❌ Supabase client not available`);
      return NextResponse.json(
        { 
          error: 'Service temporarily unavailable', 
          code: 'SERVICE_UNAVAILABLE',
          details: process.env.NODE_ENV === 'development' ? 'Supabase not configured' : undefined
        },
        { status: 503 }
      );
    }

    // ========== PARSE & VALIDATE REQUEST ==========
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error(`[${requestId}] ❌ Invalid JSON body:`, e);
      return NextResponse.json(
        { error: 'Invalid request body', code: 'INVALID_JSON' },
        { status: 400 }
      );
    }

    const validationResult = WaitlistSchema.safeParse(body);
    if (!validationResult.success) {
      console.warn(`[${requestId}] ⚠️ Validation failed:`, validationResult.error.format());
  
      const errorDetails = validationResult.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return NextResponse.json(
        {
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: errorDetails,
        },
        { status: 400 }
      );
    }

    const { email, name, userType, source, utm_source, utm_medium, utm_campaign } = validationResult.data;

    // ========== CHECK FOR EXISTING EMAIL ==========
    let existingUser = null;
    let checkError = null;
    
    try {
      const result = await supabase
        .from('waitlist')
        .select('id')
        .eq('email', email)
        .maybeSingle();
      
      existingUser = result.data;
      checkError = result.error;
    } catch (err: any) {
      console.error(`[${requestId}] ❌ Database check exception:`, {
        message: err.message,
        name: err.name,
        cause: err.cause,
      });
      
      return NextResponse.json(
        { 
          error: 'Database connection error', 
          code: 'DATABASE_CONNECTION_ERROR',
          details: process.env.NODE_ENV === 'development' ? err.message : undefined
        },
        { status: 503 }
      );
    }

    if (checkError) {
      console.error(`[${requestId}] ❌ Database check error:`, {
        message: checkError.message,
        details: checkError.details,
        hint: checkError.hint,
        code: checkError.code,
      });
      
      return NextResponse.json(
        { 
          error: 'Failed to check waitlist status', 
          code: 'DATABASE_CHECK_FAILED',
          details: process.env.NODE_ENV === 'development' ? checkError.message : undefined
        },
        { status: 500 }
      );
    }

    if (existingUser) {
      console.log(`[${requestId}] ⚠️ Duplicate email: ${email}`);
      return NextResponse.json(
        { error: 'This email is already on the waitlist', code: 'DUPLICATE_EMAIL' },
        { status: 409 }
      );
    }

    // ========== INSERT INTO DATABASE ==========
    const insertData: any = {
      email,
      name,
      user_type: userType,
      source,
      created_at: new Date().toISOString(),
      metadata: { 
        ip: clientIp, 
        user_agent: request.headers.get('user-agent'),
        timestamp: new Date().toISOString()
      },
    };
    
    if (utm_source) insertData.utm_source = utm_source;
    if (utm_medium) insertData.utm_medium = utm_medium;
    if (utm_campaign) insertData.utm_campaign = utm_campaign;

    let data = null;
    let insertError = null;
    
    try {
      const result = await supabase
        .from('waitlist')
        .insert([insertData])
        .select()
        .single();
      
      data = result.data;
      insertError = result.error;
    } catch (err: any) {
      console.error(`[${requestId}] ❌ Insert exception:`, {
        message: err.message,
        name: err.name,
        cause: err.cause,
      });
      
      return NextResponse.json(
        { 
          error: 'Database connection error during insert', 
          code: 'DATABASE_INSERT_CONNECTION_ERROR',
          details: process.env.NODE_ENV === 'development' ? err.message : undefined
        },
        { status: 503 }
      );
    }

    if (insertError) {
      console.error(`[${requestId}] ❌ Insert error:`, {
        message: insertError.message,
        code: insertError.code,
        details: insertError.details,
      });
      
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waitlist', code: 'DUPLICATE_EMAIL' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to join waitlist', 
          code: 'DATABASE_ERROR',
          details: process.env.NODE_ENV === 'development' ? insertError.message : undefined
        },
        { status: 500 }
      );
    }

    if (!data) {
      console.error(`[${requestId}] ❌ No data returned from insert`);
      return NextResponse.json(
        { error: 'Failed to join waitlist - no data returned', code: 'NO_DATA_RETURNED' },
        { status: 500 }
      );
    }

    // ========== GET POSITION ==========
    let position = 0;
    try {
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .lt('id', data.id);
      position = (count || 0) + 1;
    } catch (error) {
      console.error(`[${requestId}] ⚠️ Failed to get position:`, error);
      // Continue without position - not critical
    }

    // ========== SEND EMAIL (NON-BLOCKING) ==========
    if (resend && email) {
      sendConfirmationEmail(requestId, email, name, position).catch(error => 
        console.error(`[${requestId}] ❌ Email send failed:`, error)
      );
    }

    const responseTime = Date.now() - startTime;
    console.log(`[${requestId}] ✅ Success (${responseTime}ms) - ${email}`);

    // ========== SUCCESS RESPONSE ==========
    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined the waitlist!',
        data: { id: data.id, position, email: data.email },
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': remaining.toString(),
          'X-Request-ID': requestId,
          'X-Response-Time': `${responseTime}ms`,
        }
      }
    );

  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`[${requestId}] ❌ Unhandled error (${responseTime}ms):`, {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error: JSON.stringify(error, Object.getOwnPropertyNames(error))
    });
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred', 
        code: 'INTERNAL_SERVER_ERROR', 
        requestId,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
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

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    if (!supabase) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const { data, error } = await supabase
      .from('waitlist')
      .select('id, created_at')
      .eq('email', email)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ exists: false });
    }

    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .lt('id', data.id);

    return NextResponse.json({
      exists: true,
      data: { 
        id: data.id, 
        position: (count || 0) + 1, 
        joinedAt: data.created_at 
      },
    });

  } catch (error) {
    console.error(`[${requestId}] ❌ GET error:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to LifeOS</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="background: linear-gradient(135deg, #6C5CE7, #00F5D4); padding: 40px 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 32px;">LifeOS</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0;">Neural Operating System</p>
              </div>
              <div style="padding: 40px 30px;">
                <h2 style="color: #6C5CE7; margin-top: 0;">You're on the list! 🎉</h2>
                <p>Hi ${name || 'there'},</p>
                <p>Thank you for joining the LifeOS waitlist. You're <strong style="color: #6C5CE7;">#${position}</strong> in line!</p>
                <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 30px 0;">
                  <h3 style="margin-top: 0;">What's next?</h3>
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
  }
}