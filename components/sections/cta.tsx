'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/button';

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-16 max-w-4xl mx-auto text-center relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl animate-pulse animation-delay-2000" />
          </div>
          
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm">Limited Time</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to transform
              <br />
              <span className="text-gradient">your life?</span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join 5,000+ early adopters who are already experiencing 
              the future of personal productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="group">
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Schedule a Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-8 text-sm text-gray-500">
              <span className="flex items-center gap-1">
              </span>
              <span className="w-1 h-1 bg-gray-500 rounded-full" />
              <span className="flex items-center gap-1">
              </span>
              <span className="w-1 h-1 bg-gray-500 rounded-full" />
              <span className="flex items-center gap-1">
                <span>🔒</span> Cancel anytime
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}