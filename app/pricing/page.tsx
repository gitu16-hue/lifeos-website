'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Zap, 
  Crown, 
  Sparkles, 
  IndianRupee,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Users,
  Globe,
  Rocket,
  Coffee,
  Infinity
} from 'lucide-react';
import { RazorpayButton } from '@/components/ui/razorpay-button';
import { Navbar } from '@/components/ui/navbar';
import { ThreeDBackground } from '@/components/3d/background';
import { Footer } from '@/components/ui/footer';
import Link from 'next/link';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '0',
    inrPrice: '0',
    period: 'forever',
    description: 'Perfect for trying out LifeOS',
    icon: Sparkles,
    features: [
      { text: 'Basic AI recommendations', included: true },
      { text: 'Task management', included: true },
      { text: 'Goal tracking', included: true },
      { text: '3 integrations', included: true },
      { text: '7-day history', included: true },
      { text: 'Advanced analytics', included: false },
      { text: 'Priority support', included: false },
    ],
    gradient: 'from-gray-500 to-gray-600',
    buttonText: 'Get Started',
    popular: false,
    razorpayAmount: 0,
    href: '/signup',
    cta: 'Start Free'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '29',
    inrPrice: '2,499',
    period: 'month',
    description: 'For professionals who want to optimize their life',
    icon: Zap,
    features: [
      { text: 'Advanced AI neural network', included: true },
      { text: 'Unlimited tasks & goals', included: true },
      { text: 'Pattern recognition', included: true },
      { text: '50+ integrations', included: true },
      { text: 'Unlimited history', included: true },
      { text: 'Priority support', included: true },
      { text: 'API access', included: true },
    ],
    gradient: 'from-primary to-secondary',
    buttonText: 'Start Free Trial',
    popular: true,
    razorpayAmount: 2499,
    href: '#',
    cta: 'Pay ₹2,499'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    inrPrice: 'Custom',
    period: 'contact',
    description: 'For teams and organizations',
    icon: Crown,
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Team collaboration', included: true },
      { text: 'Admin dashboard', included: true },
      { text: 'SSO & advanced security', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom AI training', included: true },
      { text: 'SLA guarantee', included: true },
    ],
    gradient: 'from-purple-500 to-pink-500',
    buttonText: 'Contact Sales',
    popular: false,
    razorpayAmount: 0,
    href: '/contact',
    cta: 'Contact Us'
  }
];

export default function PricingPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleCardClick = (planId: string, href: string, e: React.MouseEvent) => {
    // Don't navigate if clicking on a button or interactive element
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' || 
      target.closest('button') ||
      target.tagName === 'A' ||
      target.closest('a') ||
      target.classList.contains('no-click')
    ) {
      return;
    }
    
    if (planId === 'pro') {
      // For Pro plan, trigger Razorpay button
      const proButton = document.querySelector('#pro-payment-button button');
      if (proButton) {
        (proButton as HTMLButtonElement).click();
      }
    } else {
      // For other plans, navigate
      window.location.href = href;
    }
  };

  return (
    <>
      <ThreeDBackground />
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <Link href="/pricing">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 cursor-pointer hover:bg-white/10 transition-all">
                <Rocket className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">Simple Pricing</span>
              </div>
            </Link>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your <span className="text-gradient">Plan</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Start free, upgrade as you grow. All plans include a 14-day trial.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 cursor-pointer ${
                  selectedPlan === 'monthly'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'glass hover:bg-white/10'
                }`}
              >
                <IndianRupee className="w-4 h-4" />
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('annual')}
                className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 cursor-pointer ${
                  selectedPlan === 'annual'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'glass hover:bg-white/10'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Annual (Save 20%)
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const isHovered = hoveredCard === plan.id;
              const isPro = plan.id === 'pro';

              return (
                <div
                  key={plan.id}
                  ref={el => cardRefs.current[plan.id] = el}
                  onClick={(e) => handleCardClick(plan.id, plan.href, e)}
                  className="relative cursor-pointer"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setHoveredCard(plan.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className={`relative transform transition-all duration-500 ${
                      isHovered ? 'scale-105 -translate-y-2' : ''
                    } ${plan.popular ? 'z-10' : ''}`}
                  >
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-0 rounded-2xl blur-xl transition-opacity duration-500 ${
                      isHovered ? 'opacity-20' : ''
                    }`} />

                    {/* Popular badge */}
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Most Popular
                          <Star className="w-3 h-3" />
                        </div>
                      </div>
                    )}
                    
                    {/* Main card */}
                    <div className={`glass-card p-8 h-full flex flex-col relative overflow-hidden ${
                      plan.popular ? 'border-2 border-primary' : ''
                    } ${isHovered ? 'shadow-2xl' : ''}`}>
                      
                      {/* Shine effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ${
                        isHovered ? 'translate-x-full' : '-translate-x-full'
                      }`} />

                      {/* Icon */}
                      <div className="relative mb-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} p-3 transform transition-all duration-500 ${
                          isHovered ? 'scale-110 rotate-6' : ''
                        }`}>
                          <Icon className="w-full h-full text-white" />
                        </div>
                      </div>
                      
                      {/* Title & Description */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                        <p className="text-sm text-gray-400">{plan.description}</p>
                      </div>
                      
                      {/* Price */}
                      <div className="mb-6">
                        <span className="text-4xl font-bold">
                          {isPro ? `₹${plan.inrPrice}` : plan.price === '0' ? '$0' : `$${plan.price}`}
                        </span>
                        {plan.period !== 'forever' && plan.period !== 'contact' && (
                          <span className="text-gray-400 ml-2">/{plan.period}</span>
                        )}
                      </div>
                      
                      {/* Features */}
                      <ul className="space-y-3 mb-8 flex-grow">
                        {plan.features.map((feature, i) => (
                          <li key={i} className={`flex items-start gap-2 ${
                            feature.included ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                              feature.included ? 'text-secondary' : 'text-gray-600'
                            }`} />
                            <span className="text-sm">{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* CTA Button */}
                      {isPro ? (
                        <div id="pro-payment-button" onClick={(e) => e.stopPropagation()}>
                          <RazorpayButton 
                            amount={plan.razorpayAmount} 
                            planName={plan.name}
                          />
                        </div>
                      ) : (
                        <Link href={plan.href} onClick={(e) => e.stopPropagation()}>
                          <div className={`w-full py-4 rounded-xl font-semibold text-center transition-all flex items-center justify-center gap-2 group ${
                            plan.popular
                              ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                              : 'glass hover:bg-white/10'
                          }`}>
                            {plan.buttonText}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      )}

                      {/* Floating elements on hover */}
                      {isHovered && (
                        <>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30"
                          />
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full blur-xl opacity-30"
                          />
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-16"
          >
            {[
              { icon: Shield, text: '30-day money-back', href: '/guarantee' },
              { icon: Users, text: '5,000+ active users', href: '/community' },
              { icon: Globe, text: 'Global coverage', href: '/coverage' },
              { icon: Coffee, text: 'Free forever plan', href: '/free-plan' },
              { icon: Infinity, text: 'Cancel anytime', href: '/cancel-policy' },
            ].map((item, i) => (
              <Link key={i} href={item.href} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors cursor-pointer group">
                  <item.icon className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                  <span>{item.text}</span>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* FAQ Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link href="/faq" className="text-secondary hover:text-white transition-colors inline-flex items-center gap-1 group">
              Have questions? Check our FAQ
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}