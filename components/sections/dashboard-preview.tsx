'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { 
  BarChart3, 
  Target, 
  Clock, 
  Brain, 
  Sparkles, 
  CheckCircle,
  Activity,
  TrendingUp,
  Users,
  Zap,
  Cpu,
  Radar,
  Network,
  Eye,
  Calendar,
  ArrowRight,
  Circle,
  AlertCircle,
  ChevronRight,
  Play,
  Pause,
  RefreshCw,
  Thermometer,
  Battery,
  Signal,
  HardDrive,
  Download,
  Upload,
  Globe,
  Lock
} from 'lucide-react';
import { useEffect, useState } from 'react';

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [time, setTime] = useState('');
  const [focusScore, setFocusScore] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [aiConfidence, setAiConfidence] = useState(0);

  useEffect(() => {
    // Animate numbers on mount
    setFocusScore(87);
    setTasksCompleted(12);
    setAiConfidence(94);

    // Update time
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated neural background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Cpu className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-sm">Live Neural Dashboard</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your <span className="text-gradient">Consciousness</span> Interface
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Watch your AI operating system come alive with real-time data, 
            neural insights, and adaptive intelligence.
          </p>
        </motion.div>

        {/* Dashboard Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glass background with gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 rounded-3xl blur-3xl" />
          
          <div className="relative glass-card p-6 md:p-8 overflow-hidden">
            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }} />

            {/* Header with system status */}
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50 animate-pulse" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">LifeOS Neural Interface</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Signal className="w-3 h-3 text-green-400" />
                    <span>Quantum Sync Active</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span>{time}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleRefresh}
                    className="p-2 glass rounded-full"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </motion.button>
                </div>
              </div>

              {/* System Status Bar */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {[
                  { icon: Cpu, label: 'Neural Load', value: '42%', color: 'text-green-400' },
                  { icon: Thermometer, label: 'Temperature', value: '36.2°C', color: 'text-yellow-400' },
                  { icon: Battery, label: 'Energy', value: '94%', color: 'text-green-400' },
                  { icon: HardDrive, label: 'Memory', value: '7.2/16GB', color: 'text-blue-400' },
                  { icon: Network, label: 'Connections', value: '1.2M', color: 'text-purple-400' }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-center gap-2 p-2 glass rounded-lg"
                  >
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                      <div className="text-sm font-semibold">{stat.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-4 mb-8 border-b border-white/10 pb-2">
                {['overview', 'analytics', 'insights', 'network'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium transition-all relative ${
                      activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column - Strategic Goals */}
                <motion.div 
                  className="lg:col-span-4 space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-semibold">Strategic Goals</h3>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </div>
                  
                  {[
                    { name: 'Launch LifeOS', progress: 75, color: 'from-blue-500 to-cyan-500', eta: 'Q2 2026', tasks: 12 },
                    { name: '10K Users', progress: 45, color: 'from-purple-500 to-pink-500', eta: 'Q3 2026', tasks: 8 },
                    { name: 'Series A', progress: 30, color: 'from-green-500 to-teal-500', eta: 'Q4 2026', tasks: 15 }
                  ].map((goal, i) => (
                    <motion.div
                      key={goal.name}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="glass p-5 rounded-xl group hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-medium mb-1">{goal.name}</div>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-gray-500">ETA: {goal.eta}</span>
                            <span className="text-gray-500">{goal.tasks} tasks</span>
                          </div>
                        </div>
                        <div className={`text-sm font-bold bg-gradient-to-r ${goal.color} bg-clip-text text-transparent`}>
                          {goal.progress}%
                        </div>
                      </div>
                      
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mb-3">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${goal.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className={`h-full rounded-full bg-gradient-to-r ${goal.color}`}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-green-400">
                          <CheckCircle className="w-3 h-3" />
                          <span>On track</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Activity className="w-3 h-3" />
                          <span>+12% this week</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Quick Action */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full glass p-4 rounded-xl flex items-center justify-between group"
                  >
                    <span className="text-sm">Add New Goal</span>
                    <Circle className="w-4 h-4 text-secondary group-hover:rotate-90 transition-transform" />
                  </motion.button>
                </motion.div>

                {/* Middle Column - Daily Focus & Tasks */}
                <motion.div 
                  className="lg:col-span-4 space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-semibold">Today's Focus</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-gray-500">Live</span>
                    </div>
                  </div>

                  {/* Deep Work Card */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass p-6 rounded-xl text-center relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative">
                      <div className="text-5xl font-bold text-gradient mb-2">4h 30m</div>
                      <div className="text-sm text-gray-400 mb-4">Deep Work Remaining</div>
                      
                      <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '65%' }}
                          transition={{ duration: 1 }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Completed: 3.5h</span>
                        <span className="text-gray-500">Target: 8h</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Task List */}
                  <div className="space-y-3">
                    {[
                      { task: 'Product Strategy', time: '09:00 - 10:30', priority: 'high', status: 'active' },
                      { task: 'Code Review', time: '11:00 - 12:00', priority: 'medium', status: 'pending' },
                      { task: 'User Research', time: '14:00 - 16:00', priority: 'high', status: 'pending' },
                      { task: 'Team Sync', time: '16:30 - 17:00', priority: 'low', status: 'scheduled' }
                    ].map((item, i) => (
                      <motion.div
                        key={item.task}
                        initial={{ x: 0, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg glass hover:bg-white/5 transition-all cursor-pointer group"
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          item.priority === 'high' ? 'bg-red-400' :
                          item.priority === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
                        } animate-pulse`} />
                        <div className="flex-1">
                          <div className="text-sm font-medium flex items-center gap-2">
                            {item.task}
                            {item.status === 'active' && (
                              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">Active</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{item.time}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Focus Timer */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-between p-4 glass rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Play className="w-4 h-4 text-secondary" />
                      <span className="text-sm">Focus Session Active</span>
                    </div>
                    <div className="text-sm font-mono">25:00</div>
                  </motion.div>
                </motion.div>

                {/* Right Column - AI Insights & Analytics */}
                <motion.div 
                  className="lg:col-span-4 space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-semibold">AI Insights</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-gray-500">94% confidence</span>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: TrendingUp, label: 'Peak Productivity', value: '9AM - 12PM', trend: '+15%' },
                      { icon: Activity, label: 'Focus Score', value: focusScore, unit: '%', trend: '+8%' },
                      { icon: CheckCircle, label: 'Tasks Completed', value: tasksCompleted, unit: '/15', trend: '+3' },
                      { icon: Zap, label: 'AI Recommendations', value: '3', trend: 'new' }
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="glass p-4 rounded-xl group hover:scale-105 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <item.icon className="w-4 h-4 text-secondary" />
                          <span className="text-xs text-green-400">{item.trend}</span>
                        </div>
                        <div className="text-lg font-bold text-gradient">
                          {item.value}
                          {item.unit}
                        </div>
                        <div className="text-xs text-gray-400">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* AI Activity Feed */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="glass p-5 rounded-xl space-y-4"
                  >
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Activity className="w-4 h-4 text-secondary" />
                      Neural Activity
                    </h4>
                    
                    {[
                      { time: '2m ago', event: 'Pattern detected in productivity', icon: Brain },
                      { time: '5m ago', event: 'Schedule optimized for deep work', icon: Clock },
                      { time: '12m ago', event: '3 new insights generated', icon: Sparkles }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="flex items-start gap-3 text-sm"
                      >
                        <item.icon className="w-4 h-4 text-gray-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-gray-300">{item.event}</div>
                          <div className="text-xs text-gray-500">{item.time}</div>
                        </div>
                      </motion.div>
                    ))}

                    <button className="text-xs text-secondary hover:text-white transition-colors flex items-center gap-1 mt-2">
                      View all activity
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </motion.div>

                  {/* AI Confidence Meter */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="glass p-4 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">AI Confidence</span>
                      <span className="text-xs text-gradient">{aiConfidence}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${aiConfidence}%` }}
                        transition={{ duration: 1 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                  </motion.div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    {[
                      { icon: Download, label: 'Export' },
                      { icon: Upload, label: 'Sync' },
                      { icon: Lock, label: 'Privacy' },
                      { icon: Globe, label: 'Network' }
                    ].map((action, i) => (
                      <motion.button
                        key={action.label}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex-1 p-3 glass rounded-lg flex flex-col items-center gap-1 group"
                      >
                        <action.icon className="w-4 h-4 text-gray-400 group-hover:text-secondary transition-colors" />
                        <span className="text-xs text-gray-500">{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Footer Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { label: 'Uptime', value: '99.97%', icon: Activity },
                  { label: 'Neural Sync', value: 'Real-time', icon: Zap },
                  { label: 'Data Processed', value: '2.4TB', icon: HardDrive },
                  { label: 'Active Nodes', value: '1,247', icon: Network }
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <stat.icon className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                      <div className="text-sm font-semibold">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </motion.div>
      </div>
    </section>
  );
}