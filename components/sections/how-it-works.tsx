'use client';

import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Brain, 
  Zap, 
  TrendingUp,
  Sparkles 
} from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: '1. Connect Your Life',
    description: 'Sync your calendars, tasks, notes, and goals. LifeOS learns your patterns and preferences.',
    gradient: 'from-purple-500 to-blue-500'
  },
  {
    icon: Brain,
    title: '2. AI Learns Your Patterns',
    description: 'Our neural network analyzes your behavior, energy levels, and productivity patterns.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Zap,
    title: '3. Get Daily Optimization',
    description: 'Receive AI-powered recommendations for your ideal schedule, tasks, and focus time.',
    gradient: 'from-cyan-500 to-green-500'
  },
  {
    icon: TrendingUp,
    title: '4. Track & Improve',
    description: 'Monitor your progress with detailed analytics and continuously improve.',
    gradient: 'from-green-500 to-teal-500'
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="text-gradient">LifeOS</span> Works
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get started in minutes. Let AI handle the complexity while you focus on what matters.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="glass-card p-8 text-center group hover:scale-105 transition-transform">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${step.gradient} p-4 mb-6 group-hover:rotate-6 transition-transform`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                    
                    {/* Step Number */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}