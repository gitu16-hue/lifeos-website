'use client';

import { motion } from 'framer-motion';
import { Play, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/button';

export function DemoSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm">See It in Action</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Watch <span className="text-gradient">LifeOS</span> Transform
            <br />
            Your Productivity
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how our AI-powered operating system seamlessly integrates with your life
            to optimize every aspect of your day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Video container with glass effect */}
          <div className="glass-card p-2 relative overflow-hidden group cursor-pointer">
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            
            {/* Video thumbnail placeholder */}
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
              
              {/* Animated grid overlay */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }} />
              
              {/* Floating elements animation */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-20 h-20 bg-primary/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  x: [0, -5, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-secondary/20 rounded-full blur-xl"
              />
              
              {/* Play button */}
              <motion.div
                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
                  <div className="relative w-20 h-20 glass rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </motion.div>

              {/* Time indicator */}
              <div className="absolute bottom-4 right-4 glass px-3 py-1 rounded-full text-xs">
                2:34 / 5:12
              </div>

              {/* Progress bar */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '45%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"
              />
            </div>
          </div>

          {/* Video controls mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between mt-6 px-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 glass rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">Play demo</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary border-2 border-background" />
                  ))}
                </div>
                <span className="text-xs text-gray-400">2.5k+ watched</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="group">
              Watch full demo
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'AI-Powered', value: 'Real-time' },
              { label: 'Tasks', value: '1,234 done' },
              { label: 'Goals', value: '87% complete' },
              { label: 'Users', value: '5,000+' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-sm text-gray-400">{stat.label}</div>
                <div className="text-lg font-semibold text-gradient">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}