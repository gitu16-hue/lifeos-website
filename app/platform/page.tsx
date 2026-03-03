'use client';

import { Navbar } from '@/components/ui/navbar';
import { ThreeDBackground } from '@/components/3d/background';
import { Footer } from '@/components/ui/footer';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Cloud, 
  Shield, 
  Zap, 
  Network, 
  Layers,
  Lock,
  Activity,
  BarChart3,
  Globe,
  Server,
  HardDrive,
  Gauge
} from 'lucide-react';
import Link from 'next/link';

export default function PlatformPage() {
  return (
    <>
      <ThreeDBackground />
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Cpu className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">The Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Built for <span className="text-gradient">Scale</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Enterprise-grade infrastructure powering millions of neural connections across the globe
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20"
          >
            {[
              { label: 'Uptime', value: '99.97%', icon: Activity },
              { label: 'Response Time', value: '<47ms', icon: Gauge },
              { label: 'Active Nodes', value: '1.2M', icon: Server },
              { label: 'Data Processed', value: '2.4TB/s', icon: HardDrive }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass p-6 text-center rounded-xl group hover:scale-105 transition-all"
              >
                <stat.icon className="w-6 h-6 text-secondary mx-auto mb-3 group-hover:rotate-12 transition-transform" />
                <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Architecture Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-center mb-12"
          >
            System Architecture
          </motion.h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { 
                icon: Database, 
                title: 'Neural Database', 
                description: 'Distributed vector database for instant pattern recognition across billions of data points',
                stats: '1.2M ops/s',
                gradient: 'from-purple-500 to-pink-500'
              },
              { 
                icon: Cloud, 
                title: 'Edge Network', 
                description: 'Global CDN with 50+ edge locations ensuring <10ms latency worldwide',
                stats: '<10ms latency',
                gradient: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: Shield, 
                title: 'Security Layer', 
                description: 'Military-grade encryption with zero-knowledge proofs and quantum-resistant algorithms',
                stats: 'AES-256',
                gradient: 'from-green-500 to-teal-500'
              },
              { 
                icon: Zap, 
                title: 'Real-time Engine', 
                description: 'Sub-millisecond response times for instant optimization and neural processing',
                stats: '<1ms',
                gradient: 'from-yellow-500 to-orange-500'
              },
              { 
                icon: Network, 
                title: 'Mesh Network', 
                description: 'Decentralized node architecture with automatic failover for maximum reliability',
                stats: '99.99% uptime',
                gradient: 'from-red-500 to-pink-500'
              },
              { 
                icon: Layers, 
                title: 'API Gateway', 
                description: 'RESTful and GraphQL APIs with intelligent rate limiting and request caching',
                stats: '8.7k req/s',
                gradient: 'from-indigo-500 to-purple-500'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass-card p-6 group hover:scale-105 transition-all cursor-pointer"
                  onClick={() => window.location.href = `/platform/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.gradient} p-3 flex-shrink-0 group-hover:rotate-6 transition-transform`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-1 group-hover:text-gradient transition-all">{item.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-secondary font-semibold">{item.stats}</span>
                        <span className="text-xs text-gray-500 group-hover:text-white transition-colors">Learn more →</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Global Coverage Map Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 glass-card p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Global Edge Network</h2>
            <p className="text-gray-400 mb-6">
              50+ edge locations across 6 continents ensuring low-latency access worldwide
            </p>
            <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-32 h-32 text-secondary opacity-50 animate-pulse" />
              </div>
              {/* Animated dots representing edge locations */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-secondary rounded-full"
                  animate={{
                    x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                    y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-20"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to scale with LifeOS?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of developers and enterprises building on the most advanced AI platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/waitlist">
                <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold hover:opacity-90 transition-all flex items-center gap-2 mx-auto">
                  Deploy on LifeOS
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 glass rounded-xl font-semibold hover:bg-white/10 transition-all">
                  Contact Sales
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-secondary" />
              <span>SOC2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-secondary" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-secondary" />
              <span>99.97% Uptime SLA</span>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}