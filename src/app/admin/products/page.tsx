'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, X, UploadCloud, CheckCircle, AlertTriangle, Package, DollarSign } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
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
  metadata?: any
  created_at?: string
}

export default function AdminProducts() {
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
  const [category, setCategory] = useState('Banana Juice')
  const [price, setPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [stockStatus, setStockStatus] = useState('in_stock')
  const [isFeatured, setIsFeatured] = useState(false)
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    fetchProducts()

    // ── Supabase Realtime subscription ─────────────────────────────────────
    // Admin panel stays in sync with any DB change automatically
    const channel = supabase
      .channel('admin-products-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload: any) => {
        fetchProducts()
        if (payload.new && (payload.new as any).id) {
          setFlashId((payload.new as any).id)
          setTimeout(() => setFlashId(null), 1000)
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (!error) setProducts(data || [])
    setLoading(false)
  }

  const openAddPanel = () => {
    setEditingProduct(null)
    setName(''); setCategory('Banana Juice'); setPrice(''); setSalePrice('')
    setStockStatus('in_stock'); setIsFeatured(false); setDescription('')
    setImageFile(null); setImagePreview(null)
    setIsPanelOpen(true)
  }

  const openEditPanel = (p: Product) => {
    setEditingProduct(p)
    setName(p.name); setCategory(p.category)
    setPrice(p.price ? String(p.price) : '')
    setSalePrice(p.metadata?.sale_price ? String(p.metadata.sale_price) : '')
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
      name: name.trim(), 
      category: category.trim(),
      price: price ? parseFloat(price) : null,
      stock_status: stockStatus.trim(),
      is_featured: isFeatured,
      description: description.trim(),
      image_url: imageUrl ? imageUrl.trim() : null,
      metadata: {
        ...(editingProduct?.metadata || {}),
        sale_price: salePrice ? parseFloat(salePrice) : null
      },
      updated_at: new Date().toISOString()
    }

    const resultAction = await saveProductAction(payload, editingProduct?.id)

    if (resultAction.success) { 
       fetchProducts() 
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

  const stockColors: Record<string, { bg: string; color: string; border: string }> = {
    in_stock: { bg: '#e6f4ea', color: '#137333', border: '#ceead6' },
    out_of_stock: { bg: '#fce8e6', color: '#c5221f', border: '#fad2cf' },
    pre_order: { bg: '#fef7e0', color: '#b06000', border: '#feefc3' },
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f6f6f6', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar - Seller Central Style */}
      <div style={{ background: '#232f3e', padding: '0.75rem 1.5rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#ff9900' }}>Seller Central</span>
          <span style={{ color: '#ccc', fontSize: '0.9rem' }}>| Catalog Management</span>
        </div>
        <Link href="/admin/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>Return to Dashboard</Link>
      </div>

      <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', background: 'white', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.4rem', color: '#111' }}>Manage Inventory</h1>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#555' }}>Add, edit, or delete products and manage pricing and sales.</p>
          </div>
          <button onClick={openAddPanel} style={{ background: '#f0c14b', border: '1px solid #a88734', borderColor: '#a88734 #9c7e31 #846a29', color: '#111', padding: '0.5rem 1rem', borderRadius: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', boxShadow: '0 1px 0 rgba(255,255,255,.4) inset' }}>
            <Plus size={16} /> Add a Product
          </button>
        </div>

        {/* Data Table */}
        <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '4px', overflowX: 'auto' }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#555' }}>Loading catalog...</div>
          ) : products.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#555' }}>No products found in catalog.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f3f3f3', borderBottom: '1px solid #ddd', color: '#111' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', width: '50px' }}>Image</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Product Name</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Price</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Sale Price</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #eee', background: flashId === p.id ? '#e6f4ea' : 'white' }}>
                    <td style={{ padding: '0.5rem' }}>
                      <div style={{ width: '40px', height: '40px', background: '#fafafa', border: '1px solid #eee' }}>
                        {p.image_url ? <img src={p.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <Package size={16} color="#ccc" style={{ margin: '12px' }} />}
                      </div>
                    </td>
                    <td style={{ padding: '0.5rem', color: '#007185', fontWeight: 'bold' }}>
                      {p.name} {p.is_featured && <span style={{ background: '#ff9900', color: 'white', fontSize: '0.7rem', padding: '0.1rem 0.3rem', borderRadius: '2px', marginLeft: '0.5rem' }}>Featured</span>}
                    </td>
                    <td style={{ padding: '0.5rem', color: '#555' }}>{p.category}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: 'bold', color: '#111' }}>{p.price ? `$${p.price.toFixed(2)}` : '--'}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: 'bold', color: '#B12704' }}>{p.metadata?.sale_price ? `$${p.metadata.sale_price.toFixed(2)}` : '--'}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '2px', background: stockColors[p.stock_status].bg, color: stockColors[p.stock_status].color, border: `1px solid ${stockColors[p.stock_status].border}` }}>
                        {p.stock_status === 'in_stock' ? 'In Stock' : p.stock_status === 'out_of_stock' ? 'Out of Stock' : 'Pre-Order'}
                      </span>
                    </td>
                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                      <button onClick={() => openEditPanel(p)} style={{ background: 'none', border: '1px solid #d5d9d9', padding: '0.25rem 0.5rem', borderRadius: '8px', cursor: 'pointer', marginRight: '0.5rem', fontSize: '0.85rem' }}>Edit</button>
                      <button onClick={() => setDeleteTarget(p)} style={{ background: 'none', border: '1px solid #d5d9d9', padding: '0.25rem 0.5rem', borderRadius: '8px', cursor: 'pointer', color: '#B12704', fontSize: '0.85rem' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Editor Modal */}
      {isPanelOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', width: '500px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f3f3f3', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#111' }}>{editingProduct ? 'Edit Product Offer' : 'Add New Product Offer'}</h2>
              <button onClick={closePanel} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#555" /></button>
            </div>
            
            <form onSubmit={handleSaveProduct} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={amazonLabel}>Product Name *</label>
                  <input value={name} onChange={e => setName(e.target.value)} required style={amazonInput} />
                </div>
                <div>
                  <label style={amazonLabel}>Category</label>
                  <input value={category} onChange={e => setCategory(e.target.value)} list="category-options" style={amazonInput} />
                  <datalist id="category-options">
                    <option value="Banana Juice" />
                    <option value="Banana Smoothie" />
                    <option value="Banana Milk" />
                    <option value="Dried Banana Chips" />
                    <option value="Fresh Produce" />
                    <option value="Tropical Juice" />
                  </datalist>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={amazonLabel}>Standard Price (USD)</label>
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={16} color="#555" style={{ position: 'absolute', left: '8px', top: '9px' }} />
                    <input value={price} onChange={e => setPrice(e.target.value)} type="number" step="0.01" min="0" style={{ ...amazonInput, paddingLeft: '28px' }} />
                  </div>
                </div>
                <div>
                  <label style={{ ...amazonLabel, color: '#B12704' }}>Sale Price (USD)</label>
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={16} color="#B12704" style={{ position: 'absolute', left: '8px', top: '9px' }} />
                    <input value={salePrice} onChange={e => setSalePrice(e.target.value)} type="number" step="0.01" min="0" style={{ ...amazonInput, paddingLeft: '28px' }} />
                  </div>
                </div>
              </div>

              <div>
                <label style={amazonLabel}>Stock Status</label>
                <select value={stockStatus} onChange={e => setStockStatus(e.target.value)} style={amazonInput}>
                  <option value="in_stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                  <option value="pre_order">Pre-Order</option>
                </select>
              </div>

              <div>
                <label style={amazonLabel}>Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ ...amazonInput, height: '80px', resize: 'vertical' }} />
              </div>

              <div>
                <label style={amazonLabel}>Product Image</label>
                <div style={{ border: '1px solid #d5d9d9', padding: '1rem', borderRadius: '4px', textAlign: 'center', background: '#fafafa' }}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" style={{ height: '100px', objectFit: 'contain', marginBottom: '0.5rem' }} />
                  ) : (
                    <div style={{ marginBottom: '0.5rem', color: '#555', fontSize: '0.85rem' }}>No image selected</div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ fontSize: '0.85rem' }} />
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
                Feature on Storefront Homepage
              </label>

              <div style={{ borderTop: '1px solid #ddd', marginTop: '0.5rem', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" onClick={closePanel} style={{ background: '#fff', border: '1px solid #d5d9d9', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} style={{ background: '#f0c14b', border: '1px solid #a88734', color: '#111', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  {isSubmitting ? 'Saving...' : 'Save and Finish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {mounted && deleteTarget && createPortal(
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', width: '400px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#111' }}>Confirm Deletion</h3>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: '#555' }}>Are you sure you want to delete <strong>{deleteTarget.name}</strong> from your catalog?</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={() => setDeleteTarget(null)} style={{ background: '#fff', border: '1px solid #d5d9d9', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleConfirmDelete} disabled={isDeleting} style={{ background: '#d9534f', border: '1px solid #d43f3a', color: 'white', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
                {isDeleting ? 'Deleting...' : 'Delete Listing'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  )
}

const amazonLabel: React.CSSProperties = { display: 'block', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.25rem', color: '#111' }
const amazonInput: React.CSSProperties = { width: '100%', padding: '0.4rem 0.5rem', border: '1px solid #888c8c', borderRadius: '3px', fontSize: '0.9rem', boxSizing: 'border-box', background: '#fff', boxShadow: '0 1px 2px rgba(15,17,17,.15) inset' }
