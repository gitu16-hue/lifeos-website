'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, User, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { waitlistSchema, type WaitlistFormData } from '@/lib/validations/waitlist'
import Button from '@/components/ui/button'

export function WaitlistForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [position, setPosition] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema) as any,
    defaultValues: {
      email: '',
      name: '',
      userType: 'individual',
      source: 'website'
    }
  })

  const onSubmit = async (data: WaitlistFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to join waitlist')
      }

      setIsSuccess(true)
      setPosition(result.position)
      reset()
      
      setTimeout(() => {
        setIsSuccess(false)
        setPosition(null)
      }, 5000)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card p-8 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-teal-500 p-5">
              <CheckCircle className="w-full h-full text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">You're on the list! 🎉</h3>
            <p className="text-gray-400 mb-4">
              {position && position > 0 ? `You're #${position} in line. ` : ""}We'll notify you when it's your turn.
            </p>
            
            {/* Simple progress bar - NO animation if position is invalid */}
            {position && position > 0 && (
              <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-5000"
                  style={{ width: '100%' }}
                />
              </div>
            )}
            
            <p className="text-sm text-gray-500">
              ✨ Check your email for confirmation ✨
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass-card p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  {...register('email')}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Name (Optional)
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  {...register('name')}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                I am a...
              </label>
              <select
                {...register('userType')}
                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="individual">Individual</option>
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
                <option value="student">Student</option>
              </select>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 glass rounded-lg border border-red-500/50 flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full group"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Joining...
                </>
              ) : (
                'Join Waitlist'
              )}
            </Button>

            <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span>✨</span> No spam
              </span>
              <span className="w-1 h-1 bg-gray-500 rounded-full" />
              <span className="flex items-center gap-1">
                <span>🔒</span> Privacy first
              </span>
              <span className="w-1 h-1 bg-gray-500 rounded-full" />
              <span className="flex items-center gap-1">
                <span>⚡</span> Unsubscribe anytime
              </span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}