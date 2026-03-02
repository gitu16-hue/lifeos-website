'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  BarChart3,
  Clock,
  Activity,
  Cpu,
  Database,
  Users,  // ← This was missing!
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export function AIMetrics() {
  const [metrics, setMetrics] = useState({
    accuracy: 99.97,
    responseTime: 47,
    usersProcessed: 5237,
    tasksCompleted: 15243,
    uptime: 99.99,
    costSavings: 32.5
  });

  const [trends, setTrends] = useState({
    accuracy: '+0.2%',
    responseTime: '-3ms',
    usersProcessed: '+847',
    tasksCompleted: '+2.3k',
    uptime: '0%',
    costSavings: '+5.2%'
  });

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Cpu className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-sm">AI Performance Metrics</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powered by <span className="text-gradient">Advanced AI</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-time performance metrics from our neural network
          </p>
        </motion.div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { 
              icon: Brain, 
              label: 'AI Accuracy', 
              value: metrics.accuracy, 
              unit: '%', 
              trend: trends.accuracy,
              color: 'from-purple-500 to-pink-500'
            },
            { 
              icon: Zap, 
              label: 'Response Time', 
              value: metrics.responseTime, 
              unit: 'ms', 
              trend: trends.responseTime,
              color: 'from-yellow-500 to-orange-500'
            },
            { 
              icon: Users, 
              label: 'Users Processed', 
              value: metrics.usersProcessed.toLocaleString(), 
              unit: '', 
              trend: trends.usersProcessed,
              color: 'from-blue-500 to-cyan-500'
            },
            { 
              icon: Activity, 
              label: 'Tasks Completed', 
              value: metrics.tasksCompleted.toLocaleString(), 
              unit: '', 
              trend: trends.tasksCompleted,
              color: 'from-green-500 to-teal-500'
            },
            { 
              icon: Database, 
              label: 'System Uptime', 
              value: metrics.uptime, 
              unit: '%', 
              trend: trends.uptime,
              color: 'from-indigo-500 to-purple-500'
            },
            { 
              icon: TrendingUp, 
              label: 'Cost Savings', 
              value: metrics.costSavings, 
              unit: '%', 
              trend: trends.costSavings,
              color: 'from-red-500 to-pink-500'
            }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 group hover:scale-105 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} p-2.5 group-hover:rotate-6 transition-transform`}>
                  <metric.icon className="w-full h-full text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.trend.startsWith('+') ? 'text-green-400' : 
                  metric.trend.startsWith('-') ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {metric.trend.startsWith('+') ? <ArrowUp className="w-3 h-3" /> : 
                   metric.trend.startsWith('-') ? <ArrowDown className="w-3 h-3" /> : null}
                  {metric.trend}
                </div>
              </div>
              
              <div className="text-3xl font-bold text-gradient mb-1">
                {metric.value}{metric.unit}
              </div>
              <div className="text-sm text-gray-400">{metric.label}</div>

              {/* Mini sparkline */}
              <div className="mt-4 h-8 flex items-end gap-[2px]">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1.5 rounded-t-sm bg-gradient-to-t ${metric.color}`}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${Math.random() * 24 + 4}px` }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Health Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" />
              System Health Overview
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-400">All Systems Operational</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Neural Network', value: 98, color: 'from-blue-500 to-cyan-500' },
              { label: 'Database', value: 100, color: 'from-green-500 to-teal-500' },
              { label: 'API Gateway', value: 100, color: 'from-purple-500 to-pink-500' },
              { label: 'AI Training Pipeline', value: 87, color: 'from-yellow-500 to-orange-500' }
            ].map((item, i) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-gradient">{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Real-time Updates */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Last updated: just now</span>
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-secondary" />
                Real-time sync
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}