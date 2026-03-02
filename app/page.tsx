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
import { AnimatedDemo } from '../components/sections/animated-demo'; // Changed from DemoSection
import { TestimonialsSection } from '../components/sections/testimonials';
import { PricingSection } from '../components/sections/pricing';
import { FAQSection } from '../components/sections/faq';
import { CTASection } from '../components/sections/cta';
import { Footer } from '../components/ui/footer';

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
        <AnimatedDemo /> {/* Changed from DemoSection */}
        
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
    </>
  );
}