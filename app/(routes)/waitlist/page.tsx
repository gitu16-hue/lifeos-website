'use client';

import { useState } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { ThreeDBackground } from '@/components/3d/background';
import { motion } from 'framer-motion';
import { Mail, User, Users, Zap, Trophy, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    userType: 'individual'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isMockMode, setIsMockMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setIsMockMode(false);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      // Check if we're in mock mode
      if (data.mock) {
        setIsMockMode(true);
      }

      setIsSuccess(true);
      setFormData({ email: '', name: '', userType: 'individual' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setIsMockMode(false);
      }, 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <ThreeDBackground />
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto glass-card p-12 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-teal-500 p-5">
                <CheckCircle className="w-full h-full text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4">
                {isMockMode ? 'Demo Mode' : "You're on the list! 🎉"}
              </h1>
              <p className="text-gray-400 mb-6">
                {isMockMode 
                  ? "This is a demo submission. Connect Supabase to enable real data collection."
                  : "Thank you for joining the LifeOS waitlist. We'll notify you when it's your turn."}
              </p>
              {isMockMode && (
                <div className="mb-4 p-3 glass rounded-lg border border-yellow-500/50 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <p className="text-sm text-yellow-400">Running in demo mode</p>
                </div>
              )}
              <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
              <p className="text-sm text-gray-500">
                {isMockMode ? 'Thank you for testing!' : 'Check your email for confirmation'}
              </p>
              <Link href="/">
                <button className="mt-8 px-6 py-3 glass rounded-xl hover:bg-white/10 transition-all">
                  Return Home
                </button>
              </Link>
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <ThreeDBackground />
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="sticky top-32"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
                <Zap className="w-4 h-4 text-secondary" />
                <span className="text-sm">Limited Spots Available</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Join the
                <br />
                <span className="text-gradient">Waitlist</span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8">
                Be among the first to experience LifeOS - the AI-powered operating system 
                that designs, executes, and optimizes your life.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">5,000+ Already Joined</div>
                    <div className="text-sm text-gray-400">And growing fast</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold">Early Access Benefits</div>
                    <div className="text-sm text-gray-400">Lifetime discount for first 10,000</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="font-semibold">Shape the Product</div>
                    <div className="text-sm text-gray-400">Direct feedback to founders</div>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>✨ No spam</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                <span>🔒 Privacy first</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                <span>⚡ Unsubscribe anytime</span>
              </div>
            </motion.div>
            
            {/* Right side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name (Optional)
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* User Type Dropdown */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    I am a...
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="individual">Individual</option>
                    <option value="professional">Professional</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="student">Student</option>
                  </select>
                </div>

                {/* Demo Mode Notice */}
                <div className="p-3 glass rounded-lg border border-yellow-500/50 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <p className="text-xs text-yellow-400">
                    Demo mode: Data will be simulated. Connect Supabase for real collection.
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 glass rounded-lg border border-red-500/50">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Joining...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}