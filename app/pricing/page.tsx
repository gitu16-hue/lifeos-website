'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Zap, 
  Crown, 
  Sparkles, 
  IndianRupee,
  ArrowRight,
  Star,
  Shield,
  Users,
  Globe,
  Coffee,
  Infinity
} from 'lucide-react';
import { RazorpayButton } from '@/components/ui/razorpay-button';
import { Navbar } from '@/components/ui/navbar';
import { ThreeDBackground } from '@/components/3d/background';
import { Footer } from '@/components/ui/footer';
import Link from 'next/link';

interface Plan {
  id: string;
  name: string;
  price: string;
  inrPrice: string;
  period: string;
  description: string;
  icon: any;
  features: string[];
  gradient: string;
  buttonText: string;
  popular: boolean;
  href: string;
  razorpayAmount?: number; // Make it optional with ?
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    inrPrice: '₹0',
    period: 'forever',
    description: 'Perfect for trying out LifeOS',
    icon: Sparkles,
    features: [
      'Basic AI recommendations',
      'Task management',
      'Goal tracking',
      '3 integrations',
      '7-day history'
    ],
    gradient: 'from-gray-500 to-gray-600',
    buttonText: 'Get Started →',
    popular: false,
    href: '/signup'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    inrPrice: '₹2,499',
    period: 'month',
    description: 'For professionals who want to optimize their life',
    icon: Zap,
    features: [
      'Advanced AI neural network',
      'Unlimited tasks & goals',
      'Pattern recognition',
      '50+ integrations',
      'Unlimited history',
      'Priority support',
      'API access'
    ],
    gradient: 'from-primary to-secondary',
    buttonText: 'Start Free Trial',
    popular: true,
    href: '#',
    razorpayAmount: 2499
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
      'Everything in Pro',
      'Team collaboration',
      'Admin dashboard',
      'SSO & advanced security',
      'Dedicated account manager',
      'Custom AI training',
      'SLA guarantee'
    ],
    gradient: 'from-purple-500 to-pink-500',
    buttonText: 'Contact Sales →',
    popular: false,
    href: '/contact'
  }
];

export default function PricingPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleCardClick = (planId: string) => {
    if (planId === 'pro') {
      const proButton = document.querySelector('#pro-payment-button button');
      if (proButton) {
        (proButton as HTMLButtonElement).click();
      }
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
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Simple Pricing</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your <span className="text-gradient">Plan</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Start free, upgrade as you grow. All plans include a 14-day trial.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const isHovered = hoveredCard === plan.id;
              const isPro = plan.id === 'pro';

              if (isPro) {
                return (
                  <div
                    key={plan.id}
                    onClick={() => handleCardClick(plan.id)}
                    onMouseEnter={() => setHoveredCard(plan.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="relative cursor-pointer group"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative transform transition-all duration-500 ${
                        isHovered ? 'scale-105 -translate-y-2' : ''
                      } z-10`}
                    >
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
                      
                      <div className={`glass-card p-8 h-full flex flex-col relative overflow-hidden border-2 border-primary ${
                        isHovered ? 'shadow-2xl' : ''
                      }`}>
                        {/* Icon */}
                        <div className="relative mb-6">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} p-3 transform transition-all duration-500 ${
                            isHovered ? 'scale-110 rotate-6' : ''
                          }`}>
                            <Icon className="w-full h-full text-white" />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <p className="text-sm text-gray-400 mb-4">{plan.description}</p>
                        
                        <div className="mb-6">
                          <span className="text-4xl font-bold">₹{plan.inrPrice}</span>
                          <span className="text-gray-400 ml-2">/{plan.period}</span>
                        </div>
                        
                        <ul className="space-y-3 mb-8 flex-grow">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300">
                              <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div id="pro-payment-button" onClick={(e) => e.stopPropagation()}>
                          <RazorpayButton 
                            amount={plan.razorpayAmount!} // Use non-null assertion since we know it exists for pro plan
                            planName={plan.name}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              }

              return (
                <Link
                  key={plan.id}
                  href={plan.href}
                  className="block relative group"
                  onMouseEnter={() => setHoveredCard(plan.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative transform transition-all duration-500 ${
                      isHovered ? 'scale-105 -translate-y-2' : ''
                    } ${plan.popular ? 'z-10' : ''}`}
                  >
                    <div className={`glass-card p-8 h-full flex flex-col relative overflow-hidden ${
                      plan.popular ? 'border-2 border-primary' : ''
                    } ${isHovered ? 'shadow-2xl' : ''}`}>
                      
                      {/* Shine effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ${
                        isHovered ? 'translate-x-full' : '-translate-x-full'
                      }`} />

                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} p-3 mb-6 transform transition-all duration-500 ${
                        isHovered ? 'scale-110 rotate-6' : ''
                      }`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-gradient transition-all">{plan.name}</h3>
                      <p className="text-sm text-gray-400 mb-4">{plan.description}</p>
                      
                      <div className="mb-6">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        {plan.period !== 'forever' && plan.period !== 'contact' && (
                          <span className="text-gray-400 ml-2">/{plan.period}</span>
                        )}
                      </div>
                      
                      <ul className="space-y-3 mb-8 flex-grow">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300">
                            <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="w-full py-4 rounded-xl font-semibold text-center glass group-hover:bg-white/10 transition-all">
                        {plan.buttonText}
                      </div>
                    </div>
                  </motion.div>
                </Link>
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
              <Link key={i} href={item.href}>
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