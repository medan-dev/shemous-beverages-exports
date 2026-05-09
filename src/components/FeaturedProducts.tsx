'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ScrollReveal from '@/components/ScrollReveal'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
          const standardProducts = data.filter((p: any) => !p.metadata?.is_export).slice(0, 3)
          setProducts(standardProducts)
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

  // Provide high-quality placeholders if the database is empty or fails to fetch
  const displayProducts = products.length > 0 ? products : [
    {
      id: 'placeholder-1',
      name: 'Premium Banana Nectar',
      category: 'Banana Juice',
      description: 'A rich, creamy blend of the finest organic bananas, cold-pressed to preserve natural sweetness and nutrients.',
      image: '/images/nectar.png',
      heritage: true
    },
    {
      id: 'placeholder-2',
      name: 'Tropical Citrus Fusion',
      category: 'Tropical Juice',
      description: 'An invigorating mix of sun-ripened oranges, pineapples, and a hint of ginger for a refreshing kick.',
      image: '/images/citrus.png',
      heritage: false
    },
    {
      id: 'placeholder-3',
      name: 'Artisan Banana Chips',
      category: 'Dried Snacks',
      description: 'Crispy, thinly sliced plantains slowly dehydrated to lock in the perfect crunch and natural flavor.',
      image: '/images/chips.png',
      heritage: true
    }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
        <Loader2 className="animate-spin" size={50} color="var(--primary)" />
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: 'var(--content-gap) 0' }}>
      <div suppressHydrationWarning>
        
        <ScrollReveal blur direction="scale">
          <div style={{ textAlign: 'center', marginBottom: 'var(--content-gap)' }}>
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 0.6, letterSpacing: '0.4em' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ color: 'var(--secondary)', fontWeight: '950', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}
            >
              Curated Excellence
            </motion.span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--h2-size)', fontWeight: '700', color: 'var(--secondary)', letterSpacing: '-0.03em', position: 'relative', display: 'inline-block' }}>
              Featured Products
              <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', width: '150px', height: '10px', color: 'var(--primary)', opacity: 0.5 }}>
                <svg viewBox="0 0 200 10" fill="none">
                  <path d="M5 5 Q 50 1, 100 5 T 195 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </h2>
          </div>
        </ScrollReveal>

        <div className="products-grid">
          {displayProducts.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.15} blur direction="up">
              <Link href={`/products/${product.id}`}>
                <motion.div
                  className="shemous-scurve-card"
                  whileHover={{ y: -14, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
                  style={{ height: '100%' }}
                >
                  <div className="scurve-bg-fix" />
                  
                  <div className="card-scurve-header">
                    <div style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 10 }}>
                      {product.heritage && (
                        <div style={{ background: 'white', color: 'var(--secondary)', padding: '0.6rem 1.4rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.15em', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                          Heritage
                        </div>
                      )}
                    </div>
                    <img 
                        className="product-export-image"
                        src={product.image_url || product.image || '/images/nectar.png'} 
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
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
                          filter: 'saturate(1.1) contrast(1.05)',
                          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    />
                  </div>

                  <div className="card-scurve-content">
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary-dark)', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1.2rem', display: 'block' }}>{product.category}</span>
                    <h3 className="text-truncate-1" style={{ fontSize: 'var(--h3-size)', fontWeight: '950', color: 'var(--secondary)', marginBottom: '1.5rem', lineHeight: '1.1', letterSpacing: '-0.03em', minHeight: '2.2em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{product.name}</h3>
                    <p className="text-truncate-3" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.8rem', fontWeight: '450', minHeight: '5.1rem' }}>{product.description || 'Discover the perfect blend of nature and craft.'}</p>
                    
                    <div style={{ marginTop: 'auto' }}>
                      <button 
                        className="btn-hover liquid-blob-btn" 
                        style={{ 
                          width: 'auto', 
                          margin: '0 auto',
                          padding: '1.1rem 2.8rem', 
                          background: 'linear-gradient(135deg, var(--secondary), var(--primary))', 
                          color: 'white', 
                          border: 'none', 
                          fontSize: '0.9rem', 
                          fontWeight: '950', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '0.8rem',
                          boxShadow: '0 15px 35px rgba(0, 77, 64, 0.18)',
                          borderRadius: '100px',
                          cursor: 'pointer'
                        }}
                      >
                          View Details <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Explore All Link */}
        <ScrollReveal delay={0.4} direction="up" blur style={{ textAlign: 'center', marginTop: 'var(--content-gap)' }}>
          <Link
            href="/products"
            className="liquid-blob-btn btn-hover text-white"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.5rem 4rem',
              background: 'white',
              color: 'var(--secondary)',
              border: '2px solid var(--secondary)',
              fontWeight: '800',
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 25px 50px rgba(0,77,64,0.05)',
            }}
          >
            Explore All Products <ArrowRight size={20} />
          </Link>
        </ScrollReveal>

      </div>
    </div>
  )
}
