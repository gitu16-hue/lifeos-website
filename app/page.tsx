'use client';  // ← Add this at the top!

import { Navbar } from '../components/ui/navbar';
import { ThreeDBackground } from '../components/3d/background';
import { HeroAI } from '../components/sections/hero-ai';
import { LiveCounter } from '../components/sections/live-counter';
import { FeaturesSection } from '../components/sections/features';
import { DashboardPreview } from '../components/sections/dashboard-preview';
import { WorldMap } from '../components/sections/world-map';
import { AIMetrics } from '../components/sections/ai-metrics';
import { SystemHealth } from '../components/sections/system-health';
import { HowItWorksSection } from '../components/sections/how-it-works';
import { AnimatedDemo } from '../components/sections/animated-demo';
import { TestimonialsSection } from '../components/sections/testimonials';
import { PricingSection } from '../components/sections/pricing';
import { FAQSection } from '../components/sections/faq';
import { CTASection } from '../components/sections/cta';
import { Footer } from '../components/ui/footer';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <ThreeDBackground />
      <Navbar />
      <main>
        {/* Hero - First impression */}
        <HeroAI />
        
        {/* Social Proof - Live counter */}
        <LiveCounter />
        
        {/* Features - Core value proposition */}
        <FeaturesSection />
        
        {/* Dashboard - Visual preview */}
        <DashboardPreview />
        
        {/* Global Presence - World map */}
        <WorldMap />
        
        {/* AI Performance - Technical credibility */}
        <AIMetrics />
        
        {/* System Status - Trust building */}
        <SystemHealth />
        
        {/* How It Works - Education */}
        <HowItWorksSection />
        
        {/* Animated Demo - Interactive product demonstration */}
        <AnimatedDemo />
        
        {/* Testimonials - Social proof */}
        <TestimonialsSection />
        
        {/* Pricing - Conversion */}
        <PricingSection />
        
        {/* FAQ - Objection handling */}
        <FAQSection />
        
        {/* Final CTA - Call to action */}
        <CTASection />
      </main>
      <Footer />
      
      {/* Floating Action Button - Clickable */}
      <Link href="/waitlist">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2 }}
          className="fixed bottom-8 right-8 z-50 group cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-75 group-hover:opacity-100 animate-pulse" />
            <div className="relative w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </>
  );
}