'use client'; 
import { Navbar } from '@/components/ui/navbar'; 
import { ThreeDBackground } from '@/components/3d/background'; 
import { Footer } from '@/components/ui/footer'; 
import { motion } from 'framer-motion'; 
import { Brain, Target, Clock, BarChart3, Sparkles, Zap, Shield, Users, ArrowRight } from 'lucide-react'; 
import Link from 'next/link'; 
 
export default function ProductPage() { 
  return ( 
    <> 
      <ThreeDBackground /> 
      <Navbar /> 
      <main className="pt-32 pb-20 min-h-screen"> 
        <div className="container mx-auto px-6"> 
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center mb-20" 
          > 
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"> 
              <Sparkles className="w-4 h-4 text-secondary" /> 
              <span className="text-sm font-medium">The Product</span> 
            </div> 
            <h1 className="text-5xl md:text-6xl font-bold mb-6"> 
              Your AI <span className="text-gradient">Co-pilot</span> 
            </h1> 
            <p className="text-xl text-gray-400 max-w-3xl mx-auto"> 
              LifeOS isn't just another app-it's your personal AI that learns, adapts, and evolves with you. 
            </p> 
          </motion.div> 
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20"> 
            {[ 
              { icon: Brain, title: 'Neural Learning', description: 'Advanced AI that understands your patterns with 99.9% accuracy.', gradient: 'from-purple-500 to-pink-500' }, 
              { icon: Target, title: 'Goal Automation', description: 'Break down ambitious goals into daily actionable steps.', gradient: 'from-blue-500 to-cyan-500' }, 
              { icon: Clock, title: 'Time Optimization', description: 'Intelligent scheduling that adapts to your energy levels.', gradient: 'from-green-500 to-teal-500' }, 
              { icon: BarChart3, title: 'Growth Analytics', description: 'Deep insights into your progress with predictive analytics.', gradient: 'from-yellow-500 to-orange-500' } 
            ].map((feature, i) => ( 
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }} 
                className="glass-card p-8 group hover:scale-105 transition-all" 
              > 
                <div className="flex items-start gap-4"> 
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 flex-shrink-0 group-hover:rotate-6 transition-transform`}> 
                    <feature.icon className="w-full h-full text-white" /> 
                  </div> 
                  <div> 
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3> 
                    <p className="text-gray-400">{feature.description}</p> 
                  </div> 
                </div> 
              </motion.div> 
            ))} 
          </div> 
 
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.6 }} 
            className="text-center mt-20" 
          > 
            <Link href="/pricing"> 
              <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold hover:opacity-90 transition-all flex items-center gap-2 mx-auto"> 
                Start Your Journey 
                <ArrowRight className="w-5 h-5" /> 
              </button> 
            </Link> 
          </motion.div> 
        </div> 
      </main> 
      <Footer /> 
    </> 
  ); 
} 
