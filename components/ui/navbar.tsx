'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X, Cpu } from 'lucide-react';
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

  const navItems = [
    { name: 'Vision', href: '/vision' },
    { name: 'Platform', href: '/platform' },
    { name: 'Product', href: '/product' },
    { name: 'Blog', href: '/blog' },
  ];

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
          {/* Clickable Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300">
                <Image 
                  src="/assets/lifeos-logo.jpeg" 
                  alt="LifeOS" 
                  width={56} 
                  height={56}
                  className="w-full h-full object-cover cursor-pointer"
                  priority
                />
              </div>
            </div>
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

          {/* Desktop Navigation - All Clickable */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-gray-300 hover:text-white transition-colors relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            
            <div className="w-px h-6 bg-white/10" />
            
            <Link href="/waitlist">
              <Button variant="primary" size="sm" className="relative overflow-hidden group cursor-pointer">
                <span className="relative z-10">Join Waitlist</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
            
            <Link href="/login">
              <Button variant="outline" size="sm" className="cursor-pointer">Sign In</Button>
            </Link>
          </div>

          {/* Mobile Menu Button - Clickable */}
          <button 
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - All Clickable */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors py-2 cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-white/10 my-2" />
              <Link href="/waitlist" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full cursor-pointer">Join Waitlist</Button>
              </Link>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full cursor-pointer">Sign In</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}