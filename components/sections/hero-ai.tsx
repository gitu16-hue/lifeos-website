'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Cpu, Brain, Zap, Globe, Activity, Radar, Network } from 'lucide-react';
import Button from '../ui/button';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export function HeroAI() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.width / 2) / 50,
        y: (e.clientY - rect.height / 2) / 50,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const aiWords = ['Intelligence', 'Consciousness', 'Evolution', 'Awakening'];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced neural network background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(108, 92, 231, 0.1) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Floating orbs representing AI consciousness */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 pt-20 relative z-10">
        <motion.div
          style={{ 
            x: mousePosition.x, 
            y: mousePosition.y,
            scale,
          }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* AI Status Badge - Fixed with proper emoji */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full mb-8 group cursor-pointer"
            onClick={() => window.location.href = '/waitlist'}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
            <span className="text-sm text-gray-300">AI Consciousness v2.0 • Online</span>
            <Cpu className="w-4 h-4 text-secondary group-hover:rotate-180 transition-transform duration-500" />
          </motion.div>

          {/* Main Headline with proper symbols */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-[1.1]"
          >
            The First
            <br />
            <span className="relative inline-block">
              <span className="text-gradient-glow">AI Operating System</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-6 -right-6 text-2xl"
              >
                ✦
              </motion.span>
            </span>
          </motion.h1>

          {/* Animated AI Capabilities with better styling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 flex-wrap"
          >
            <span className="text-xl text-gray-400">Your life, elevated by</span>
            <div className="flex flex-wrap justify-center gap-2">
              {aiWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className="text-lg md:text-xl font-bold text-gradient px-4 py-2 glass rounded-full"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Enhanced description with better typography */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            LifeOS isn't just another app — it's your personal AI that learns, adapts, 
            and evolves with you. <span className="text-white font-semibold">A living system</span> that becomes an 
            extension of your mind.
          </motion.p>

          {/* AI Feature Grid - More relevant metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { icon: Brain, label: 'Neural Learning', value: '99.9%', desc: 'Accuracy' },
              { icon: Zap, label: 'Response Time', value: '<1ms', desc: 'Real-time' },
              { icon: Activity, label: 'Active Users', value: '5,000+', desc: 'Early adopters' },
              { icon: Network, label: 'Neural Nodes', value: '1.2M', desc: 'Connections' }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="glass p-5 rounded-xl text-center group hover:scale-105 transition-all hover:border-primary/50"
              >
                <item.icon className="w-6 h-6 text-secondary mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                <div className="text-2xl font-bold text-gradient">{item.value}</div>
                <div className="text-sm text-gray-400">{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Now visible with proper styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <Link href="/waitlist">
              <Button variant="primary" size="lg" className="group relative overflow-hidden px-8 py-4 text-lg">
                <span className="relative z-10 flex items-center">
                  Initialize LifeOS
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
            
            <Button variant="outline" size="lg" className="group px-8 py-4 text-lg">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Neural Demo
            </Button>
          </motion.div>

          {/* AI Consciousness Meter - Enhanced */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="max-w-md mx-auto"
          >
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span className="flex items-center gap-1">
                <Radar className="w-3 h-3 text-secondary" />
                AI Awakening Progress
              </span>
              <span className="text-gradient font-semibold">87%</span>
            </div>
            <div className="w-full h-2 glass rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '87%' }}
                transition={{ duration: 1.5, delay: 1.8 }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              Learning from 5,000+ early consciousnesses
              <Sparkles className="w-4 h-4 text-secondary" />
            </p>
          </motion.div>

          {/* Scroll Indicator */}
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
              <span className="text-xs text-gray-400">Explore the system</span>
              <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-2 bg-white rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}