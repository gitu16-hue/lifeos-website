'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Professional Logo with Image */}
          <Link href="/" className="flex items-center gap-4 group">
            {/* Logo Image with Glow Effect */}
            <div className="relative">
              {/* Glow ring behind logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Logo container */}
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300">
                <Image 
                  src="/assets/lifeos-logo.jpeg" 
                  alt="LifeOS" 
                  width={56} 
                  height={56}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Brand Name with Gradient */}
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold leading-tight">
                <span className="text-gradient">LIFE</span>
                <span className="text-white">OS</span>
              </span>
              <span className="text-[8px] md:text-[10px] text-gray-500 tracking-[0.2em] uppercase">
                Neural Operating System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#vision" className="text-sm text-gray-300 hover:text-white transition-colors relative group">
              Vision
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="#platform" className="text-sm text-gray-300 hover:text-white transition-colors relative group">
              Platform
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="#product" className="text-sm text-gray-300 hover:text-white transition-colors relative group">
              Product
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/blog" className="text-sm text-gray-300 hover:text-white transition-colors relative group">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
            </Link>
            
            {/* Divider */}
            <div className="w-px h-6 bg-white/10" />
            
            <Button variant="primary" size="sm" className="relative overflow-hidden group">
              <span className="relative z-10">Join Waitlist</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button variant="outline" size="sm">Sign In</Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              <Link 
                href="#vision" 
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Vision
              </Link>
              <Link 
                href="#platform" 
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Platform
              </Link>
              <Link 
                href="#product" 
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Product
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="border-t border-white/10 my-2" />
              <Button variant="primary" size="sm" className="w-full">Join Waitlist</Button>
              <Button variant="outline" size="sm" className="w-full">Sign In</Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}