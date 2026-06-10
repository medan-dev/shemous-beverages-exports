'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, BookOpen, Search, Eye, X, CheckCircle, AlertTriangle, Image as ImageIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Panel state
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<any | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Form Fields
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [isPublished, setIsPublished] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
    if (!error) setPosts(data || [])
    setLoading(false)
  }

  const openAddPanel = () => {
    setEditingPost(null)
    setTitle('')
    setContent('')
    setFeaturedImage('')
    setIsPublished(false)
    setIsPanelOpen(true)
  }

  const openEditPanel = (post: any) => {
    setEditingPost(post)
    setTitle(post.title)
    setContent(post.content || '')
    setFeaturedImage(post.featured_image || '')
    setIsPublished(post.is_published)
    setIsPanelOpen(true)
  }

  const closePanel = () => {
    setIsPanelOpen(false)
    setEditingPost(null)
  }

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      title,
      content,
      featured_image: featuredImage,
      is_published: isPublished
    }

    let error
    if (editingPost) {
      const res = await supabase.from('blog_posts').update(payload).eq('id', editingPost.id)
      error = res.error
    } else {
      const res = await supabase.from('blog_posts').insert([payload])
      error = res.error
    }

    if (!error) {
      fetchPosts()
      closePanel()
    } else {
      alert(`Save failed: ${error.message}`)
    }
    setIsSubmitting(false)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    await supabase.from('blog_posts').delete().eq('id', deleteTarget.id)
    setDeleteTarget(null)
    setIsDeleting(false)
    fetchPosts()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1.5rem, 4vw, 4rem) clamp(1rem, 4vw, 2rem)' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'clamp(1.5rem, 4vw, 3rem)', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Link href="/admin/dashboard" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.6rem', textDecoration: 'none' }}>
              ← Dashboard
            </Link>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: 'var(--secondary)', fontWeight: '950', margin: 0 }}>Blog Content</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
              {posts.length} article{posts.length !== 1 ? 's' : ''} &bull; Manage your news and export stories.
            </p>
          </div>
          <button onClick={openAddPanel} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 'clamp(0.7rem, 2vw, 1rem) clamp(1rem, 3vw, 1.75rem)', background: 'var(--primary)', color: 'white', fontWeight: '900', border: 'none', borderRadius: '100px', cursor: 'pointer', fontSize: 'clamp(0.82rem, 2vw, 0.95rem)', whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(234, 88, 12, 0.35)' }}>
            <Plus size={18} strokeWidth={3} /> Write Article
          </button>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--text-muted)' }}>
            <BookOpen size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
            <p style={{ fontWeight: '600' }}>Loading articles…</p>
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', background: 'white', borderRadius: '24px', border: '1px solid #E5E7EB' }}>
            <BookOpen size={52} style={{ margin: '0 auto 1rem', opacity: 0.25 }} />
            <p style={{ fontWeight: '700', color: 'var(--secondary)', fontSize: '1.1rem' }}>No articles yet</p>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.3rem' }}>Click "Write Article" to publish your first post.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '2rem' }}>
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div key={post.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
                  style={{ background: 'white', borderRadius: '20px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
                  
                  <div style={{ height: '180px', background: '#F1F5F9', position: 'relative' }}>
                    {post.featured_image 
                      ? <img src={post.featured_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> 
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CBD5E1' }}><ImageIcon size={40} /></div>
                    }
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: post.is_published ? '#D1FAE5' : '#FEF3C7', color: post.is_published ? '#059669' : '#D97706', padding: '0.3rem 0.8rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                      {post.is_published ? 'Published' : 'Draft'}
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.5rem', lineHeight: 1.3 }}>{post.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.content || 'No content preview available.'}
                    </p>
                    
                    <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
                      <button onClick={() => openEditPanel(post)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.6rem', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '10px', color: 'var(--secondary)', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}>
                        <Edit size={14} /> Edit
                      </button>
                      <button onClick={() => setDeleteTarget(post)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.6rem', background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '10px', color: '#DC2626', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePanel}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,15,30,0.4)', backdropFilter: 'blur(4px)', zIndex: 200 }} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(100vw, 600px)', background: 'white', zIndex: 201, boxShadow: '-20px 0 80px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}
            >
              <div style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', flexShrink: 0, position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--secondary)', margin: 0 }}>
                    {editingPost ? 'Edit Article' : 'Write Article'}
                  </h2>
                </div>
                <button onClick={closePanel} style={{ background: '#F8FAFC', border: 'none', width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={18} color="#64748B" />
                </button>
              </div>

              <form onSubmit={handleSavePost} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flexGrow: 1 }}>
                <div>
                  <label style={labelStyle}>Article Title *</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Exporting the finest Ugandan Coffee..." style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Featured Image URL</label>
                  <input value={featuredImage} onChange={e => setFeaturedImage(e.target.value)} placeholder="https://example.com/image.jpg" style={inputStyle} />
                  {featuredImage && (
                    <div style={{ marginTop: '1rem', height: '140px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                      <img src={featuredImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={labelStyle}>Article Content</label>
                  <textarea 
                    value={content} 
                    onChange={e => setContent(e.target.value)} 
                    placeholder="Write your article here..." 
                    style={{ ...inputStyle, flexGrow: 1, minHeight: '200px', resize: 'vertical' }} 
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none', background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <input type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }} />
                  <span style={{ fontWeight: '700', color: 'var(--secondary)', fontSize: '0.95rem' }}>Publish immediately</span>
                </label>

                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <button type="submit" disabled={isSubmitting}
                    style={{ width: '100%', padding: '1.1rem', background: 'var(--primary)', color: 'white', fontWeight: '900', fontSize: '1rem', border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: isSubmitting ? 0.7 : 1, transition: 'opacity 0.2s' }}>
                    {isSubmitting ? 'Saving…' : <><CheckCircle size={20} /> Save Article</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      {mounted && deleteTarget && createPortal(
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1rem' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setDeleteTarget(null)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ position: 'relative', background: 'white', borderRadius: '24px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', maxWidth: '400px', width: '100%', boxShadow: '0 30px 60px rgba(0,0,0,0.3)', textAlign: 'center' }}
          >
            <div style={{ width: '60px', height: '60px', background: '#FEE2E2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
              <AlertTriangle size={28} color="#DC2626" />
            </div>
            <h3 style={{ fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', fontWeight: '950', color: 'var(--secondary)', marginBottom: '0.6rem' }}>Delete Article?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.8rem' }}>
              Permanently delete <strong style={{ color: 'var(--secondary)' }}>{deleteTarget.title}</strong>? This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setDeleteTarget(null)} style={{ flex: 1, padding: '0.85rem', background: '#F3F4F6', border: 'none', borderRadius: '12px', fontWeight: '800', color: 'var(--secondary)', cursor: 'pointer', fontSize: '0.9rem' }}>Cancel</button>
              <button onClick={handleConfirmDelete} disabled={isDeleting} style={{ flex: 1, padding: '0.85rem', background: '#DC2626', border: 'none', borderRadius: '12px', fontWeight: '900', color: 'white', cursor: 'pointer', fontSize: '0.9rem', opacity: isDeleting ? 0.7 : 1 }}>
                {isDeleting ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.85rem 1rem', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '10px', fontSize: '0.95rem', outline: 'none', fontWeight: '500', color: 'var(--secondary)', boxSizing: 'border-box', fontFamily: 'inherit' }
