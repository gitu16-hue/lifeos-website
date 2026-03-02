'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Shield, 
  Zap, 
  Target, 
  BarChart3, 
  Clock,
  Sparkles,
  Users,
  Rocket,
  ArrowRight,
  Globe,
  Lock,
  Cpu,
  Gauge,
  Network,
  Workflow,
  Star,
  Trophy,
  TrendingUp,
  Eye,
  Activity,
  Award,
  Gem,
  Crown,
  Layers,
  Code,
  Database,
  Cloud,
  Fingerprint,
  Key,
  Scan,
  Radar,
  Satellite,
  Radio,
  Wifi,
  Cable,
  Server,
  HardDrive,
  CpuIcon
} from 'lucide-react';

const features = [
  {
    id: 1,
    icon: Brain,
    title: 'Neural Memory',
    description: 'Advanced neural networks that learn your patterns with unprecedented accuracy',
    gradient: 'from-purple-500 via-pink-500 to-orange-500',
    stats: '99.9%',
    statLabel: 'Accuracy',
    benefits: [
      { icon: Sparkles, text: 'Pattern recognition with 99.9% precision' },
      { icon: Eye, text: 'Real-time context awareness' },
      { icon: Star, text: 'Personalized neural insights' }
    ],
    metric: '2.3M',
    metricLabel: 'Patterns learned',
    color: 'purple',
    details: 'Our neural network processes millions of data points to understand your unique workflow, predicting needs before they arise.'
  },
  {
    id: 2,
    icon: Zap,
    title: 'Real-time Optimization',
    description: 'Dynamic scheduling that adapts to your energy and focus in real-time',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    stats: '2.5x',
    statLabel: 'Productivity',
    benefits: [
      { icon: Activity, text: 'Energy mapping & optimization' },
      { icon: Radar, text: 'Focus scheduling AI' },
      { icon: Zap, text: 'Dynamic rescheduling' }
    ],
    metric: '32h',
    metricLabel: 'Time saved/week',
    color: 'orange',
    details: 'Continuous analysis of your productivity patterns enables real-time schedule adjustments for peak performance.'
  },
  {
    id: 3,
    icon: Shield,
    title: 'Privacy First',
    description: 'Military-grade encryption with zero-knowledge architecture',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    stats: '100%',
    statLabel: 'Private',
    benefits: [
      { icon: Lock, text: 'End-to-end encryption' },
      { icon: Fingerprint, text: 'Zero-knowledge proof' },
      { icon: Key, text: 'Self-hosted option' }
    ],
    metric: 'AES-256',
    metricLabel: 'Encryption',
    color: 'green',
    details: 'Your data never leaves your control. Our zero-knowledge architecture ensures complete sovereignty.'
  },
  {
    id: 4,
    icon: Target,
    title: 'Strategic Planning',
    description: 'AI-powered roadmap generation from vision to execution',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    stats: '94%',
    statLabel: 'Goal completion',
    benefits: [
      { icon: Workflow, text: 'Vision breakdown into steps' },
      { icon: Satellite, text: 'Milestone tracking' },
      { icon: TrendingUp, text: 'Adaptive planning AI' }
    ],
    metric: '3.2x',
    metricLabel: 'Faster execution',
    color: 'blue',
    details: 'Break down ambitious goals into daily actionable steps with AI-powered roadmap generation.'
  },
  {
    id: 5,
    icon: BarChart3,
    title: 'Growth Analytics',
    description: 'Deep insights into your progress and performance patterns',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    stats: 'Real-time',
    statLabel: 'Tracking',
    benefits: [
      { icon: Gauge, text: 'Performance metrics dashboard' },
      { icon: TrendingUp, text: 'Trend analysis AI' },
      { icon: Scan, text: 'Predictive insights' }
    ],
    metric: '47',
    metricLabel: 'Data points/sec',
    color: 'indigo',
    details: 'Comprehensive analytics that reveal hidden patterns in your productivity and growth.'
  },
  {
    id: 6,
    icon: Clock,
    title: 'Time Mastery',
    description: 'AI-optimized scheduling that respects your natural rhythms',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    stats: '32h',
    statLabel: 'Saved/week',
    benefits: [
      { icon: Cpu, text: 'Deep work sessions' },
      { icon: Radio, text: 'Break optimization' },
      { icon: Cable, text: 'Energy alignment' }
    ],
    metric: '87%',
    metricLabel: 'Focus time',
    color: 'cyan',
    details: 'Intelligent time blocking that adapts to your energy levels throughout the day.'
  },
  {
    id: 7,
    icon: Globe,
    title: 'Ecosystem Integration',
    description: 'Seamless connection with your entire digital life',
    gradient: 'from-teal-500 via-green-500 to-lime-500',
    stats: '50+',
    statLabel: 'Integrations',
    benefits: [
      { icon: Cloud, text: 'API-first architecture' },
      { icon: Wifi, text: 'Webhook support' },
      { icon: Cable, text: 'Zapier integration' }
    ],
    metric: '24/7',
    metricLabel: 'Sync',
    color: 'teal',
    details: 'Connect with your favorite tools through our extensive integration ecosystem.'
  },
  {
    id: 8,
    icon: Network,
    title: 'Knowledge Graph',
    description: 'Dynamic connection of ideas, projects, and goals',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    stats: '∞',
    statLabel: 'Connections',
    benefits: [
      { icon: Database, text: 'Semantic search' },
      { icon: Layers, text: 'Idea linking' },
      { icon: Code, text: 'Context mapping' }
    ],
    metric: '1.2M',
    metricLabel: 'Nodes',
    color: 'pink',
    details: 'Build a personal knowledge graph that connects every aspect of your work and life.'
  },
  {
    id: 9,
    icon: Gauge,
    title: 'Performance Optimization',
    description: 'Continuous learning system that eliminates bottlenecks',
    gradient: 'from-orange-500 via-red-500 to-rose-500',
    stats: '40%',
    statLabel: 'Faster',
    benefits: [
      { icon: Scan, text: 'Bottleneck detection' },
      { icon: Workflow, text: 'Workflow smoothing' },
      { icon: Rocket, text: 'Automation suggestions' }
    ],
    metric: '99.97%',
    metricLabel: 'Uptime',
    color: 'orange',
    details: 'Identify and eliminate productivity bottlenecks with AI-powered workflow analysis.'
  }
];

