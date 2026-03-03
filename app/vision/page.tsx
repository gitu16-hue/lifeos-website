import { Navbar } from '@/components/ui/navbar';
import { ThreeDBackground } from '@/components/3d/background';
import { Footer } from '@/components/ui/footer';
import { motion } from 'framer-motion';
import { Eye, Target, Brain, Globe, Rocket, Users, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

export default function VisionPage() {
  return (
    <>
      <ThreeDBackground />
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Eye className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Our Vision</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The Future of <span className="text-gradient">Human-AI</span> Collaboration
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're building a world where AI doesn't just assist you—it becomes an extension of your mind,
              helping you achieve what was previously impossible.
            </p>
          </motion.div>

          {/* Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {[
              {
                icon: Brain,
                title: 'Neural Integration',
                description: 'Seamless integration between human consciousness and artificial intelligence.',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Globe,
                title: 'Global Accessibility',
                description: 'Making advanced AI available to everyone, everywhere, regardless of background.',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Rocket,
                title: 'Exponential Growth',
                description: 'Accelerating human potential through continuous learning and adaptation.',
                gradient: 'from-green-500 to-teal-500'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 text-center group hover:scale-105 transition-all"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${item.gradient} p-3 mb-6 group-hover:rotate-6 transition-transform`}>
                  <item.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Manifesto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto glass-card p-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Our Manifesto</h2>
            <div className="space-y-4 text-gray-300">
              <p>We believe that technology should serve humanity, not the other way around.</p>
              <p>LifeOS was born from a simple observation: your potential is limitless, but your tools are not. Every day, you switch between countless apps, struggle with fragmented information, and waste precious time on routine decisions.</p>
              <p>We imagined a different reality—one where an AI truly understands you, anticipates your needs, and handles the complexity so you can focus on what matters.</p>
              <p>This isn't just another productivity tool. It's the operating system for your life.</p>
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              <Link href="/waitlist">
                <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold hover:opacity-90 transition-all">
                  Join the Movement
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}