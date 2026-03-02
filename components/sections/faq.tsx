'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle, Mail } from 'lucide-react';
import Button from '../ui/button';

const faqs = [
  {
    question: 'What is LifeOS exactly?',
    answer: 'LifeOS is the world\'s first AI-powered operating system for your personal and professional life. It combines neural networks, real-time optimization, and deep learning to create a unified system that designs, executes, and optimizes your daily activities, goals, and growth trajectory.'
  },
  {
    question: 'How does the AI learn about me?',
    answer: 'LifeOS uses advanced neural networks that analyze your patterns, preferences, and behaviors across all integrated platforms. It learns from your calendar, tasks, focus patterns, and even your energy levels throughout the day. The more you use it, the smarter it gets—with 99.9% accuracy in predicting your optimal workflow.'
  },
  {
    question: 'Is my data private and secure?',
    answer: 'Absolutely. LifeOS is built on a zero-knowledge architecture with military-grade encryption. Your data is yours alone—we never sell or share it. All processing happens locally on your device, and you have complete control over what gets synced to the cloud. We\'re also GDPR and CCPA compliant.'
  },
  {
    question: 'Can I integrate LifeOS with my existing tools?',
    answer: 'Yes! LifeOS connects seamlessly with over 50+ popular tools including Google Calendar, Slack, Notion, Todoist, Jira, and more. Our API-first design means you can integrate with virtually any service, and we\'re constantly adding new integrations based on user requests.'
  },
  {
    question: 'What makes LifeOS different from other productivity apps?',
    answer: 'Unlike traditional apps that just track tasks, LifeOS is a true operating system that actively optimizes your life. It doesn\'t just show you what to do—it learns when you\'re most productive, automatically schedules deep work, predicts potential bottlenecks, and continuously evolves with you. It\'s not a tool; it\'s an extension of your mind.'
  },
  {
    question: 'When will LifeOS be available?',
    answer: 'We\'re launching in phases. The first 10,000 waitlist members get early access in Q2 2026, with full public launch scheduled for Q3 2026. Join the waitlist today to secure your spot and receive a lifetime discount!'
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            <HelpCircle className="w-4 h-4 text-secondary" />
            <span className="text-sm">Got Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about LifeOS
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full glass p-6 rounded-xl text-left group hover:bg-white/5 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold group-hover:text-gradient transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-gray-400 mb-6">
                Can't find the answer you're looking for? Please chat with our team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" className="group">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat with us
                </Button>
                <Button variant="outline" size="lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Email support
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}