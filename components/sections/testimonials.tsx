'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Tech Entrepreneur',
    content: 'LifeOS has completely transformed how I manage my time. I\'m 3x more productive and actually have time for myself.',
    rating: 5,
    image: 'SC',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    content: 'The AI recommendations are scarily accurate. It knows when I\'m most productive and schedules deep work perfectly.',
    rating: 5,
    image: 'MR',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Alex Thompson',
    role: 'Creative Director',
    content: 'Finally, a tool that understands creative workflows. LifeOS adapts to my chaos and makes it beautiful.',
    rating: 5,
    image: 'AT',
    gradient: 'from-green-500 to-teal-500'
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Loved by <span className="text-gradient">innovators</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands of professionals who have already transformed their lives with LifeOS.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-8 relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/10 group-hover:text-white/20 transition-colors" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-2xl font-bold text-white group-hover:scale-110 transition-transform`}>
                  {testimonial.image}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>

              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl`} />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-8 p-8 glass rounded-2xl">
            <div>
              <div className="text-3xl font-bold text-gradient">5,000+</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="text-3xl font-bold text-gradient">4.9/5</div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="text-3xl font-bold text-gradient">98%</div>
              <div className="text-sm text-gray-400">Would Recommend</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}