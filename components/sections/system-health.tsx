'use client';

import { motion } from 'framer-motion';
import { 
  Activity, 
  Cpu, 
  Database, 
  Globe, 
  Shield, 
  Zap, 
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Wifi,
  HardDrive,
  Cloud,
  Lock,
  Eye,
  Radio,
  Server,
  Gauge,
  Thermometer,
  Battery,
  Signal,
  Network
} from 'lucide-react';
import { useState, useEffect } from 'react';

export function SystemHealth() {
  const [time, setTime] = useState('');
  const [uptime, setUptime] = useState(99.97);
  const [activeConnections, setActiveConnections] = useState(1247);
  const [dataProcessed, setDataProcessed] = useState(2.4);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { 
      label: 'System Uptime', 
      value: `${uptime}%`, 
      change: '+0.02%', 
      icon: Gauge, 
      color: 'from-green-400 to-emerald-500',
      trend: 'up' 
    },
    { 
      label: 'Cost Savings', 
      value: '$2.4M', 
      change: '+32.5%', 
      icon: Battery, 
      color: 'from-blue-400 to-cyan-500',
      trend: 'up' 
    },
    { 
      label: 'Active Connections', 
      value: activeConnections.toLocaleString(), 
      change: '+127', 
      icon: Network, 
      color: 'from-purple-400 to-pink-500',
      trend: 'up' 
    },
    { 
      label: 'Data Processed', 
      value: `${dataProcessed} TB`, 
      change: '+0.3 TB', 
      icon: HardDrive, 
      color: 'from-orange-400 to-red-500',
      trend: 'up' 
    },
  ];

  const systemComponents = [
    { 
      name: 'Neural Network', 
      value: 98, 
      icon: Cpu, 
      color: 'from-purple-500 to-pink-500',
      status: 'operational',
      details: '99.9% accuracy'
    },
    { 
      name: 'Database Cluster', 
      value: 100, 
      icon: Database, 
      color: 'from-green-500 to-teal-500',
      status: 'operational',
      details: '3.2M queries/min'
    },
    { 
      name: 'API Gateway', 
      value: 100, 
      icon: Cloud, 
      color: 'from-blue-500 to-cyan-500',
      status: 'operational',
      details: '8.7k req/s'
    },
    { 
      name: 'AI Training Pipeline', 
      value: 87, 
      icon: Activity, 
      color: 'from-yellow-500 to-orange-500',
      status: 'degraded',
      details: 'ETA: 2h 15m'
    },
    { 
      name: 'Security Layer', 
      value: 100, 
      icon: Shield, 
      color: 'from-indigo-500 to-purple-500',
      status: 'operational',
      details: 'Zero threats'
    },
    { 
      name: 'Memory Cache', 
      value: 94, 
      icon: Server, 
      color: 'from-cyan-500 to-blue-500',
      status: 'operational',
      details: '7.2/16GB used'
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with advanced neural pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(108,92,231,0.3) 0%, transparent 30%),
          radial-gradient(circle at 80% 70%, rgba(0,245,212,0.3) 0%, transparent 30%)
        `,
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
            <Activity className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-xs font-medium">System Health</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Neural <span className="text-gradient">Infrastructure</span>
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Real-time monitoring of our distributed AI systems
          </p>
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-4 rounded-xl mb-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full" />
              </div>
              <span className="text-sm font-medium">All Systems Operational</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Last updated: {time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-secondary" />
                <span>Real-time sync</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>Live</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="glass p-5 rounded-xl group hover:scale-105 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${metric.color} p-2 group-hover:rotate-6 transition-transform`}>
                  <metric.icon className="w-full h-full text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {metric.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gradient mb-1">{metric.value}</div>
              <div className="text-xs text-gray-400">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main System Health Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Components - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-4"
          >
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-secondary" />
              System Components
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {systemComponents.map((component, index) => (
                <motion.div
                  key={component.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="glass p-4 rounded-xl group hover:bg-white/5 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${component.color} p-2 flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <component.icon className="w-full h-full text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{component.name}</span>
                        <div className="flex items-center gap-1">
                          {component.status === 'operational' ? (
                            <CheckCircle className="w-3 h-3 text-green-400" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-yellow-400" />
                          )}
                          <span className="text-xs text-gradient">{component.value}%</span>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                        <motion.div 
                          className={`h-full rounded-full bg-gradient-to-r ${component.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${component.value}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                      
                      <div className="text-xs text-gray-400">{component.details}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Live Activity & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {/* Live Activity Feed */}
            <div className="glass p-5 rounded-xl">
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
                <Radio className="w-4 h-4 text-secondary" />
                Live Neural Activity
              </h3>
              
              <div className="space-y-3">
                {[
                  { time: '2s ago', event: 'New connection: Singapore', value: '+1432 nodes' },
                  { time: '5s ago', event: 'Model training complete', value: '98.7% accuracy' },
                  { time: '12s ago', event: 'Database optimized', value: '32% faster' },
                  { time: '23s ago', event: 'Security scan complete', value: '0 threats' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="flex items-start gap-2 text-xs border-b border-white/5 pb-2 last:border-0"
                  >
                    <div className="w-1 h-1 mt-1.5 rounded-full bg-secondary" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">{item.event}</span>
                        <span className="text-gray-500">{item.time}</span>
                      </div>
                      <div className="text-secondary">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Network Stats */}
            <div className="glass p-5 rounded-xl">
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-secondary" />
                Network Status
              </h3>
              
              <div className="space-y-3">
                {[
                  { label: 'Global Nodes', value: '1,247', icon: Network, color: 'text-blue-400' },
                  { label: 'Data Transfer', value: '2.4 Gbps', icon: Zap, color: 'text-yellow-400' },
                  { label: 'Active Sessions', value: '8.2k', icon: Wifi, color: 'text-green-400' },
                  { label: 'Avg Response', value: '47ms', icon: Clock, color: 'text-purple-400' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-gray-400">{stat.label}</span>
                    </div>
                    <span className="font-medium text-gradient">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              {[
                { icon: Eye, label: 'Monitor' },
                { icon: Shield, label: 'Security' },
                { icon: Activity, label: 'Metrics' },
                { icon: Lock, label: 'Privacy' },
              ].map((action, i) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 glass py-2 rounded-lg flex flex-col items-center gap-1 group"
                >
                  <action.icon className="w-4 h-4 text-gray-400 group-hover:text-secondary transition-colors" />
                  <span className="text-[10px] text-gray-500">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Signal className="w-3 h-3 text-green-400" />
              <span>Edge Network: Connected</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Encryption: AES-256</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="w-3 h-3 text-yellow-400" />
            <span>System Temp: 42°C</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}