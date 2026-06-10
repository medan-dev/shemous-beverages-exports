'use client'

import { use, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Globe, Shield, Zap, CheckCircle, ArrowRight, Loader2, Phone, Award, Package, Leaf } from 'lucide-react'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import Link from 'next/link'
import ProductSpectra from '@/components/ProductSpectra'
import ProductInquiryForm from '@/components/ProductInquiryForm'
import { supabase } from '@/lib/supabase'
import WhatsAppOrderModal from '@/components/WhatsAppOrderModal'

const fallbackProducts = [
  // ── Banana Line ──────────────────────────────────────────────────────────
  { id: 1,  name: 'Classic Banana Nectar',       category: 'Banana Juice',       image: '/images/nectar.png',              status: 'Export Ready', heritage: true,
    desc: 'A timeless Ugandan staple, cold-pressed from sun-ripened organic Bogoya bananas. Delivering a rich, natural sweetness with a smooth clinical finish.' },
  { id: 4,  name: 'Banana Ginger Blend',         category: 'Banana Juice',       image: '/images/nectar.png',              status: 'Export Ready',
    desc: 'The bold warmth of Ugandan ginger meets the sweetness of ripe Bogoya bananas in this spiced, functional juice crafted for global wellness markets.' },
  { id: 6,  name: 'Green Banana Juice',          category: 'Banana Juice',       image: '/images/nectar.png',              status: 'Export Ready',
    desc: 'A unique, high-fiber beverage extracted from carefully selected green bananas. Optimized for gut health and natural glycemic control.' },
  { id: 11, name: 'Natural Banana Vinegar',      category: 'Banana Juice',       image: '/images/nectar.png',              status: 'Export Ready',
    desc: 'Traditional fermentation meets modern quality control. A sharp, organic vinegar with a distinct tropical profile for culinary excellence.' },
  { id: 2,  name: 'Tropical Banana Smoothie',    category: 'Banana Smoothie',    image: '/images/smoothie.png',            status: 'Export Ready',
    desc: 'A vibrant blend of creamy banana and tropical undertones, optimized for high-energy clinical nutrition and natural vitality.' },
  { id: 3,  name: 'Organic Banana Milk',         category: 'Banana Milk',        image: '/images/milk.png',                status: 'Export Ready',
    desc: 'Dairy-enriched or plant-based options available. A smooth, nutrient-dense beverage that bridges traditional harvest and modern diet.' },
  { id: 7,  name: 'Banana Cinnamon Latte',       category: 'Banana Milk',        image: '/images/milk.png',                status: 'Export Ready',
    desc: 'A sophisticated blend of banana nectar, milk, and premium cinnamon. A cozy, high-fidelity beverage for the global connoisseur.' },
  { id: 5,  name: 'Dried Banana Chips',          category: 'Dried Banana Chips', image: '/images/chips.png',               status: 'Export Ready', featured: true,
    desc: 'Crunchy, naturally sweet slices of organic banana. Dehydrated at low temperatures to preserve every clinical nutrient and flavor note.' },

  // ── Ginger Line ──────────────────────────────────────────────────────────
  { id: 13, name: 'Pure Ginger Shot',            category: 'Ginger',             image: '/images/ginger_shot.png',         status: 'Export Ready', featured: true,
    desc: 'A powerful, 100% cold-pressed shot from Ugandan organic ginger. Rich in gingerol, anti-inflammatory, and immune-boosting. Exported globally as a daily wellness ritual.' },
  { id: 14, name: 'Ginger Lemon Detox',          category: 'Ginger',             image: '/images/ginger_lemon.png',        status: 'Export Ready',
    desc: 'A zesty, alkalizing blend of fresh ginger, lemon, and turmeric. Cold-pressed for maximum bioavailability — a daily detox ritual in every bottle.' },
  { id: 15, name: 'Ginger Hibiscus Infusion',    category: 'Ginger',             image: '/images/hibiscus_infusion.png',   status: 'Export Ready',
    desc: 'Ugandan ginger meets dried hibiscus flowers for a vibrant, ruby-red infusion with a sweet-tart finish and a rich antioxidant profile.' },
  { id: 16, name: 'Ginger Turmeric Wellness',    category: 'Ginger',             image: '/images/ginger_shot.png',         status: 'Export Ready',
    desc: 'A golden elixir combining Ugandan ginger, turmeric, black pepper, and coconut water for maximum bioavailability and daily immune support.' },

  // ── Pineapple Line ────────────────────────────────────────────────────────
  { id: 17, name: 'Golden Pineapple Nectar',     category: 'Pineapple',          image: '/images/pineapple_nectar.png',    status: 'Export Ready', featured: true,
    desc: 'Cold-pressed from Uganda\'s sweet MD2 pineapples. An enzyme-rich, Bromelain-packed nectar with zero added sugar and a sun-golden brilliance.' },
  { id: 18, name: 'Pineapple Ginger Blast',      category: 'Pineapple',          image: '/images/pineapple_nectar.png',    status: 'Export Ready',
    desc: 'The tropical sweetness of MD2 pineapple fused with fiery Ugandan ginger. A metabolism-boosting functional juice for the global wellness market.' },
  { id: 19, name: 'Pineapple Mint Cooler',       category: 'Pineapple',          image: '/images/pineapple_mint.png',      status: 'Export Ready',
    desc: 'A fresh, light pineapple juice infused with Ugandan spearmint. Perfectly crafted for summer markets and premium hospitality brands globally.' },

  // ── Tropical Juice Line ───────────────────────────────────────────────────
  { id: 20, name: 'Passion Fruit Elixir',        category: 'Tropical Juice',     image: '/images/passion_fruit.png',       status: 'Export Ready', heritage: true,
    desc: 'Intensely aromatic, hand-scooped Ugandan passion fruit juice. Naturally high in Vitamin C and antioxidants — a flagship tropical export.' },
  { id: 21, name: 'Mango Sunrise Juice',         category: 'Tropical Juice',     image: '/images/mango_juice.png',         status: 'Export Ready', featured: true,
    desc: 'Fresh-pressed from Uganda\'s East African Dodo mangoes. A sunrise-orange juice with a caramel-sweet depth and tropical warmth in every sip.' },
  { id: 22, name: 'Tamarind Hibiscus Blend',     category: 'Tropical Juice',     image: '/images/tamarind_blend.png',      status: 'Export Ready',
    desc: 'A bold, tangy blend of tamarind concentrate and hibiscus flowers. An African-inspired, probiotic-rich tonic packed with antioxidants.' },
  { id: 23, name: 'Moringa Green Juice',         category: 'Tropical Juice',     image: '/images/moringa.png',             status: 'Export Ready',
    desc: 'Blended from Ugandan "miracle tree" moringa leaves. One of Africa\'s most nutrient-dense supergreens per serving, exported for global wellness.' },
  { id: 24, name: 'Watermelon Mint Refresh',     category: 'Tropical Juice',     image: '/images/watermelon_mint.png',     status: 'Export Ready',
    desc: 'Hydrating, light-bodied watermelon juice with cool Ugandan spearmint. Naturally rich in lycopene — ideal for wellness and sports markets globally.' },
  { id: 25, name: 'Lemongrass Lime Tonic',       category: 'Tropical Juice',     image: '/images/lemongrass_tonic.png',    status: 'Export Ready',
    desc: 'A sophisticated tonic of lemongrass, lime, and raw honey. Crafted for premium hospitality and upscale wellness brands across Europe and Asia.' },

  // ── Fresh Produce ─────────────────────────────────────────────────────────
  { id: 8,  name: 'Organic Hass Avocado',        category: 'Fresh Produce',      image: '/images/banana_glass_black.png',  status: 'Export Ready',
    desc: 'Premium Ugandan Hass avocados, grown in rich volcanic soil for superior oil content and creamy international quality standards.' },
  { id: 9,  name: 'Ugandan Bird\'s Eye Chili',   category: 'Fresh Produce',      image: '/images/citrus_leaves.png',       status: 'Export Ready',
    desc: 'Extremely potent Bird\'s Eye chilies, hand-picked and sun-dried for a sharp, consistent heat profile required by global spice masters.' },
  { id: 10, name: 'Premium Matooke',             category: 'Fresh Produce',      image: '/images/banana_leaves_floating.png', status: 'Export Ready', heritage: true,
    desc: 'The backbone of Ugandan nutrition. Organically grown, export-grade green bananas harvested with clinical precision for global transport.' },
  { id: 12, name: 'Fresh Dragon Fruit',          category: 'Fresh Produce',      image: '/images/omubisi_macro.png',       status: 'Export Ready', featured: true,
    desc: 'Exotic, hand-pollinated dragon fruit grown in specialized Ugandan farms for ultra-premium global fruit markets.' },
  { id: 26, name: 'Fresh MD2 Pineapple',         category: 'Fresh Produce',      image: '/images/pineapple_nectar.png',    status: 'Export Ready',
    desc: 'Export-grade MD2 pineapples — the sweetest, most globally demanded variety, harvested at peak Brix levels from Ugandan farms.' },
  { id: 27, name: 'Organic Passion Fruit',       category: 'Fresh Produce',      image: '/images/passion_fruit.png',       status: 'Export Ready',
    desc: 'Fresh whole passion fruits packed for export. Hand-selected for optimal aroma, acidity and uniform appearance for premium markets.' },
  { id: 28, name: 'Ugandan Robusta Coffee',      category: 'Fresh Produce',      image: '/images/coffee_robusta.png',      status: 'Export Ready', heritage: true,
    desc: 'Uganda\'s world-famous Robusta coffee — bold, earthy, and rich. Sourced from the Mount Elgon highland farms and exported to discerning global roasters.' },
]

