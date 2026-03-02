'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '../../lib/supabase/client'

export function WaitlistCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCount = async () => {
      const supabase = createClient()
      
      const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
      
      if (!error && count !== null) {
        setCount(count)
      }
      setLoading(false)
    }

    fetchCount()
    
    const supabase = createClient()
    const subscription = supabase
      .channel('waitlist-changes')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'waitlist' },
        () => {
          fetchCount()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-24 bg-white/10 rounded"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="text-center"
    >
      <div className="text-3xl font-bold text-gradient">
        {count?.toLocaleString()}+
      </div>
      <div className="text-sm text-gray-400">Already joined</div>
    </motion.div>
  )
}