'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles, ChevronDown } from 'lucide-react';
import Button from '../ui/button';
import { WaitlistCounter } from '../ui/waitlist-counter';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function HeroSectionAdvanced() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const words = ['Design', 'Execute', 'Optimize'];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      
      {/* Additional floating orbs for depth */}
      <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float animation-delay-2000" />
      
      <div className="container mx-auto px-6 pt-20 relative">
        <motion.div
          style={{ x: mousePosition.x, y: mousePosition.y }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full mb-8 group hover:bg-white/10 transition-all cursor-pointer"
            onClick={() => window.location.href = '/waitlist'}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
            <span className="text-sm text-gray-300">Introducing LifeOS 2.0</span>
            <Sparkles className="w-4 h-4 text-secondary group-hover:rotate-12 transition-transform" />
          </motion.div>

          {/* Main headline with animated words */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-[1.1]"
          >
            The Operating System
            <br />
            <span className="text-gradient-glow relative inline-block">
              For Your Future Self
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-6 -right-6 text-2xl"
              >
                ✨
              </motion.span>
            </span>
          </motion.h1>

          {/* Animated text carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 mb-8 flex-wrap"
          >
            <span className="text-xl text-gray-400">Your AI co-pilot that will</span>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              {words.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className="text-xl font-bold text-gradient mx-1"
                >
                  {word}
                  {index < words.length - 1 && ','}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            LifeOS unifies your goals, work, and growth into a single intelligence layer.
            <br className="hidden md:block" />
            <span className="text-white/80">The first AI-native platform that truly understands you.</span>
          </motion.p>

          {/* CTA Buttons with animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <Link href="/waitlist">
              <Button variant="primary" size="lg" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Join the waitlist
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch film
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-secondary"
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </Button>
          </motion.div>

          {/* Social proof with animated counters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary border-2 border-background"
                  />
                ))}
              </div>
              <WaitlistCounter />
            </div>

            {/* Live counter animation */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 1.5 }}
              className="w-64 h-1 bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ duration: 1.5, delay: 1.8 }}
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              />
            </motion.div>

            {/* Animated companies bar */}
            <div className="w-full max-w-4xl">
              <p className="text-sm text-gray-500 mb-4">Trusted by innovators from</p>
              <div className="flex flex-wrap justify-center gap-8 opacity-50">
                {['OpenAI', 'Google', 'Microsoft', 'Apple', 'Meta'].map((company, index) => (
                  <motion.span
                    key={company}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className="text-lg font-semibold text-gray-400"
                  >
                    {company}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            style={{ opacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <span className="text-sm text-gray-400">Scroll to explore</span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}