'use client'

import { useState, useEffect } from 'react'
import { Globe, Package, CheckCircle, MessageCircle, Leaf, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import WhatsAppOrderModal from '@/components/WhatsAppOrderModal'
import { supabase } from '@/lib/supabase'

export default function ExportPage() {
  const [exportProducts, setExportProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function fetchExportProducts() {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .contains('metadata', { is_export: true })
        .order('created_at', { ascending: false })
      if (!error && data && isMounted) {
        setExportProducts(data)
      }
      if (isMounted) setLoading(false)
    }

    fetchExportProducts()

    const channel = supabase
      .channel('public-exports-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        fetchExportProducts()
      })
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  }

  return (
    <div style={{ 
      backgroundColor: 'var(--bg-creme)', 
      minHeight: '100vh', 
      padding: 'var(--section-padding-top) 0 var(--section-padding-bottom) 0',
      position: 'relative',
      overflow: 'hidden'
    }}
    suppressHydrationWarning>
      <style jsx global>{`
        .text-truncate-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .text-truncate-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .product-export-image:hover {
          transform: scale(1.12) rotate(4deg);
        }
      `}</style>
      
      {/* Decorative Blob */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255, 183, 3, 0.1) 0%, rgba(255, 183, 3, 0) 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
        >

          {/* Export Products Showcase Section */}
          <motion.div variants={itemVars}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.2rem', color: 'var(--primary)' }}>
                   <Leaf size={24} />
               </div>
               <h2 style={{ fontSize: '2.5rem', fontWeight: '950', color: 'var(--secondary)', marginBottom: '1rem' }}>Fresh Produce Exports</h2>
               <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Sourcing the premium produce responsible for the **best juices in Uganda**, our raw organic fruits are certified for international export.</p>
            </div>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem 0' }}>
                <Loader2 className="animate-spin" size={60} color="var(--primary)" />
              </div>
            ) : exportProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                <p>No export products available at this time.</p>
              </div>
            ) : (
              <div className="products-grid">
                {exportProducts.map((product, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                    whileHover={{ y: -10, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
                    key={product.id}
                  >
                    <Link href={`/export/${product.id}`} style={{ textDecoration: 'none' }}>
                      <div className="shemous-scurve-card" style={{ height: '100%', cursor: 'pointer' }}>
                      <div className="scurve-bg-fix" />
                      <div className="card-scurve-header">
                        <img 
                            className="product-export-image"
                            src={product.image_url || product.image || '/images/nectar.png'} 
                            alt={product.name}
                            loading="lazy"
                            onLoad={(e) => (e.target as HTMLImageElement).classList.add('loaded')}
                            onError={(e) => { (e.target as HTMLImageElement).src = '/images/nectar.png'; (e.target as HTMLImageElement).classList.add('loaded'); }}
                            style={{ 
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              zIndex: 2,
                              filter: 'saturate(1.2) contrast(1.1)',
                              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        />
                      </div>

                      <div className="card-scurve-content">
                        <span style={{ fontSize: '0.75rem', color: 'var(--primary-dark)', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem', display: 'block' }}>{product.category}</span>
                        <h3 className="text-truncate-1" style={{ fontSize: '1.4rem', fontWeight: '950', color: 'var(--secondary)', marginBottom: '1rem', lineHeight: '1.2' }}>{product.name}</h3>
                        <p className="text-truncate-3" style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>{product.description}</p>
                        
                        <div style={{ marginTop: 'auto' }}>
                          <button 
                            onClick={(e) => {
                              e.preventDefault()
                              setSelectedProduct(product)
                              setIsModalOpen(true)
                            }}
                            className="btn-hover" 
                            style={{ 
                              width: '100%',
                              padding: '1rem', 
                              background: 'var(--primary)', 
                              color: 'var(--secondary)', 
                              border: 'none', 
                              fontSize: '0.95rem', 
                              fontWeight: '900', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              gap: '0.5rem',
                              borderRadius: '16px',
                              cursor: 'pointer'
                            }}
                          >
                              Request Quote <MessageCircle size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
                ))}
              </div>
            )}
            
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <Link href="/contact" style={{ display: 'inline-block' }}>
                <button className="liquid-blob-btn btn-hover" style={{ 
                  padding: '1.4rem 3rem', background: 'var(--secondary)', color: 'white', border: 'none', 
                  borderRadius: '100px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer' 
                }}>
                  Start Partnership Inquiry
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <WhatsAppOrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
      />
    </div>
  )
}
