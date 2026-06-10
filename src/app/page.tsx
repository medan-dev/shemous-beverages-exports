'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, Star, ShoppingCart, Truck, ShieldCheck, RefreshCcw } from 'lucide-react'
import TrustBanner from '@/components/TrustBanner'
import FeaturedProducts from '@/components/FeaturedProducts'
import CinematicSplashHero from '@/components/CinematicSplashHero'


// ─── Stats data ─────────────────────────────────────────────────────────────
const features = [
  { icon: <Truck size={24} color="#f97316" />, title: 'Free Global Shipping', desc: 'On export orders over $10k' },
  { icon: <ShieldCheck size={24} color="#f97316" />, title: 'Organic Certified', desc: '100% natural and verified' },
  { icon: <RefreshCcw size={24} color="#f97316" />, title: 'Easy Returns', desc: '30-day money back guarantee' },
]

export default function Home() {
  return (
    <div suppressHydrationWarning style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* ── CINEMATIC HERO ────────────────────────────────────────── */}
      <CinematicSplashHero />

      {/* ── FEATURES ROW (Amazon style trust markers) ─────────────── */}
      <div suppressHydrationWarning style={{ maxWidth: 'var(--container-max-width)', margin: '0 auto', padding: '0 var(--container-padding) 2rem var(--container-padding)' }}>
        <div suppressHydrationWarning style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {features.map((feature, i) => (
            <div suppressHydrationWarning key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--border)' }}>
              <div suppressHydrationWarning>{feature.icon}</div>
              <div suppressHydrationWarning>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f1111', margin: '0 0 0.25rem 0' }}>{feature.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#565959', margin: 0 }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SHOP BY CATEGORY ──────────────────────────────────────── */}
      <div suppressHydrationWarning style={{ maxWidth: 'var(--container-max-width)', margin: '0 auto', padding: '0 var(--container-padding) 4rem var(--container-padding)' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f1111', marginBottom: '2rem', letterSpacing: '-0.02em' }}>Shop by Category</h3>
        <div suppressHydrationWarning style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
          
          {[
            { name: 'Organic Juices', img: '/images/export_banana_juice.png', href: '/products', type: 'contain', bg: '#f8fafc' },
            { name: 'Smoothies & Milk', img: '/images/export_banana_smoothie.png', href: '/products', type: 'contain', bg: '#f8fafc' },
            { name: 'Artisan Snacks', img: '/images/export_banana_chips.png', href: '/products', type: 'contain', bg: '#f8fafc' },
            { name: 'Fresh Produce', img: '/images/passion_fruit_raw.png', href: '/export', type: 'cover', bg: '#000' },
            { name: 'Tropical Fruits', img: '/images/pineapple_export.jpg', href: '/export', type: 'cover', bg: '#000' },
            { name: 'Roots & Spices', img: '/images/ginger_export.jpg', href: '/export', type: 'cover', bg: '#000' },
          ].map((cat, i) => (
            <Link key={i} suppressHydrationWarning href={cat.href} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }} className="cat-card-pro">
              <div suppressHydrationWarning style={{ width: '100%', height: '220px', background: cat.bg, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: cat.type as 'cover' | 'contain',
                    padding: cat.type === 'contain' ? '1.5rem' : '0',
                    transition: 'transform 0.5s ease'
                  }} 
                  className="cat-img"
                />
              </div>
              <div suppressHydrationWarning style={{ padding: '1.2rem', textAlign: 'center', background: 'white', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f1111', margin: 0, letterSpacing: '-0.01em' }}>{cat.name}</h4>
              </div>
            </Link>
          ))}

        </div>
      </div>

      {/* ── FEATURED PRODUCTS (Grid format) ───────────────────────── */}
      <div suppressHydrationWarning style={{ maxWidth: 'var(--container-max-width)', margin: '0 auto', padding: '0 var(--container-padding)' }}>
        <FeaturedProducts />
      </div>


      <style jsx>{`
        .cat-card-pro:hover {
          border-color: var(--primary) !important;
          box-shadow: 0 15px 35px rgba(249, 115, 22, 0.1) !important;
          transform: translateY(-4px);
        }
        .cat-card-pro:hover .cat-img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  )
}
