'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/navbar';
import { ThreeDBackground } from '@/components/3d/background';
import { Footer } from '@/components/ui/footer';

export default function PaymentSuccess() {
  return (
    <>
      <ThreeDBackground />
      <Navbar />
      <main className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto glass-card p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Payment Successful! 🎉</h1>
            <p className="text-gray-400 mb-8">
              Thank you for subscribing to LifeOS. You'll receive a confirmation email shortly.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}