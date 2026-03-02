'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-20 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">LIFEOS</h3>
            <p className="text-gray-400">
              The operating system for your future self.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <motion.a whileHover={{ y: -3 }} href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter />
              </motion.a>
              <motion.a whileHover={{ y: -3 }} href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github />
              </motion.a>
              <motion.a whileHover={{ y: -3 }} href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin />
              </motion.a>
              <motion.a whileHover={{ y: -3 }} href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; 2026 LifeOS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}