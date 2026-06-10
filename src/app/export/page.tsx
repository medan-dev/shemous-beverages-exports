'use client'

import { useState, useEffect } from 'react'
import { Globe, Package, CheckCircle, Leaf, Loader2, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import WhatsAppOrderModal from '@/components/WhatsAppOrderModal'
import WhatsAppIcon from '@/components/WhatsAppIcon'
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
      <div 
        suppressHydrationWarning
        style={{
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

      <div className="container" style={{ position: 'relative', zIndex: 1 }} suppressHydrationWarning>
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
        >

          {/* Export Products Showcase Section */}
          <motion.div variants={itemVars} suppressHydrationWarning>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }} suppressHydrationWarning>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.2rem', color: 'var(--primary)' }} suppressHydrationWarning>
                   <Leaf size={24} />
               </div>
               <h2 style={{ fontSize: '2.5rem', fontWeight: '950', color: 'var(--secondary)', marginBottom: '1rem' }}>Fresh Produce Exports</h2>
               <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Sourcing the premium produce responsible for the **best juices in Uganda**, our raw organic fruits are certified for international export.</p>
            </div>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem 0' }}>
                <Loader2 className="animate-spin" size={60} color="var(--primary)" />
              </div>
            ) : (
              <div className="products-grid">
                {[
                  {
                    id: 'prod-banana',
                    name: 'Premium Export Bananas',
                    category: '100% Organic',
                    description: 'Hand-harvested, premium Cavendish bananas from the rich soils of Uganda, ready for global shipping.',
                    image: '/images/banana_export.jpg',
                    heritage: true
                  },
                  {
                    id: 'prod-passion-fruit',
                    name: 'Tropical Passion Fruit',
                    category: 'Exotic Export',
                    description: 'Aromatic, tangy-sweet tropical passion fruits bursting with rich flavor, carefully sorted for premium export.',
                    image: '/images/passion_fruit_raw.png',
                    heritage: false
                  },
                  {
                    id: 'prod-ginger',
                    name: 'Organic Ginger Root',
                    category: 'Direct Farm',
                    description: 'Intensely flavorful, raw organic ginger roots harvested at peak maturity for international export.',
                    image: '/images/ginger_export.jpg',
                    heritage: true
                  },
                  {
                    id: 'prod-mango',
                    name: 'Fresh Tropical Mangoes',
                    category: 'Pure Nature',
                    description: 'Sun-ripened, naturally sweet tropical mangoes, carefully packaged to preserve farm-fresh quality.',
                    image: '/images/mango_export.jpg',
                    heritage: false
                  },
                  {
                    id: 'prod-pineapple',
                    name: 'Premium Pineapples',
                    category: 'Global Export',
                    description: 'Juicy, vibrant Ugandan pineapples known globally for their exceptional sweetness and low acidity.',
                    image: '/images/pineapple_export.jpg',
                    heritage: false
                  },
                  {
                    id: 'prod-lemon',
                    name: 'Fresh Organic Lemons',
                    category: 'Pure Citrus',
                    description: 'Zesty, thick-skinned organic lemons hand-picked from the sun-drenched orchards of Uganda.',
                    image: '/images/lemon_export.png',
                    heritage: false
                  },
                  {
                    id: 'prod-chili',
                    name: "Bird's Eye Chili",
                    category: 'Direct Farm',
                    description: 'Intensely fiery, organic Bird\'s Eye Chili harvested at peak ripeness for export.',
                    image: '/images/export_birds_eye_chili.png',
                    heritage: false
                  },
                  {
                    id: 'prod-matooke',
                    name: 'Premium Matooke',
                    category: 'Ugandan Heritage',
                    description: 'The finest authentic green bananas from the heart of Uganda, prepared for international export.',
                    image: '/images/export_matooke.png',
                    heritage: true
                  }
                ].map((product: any, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                    whileHover={{ y: -10, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
                    key={product.id}
                  >
                    <Link href={`/export/${product.id}`} style={{ textDecoration: 'none' }}>
                      <div className="shemous-scurve-card" style={{ height: '100%', cursor: 'pointer', background: 'white', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '280px', position: 'relative', overflow: 'hidden', background: '#f8fafc' }}>
                          <img 
                              className="product-export-image"
                              src={product.image_url || product.image || '/images/nectar.png'} 
                              alt={product.name}
                              onError={(e) => { (e.target as HTMLImageElement).src = '/images/nectar.png'; }}
                              style={{ 
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                              }}
                          />
                        </div>

                        <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--primary-dark)', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem', display: 'block' }}>{product.category}</span>
                          <h3 className="text-truncate-1" style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '0.8rem', lineHeight: '1.2' }}>{product.name}</h3>
                          <p className="text-truncate-3" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', flexGrow: 1 }}>{product.description}</p>
                          
                          <div style={{ marginTop: 'auto', display: 'flex', gap: '0.8rem' }}>
                            <button 
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setSelectedProduct(product)
                                setIsModalOpen(true)
                              }}
                              className="btn-hover" 
                              style={{ 
                                flex: 1,
                                padding: '0.8rem', 
                                background: '#25D366', 
                                color: 'white', 
                                border: 'none', 
                                fontSize: '0.9rem', 
                                fontWeight: '900', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '0.4rem',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(37,211,102,0.2)'
                              }}
                            >
                                WhatsApp <WhatsAppIcon size={16} fill="white" />
                            </button>
                            <a 
                              href="tel:+256705436657"
                              onClick={(e) => e.stopPropagation()}
                              className="btn-hover" 
                              style={{ 
                                flex: 1,
                                padding: '0.8rem', 
                                background: 'var(--primary)', 
                                color: 'var(--secondary)', 
                                textDecoration: 'none',
                                fontSize: '0.9rem', 
                                fontWeight: '900', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '0.4rem',
                                borderRadius: '12px',
                                transition: 'all 0.3s ease'
                              }}
                            >
                                Call Us <Phone size={16} fill="var(--secondary)" color="var(--secondary)" />
                            </a>
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
