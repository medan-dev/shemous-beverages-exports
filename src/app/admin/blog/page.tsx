'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, BookOpen, Search, Eye } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
    if (!error) setPosts(data || [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id)
      if (!error) fetchPosts()
    }
  }

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
           <Link href="/admin/dashboard" style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>← Back to Dashboard</Link>
           <h1 style={{ fontSize: '2.5rem' }}>Blog Management</h1>
        </div>
        <button className="premium-button">
          <Plus size={20} /> Create New Post
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
        {posts.length === 0 && !loading ? (
             <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', gridColumn: '1 / -1' }}>
               <BookOpen size={48} style={{ opacity: 0.2, marginBottom: '1rem', margin: '0 auto' }} />
               <p>No blog posts found. Share your first export story!</p>
             </div>
           ) : (
          posts.map((post) => (
            <div key={post.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
               <div style={{ height: '160px', background: 'var(--accent)', position: 'relative' }}>
                  {post.featured_image ? <img src={post.featured_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}><BookOpen /></div>}
               </div>
               <div style={{ padding: '1.5rem', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{post.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                     <span style={{ fontSize: '0.8rem', color: post.is_published ? '#059669' : '#D97706', fontWeight: 'bold' }}>
                        {post.is_published ? 'PUBLISHED' : 'DRAFT'}
                     </span>
                     <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button style={{ color: 'var(--text-muted)' }}><Edit size={18} /></button>
                        <button style={{ color: 'var(--text-muted)' }}><Eye size={18} /></button>
                        <button onClick={() => handleDelete(post.id)} style={{ color: '#EF4444' }}><Trash2 size={18} /></button>
                     </div>
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
