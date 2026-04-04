'use client'

import { use, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Globe, Shield, Zap, CheckCircle, ArrowRight, Loader2 } from 'lucide-react'
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
          // Merge: prefer Supabase fields, but fill in image/desc from local fallback if missing
          setProduct({
            ...localFallback,      // local defaults (image, desc)
            ...data,               // Supabase overrides most fields
            image: data.image_url || data.image || localFallback?.image,
            desc:  data.description || data.desc || localFallback?.desc,
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
    <div style={{ minHeight: '100vh', background: 'white', position: 'relative', overflowX: 'hidden' }}>
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: '2rem', left: '2rem', zIndex: 100 }}>
        <Link href="/products">
          <motion.div 
            whileHover={{ x: -10 }}
            style={{ 
              padding: '1.2rem 2rem', 
              background: 'white', 
              borderRadius: '100px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.8rem', 
              fontSize: '0.9rem', 
              fontWeight: '700', 
              color: 'var(--secondary)' 
            }}
          >
            <ChevronLeft size={20} /> Back to Collection
          </motion.div>
        </Link>
      </nav>

      {/* Hero Section: Compressed and Lowered */}
      <section style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
        <div className="scurve-bg-fix" style={{ height: '100%', position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
          <ProductBlob color="var(--primary)" size="800px" delay={0} x="-10%" y="-10%" />
          <ProductBlob color="var(--primary-dark)" size="600px" delay={5} x="70%" y="40%" />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="products-grid hero-split-grid" style={{ alignItems: 'center', gap: '4rem' }}>
            {/* Split Media Area */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: '100%' }}
            >
              <div 
                className="shemous-scurve-card" 
                style={{ 
                  height: 'auto',
                  minHeight: '400px',
                  aspectRatio: '1/1',
                  maxWidth: '550px',
                  margin: '0 auto',
                  background: 'rgba(255,255,255,0.05)', 
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div className="card-scurve-header" style={{ height: '100%', width: '100%', background: 'transparent' }}>
                  <ProductBlob color="rgba(255, 255, 255, 0.2)" size="100%" delay={0} x="0" y="0" />
                  <motion.img 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    src={product.image} 
                    alt={product.name}
                    style={{ 
                      width: '80%',
                      height: '80%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      filter: 'saturate(1.2) contrast(1.1) drop-shadow(0 40px 100px rgba(0,0,0,0.3))',
                      border: '10px solid rgba(255,255,255,0.3)',
                      zIndex: 2,
                      marginTop: '40px' /* Lowered within the hero circle */
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Split Content Area */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ color: 'white' }}
            >
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ padding: '0.6rem 1.4rem', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', backdropFilter: 'blur(10px)' }}>{product.category}</span>
                {product.heritage && <span style={{ padding: '0.6rem 1.4rem', background: 'var(--primary)', color: 'var(--secondary)', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Heritage Choice</span>}
              </div>

              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: '700', lineHeight: 0.95, marginBottom: '2.5rem', letterSpacing: '-0.04em' }}>{product.name}</h1>
              
              <p style={{ fontSize: '1.4rem', lineHeight: 1.6, opacity: 0.9, fontWeight: '450', marginBottom: '3.5rem', maxWidth: '600px' }}>{product.desc}</p>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="btn-hover" 
                  style={{ 
                    padding: '1.5rem 3.5rem', 
                    background: 'white', 
                    color: 'var(--secondary)', 
                    border: 'none', 
                    borderRadius: '100px', 
                    fontSize: '1.1rem', 
                    fontWeight: '950', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    cursor: 'pointer', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)' 
                  }}
                >
                  <WhatsAppIcon size={22} fill="var(--secondary)" /> Instant WhatsApp
                </button>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: '900', opacity: 0.8 }}><CheckCircle size={18} /> Global Export Ready</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: '900', opacity: 0.8 }}><Globe size={18} /> Direct from farm</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Heritage Narrative Section: Compressed Padding */}
      <section style={{ padding: '6rem 0', background: 'rgba(0, 45, 38, 0.02)' }}>
        <div className="container">
          <div className="products-grid" style={{ gridTemplateColumns: '1fr 1.2fr', alignItems: 'center', gap: '8rem' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
               style={{ borderRadius: '60px', overflow: 'hidden', boxShadow: '0 50px 100px rgba(0,0,0,0.1)' }}
            >
              <img src="/images/artisanal_process.png" alt="Artisanal Selection Process" style={{ width: '100%', height: '600px', objectFit: 'cover' }} />
            </motion.div>

            <div style={{ paddingRight: '4rem' }}>
              <span style={{ color: 'var(--primary)', fontWeight: '950', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.25em' }}>Art of Production</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '4.5rem', fontWeight: '700', color: 'var(--secondary)', marginTop: '1rem', marginBottom: '2.5rem', lineHeight: 1.1 }}>Handcrafted Nature, Refined Globally.</h2>
              
              <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 450 }}>
                <p style={{ marginBottom: '2rem' }}>Every batch of our {product.name} undergoes a clinical selection process. We anchor our production in the fertile Ugandan soil, harvesting only at peak maturity to ensure the high-fidelity flavor profile the global market demands.</p>
                <p style={{ marginBottom: '2rem' }}>Our facility operates with strict surgical precision, bridging the gap between ancestral organic farming and modern international food safety standards (HACCP/ISO).</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginTop: '4rem' }}>
                  <div style={{ padding: '1.5rem', borderLeft: '3px solid var(--primary)', background: 'rgba(255, 183, 3, 0.05)' }}>
                    <div style={{ fontWeight: '950', color: 'var(--secondary)', fontSize: '1.4rem' }}>99.8%</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Nutrient Retention</div>
                  </div>
                  <div style={{ padding: '1.5rem', borderLeft: '3px solid var(--primary)', background: 'rgba(255, 183, 3, 0.05)' }}>
                    <div style={{ fontWeight: '950', color: 'var(--secondary)', fontSize: '1.4rem' }}>Zero</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Added Sugars / GMO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer Related Products - Compressed S-Curve */}
      <section style={{ padding: '6rem 0', background: 'var(--secondary)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: '950', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.25em' }}>The Selection</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', fontWeight: '700', color: 'white', marginTop: '1rem' }}>Related Masterpieces</h2>
            </div>
            <Link href="/products">
              <button className="btn-hover" style={{ padding: '1rem 2rem', borderRadius: '100px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                View All <ArrowRight size={18} />
              </button>
            </Link>
          </div>

          <div className="products-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {fallbackProducts.slice(0, 3).map((item) => (
              <Link key={item.id} href={`/products/${item.id}`}>
                <div className="shemous-scurve-card" style={{ height: '380px', minHeight: 'unset' }}>
                  <div className="card-scurve-header" style={{ height: '180px' }}>
                     <motion.img src={item.image} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '5px solid rgba(255,255,255,0.3)', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))' }} />
                  </div>
                  <div className="card-scurve-content" style={{ marginTop: '-40px', padding: '3rem 2rem' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--primary-dark)', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '0.5rem', display: 'block' }}>{item.category}</span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'var(--secondary)' }}>{item.name}</h3>
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
