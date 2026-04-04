'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight, Zap, Leaf, Milk, Cookie, Loader2, Globe, MessageCircle, Flame, Sun, Droplets, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import CurvedDivider from '@/components/CurvedDivider'
import WhatsAppOrderModal from '@/components/WhatsAppOrderModal'

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
  { name: 'Ginger', icon: <Flame size={16} /> },
  { name: 'Pineapple', icon: <Sun size={16} /> },
  { name: 'Tropical Juice', icon: <Droplets size={16} /> },
  { name: 'Fresh Produce', icon: <Globe size={16} /> },
]


const fallbackProducts: any[] = [
  // Banana Line
  { id: 1,  name: 'Classic Banana Nectar',      category: 'Banana Juice',       image: '/images/nectar.png',                                                              image_url: '', status: 'Export Ready', heritage: true,
    description: 'Cold-pressed from Ugandan Bogoya bananas, this flagship nectar delivers a velvety, naturally sweet profile with every glass.' },
  { id: 4,  name: 'Banana Ginger Blend',        category: 'Banana Juice',       image: '/images/nectar.png',                                                              image_url: '', status: 'Export Ready',
    description: 'The bold warmth of Ugandan ginger meets the sweetness of ripe Bogoya bananas in this spiced, functional juice.' },
  { id: 6,  name: 'Green Banana Juice',         category: 'Banana Juice',       image: '/images/nectar.png',                                                              image_url: '', status: 'Export Ready',
    description: 'Extracted from unripe Ugandan matoke, rich in resistant starch and prebiotics for digestive wellness.' },
  { id: 11, name: 'Natural Banana Vinegar',     category: 'Banana Juice',       image: '/images/nectar.png',                                                              image_url: '', status: 'Export Ready',
    description: 'Fermented from 100% organic banana pulp — a probiotic-rich, naturally tangy vinegar for culinary and wellness use.' },
  { id: 2,  name: 'Tropical Banana Smoothie',   category: 'Banana Smoothie',    image: '/images/smoothie.png',                                                            image_url: '', status: 'Export Ready',
    description: 'A thick, blended banana smoothie fortified with local honey and lime — the ultimate nutritional powerhouse.' },
  { id: 3,  name: 'Organic Banana Milk',        category: 'Banana Milk',        image: '/images/milk.png',                                                                image_url: '', status: 'Export Ready',
    description: 'Lactose-free, organic banana milk made from ripe Ugandan Ndiizi bananas. A premium dairy alternative.' },
  { id: 7,  name: 'Banana Cinnamon Latte',      category: 'Banana Milk',        image: '/images/milk.png',                                                                image_url: '', status: 'Export Ready',
    description: 'A warming fusion of banana milk and Ceylon cinnamon — a café-quality drink crafted for international tastes.' },
  { id: 5,  name: 'Dried Banana Chips',         category: 'Dried Banana Chips', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=800&q=80',        image_url: '', status: 'Export Ready', featured: true,
    description: 'Sun-dried and lightly seasoned Gonja banana chips — a crunchy, zero-additive snack certified for global export.' },
  // Ginger Line
  { id: 13, name: 'Pure Ginger Shot',           category: 'Ginger',             image: '/images/ginger_shot.png',                                                         image_url: '', status: 'Export Ready', featured: true,
    description: 'A powerful, 100% cold-pressed shot from Ugandan organic ginger — high in gingerol, anti-inflammatory, and immune-boosting.' },
  { id: 14, name: 'Ginger Lemon Detox',         category: 'Ginger',             image: '/images/ginger_lemon.png',                                                        image_url: '', status: 'Export Ready',
    description: 'A zesty, alkalizing blend of fresh ginger, lemon, and turmeric — a daily detox ritual in every bottle.' },
  { id: 15, name: 'Ginger Hibiscus Infusion',   category: 'Ginger',             image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=800&q=80',              image_url: '', status: 'Export Ready',
    description: 'Ugandan ginger meets dried hibiscus flowers for a vibrant, ruby-red infusion with a sweet-tart finish.' },
  { id: 16, name: 'Ginger Turmeric Wellness',   category: 'Ginger',             image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80',          image_url: '', status: 'Export Ready',
    description: 'A golden elixir of ginger, turmeric, black pepper, and coconut water for maximum bioavailability and daily vitality.' },
  // Pineapple Line
  { id: 17, name: 'Golden Pineapple Nectar',    category: 'Pineapple',          image: '/images/pineapple_nectar.png',                                                    image_url: '', status: 'Export Ready', featured: true,
    description: 'Cold-pressed from Uganda\'s sweet MD2 pineapples — an enzyme-rich, sun-golden nectar with zero added sugar.' },
  { id: 18, name: 'Pineapple Ginger Blast',     category: 'Pineapple',          image: '/images/pineapple_nectar.png',                                                    image_url: '', status: 'Export Ready',
    description: 'The tropical sweetness of MD2 pineapple fused with fiery Ugandan ginger — a metabolism-boosting functional juice.' },
  { id: 19, name: 'Pineapple Mint Cooler',      category: 'Pineapple',          image: '/images/pineapple_mint.png',                                                      image_url: '', status: 'Export Ready',
    description: 'A fresh, light pineapple juice infused with Ugandan spearmint — perfectly crafted for summer and wellness markets.' },
  // Tropical Juice Line
  { id: 20, name: 'Passion Fruit Elixir',       category: 'Tropical Juice',     image: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=800&q=80',         image_url: '', status: 'Export Ready', heritage: true,
    description: 'Intensely aromatic, hand-scooped Ugandan passion fruit juice — naturally high in Vitamin C and antioxidants.' },
  { id: 21, name: 'Mango Sunrise Juice',        category: 'Tropical Juice',     image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&q=80',             image_url: '', status: 'Export Ready', featured: true,
    description: 'Fresh-pressed from Uganda\'s East African Dodo mangoes — a sunrise-orange juice with a caramel-sweet depth.' },
  { id: 22, name: 'Tamarind Hibiscus Blend',    category: 'Tropical Juice',     image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=800&q=80',             image_url: '', status: 'Export Ready',
    description: 'A bold, tangy blend of tamarind concentrate and hibiscus — an African-inspired, antioxidant-rich tonic.' },
  { id: 23, name: 'Moringa Green Juice',        category: 'Tropical Juice',     image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&q=80',          image_url: '', status: 'Export Ready',
    description: 'Blended from Ugandan "miracle tree" moringa leaves — one of Africa\'s most nutrient-dense supergreens per serving.' },
  { id: 24, name: 'Watermelon Mint Refresh',    category: 'Tropical Juice',     image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&q=80',          image_url: '', status: 'Export Ready',
    description: 'Hydrating, light-bodied watermelon juice with cool Ugandan spearmint — ideal for wellness and sports markets globally.' },
  { id: 25, name: 'Lemongrass Lime Tonic',      category: 'Tropical Juice',     image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80',             image_url: '', status: 'Export Ready',
    description: 'A sophisticated tonic of lemongrass, lime, and raw honey — crafted for premium hospitality and wellness brands.' },
  // Fresh Produce
  { id: 8,  name: 'Organic Hass Avocado',       category: 'Fresh Produce',      image: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&q=80',         image_url: '', status: 'Export Ready',
    description: 'Premium Ugandan Hass avocados grown in rich volcanic soil for superior oil content and creamy international quality.' },
  { id: 9,  name: 'Ugandan Bird\'s Eye Chili',  category: 'Fresh Produce',      image: 'https://images.unsplash.com/photo-1588253518678-8386ba932470?w=800&q=80',         image_url: '', status: 'Export Ready',
    description: 'Extremely potent Bird\'s Eye chilies, hand-picked and sun-dried for consistent heat required by global spice masters.' },
  { id: 10, name: 'Premium Matooke',            category: 'Fresh Produce',      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&q=80',         image_url: '', status: 'Export Ready', heritage: true,
    description: 'The backbone of Ugandan nutrition. Organically grown, export-grade green bananas harvested with clinical precision.' },
  { id: 12, name: 'Fresh Dragon Fruit',         category: 'Fresh Produce',      image: 'https://images.unsplash.com/photo-1527325241027-1e828a42e574?w=800&q=80',         image_url: '', status: 'Export Ready', featured: true,
    description: 'Exotic, hand-pollinated dragon fruit grown in specialized Ugandan farms for ultra-premium global fruit markets.' },
  { id: 26, name: 'Fresh MD2 Pineapple',        category: 'Fresh Produce',      image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&q=80',            image_url: '', status: 'Export Ready',
    description: 'Export-grade MD2 pineapples — the sweetest, most globally demanded variety, harvested at peak Brix levels.' },
  { id: 27, name: 'Organic Passion Fruit',      category: 'Fresh Produce',      image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80',         image_url: '', status: 'Export Ready',
    description: 'Fresh whole passion fruits packed for export — hand-selected for optimal aroma, acidity and uniform appearance.' },
  { id: 28, name: 'Ugandan Robusta Coffee',     category: 'Fresh Produce',      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',         image_url: '', status: 'Export Ready', heritage: true,
    description: 'Uganda\'s world-famous Robusta coffee — bold, earthy, and rich. Sourced from the Mount Elgon highland farms.' },
]

