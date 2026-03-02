'use client';

import { useState } from 'react';
import { loadRazorpay } from '@/lib/razorpay/client';

interface RazorpayButtonProps {
  amount: number;
  planName: string;
}

export function RazorpayButton({ amount, planName }: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const orderResponse = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, planName }),
      });
      
      const order = await orderResponse.json();

      // Check if we're in mock mode
      if (order.mock) {
        alert('Demo mode: Payment successful! (This is a mock)');
        window.location.href = '/payment/success';
        return;
      }

      // Load Razorpay SDK
      const res = await loadRazorpay();
      if (!res) {
        alert('Razorpay SDK failed to load');
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'LifeOS',
        description: `${planName} Plan Subscription`,
        order_id: order.id,
        handler: function(response: any) {
          fetch('/api/verify-razorpay-payment', {
            method: 'POST',
            body: JSON.stringify(response),
          }).then(() => {
            window.location.href = '/payment/success';
          });
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#6C5CE7',
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full py-4 rounded-xl font-semibold transition-all bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Processing...' : `Pay ₹${amount}`}
    </button>
  );
}