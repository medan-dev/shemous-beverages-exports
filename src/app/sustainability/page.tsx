'use client'

import { motion } from 'framer-motion'
import { Leaf, Droplets, Sprout, Sun } from 'lucide-react'
import CurvedDivider from '@/components/CurvedDivider'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'

export default function SustainabilityPage() {
  return (
    <div suppressHydrationWarning style={{ 
      backgroundColor: 'var(--bg-creme)', 
      minHeight: '100vh', 
      padding: 'var(--section-padding-top) 0 var(--section-padding-bottom) 0', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Blobs */}
      <div suppressHydrationWarning style={{
        position: 'absolute',
        top: '10%',
        right: '-5%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0) 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }} suppressHydrationWarning>
        {/* Header Hero */}
        <div style={{ textAlign: 'center', maxWidth: '900px', margin: `0 auto var(--content-gap) auto` }} suppressHydrationWarning>
          <ScrollReveal blur direction="up">
            <div suppressHydrationWarning>
              <div suppressHydrationWarning style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '2px', background: 'var(--primary)', opacity: 0.6 }} />
                <span style={{ color: 'var(--secondary)', fontWeight: '950', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.4em' }}>
                  Our Commitment
                </span>
                <div style={{ width: '48px', height: '2px', background: 'var(--primary)', opacity: 0.6 }} />
              </div>
              
              <h1 style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'var(--h1-size)', 
                fontWeight: '700', 
                color: 'var(--secondary)', 
                lineHeight: '1.05', 
                letterSpacing: '-0.04em', 
                marginBottom: '4rem' 
              }}>
                Nurturing the <br />
                <span className="text-gradient-gold">Earth We Share</span>
              </h1>
              
              <p style={{ 
                fontSize: '1.3rem', 
                color: 'var(--text-muted)', 
                lineHeight: '1.8', 
                fontWeight: '450',
                margin: '0 auto',
                maxWidth: '800px' 
              }}>
                At Shemous Beverages & Exports, sustainability isn't just a buzzword—it's the core of our operations. We work hand-in-hand with Ugandan farmers to ensure that every drop of juice we produce supports the land it comes from.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Sustainable Practices Grid */}
      <section style={{ backgroundColor: 'white', padding: 'var(--section-padding-top) 0', position: 'relative' }} suppressHydrationWarning>
        <CurvedDivider color="var(--bg-creme)" position="top" height="150px" />
        
        <div className="container" suppressHydrationWarning>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }} suppressHydrationWarning>
             <h2 style={{ fontSize: '3rem', fontWeight: '950', color: 'var(--secondary)', letterSpacing: '-0.03em' }}>Our Organic Pillars</h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem' 
          }} suppressHydrationWarning>
            {[
              { title: 'Zero Chemical Farming', desc: 'Our smallholder farmers strictly avoid synthetic pesticides and fertilizers, protecting local ecosystems and groundwater.', icon: <Sprout size={36} /> },
              { title: 'Water Conservation', desc: 'We utilize traditional rainwater harvesting and efficient drip irrigation to dramatically reduce our agricultural water footprint.', icon: <Droplets size={36} /> },
              { title: 'Fair Trade Sourcing', desc: 'We pay above-market premiums directly to our farmers, empowering local communities and fostering generational wealth.', icon: <Sun size={36} /> },
              { title: 'Carbon Conscious', desc: 'From farm to export, we are constantly optimizing our logistics network to minimize greenhouse gas emissions.', icon: <Leaf size={36} /> },
            ].map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 0.1} blur direction="up">
                <div suppressHydrationWarning className="shemous-scurve-card" style={{ 
                  background: 'white', 
                  padding: '3rem', 
                  borderRadius: '24px', 
                  height: '100%',
                  border: '1px solid rgba(0,45,38,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1.5rem'
                }}>
                  <div style={{ 
                    width: '80px', height: '80px', 
                    borderRadius: '50%', 
                    background: 'var(--bg-creme)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--primary)'
                  }} suppressHydrationWarning>
                    {pillar.icon}
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--secondary)' }}>{pillar.title}</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.1rem' }}>{pillar.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        
        <CurvedDivider color="var(--bg-creme)" position="bottom" height="150px" />
      </section>

      {/* Call to Action */}
      <div style={{ padding: '8rem 0 4rem 0', textAlign: 'center' }} suppressHydrationWarning>
        <ScrollReveal blur direction="up">
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '2rem' }}>Experience the Organic Difference</h2>
            <Link href="/products" className="btn-hover" style={{ 
                display: 'inline-flex',
                padding: '1.2rem 3rem',
                background: 'var(--primary)',
                color: 'var(--secondary)',
                textDecoration: 'none',
                fontWeight: '900',
                fontSize: '1.1rem',
                borderRadius: '50px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
            }}>
                Explore Products
            </Link>
        </ScrollReveal>
      </div>

    </div>
  )
}