const ProductBlob = ({ color, size, delay, x, y }: { color: string, size: string, delay: number, x: string, y: string }) => (
  <motion.div
    animate={{ 
      y: [0, -100, 0],
      x: [0, 50, -50, 0],
      rotate: [0, 20, -20, 0],
      opacity: [0.05, 0.15, 0.05]
    }}
    transition={{ duration: 20, repeat: Infinity, delay: delay, ease: 'easeInOut' }}
    style={{ position: 'absolute', top: y, left: x, width: size, height: size, backgroundColor: color, borderRadius: '45% 55% 60% 40% / 40% 60% 40% 60%', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }}
  />
)

export default function ProductDetailPage({ params }: { params: any }) {
  const resolvedParams = use(params) as { id: string }
  const id = resolvedParams.id
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      try {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
        
        // Always check the local fallback first — it has the best image and desc
        const localFallback = fallbackProducts.find(p => p.id.toString() === id.toString())

        if (!error && data) {
          // Merge: Database always takes precedence
          setProduct({
            ...localFallback,      // local defaults (icons, etc)
            ...data,               // Supabase overrides core fields
            image: data.image_url || data.image || localFallback?.image || '/images/nectar.png',
            desc:  data.description || data.desc || localFallback?.desc || 'No description available for this product.',
          })
        } else {
          setProduct(localFallback || fallbackProducts[0])
        }
      } catch (e) {
        const fallback = fallbackProducts.find(p => p.id.toString() === id.toString())
        setProduct(fallback || fallbackProducts[0])
      }
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--secondary)' }}>
        <Loader2 className="animate-spin" size={60} color="var(--primary)" />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-creme)', position: 'relative', overflowX: 'hidden', paddingTop: 'var(--section-padding-top)' }}>
      
      {/* Container for Main E-Commerce Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '4rem' }}>
        
        {/* 1. Breadcrumbs */}
        <div style={{ padding: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', flexWrap: 'wrap' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-muted)' }} className="hover-primary">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" style={{ textDecoration: 'none', color: 'var(--text-muted)' }} className="hover-primary">Products</Link>
          <ChevronRight size={14} />
          <Link href="/products" style={{ textDecoration: 'none', color: 'var(--text-muted)' }} className="hover-primary">{product.category}</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--secondary)' }}>{product.name}</span>
        </div>

        {/* 2. Main E-Commerce Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr', 
          gap: '4rem', 
          alignItems: 'start',
          background: 'white',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          borderRadius: '24px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.03)'
        }}>
          
          {/* Left Column: Image Gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '120px' }}>
            <div style={{ 
              width: '100%', 
              aspectRatio: '1/1', 
              background: '#f8fafc', 
              borderRadius: '16px', 
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0,0,0,0.05)',
              padding: '2rem'
            }}>
              <motion.img 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={product.image || '/images/nectar.png'} 
                alt={product.name}
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/nectar.png'; }}
                style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))' }}
              />
            </div>
            
            {/* Thumbnails (Simulated for Layout) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              {[1, 2, 3, 4].map((thumb, idx) => (
                <div key={idx} style={{ 
                  aspectRatio: '1/1', 
                  background: '#f8fafc', 
                  borderRadius: '12px', 
                  border: idx === 0 ? '2px solid var(--primary)' : '1px solid rgba(0,0,0,0.05)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <img 
                    src={product.image || '/images/nectar.png'} 
                    alt={`Thumbnail ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Buy Box & Details */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '900', color: 'white', background: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {product.category}
              </span>
              {product.heritage && (
                <span style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--secondary)', background: 'rgba(0,45,38,0.05)', padding: '0.4rem 1rem', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Heritage Selection
                </span>
              )}
            </div>

            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '950', color: 'var(--secondary)', lineHeight: 1.1, marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', color: '#FFB703' }}>
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600', marginLeft: '0.5rem' }}>(Premium Export Quality)</span>
            </div>

            {/* Price / Status Box */}
            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Wholesale Status</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)' }}>
                {product.status || 'Export Ready'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.8rem', color: '#10b981', fontSize: '0.9rem', fontWeight: '800' }}>
                <CheckCircle size={16} /> Available for Global Shipping
              </div>
            </div>

            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
              {product.desc}
            </p>

            {/* Key Features Bullet Points */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '1.2rem' }}>Key Highlights</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                  <Leaf size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>100% Organic & Natural:</strong> Sourced directly from rich Ugandan soils without artificial chemicals.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                  <Shield size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Premium Quality Assurance:</strong> Harvested and processed under strict international standards.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                  <Package size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Export Optimized Packaging:</strong> Designed to maintain freshness during global transit.</span>
                </li>
              </ul>
            </div>

            {/* Buy Box Actions */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-hover" 
                style={{ 
                  flex: '1 1 200px',
                  padding: '1.2rem', 
                  background: '#25D366', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '16px', 
                  fontSize: '1rem', 
                  fontWeight: '900', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.6rem', 
                  cursor: 'pointer', 
                  boxShadow: '0 10px 30px rgba(37,211,102,0.2)',
                  whiteSpace: 'nowrap'
                }}
              >
                <WhatsAppIcon size={20} fill="white" /> WhatsApp Order
              </button>
              
              <a 
                href="tel:+256705436657"
                className="btn-hover" 
                style={{ 
                  flex: '1 1 200px',
                  padding: '1.2rem', 
                  background: 'var(--primary)', 
                  color: 'var(--secondary)', 
                  textDecoration: 'none',
                  borderRadius: '16px', 
                  fontSize: '1rem', 
                  fontWeight: '900', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.6rem', 
                  boxShadow: '0 10px 30px rgba(255,183,3,0.2)',
                  whiteSpace: 'nowrap'
                }}
              >
                <Phone size={20} fill="var(--secondary)" color="var(--secondary)" /> Call Sales
              </a>
            </div>

          </div>
        </div>

        {/* Mobile grid fix */}
        <style jsx>{`
          @media (max-width: 900px) {
            div[style*="gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr'"] {
              gridTemplateColumns: '1fr' !important;
            }
          }
        `}</style>
      </div>

      {/* Product Details Tabs / Specs Block */}
      <section style={{ padding: '5rem 0', background: 'white', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '2rem', borderBottom: '2px solid rgba(0,0,0,0.05)', marginBottom: '3rem', overflowX: 'auto' }}>
              <div style={{ paddingBottom: '1rem', borderBottom: '3px solid var(--primary)', color: 'var(--secondary)', fontWeight: '900', fontSize: '1.2rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Product Description
              </div>
              <div style={{ paddingBottom: '1rem', color: 'var(--text-muted)', fontWeight: '700', fontSize: '1.2rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Specifications
              </div>
              <div style={{ paddingBottom: '1rem', color: 'var(--text-muted)', fontWeight: '700', fontSize: '1.2rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Export & Shipping
              </div>
            </div>

            <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', fontWeight: 400 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '1.5rem' }}>The Art of Production</h3>
              <p style={{ marginBottom: '1.5rem' }}>Every batch of our {product.name} undergoes a clinical selection process. We anchor our production in the fertile Ugandan soil, harvesting only at peak maturity to ensure the high-fidelity flavor profile the global market demands.</p>
              <p style={{ marginBottom: '2.5rem' }}>Our facility operates with strict surgical precision, bridging the gap between ancestral organic farming and modern international food safety standards.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ fontWeight: '950', color: 'var(--primary)', fontSize: '2rem', marginBottom: '0.5rem' }}>99.8%</div>
                  <div style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: '800' }}>Nutrient Retention</div>
                </div>
                <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ fontWeight: '950', color: 'var(--primary)', fontSize: '2rem', marginBottom: '0.5rem' }}>Zero</div>
                  <div style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: '800' }}>Added Sugars / GMO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Related Products */}
      <section style={{ padding: '6rem 0', background: 'var(--secondary)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: '950', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.25em' }}>The Selection</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '700', color: 'white', marginTop: '1rem' }}>Related Masterpieces</h2>
            </div>
            <Link href="/products">
              <button className="btn-hover" style={{ padding: '1rem 2rem', borderRadius: '100px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                View All <ArrowRight size={18} />
              </button>
            </Link>
          </div>

          <div className="products-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
            gap: '2rem' 
          }}>
            {fallbackProducts
              .filter(p => p.id.toString() !== product?.id?.toString() && p.image !== '/images/nectar.png')
              .slice(0, 4)
              .map((item) => (
              <Link key={item.id} href={`/products/${item.id}`} style={{ textDecoration: 'none' }}>
                <div className="shemous-scurve-card" style={{ height: '100%', background: 'white', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease', cursor: 'pointer' }}
                     onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                     onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ height: '240px', position: 'relative', overflow: 'hidden', background: '#f8fafc' }}>
                     <img 
                       src={item.image || '/images/nectar.png'} 
                       alt={item.name}
                       onError={(e) => { (e.target as HTMLImageElement).src = '/images/nectar.png'; }} 
                       style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                     />
                  </div>
                  <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary-dark)', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem', display: 'block' }}>{item.category}</span>
                    <h3 className="text-truncate-1" style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--secondary)' }}>{item.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <WhatsAppOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={product} />
    </div>
  )
}
