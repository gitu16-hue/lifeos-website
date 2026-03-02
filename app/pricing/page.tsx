'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Sparkles, IndianRupee } from 'lucide-react';
import { stripePromise } from '@/lib/stripe/client';
import { RazorpayButton } from '@/components/ui/razorpay-button';
import { Navbar } from '@/components/ui/navbar';
import { ThreeDBackground } from '@/components/3d/background';
import { Footer } from '@/components/ui/footer';

const plans = [
  {
    id: 'price_starter',
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
    buttonText: 'Get Started',
    popular: false,
    priceId: null, // free plan
    razorpayAmount: 0
  },
  {
    id: 'price_pro_monthly',
    name: 'Pro',
    price: '$29',
    inrPrice: '₹2,499',
    period: 'per month',
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
    buttonText: 'Subscribe Now',
    popular: true,
    priceId: 'price_pro_monthly', // Stripe Price ID
    razorpayAmount: 2499 // Amount in INR
  },
  {
    id: 'price_enterprise',
    name: 'Enterprise',
    price: 'Custom',
    inrPrice: 'Custom',
    period: 'contact us',
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
    buttonText: 'Contact Sales',
    popular: false,
    priceId: null,
    razorpayAmount: 0
  }
];

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'razorpay'>('stripe');

  const handleSubscribe = async (priceId: string, planName: string) => {
    if (!priceId) {
      // Free plan - redirect to signup
      window.location.href = '/signup';
      return;
    }

    try {
      setIsLoading(planName);
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/payment/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const { sessionId } = await response.json();
      
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe error:', error);
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleContactSales = () => {
    window.location.href = '/contact';
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Simple, <span className="text-gradient">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Start free, upgrade as you grow. All plans include a 14-day trial.
            </p>

            {/* Currency Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setPaymentMethod('stripe')}
                className={`px-6 py-2 rounded-full transition-all ${
                  paymentMethod === 'stripe'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'glass hover:bg-white/10'
                }`}
              >
                💵 USD
              </button>
              <button
                onClick={() => setPaymentMethod('razorpay')}
                className={`px-6 py-2 rounded-full transition-all flex items-center gap-1 ${
                  paymentMethod === 'razorpay'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'glass hover:bg-white/10'
                }`}
              >
                <IndianRupee className="w-4 h-4" /> INR
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const isLoadingPlan = isLoading === plan.name;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative ${plan.popular ? 'scale-105 z-10' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className={`glass-card p-8 h-full flex flex-col ${plan.popular ? 'border-2 border-primary' : ''}`}>
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} p-3 mb-6`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    
                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    
                    {/* Price - Conditional based on payment method */}
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        {paymentMethod === 'stripe' ? plan.price : plan.inrPrice}
                      </span>
                      {plan.period && <span className="text-gray-400 ml-2">/{plan.period}</span>}
                    </div>
                    
                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Button - Conditional rendering */}
                    {plan.name === 'Pro' && paymentMethod === 'razorpay' ? (
                      <RazorpayButton 
                        amount={plan.razorpayAmount} 
                        planName={plan.name}
                        disabled={isLoadingPlan}
                      />
                    ) : (
                      <button
                        onClick={() => plan.name === 'Enterprise' 
                          ? handleContactSales() 
                          : handleSubscribe(plan.priceId!, plan.name)
                        }
                        disabled={isLoadingPlan}
                        className={`w-full py-4 rounded-xl font-semibold transition-all ${
                          plan.popular
                            ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                            : 'glass hover:bg-white/10'
                        } ${isLoadingPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isLoadingPlan ? 'Processing...' : plan.buttonText}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Payment Methods Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Stripe: USD (International)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Razorpay: INR (India)</span>
            </div>
          </motion.div>

          {/* Money-back guarantee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500">
              ✦ 30-day money-back guarantee ✦ No questions asked ✦
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}