'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Phone } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import WhatsAppOrderModal from '@/components/WhatsAppOrderModal'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function fetchFeatured() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(6)
        
        if (!error && data && isMounted) {
          setProducts(data)
        }
      } catch (err) {
        console.error('Error fetching featured products:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchFeatured()

    return () => {
      isMounted = false
    }
  }, [])

  const displayProducts = products.length > 0 ? products : [
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
  ];

  if (loading) {
    return (
      <div suppressHydrationWarning style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
        <Loader2 className="animate-spin" size={50} color="var(--primary)" />
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: 'var(--content-gap) 0', background: 'var(--background)' }}>
      <div className="container" suppressHydrationWarning>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: 'var(--foreground)', margin: '0 0 1rem 0', letterSpacing: '-0.02em' }}>
            Our Export Catalog
          </h2>
          <p style={{ color: 'var(--foreground)', opacity: 0.7, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Discover our globally certified, 100% organic products ready for immediate export from Uganda to your destination.
          </p>
        </div>

        <div suppressHydrationWarning className="products-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2.5rem',
          padding: '1rem'
        }}>
          {displayProducts.map((product: any, i) => (
            <motion.div 
              key={product.id} 
              suppressHydrationWarning
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="shemous-scurve-card" 
              style={{ height: '100%', cursor: 'pointer', background: 'white', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div suppressHydrationWarning style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Link suppressHydrationWarning href={`/export`} style={{ textDecoration: 'none', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div suppressHydrationWarning style={{ height: '280px', position: 'relative', overflow: 'hidden', background: '#f8fafc' }}>
                    <img 
                        src={product.image_url || product.image} 
                        alt={product.name}
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    />
                  </div>

                  <div suppressHydrationWarning style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary-dark)', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem', display: 'block' }}>
                      {product.category || 'Premium Export'}
                    </span>
                    <h3 className="text-truncate-1" style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '0.8rem', lineHeight: '1.2' }}>
                      {product.name}
                    </h3>
                    
                    <p className="text-truncate-3" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', flexGrow: 1 }}>
                      {product.description}
                    </p>
                  </div>
                </Link>
                    
                <div suppressHydrationWarning style={{ display: 'flex', gap: '0.8rem', padding: '0 1.5rem 1.5rem 1.5rem' }}>
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
            </motion.div>
          ))}
        </div>

      </div>
      <WhatsAppOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} />
    </div>
  )
}
