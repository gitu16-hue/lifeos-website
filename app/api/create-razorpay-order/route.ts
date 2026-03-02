import { NextResponse } from 'next/server';

// Lazy initialize Razorpay only when needed
let razorpay: any = null;

function getRazorpayInstance() {
  if (!razorpay) {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!key_id || !key_secret) {
      return null;
    }

    // Dynamically import Razorpay
    const Razorpay = require('razorpay');
    razorpay = new Razorpay({
      key_id,
      key_secret,
    });
  }
  return razorpay;
}

export async function POST(request: Request) {
  try {
    const { amount, planName } = await request.json();

    // Check if Razorpay is configured
    const razorpayInstance = getRazorpayInstance();
    
    if (!razorpayInstance) {
      console.warn('Razorpay not configured - using mock mode');
      // Return mock response for development
      return NextResponse.json({
        id: 'mock_order_' + Date.now(),
        amount: amount * 100,
        currency: 'INR',
        mock: true,
      });
    }

    // Create order
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        plan: planName,
      },
    };

    const order = await razorpayInstance.orders.create(options);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}