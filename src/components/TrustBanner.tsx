'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ShieldCheck, Globe, Award, Leaf } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function TrustBanner() {
  const badges = [
    { icon: <ShieldCheck size={28} />, title: 'FDA Registered', desc: 'Global safety compliance' },
    { icon: <Award size={28} />, title: 'ISO 22000', desc: 'Certified food safety' },
    { icon: <Leaf size={28} />, title: '100% Organic', desc: 'Sustainably sourced' },
    { icon: <CheckCircle size={28} />, title: 'HACCP Certified', desc: 'Hazard analysis controlled' },
    { icon: <Globe size={28} />, title: 'Global Export', desc: 'Fast worldwide shipping' },
  ]

  return (
    <section style={{ backgroundColor: 'var(--bg-creme)', padding: '4rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container" suppressHydrationWarning>
        <ScrollReveal blur direction="up">
          <div suppressHydrationWarning style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--primary-dark)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Trusted by buyers worldwide
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: 'var(--secondary)', fontWeight: '700', marginTop: '0.5rem' }}>
              Uncompromising Quality Standards
            </h2>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '1.5rem',
            alignItems: 'stretch'
          }}>
            {badges.map((badge, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,77,64,0.08)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  minWidth: '260px',
                  flex: '1 1 260px',
                  maxWidth: '320px',
                  border: '1px solid rgba(0,77,64,0.05)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                }}
              >
                <div suppressHydrationWarning style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '50%', 
                  background: 'var(--primary-15)', 
                  color: 'var(--primary-dark)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {badge.icon}
                </div>
                <div suppressHydrationWarning>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '0.2rem' }}>
                    {badge.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4, fontWeight: '500' }}>
                    {badge.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
