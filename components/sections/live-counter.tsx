'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Users, TrendingUp, Zap, Globe, Activity } from 'lucide-react';

export function LiveCounter() {
  const [count, setCount] = useState(5237);
  const [prevCount, setPrevCount] = useState(5237);
  const [onlineUsers, setOnlineUsers] = useState(142);
  const countMotion = useMotionValue(5237);
  const rounded = useTransform(countMotion, latest => Math.round(latest));

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setPrevCount(count);
      const increment = Math.floor(Math.random() * 3) + 1;
      const newCount = count + increment;
      setCount(newCount);
      
      // Animate the counter
      countMotion.set(prevCount);
      animate(countMotion, newCount, { duration: 1, ease: "easeOut" });
      
      // Random online users fluctuation
      setOnlineUsers(prev => Math.max(100, Math.min(200, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 5000);

    return () => clearInterval(interval);
  }, [count, prevCount, countMotion]);

  return (
    <div className="glass-card p-8 relative overflow-hidden group">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5 text-secondary animate-pulse" />
            Live Activity
          </h3>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            <div className="w-2 h-2 rounded-full bg-green-400 absolute" />
            <span className="text-xs text-gray-400 ml-3">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-4xl font-bold text-gradient mb-1">
              <motion.span>{rounded}</motion.span>+
            </div>
            <div className="text-sm text-gray-400 flex items-center gap-1">
              <Users className="w-4 h-4" />
              Total Joined
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span>+{count - 5000} today</span>
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold text-gradient mb-1">{onlineUsers}</div>
            <div className="text-sm text-gray-400 flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Online Now
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Globe className="w-3 h-3 text-secondary" />
              <span className="text-xs text-gray-400">12 countries</span>
            </div>
          </div>
        </div>

        {/* Progress to next milestone */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Next milestone: 10,000</span>
            <span>{Math.round((count / 10000) * 100)}%</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{ width: `${(5237 / 10000) * 100}%` }}
              animate={{ width: `${(count / 10000) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}