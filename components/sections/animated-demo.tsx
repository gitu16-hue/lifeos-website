'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Brain, 
  Zap, 
  Target, 
  Clock, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  Activity
} from 'lucide-react';

export function AnimatedDemo() {
  const [step, setStep] = useState(0);
  
  const steps = [
    {
      title: "AI Learns Your Patterns",
      description: "LifeOS analyzes your behavior and preferences",
      icon: Brain,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Optimizes Your Schedule",
      description: "Real-time adjustments for peak productivity",
      icon: Clock,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Tracks Your Goals",
      description: "AI-powered progress monitoring",
      icon: Target,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Delivers Insights",
      description: "Personalized recommendations daily",
      icon: Sparkles,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See <span className="text-gradient">LifeOS</span> in Action
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Watch how our AI transforms your daily workflow
          </p>
        </motion.div>

        {/* Animated Demo Container */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1 mx-1 rounded-full bg-white/10 overflow-hidden"
                >
                  <motion.div
                    className={`h-full bg-gradient-to-r ${steps[i].color}`}
                    initial={{ width: 0 }}
                    animate={{ width: i === step ? '100%' : i < step ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              ))}
            </div>

            {/* Animated Content */}
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="text-center mb-8">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${steps[step].color} mb-6`}>
                      {steps[step].icon && <steps[step].icon className="w-12 h-12 text-white" />}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{steps[step].title}</h3>
                    <p className="text-gray-400">{steps[step].description}</p>
                  </div>

                  {/* Animated Dashboard Preview */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-4 rounded-xl"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-secondary" />
                          <div className="h-2 w-20 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-secondary"
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.random() * 60 + 40}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-gradient">{Math.floor(Math.random() * 30 + 70)}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Success Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 glass p-4 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-gray-300">AI has optimized your schedule for today</span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === step 
                      ? `w-8 bg-gradient-to-r ${steps[i].color}` 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              ✦ Interactive demo showing 4 key features ✦
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}