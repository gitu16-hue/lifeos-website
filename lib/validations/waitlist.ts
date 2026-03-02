import { z } from 'zod'

export const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().optional(),
  userType: z.enum(['individual', 'professional', 'enterprise', 'student']).default('individual'),
  source: z.string().default('website')
})

export type WaitlistFormData = z.infer<typeof waitlistSchema>