const ProductBlob = ({ color, size, delay, x, y }: { color: string, size: string, delay: number, x: string, y: string }) => (
  <motion.div
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
  const [productList, setProductList] = useState(fallbackProducts)
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
      if (!error && data && data.length > 0 && isMounted) {
        // Merge: Supabase products take priority by ID,
        // but always include fallback products not yet in the database
        const dbIds = new Set(data.map((p: any) => p.id))
        const localOnly = fallbackProducts.filter(p => !dbIds.has(p.id))
        setProductList([...data, ...localOnly])
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

  const filteredProducts = activeCategory === 'All' 
    ? productList 
    : productList.filter(p => p.category === activeCategory)

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', padding: 'var(--section-padding-top) 0 var(--section-padding-bottom) 0', position: 'relative', overflow: 'hidden' }}>
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
            <p style={{ fontSize: '1.35rem', color: 'var(--text-muted)', fontWeight: '450', maxWidth: '650px', lineHeight: '1.7' }}>Experience the pinnacle of Ugandan fruit mastery, delivered globally with clinical integrity.</p>
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
          <motion.div 
            layout
            className="products-grid"
          >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.88, filter: 'blur(6px)', transition: { duration: 0.3 } }}
                whileHover={{ y: -14, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
                key={product.id}
              >
                <Link href={`/products/${product.id}`}>
                  <div className="shemous-scurve-card">
                    <div className="scurve-bg-fix" />
                    
                    <div className="card-scurve-header">
                      <div style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 10 }}>
                        {product.heritage && (
                          <div style={{ background: 'white', color: 'var(--secondary)', padding: '0.6rem 1.4rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.15em', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                            Heritage
                          </div>
                        )}
                      </div>
                      <ProductBlob color="rgba(255, 255, 255, 0.15)" size="220px" delay={0} x="30%" y="-30%" />
                      <motion.img 
                          whileHover={{ scale: 1.12, rotate: 4 }}
                          transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
                          src={product.image_url || product.image || 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=400'} 
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          style={{ 
                            width: '180px',
                            height: '180px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            zIndex: 2,
                            marginTop: '-20px',
                            filter: 'saturate(1.2) contrast(1.1) drop-shadow(0 30px 60px rgba(0, 45, 38, 0.25))',
                            border: '6px solid rgba(255,255,255,0.4)',
                            boxShadow: '0 0 0 1px rgba(0, 45, 38, 0.1)'
                          }}
                      />
                    </div>

                    <div className="card-scurve-content">
                      <span style={{ fontSize: '0.8rem', color: 'var(--primary-dark)', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1.2rem', display: 'block' }}>{product.category}</span>
                      <h3 className="text-truncate-1" style={{ fontSize: 'var(--h3-size)', fontWeight: '950', color: 'var(--secondary)', marginBottom: '1.5rem', lineHeight: '1.1', letterSpacing: '-0.03em', minHeight: '2.2em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{product.name}</h3>
                      <p className="text-truncate-3" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.8rem', fontWeight: '450', minHeight: '5.1rem' }}>Sustainable harvest, hand-pressed for global quality and natural purity. Delivered with clinical precision to the world.</p>
                      
                      <div style={{ marginTop: 'auto' }}>
                        <button 
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setSelectedProduct(product)
                            setIsModalOpen(true)
                          }}
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
                            Inquire Now <MessageCircle size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          </motion.div>
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
