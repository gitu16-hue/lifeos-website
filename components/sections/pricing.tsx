'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import Button from '../ui/button';

const plans = [
  {
    name: 'Starter',
    price: '$0',
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
    popular: false
  },
  {
    name: 'Pro',
    price: '$29',
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
    buttonText: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
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
    popular: false
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
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
            <span className="text-sm">Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose your <span className="text-gradient">plan</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Start free, upgrade as you grow. All plans include a 14-day trial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                  {/* Icon with glow effect */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} p-3 relative z-10`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${plan.gradient} blur-xl opacity-50`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-gray-400 ml-2">/{plan.period}</span>}
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    size="lg" 
                    className="w-full group"
                  >
                    {plan.buttonText}
                  </Button>

                  {/* Hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl pointer-events-none`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Money-back guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-4 p-6 glass rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-gray-300">30-day money-back guarantee</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span className="text-gray-300">No credit card required</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Cancel anytime</span>
            </div>
          </div>
        </motion.div>

        {/* FAQ teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500">
            Have questions? Check our <a href="#faq" className="text-primary hover:text-secondary transition-colors">FAQ</a> or {' '}
            <a href="/contact" className="text-primary hover:text-secondary transition-colors">contact us</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}