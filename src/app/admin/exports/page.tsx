'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, X, UploadCloud, CheckCircle, AlertTriangle, Package } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { uploadProductImage } from '@/app/actions/uploadImage'
import { saveProductAction } from '@/app/actions/productActions'

type Product = {
  id: string
  name: string
  category: string
  price: number | null
  stock_status: string
  is_featured: boolean
  image_url: string | null
  created_at?: string
}

export default function AdminExports() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Panel state
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Live update indicator
  const [flashId, setFlashId] = useState<string | null>(null)

  // Form fields
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Fresh Produce')
  const [price, setPrice] = useState('')
  const [stockStatus, setStockStatus] = useState('in_stock')
  const [isFeatured, setIsFeatured] = useState(false)
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    fetchExports()

    // ── Supabase Realtime subscription ─────────────────────────────────────
    const channel = supabase
      .channel('admin-exports-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload: any) => {
        fetchExports()
        if (payload.new && (payload.new as any).id) {
          setFlashId((payload.new as any).id)
          setTimeout(() => setFlashId(null), 2000)
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const fetchExports = async () => {
    const { data, error } = await supabase.from('products').select('*').contains('metadata', {is_export: true}).order('created_at', { ascending: false })
    if (!error) setProducts(data || [])
    setLoading(false)
  }

  const openAddPanel = () => {
    setEditingProduct(null)
    setName(''); setCategory('Fresh Produce'); setPrice('')
    setStockStatus('in_stock'); setIsFeatured(false); setDescription('')
    setImageFile(null); setImagePreview(null)
    setIsPanelOpen(true)
  }

  const openEditPanel = (p: Product) => {
    setEditingProduct(p)
    setName(p.name); setCategory(p.category)
    setPrice(p.price ? String(p.price) : '')
    setStockStatus(p.stock_status); setIsFeatured(p.is_featured)
    setDescription((p as any).description || '')
    setImageFile(null); setImagePreview(p.image_url)
    setIsPanelOpen(true)
  }

  const closePanel = () => { setIsPanelOpen(false); setEditingProduct(null) }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    let imageUrl = editingProduct?.image_url || null

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const uploadPath = `public/${fileName}`

      const formData = new FormData()
      formData.append('file', imageFile)
      formData.append('path', uploadPath)

      const result = await uploadProductImage(formData)

      if (result.error) {
         console.error('Upload Error:', result.error)
         alert(`Image Upload Failed: ${result.error}. Ensure you have admin privileges.`)
         setIsSubmitting(false)
         return
      }

      const uploadData = result.data

      if (uploadData) {
        const { data: urlData } = supabase.storage.from('products').getPublicUrl(uploadData.path)
        imageUrl = urlData.publicUrl
      }
    }

    const payload: any = {
      metadata: { is_export: true },
      name: name.trim(), 
      category: category.trim(),
      price: price ? parseFloat(price) : null,
      stock_status: stockStatus.trim(),
      is_featured: isFeatured,
      description: description.trim(),
      image_url: imageUrl ? imageUrl.trim() : null,
      updated_at: new Date().toISOString()
    }

    const resultAction = await saveProductAction(payload, editingProduct?.id)

    if (resultAction.success) { 
       fetchExports() 
       closePanel() 
    } else { 
       alert(`Save failed: ${resultAction.error}`) 
    }
    setIsSubmitting(false)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    await supabase.from('products').delete().eq('id', deleteTarget.id)
    setDeleteTarget(null)
    setIsDeleting(false)
  }

  const stockColors: Record<string, { bg: string; color: string }> = {
    in_stock: { bg: '#D1FAE5', color: '#065F46' },
    out_of_stock: { bg: '#FEE2E2', color: '#991B1B' },
    pre_order: { bg: '#FEF3C7', color: '#92400E' },
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1.5rem, 4vw, 4rem) clamp(1rem, 4vw, 2rem)' }}>

        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'clamp(1.5rem, 4vw, 3rem)', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Link href="/admin/dashboard" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.6rem', textDecoration: 'none' }}>
              ← Dashboard
            </Link>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: 'var(--secondary)', fontWeight: '950', margin: 0 }}>Exports</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
              {products.length} listing{products.length !== 1 ? 's' : ''} &bull; <span style={{ color: '#10B981', fontWeight: '700' }}>● Live</span>
            </p>
          </div>
          <button onClick={openAddPanel} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 'clamp(0.7rem, 2vw, 1rem) clamp(1rem, 3vw, 1.75rem)', background: 'var(--primary)', color: 'var(--secondary)', fontWeight: '900', border: 'none', borderRadius: '100px', cursor: 'pointer', fontSize: 'clamp(0.82rem, 2vw, 0.95rem)', whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(255,183,3,0.35)' }}>
            <Plus size={18} strokeWidth={3} /> Add Export Product
          </button>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--text-muted)' }}>
            <Package size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
            <p style={{ fontWeight: '600' }}>Loading products…</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', background: 'white', borderRadius: '24px', border: '1px solid #E5E7EB' }}>
            <Package size={52} style={{ margin: '0 auto 1rem', opacity: 0.25 }} />
            <p style={{ fontWeight: '700', color: 'var(--secondary)', fontSize: '1.1rem' }}>No products yet</p>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.3rem' }}>Click "Add Export Product" to create your first listing.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'none' }} className="desktop-table-wrapper">
              <style>{`.desktop-table-wrapper { display: block !important; } @media (max-width: 640px) { .desktop-table-wrapper { display: none !important; } }`}</style>
              <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E5E7EB' }}>
                      <th style={{ ...thStyle, width: '35%' }}>Export Product</th>
                      <th style={{ ...thStyle, width: '18%' }}>Category</th>
                      <th style={{ ...thStyle, width: '12%' }}>Price</th>
                      <th style={{ ...thStyle, width: '15%' }}>Stock</th>
                      <th style={{ ...thStyle, width: '20%', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {products.map((p) => (
                        <motion.tr
                          key={p.id}
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0, background: flashId === p.id ? 'rgba(16,185,129,0.08)' : 'transparent' }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.25 }}
                          style={{ borderBottom: '1px solid #F3F4F6', transition: 'background 0.4s' }}
                        >
                          <td style={tdStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                              <div style={{ width: '44px', height: '44px', background: '#F3F4F6', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                                {p.image_url
                                  ? <img src={p.image_url} alt={p.name} onError={(e) => { (e.target as HTMLImageElement).src = '/images/nectar.png'; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={18} style={{ opacity: 0.3 }} /></div>}
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <span style={{ fontWeight: '800', color: 'var(--secondary)', display: 'block', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                                {p.is_featured && <span style={{ fontSize: '0.6rem', background: '#FEF3C7', color: '#D97706', padding: '0.1rem 0.5rem', borderRadius: '4px', fontWeight: '800', textTransform: 'uppercase' }}>Featured</span>}
                              </div>
                            </div>
                          </td>
                          <td style={{ ...tdStyle, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{p.category}</td>
                          <td style={{ ...tdStyle, fontWeight: '800', color: 'var(--secondary)', fontSize: '0.9rem' }}>{p.price ? `$${p.price}` : '—'}</td>
                          <td style={tdStyle}>
                            <span style={{ padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', ...stockColors[p.stock_status] }}>
                              {p.stock_status.replace('_', ' ')}
                            </span>
                          </td>
                          <td style={{ ...tdStyle, textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                              <button onClick={() => openEditPanel(p)}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.9rem', background: 'rgba(0,45,38,0.06)', border: '1px solid rgba(0,45,38,0.1)', borderRadius: '8px', color: 'var(--secondary)', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--secondary)'; e.currentTarget.style.color = 'white' }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,45,38,0.06)'; e.currentTarget.style.color = 'var(--secondary)' }}
                              ><Edit size={13} /> Edit</button>
                              <button onClick={() => setDeleteTarget(p)}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.9rem', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.12)', borderRadius: '8px', color: '#DC2626', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#DC2626'; e.currentTarget.style.color = 'white' }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.06)'; e.currentTarget.style.color = '#DC2626' }}
                              ><Trash2 size={13} /> Delete</button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mobile-cards-wrapper">
              <style>{`.mobile-cards-wrapper { display: none; } @media (max-width: 640px) { .mobile-cards-wrapper { display: flex; flex-direction: column; gap: 0.9rem; } }`}</style>
              <AnimatePresence>
                {products.map(p => (
                  <motion.div key={p.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, background: flashId === p.id ? 'linear-gradient(135deg,rgba(16,185,129,0.08),white)' : 'white' }} exit={{ opacity: 0, scale: 0.96 }}
                    style={{ borderRadius: '18px', border: '1px solid #E5E7EB', padding: '1.2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '52px', height: '52px', background: '#F3F4F6', borderRadius: '14px', overflow: 'hidden', flexShrink: 0 }}>
                        {p.image_url
                          ? <img src={p.image_url} alt={p.name} onError={(e) => { (e.target as HTMLImageElement).src = '/images/nectar.png'; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={20} style={{ opacity: 0.3 }} /></div>}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <span style={{ fontWeight: '900', color: 'var(--secondary)', fontSize: '0.95rem', lineHeight: 1.2 }}>{p.name}</span>
                          <span style={{ padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', flexShrink: 0, ...stockColors[p.stock_status] }}>
                            {p.stock_status.replace('_', ' ')}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{p.category} {p.is_featured && '• ⭐ Featured'}</p>
                        <p style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--secondary)', marginTop: '0.3rem' }}>{p.price ? `$${p.price}` : 'Contact for price'}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                      <button onClick={() => openEditPanel(p)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.75rem', background: 'rgba(0,45,38,0.06)', border: '1.5px solid rgba(0,45,38,0.12)', borderRadius: '12px', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}>
                        <Edit size={15} /> Edit
                      </button>
                      <button onClick={() => setDeleteTarget(p)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.75rem', background: 'rgba(220,38,38,0.06)', border: '1.5px solid rgba(220,38,38,0.12)', borderRadius: '12px', color: '#DC2626', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}>
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePanel}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,30,25,0.5)', backdropFilter: 'blur(6px)', zIndex: 200 }} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(100vw, 520px)', background: 'white', zIndex: 201, boxShadow: '-20px 0 80px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}
            >
              <div style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', flexShrink: 0, position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
                <div>
                  <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', fontWeight: '950', color: 'var(--secondary)', margin: 0 }}>
                    {editingProduct ? 'Edit Export Product' : 'New Export Product'}
                  </h2>
                  {editingProduct && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Updating: {editingProduct.name}</p>}
                </div>
                <button onClick={closePanel} style={{ background: '#F3F4F6', border: 'none', width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={18} color="var(--text-muted)" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', flexGrow: 1 }}>
                <div>
                  <label style={labelStyle}>Export Product Image</label>
                  <div style={{ width: '100%', height: '180px', border: '2px dashed #CBD5E1', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#F8FAFC', cursor: 'pointer' }}>
                    {imagePreview
                      ? <img src={imagePreview} alt="Preview" onError={(e) => { (e.target as HTMLImageElement).src = '/images/nectar.png'; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ textAlign: 'center', color: '#94A3B8', pointerEvents: 'none' }}><UploadCloud size={36} style={{ margin: '0 auto 0.4rem' }} /><p style={{ fontSize: '0.82rem', fontWeight: '600' }}>{editingProduct ? 'Click to replace image' : 'Click to upload'}</p></div>
                    }
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                    {imagePreview && <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.55)', color: 'white', padding: '0.25rem 0.55rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', pointerEvents: 'none' }}>Click to change</div>}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Export Product Name *</label>
                  <input value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Organic Heritage Nectar" style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="Describe the product heritage, flavor profile, and export status..." 
                    style={{ ...inputStyle, height: '100px', resize: 'none' }} 
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                      <option value="Fresh Produce">Fresh Produce</option><option value="Spices & Roots">Spices & Roots</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Price (USD)</label>
                    <input value={price} onChange={e => setPrice(e.target.value)} type="number" step="0.01" min="0" placeholder="0.00" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Stock Status</label>
                  <select value={stockStatus} onChange={e => setStockStatus(e.target.value)} style={inputStyle}>
                    <option value="in_stock">In Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="pre_order">Pre-Order</option>
                  </select>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none' }}>
                  <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }} />
                  <span style={{ fontWeight: '700', color: 'var(--secondary)', fontSize: '0.9rem' }}>Feature on homepage</span>
                </label>

                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <button type="submit" disabled={isSubmitting}
                    style={{ width: '100%', padding: '1.1rem', background: editingProduct ? 'var(--secondary)' : 'var(--primary)', color: editingProduct ? 'white' : 'var(--secondary)', fontWeight: '900', fontSize: '0.95rem', border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: isSubmitting ? 0.7 : 1, transition: 'opacity 0.2s' }}>
                    {isSubmitting ? (editingProduct ? 'Saving…' : 'Creating…') : <><CheckCircle size={18} /> {editingProduct ? 'Save Changes' : 'Add Export Product'}</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
            <h3 style={{ fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', fontWeight: '950', color: 'var(--secondary)', marginBottom: '0.6rem' }}>Delete Export Product?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.8rem' }}>
              Permanently delete <strong style={{ color: 'var(--secondary)' }}>{deleteTarget.name}</strong>? This cannot be undone.
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

const thStyle: React.CSSProperties = { padding: '1rem 1.25rem', color: '#6B7280', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'left' }
const tdStyle: React.CSSProperties = { padding: '0.9rem 1.25rem', fontSize: '0.9rem', verticalAlign: 'middle' }
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.78rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.08em' }
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.85rem 1rem', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '10px', fontSize: '0.92rem', outline: 'none', fontWeight: '500', color: 'var(--secondary)', boxSizing: 'border-box', fontFamily: 'inherit' }
