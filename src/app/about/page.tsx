'use client'

import { motion } from 'framer-motion'
import { Leaf, ShieldCheck, Globe, Star } from 'lucide-react'
import CurvedDivider from '@/components/CurvedDivider'
import ScrollReveal from '@/components/ScrollReveal'

export default function AboutPage() {
  return (
    <div style={{ 
      backgroundColor: 'var(--bg-creme)', 
      minHeight: '100vh', 
      padding: 'var(--section-padding-top) 0 var(--section-padding-bottom) 0', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Hero Blob */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255, 183, 3, 0.08) 0%, rgba(255, 183, 3, 0) 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header / Intro Hero - Centered Architecture */}
        <div style={{ textAlign: 'center', maxWidth: '950px', margin: `0 auto var(--content-gap) auto` }}>
          <ScrollReveal>
            <div>
              <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '2px', background: 'var(--primary)' }} />
                <span style={{ color: 'var(--secondary)', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.3em' }}>
                  Our Heritage
                </span>
                <div style={{ width: '40px', height: '2px', background: 'var(--primary)' }} />
              </div>
              
              <h1 style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'var(--h1-size)', 
                fontWeight: '700', 
                color: 'var(--secondary)', 
                lineHeight: '0.9', 
                letterSpacing: '-0.04em', 
                marginBottom: '3.5rem' 
              }}>
                Ugandan <br />
                <span className="text-gradient-gold">Organic Soul</span>
              </h1>
              
              <p style={{ 
                fontSize: '1.4rem', 
                color: 'var(--text-muted)', 
                lineHeight: '1.8', 
                fontWeight: '450',
                margin: '0 auto',
                maxWidth: '750px' 
              }}>
                Shemous Beverages & Exports was founded with a singular mission: to bring the authentic, rich taste of Ugandan organic fruits to the global stage while supporting local farming communities through sustainable practice.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>



      {/* Heritage Narrative Section - Omubisi Journey */}
      <div style={{ backgroundColor: 'white', padding: 'var(--section-padding-top) 0', position: 'relative' }}>
        <CurvedDivider color="var(--bg-creme)" position="top" height="200px" />
        
        <div className="container">
          <div className="hero-split-grid" style={{ alignItems: 'center' }}>
            <ScrollReveal direction="left" className="curvy-mask-organic">
              <div className="liquid-card-organic" style={{ height: '750px', background: 'var(--secondary)' }}>
                <img 
                   src="/images/omubisi_liquid_motion.png" 
                   alt="The Pure Essence of Omubisi" 
                   style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'soft-light', opacity: 0.8 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0, 45, 38, 0.6))' }} />
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div style={{ paddingLeft: '2rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '2.5rem' }}>Cultural Legacy</span>
                <h2 style={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: 'var(--h2-size)', 
                  fontWeight: '700', 
                  color: 'var(--secondary)', 
                  lineHeight: '0.95', 
                  letterSpacing: '-0.03em', 
                  marginBottom: '4rem' 
                }}>
                  The Soul of <br />
                  <span style={{ fontStyle: 'italic', fontWeight: '400', color: 'var(--primary)' }}>Heritage</span>.
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                   <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', fontWeight: '450' }}>
                      Omubisi is more than a beverage; it is a sacred ritual of Ugandan hospitality. Our journey begins with the **Juice Banana**, a variety specifically bred for its sweetness, hand-peeled and prepared for extraction in the traditional way.
                   </p>
                   <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', fontWeight: '450' }}>
                      The extraction happens in the **Lyato**—a hand-carved wooden trough—where the fruit is kneaded with **Essubi** (spear grass). This natural filtration captures the raw electricity of the fruit, resulting in a thick, foamy nectar.
                   </p>
                   <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', fontWeight: '450' }}>
                      Traditionally served in a dried gourd known as the **Ndèku**, Omubisi is the heart of every guest's welcome. At Shemous, we bridge this ancient wisdom with modern precision.
                   </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
        
        <CurvedDivider color="var(--bg-creme)" position="bottom" height="200px" />
      </div>

      {/* Values Section */}
      <div style={{ padding: 'var(--section-padding-top) 0', position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--content-gap)' }}>
             <span className="shemous-label" style={{ marginBottom: '1.5rem' }}>Core Ethos</span>
             <h2 style={{ fontSize: '3.5rem', fontWeight: '950', color: 'var(--secondary)', letterSpacing: '-0.03em' }}>
               Built on <span className="text-gradient-gold">Excellence</span>
             </h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '3.5rem' 
          }}>
            {[
              { title: 'Sustainability', desc: 'Working exclusively with smallholder farmers to ensure ethical practices and carbon-conscious exports.', icon: <Leaf size={32} /> },
              { title: 'Certification', desc: '100% Organic certified and export-compliant for the EU, USA, and Asian markets.', icon: <ShieldCheck size={32} /> },
              { title: 'Global Reach', desc: 'Bridging the logistics gap to deliver fresh Ugandan beverages anywhere in the world.', icon: <Globe size={32} /> },
              { title: 'Premium Quality', desc: 'Only the finest selection of Bogoya and Gonja bananas make it into our beverage line.', icon: <Star size={32} /> },
            ].map((val, i) => (
              <ScrollReveal key={val.title} delay={i * 0.1}>
                <motion.div 
                  className="liquid-card-organic"
                  whileHover={{ y: -15, scale: 1.02 }}
                  style={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '2.5rem',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ 
                    width: '72px', 
                    height: '72px', 
                    background: 'var(--secondary)', 
                    borderRadius: '24px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--primary)', 
                    boxShadow: '0 15px 30px rgba(0, 45, 38, 0.1)' 
                  }}>
                    {val.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--secondary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>{val.title}</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.15rem', fontWeight: '500' }}>{val.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
