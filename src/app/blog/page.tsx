'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'

const blogPosts = [
  { id: 1, title: 'The Rise of Uganda\'s Banana Export Market', slug: 'ugandan-banana-export-rise', excerpt: 'How Ugandan farmers are scaling their operations for the global market...', date: 'March 15, 2026', author: 'Shemous Team' },
  { id: 2, title: 'Why Organic Matters in Global Beverages', slug: 'organic-beverages-global-market', excerpt: 'Understanding the shift towards natural ingredients in Europe and America...', date: 'March 10, 2026', author: 'Fruit Expert' },
  { id: 3, title: 'Sustainable Farming in the Heart of Uganda', slug: 'sustainable-farming-uganda', excerpt: 'Our commitment to eco-friendly practices from seed to bottle...', date: 'March 05, 2026', author: 'Agriculture Lead' },
]

export default function BlogListing() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Latest <span className="text-gradient">Insights</span></h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Stories and updates from the world of premium Ugandan exports and organic beverages.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '2.5rem' }}>
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card"
            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ height: '200px', background: 'var(--accent)', position: 'relative' }}>
              {/* Feature Image Placeholder */}
            </div>
            
            <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} /> {post.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><User size={14} /> {post.author}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{post.title}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flexGrow: 1 }}>{post.excerpt}</p>
              
              <Link href={`/blog/${post.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '700' }}>
                Read Full Story <ArrowRight size={18} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
