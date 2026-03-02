'use client'

import { Navbar } from '@/components/ui/navbar'
import { ThreeDBackground } from '@/components/3d/background'
import { WaitlistForm } from '@/components/forms/waitlist-form'
import { motion } from 'framer-motion'
import { Users, Zap, Trophy } from 'lucide-react'

export default function WaitlistPage() {
  return (
    <>
      <ThreeDBackground />
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
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
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>✨ No credit card</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                <span>⚡ 14-day free trial</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                <span>🔒 Cancel anytime</span>
              </div>
            </motion.div>
            
            {/* Right side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <WaitlistForm />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}