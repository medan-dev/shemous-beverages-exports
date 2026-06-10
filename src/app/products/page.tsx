'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight, Zap, Leaf, Milk, Cookie, Loader2, Globe, Flame, Sun, Droplets, ChevronLeft, ChevronRight, Phone } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import CurvedDivider from '@/components/CurvedDivider'
import WhatsAppOrderModal from '@/components/WhatsAppOrderModal'
import WhatsAppIcon from '@/components/WhatsAppIcon'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)', scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { 
      duration: 0.75, 
      ease: [0.16, 1, 0.3, 1] as any
    }
  }
}

const categories = [
  { name: 'All', icon: null },
  { name: 'Banana Juice', icon: <Leaf size={16} /> },
  { name: 'Banana Smoothie', icon: <Zap size={16} /> },
  { name: 'Banana Milk', icon: <Milk size={16} /> },
  { name: 'Dried Banana Chips', icon: <Cookie size={16} /> },
  { name: 'Tropical Juice', icon: <Droplets size={16} /> },
]


const ProductBlob = ({ color, size, delay, x, y }: { color: string, size: string, delay: number, x: string, y: string }) => (
  <motion.div
    suppressHydrationWarning
    animate={{ 
      y: [0, -50, 0],
      x: [0, 30, -30, 0],
      rotate: [0, 10, -10, 0],
      opacity: [0.05, 0.1, 0.05]
    }}
    transition={{ duration: 15, repeat: Infinity, delay: delay, ease: 'easeInOut' }}
    style={{ position: 'absolute', top: y, left: x, width: size, height: size, backgroundColor: color, borderRadius: '45% 55% 60% 40% / 40% 60% 40% 60%', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}
  />
)

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [productList, setProductList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const filterScrollRef = useRef<HTMLDivElement>(null)

  const handleFilterScroll = () => {
    const el = filterScrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  const scrollFilter = (dir: 'left' | 'right') => {
    filterScrollRef.current?.scrollBy({ left: dir === 'left' ? -220 : 220, behavior: 'smooth' })
  }

  useEffect(() => {
    let isMounted = true

    async function fetchProducts() {
      setLoading(true)
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      if (!error && data && isMounted) {
        setProductList(data.filter((p: any) => !p.metadata?.is_export))
      }
      if (isMounted) setLoading(false)
    }

    fetchProducts()

    // Supabase Realtime — live sync whenever admin edits/adds/deletes a product
    const channel = supabase
      .channel('public-products-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        fetchProducts()
      })
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  const fallbackProducts = [
    {
      id: 'prod-juice',
      name: 'Premium Banana Juice',
      category: 'Banana Juice',
      description: '100% organic, cold-pressed banana juice, capturing the sweet, pure essence of Ugandan harvests.',
      image_url: '/images/export_banana_juice.png',
      heritage: true
    },
    {
      id: 'prod-smoothie',
      name: 'Banana Smoothie',
      category: 'Banana Smoothie',
      description: 'A rich, creamy, and naturally sweet banana smoothie blended for maximum organic nutrition.',
      image_url: '/images/export_banana_smoothie.png',
      heritage: false
    },
    {
      id: 'prod-chips',
      name: 'Artisan Banana Chips',
      category: 'Dried Banana Chips',
      description: 'Crispy, golden-baked artisan banana chips, lightly sweetened for the perfect healthy organic snack.',
      image_url: '/images/export_banana_chips.png',
      heritage: false
    },
    {
      id: 'prod-milk',
      name: 'Organic Banana Milk',
      category: 'Banana Milk',
      description: 'Dairy-free, naturally sweet plant-based banana milk, exceptionally rich in potassium and flavor.',
      image_url: '/images/nectar.png',
      heritage: false
    }
  ];

  const sourceProducts = productList.length > 0 ? productList : fallbackProducts;

  const filteredProducts = activeCategory === 'All' 
    ? sourceProducts 
    : sourceProducts.filter(p => p.category === activeCategory)

  return (
    <div style={{ 
      backgroundColor: 'transparent', 
      minHeight: '100vh', 
      padding: 'var(--section-padding-top) 0 var(--section-padding-bottom) 0',
      position: 'relative',
      overflow: 'hidden'
    }} suppressHydrationWarning>
      <style jsx global>{`
        .text-truncate-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .text-truncate-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
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
      `}</style>
      {/* 
        PRODUCT SECTION: LIVING BACKGROUND 
        Injecting animated 'Nectar' blobs for a premium cinematic depth.
      */}
      <ProductBlob color="var(--primary)" size="600px" delay={0} x="-5%" y="10%" />
      <ProductBlob color="var(--secondary)" size="500px" delay={5} x="70%" y="40%" />
      <ProductBlob color="var(--primary)" size="400px" delay={2} x="10%" y="70%" />

      <motion.div 
        suppressHydrationWarning
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Header Section: PERFECTLY FRAMED CLEARANCE */}
        <header style={{ marginBottom: 'var(--content-gap)' }}>
          <motion.div variants={itemVariants}>
            <span style={{ color: 'var(--primary)', fontWeight: '950', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.25em', display: 'block', marginBottom: '1.2rem' }}>Organic Evolution</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--h1-size)', fontWeight: '700', color: 'var(--secondary)', marginBottom: '2rem', lineHeight: '0.95', letterSpacing: '-0.04em' }}>Our Collection</h1>
            <p style={{ fontSize: '1.35rem', color: 'var(--text-muted)', fontWeight: '450', maxWidth: '650px', lineHeight: '1.7' }}>Discover the **best juices in Uganda**, crafted from the finest organic fruits and delivered globally with clinical integrity.</p>
          </motion.div>
        </header>

        {/* 
          CATEGORY NAVIGATION BAR
          Single-line Glass Bar Navigation (Does not wrap, stays on one line).
        */}
        {/* ── CATEGORY FILTER BAR with scroll arrows ── */}
        <div style={{ position: 'relative', marginBottom: 'var(--content-gap)', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

          {/* Left arrow */}
          <motion.button
            suppressHydrationWarning
            aria-label="Scroll categories left"
            onClick={() => scrollFilter('left')}
            animate={{ opacity: canScrollLeft ? 1 : 0, pointerEvents: canScrollLeft ? 'auto' : 'none' }}
            transition={{ duration: 0.2 }}
            style={{
              flexShrink: 0,
              width: '42px', height: '42px',
              borderRadius: '50%',
              border: '1.5px solid var(--secondary-20)',
              background: 'white',
              boxShadow: '0 4px 16px var(--secondary-10)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--secondary)',
            }}
            whileHover={{ scale: 1.08, boxShadow: '0 6px 24px rgba(0,45,38,0.18)' }}
            whileTap={{ scale: 0.94 }}
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </motion.button>

          {/* Scrollable pill strip */}
          <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
            {/* Left fade */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '60px', zIndex: 2,
              background: 'linear-gradient(to right, rgba(246,244,238,0.95) 0%, transparent 100%)',
              borderRadius: '100px 0 0 100px',
              pointerEvents: 'none',
              opacity: canScrollLeft ? 1 : 0,
              transition: 'opacity 0.25s',
            }} />
            {/* Right fade */}
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '60px', zIndex: 2,
              background: 'linear-gradient(to left, rgba(246,244,238,0.95) 0%, transparent 100%)',
              borderRadius: '0 100px 100px 0',
              pointerEvents: 'none',
              opacity: canScrollRight ? 1 : 0,
              transition: 'opacity 0.25s',
            }} />

            <div
              ref={filterScrollRef}
              onScroll={handleFilterScroll}
              className="glass-card-organic-bar"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.6rem 1.2rem',
                borderRadius: '100px',
                overflowX: 'auto',
                gap: '0.4rem',
                scrollbarWidth: 'none',
                boxShadow: '0 20px 50px var(--secondary-05)',
                border: '1px solid var(--secondary-10)',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.8rem 2rem',
                    borderRadius: '50px',
                    border: 'none',
                    background: activeCategory === cat.name ? 'var(--secondary)' : 'transparent',
                    color: activeCategory === cat.name ? 'white' : 'var(--secondary)',
                    fontWeight: activeCategory === cat.name ? '900' : '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {cat.icon && <span style={{ opacity: activeCategory === cat.name ? 1 : 0.6 }}>{cat.icon}</span>}
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <motion.button
            suppressHydrationWarning
            aria-label="Scroll categories right"
            onClick={() => scrollFilter('right')}
            animate={{ opacity: canScrollRight ? 1 : 0, pointerEvents: canScrollRight ? 'auto' : 'none' }}
            transition={{ duration: 0.2 }}
            style={{
              flexShrink: 0,
              width: '42px', height: '42px',
              borderRadius: '50%',
              border: '1.5px solid var(--secondary-20)',
              background: 'white',
              boxShadow: '0 4px 16px var(--secondary-10)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--secondary)',
            }}
            whileHover={{ scale: 1.08, boxShadow: '0 6px 24px rgba(0,45,38,0.18)' }}
            whileTap={{ scale: 0.94 }}
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* Product Grid: High-Fidelity Cards */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem 0' }}>
            <Loader2 className="animate-spin" size={60} color="var(--primary)" />
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.88, filter: 'blur(6px)', transition: { duration: 0.3 } }}
                whileHover={{ y: -14, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
                key={product.id}
              >
                <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                  <div className="shemous-scurve-card" style={{ height: '100%', cursor: 'pointer', background: 'white', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '280px', position: 'relative', overflow: 'hidden', background: '#f8fafc' }}>
                      {product.heritage && (
                        <div style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 10, background: 'white', color: 'var(--secondary)', padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}>
                          Heritage
                        </div>
                      )}
                      <img 
                          className="product-export-image"
                          src={product.image_url || product.image || '/images/nectar.png'} 
                          alt={product.name}
                          style={{ 
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
      </motion.div>

      <WhatsAppOrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
      />
    </div>
  )
}
