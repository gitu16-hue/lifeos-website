import { Navbar } from '@/components/ui/navbar'; 
import { ThreeDBackground } from '@/components/3d/background'; 
import { Footer } from '@/components/ui/footer'; 
import { motion } from 'framer-motion'; 
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react'; 
import Link from 'next/link'; 
 
const posts = [ 
  { id: 1, title: 'Introducing LifeOS 2.0: The Next Evolution', excerpt: 'We\'re excited to announce the biggest update yet to LifeOS.', author: 'Sarah Chen', date: 'Mar 1, 2026', readTime: '5 min', category: 'Product' }, 
  { id: 2, title: 'How AI is Transforming Personal Productivity', excerpt: 'Discover how artificial intelligence is revolutionizing the way we work.', author: 'Michael Rodriguez', date: 'Feb 28, 2026', readTime: '8 min', category: 'AI' }, 
  { id: 3, title: 'The Science Behind Neural Pattern Recognition', excerpt: 'A deep dive into the technology that powers LifeOS.', author: 'Dr. Alex Thompson', date: 'Feb 25, 2026', readTime: '12 min', category: 'Technology' }, 
  { id: 4, title: 'Privacy First: How We Protect Your Data', excerpt: 'Learn about our zero-knowledge architecture.', author: 'David Kim', date: 'Feb 20, 2026', readTime: '6 min', category: 'Security' }, 
  { id: 5, title: 'Customer Story: How LifeOS Transformed My Workflow', excerpt: 'A day in the life of a product manager using LifeOS.', author: 'Emily Watson', date: 'Feb 18, 2026', readTime: '7 min', category: 'Case Study' }, 
  { id: 6, title: 'The Future of Human-AI Collaboration', excerpt: 'Exploring the possibilities when AI becomes an extension of human consciousness.', author: 'James Lee', date: 'Feb 15, 2026', readTime: '10 min', category: 'Vision' } 
]; 
 
export default function BlogPage() { 
  return ( 
    <> 
      <ThreeDBackground /> 
      <Navbar /> 
      <main className="pt-32 pb-20 min-h-screen"> 
        <div className="container mx-auto px-6"> 
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center mb-20" 
          > 
            <h1 className="text-5xl md:text-6xl font-bold mb-6"> 
              <span className="text-gradient">LifeOS</span> Blog 
            </h1> 
            <p className="text-xl text-gray-400 max-w-3xl mx-auto"> 
              Insights, updates, and stories from the team building the future of AI 
            </p> 
          </motion.div> 
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"> 
            {posts.map((post, index) => ( 
              <motion.div 
                key={post.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1 }} 
                className="group" 
              > 
                <Link href={`/blog/${post.id}`}> 
                  <div className="glass-card p-6 h-full flex flex-col hover:scale-105 transition-all cursor-pointer"> 
                    <div className="flex items-center gap-2 mb-3"> 
                      <Tag className="w-4 h-4 text-secondary" /> 
                      <span className="text-xs text-secondary">{post.category}</span> 
                    </div> 
                    <h2 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">{post.title}</h2> 
                    <p className="text-sm text-gray-400 mb-4 flex-grow">{post.excerpt}</p> 
                    <div className="flex items-center justify-between text-xs text-gray-500"> 
                      <span>{post.author}</span> 
                      <span>{post.date}</span> 
                      <span>{post.readTime}</span> 
                    </div> 
                  </div> 
                </Link> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </main> 
      <Footer /> 
    </> 
  ); 
} 