export function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [activeMetric, setActiveMetric] = useState<string>('accuracy');
  const containerRef = useRef<HTMLDivElement>(null);

  // Animated counters
  const accuracyCount = useMotionValue(0);
  const roundedAccuracy = useTransform(accuracyCount, latest => Math.round(latest * 10) / 10);
  
  const productivityCount = useMotionValue(0);
  const roundedProductivity = useTransform(productivityCount, latest => Math.round(latest * 10) / 10);
  
  const privacyCount = useMotionValue(0);
  const roundedPrivacy = useTransform(privacyCount, latest => Math.round(latest));

  useEffect(() => {
    accuracyCount.set(0);
    animate(accuracyCount, 99.9, { duration: 2, ease: "easeOut" });
    
    productivityCount.set(0);
    animate(productivityCount, 2.5, { duration: 2, ease: "easeOut", delay: 0.3 });
    
    privacyCount.set(0);
    animate(privacyCount, 100, { duration: 2, ease: "easeOut", delay: 0.6 });
  }, [accuracyCount, productivityCount, privacyCount]);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Advanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(108,92,231,0.3) 0%, transparent 30%),
          radial-gradient(circle at 80% 70%, rgba(0,245,212,0.3) 0%, transparent 30%)
        `,
      }} />
      
      {/* Neural network grid */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(108,92,231,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,212,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full mb-4">
            <Cpu className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-xs font-medium">Neural Capabilities</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Advanced <span className="text-gradient">AI Features</span>
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Powered by cutting-edge neural networks that evolve with you
          </p>
        </motion.div>

        {/* Live Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          {[
            { 
              icon: Brain, 
              label: 'Accuracy', 
              value: roundedAccuracy, 
              unit: '%', 
              gradient: 'from-purple-500 to-pink-500',
              color: 'purple'
            },
            { 
              icon: Zap, 
              label: 'Productivity Boost', 
              value: roundedProductivity, 
              unit: 'x', 
              gradient: 'from-yellow-500 to-orange-500',
              color: 'orange'
            },
            { 
              icon: Shield, 
              label: 'Privacy', 
              value: roundedPrivacy, 
              unit: '%', 
              gradient: 'from-green-500 to-teal-500',
              color: 'green'
            }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass p-4 rounded-xl flex items-center gap-4 group hover:scale-105 transition-all"
              onMouseEnter={() => setActiveMetric(metric.label.toLowerCase())}
              onMouseLeave={() => setActiveMetric('accuracy')}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.gradient} p-2.5 group-hover:rotate-6 transition-transform`}>
                <metric.icon className="w-full h-full text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient">
                  <motion.span>{metric.value}</motion.span>{metric.unit}
                </div>
                <div className="text-xs text-gray-400">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredFeature === feature.id;
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredFeature(feature.id)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="group relative"
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-all duration-500`} />
                
                {/* Main card */}
                <div className="relative glass-card p-6 h-full flex flex-col cursor-pointer transform transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1">
                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-bl-full transition-opacity duration-500`} />
                  
                  {/* Icon with animated glow */}
                  <div className="relative mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${feature.gradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  </div>

                  {/* Title and description */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Benefits list with animations */}
                  <div className="space-y-2 mb-4 flex-grow">
                    {feature.benefits.map((benefit, i) => {
                      const BenefitIcon = benefit.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          className="flex items-center gap-2 text-xs text-gray-300"
                        >
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${feature.gradient} p-1 flex-shrink-0`}>
                            <BenefitIcon className="w-3 h-3 text-white" />
                          </div>
                          <span>{benefit.text}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Stats and metrics */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`text-2xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                          {feature.stats}
                        </div>
                        <div className="text-xs text-gray-500">{feature.statLabel}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">{feature.metric}</div>
                        <div className="text-xs text-gray-500">{feature.metricLabel}</div>
                      </div>
                    </div>
                  </div>

                  {/* Hidden details on hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={isHovered ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-gray-400 mt-3 italic border-t border-white/10 pt-3">
                      {feature.details}
                    </p>
                  </motion.div>

                  {/* Interactive arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${feature.gradient} p-2`}>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 glass p-6 rounded-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Trophy, label: 'Active Users', value: '5,000+' },
              { icon: Award, label: 'Accuracy Rate', value: '99.9%' },
              { icon: Gem, label: 'Time Saved', value: '32h/week' },
              { icon: Crown, label: 'Enterprise Ready', value: 'Yes' }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <stat.icon className="w-5 h-5 text-secondary" />
                <div>
                  <div className="text-sm font-semibold">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}