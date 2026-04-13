'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedCounter from '@/components/AnimatedCounter'
import CurvedDivider from '@/components/CurvedDivider'
import AnimatedBackground from '@/components/AnimatedBackground'
import CinematicSplashHero from '@/components/CinematicSplashHero'

// ─── Lazy-loaded heavy components ──────────────────────────────────────────
const CreativeHero = dynamic(() => import('@/components/CreativeHero'), {
  ssr: false,
  loading: () => (
    <div style={{ height: 'clamp(700px,100vh,850px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--primary)', opacity: 0.3 }}
      />
    </div>
  ),
})

const BananaBenefitsTabs = dynamic(() => import('@/components/BananaBenefitsTabs'), {
  ssr: false,
  loading: () => <div style={{ height: 400, background: 'rgba(0,77,64,0.04)', borderRadius: 32 }} />,
})

const ExportMap = dynamic(() => import('@/components/ExportMap'), {
  ssr: false,
  loading: () => <div style={{ height: 500, background: 'rgba(255,183,3,0.08)', borderRadius: 32 }} />,
})

// ─── Stats data ─────────────────────────────────────────────────────────────
const stats = [
  { value: 40,  suffix: '+', label: 'Export Hubs' },
  { value: 100, suffix: '%', label: 'Organic Purity' },
  { value: 28,  suffix: '+', label: 'Products' },
  { value: 12,  suffix: 'h', label: 'Partner Response' },
]

// ─── Process steps ───────────────────────────────────────────────────────────
const steps = [
  { step: '01', title: 'Curated Selection', desc: 'Hand-picked bananas from certified orchards, chosen for peak sugar levels and perfect ripeness.' },
  { step: '02', title: 'Master Extraction', desc: 'Traditional artisan methods preserved through hygienic modern protocols for uncompromised purity.' },
  { step: '03', title: 'Global Precision', desc: 'Clinical-grade bottling and international tracking for secure, verified worldwide delivery.' },
]

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }} suppressHydrationWarning>
      <AnimatedBackground />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <CinematicSplashHero />

      {/* ── SECTION 1: NATURE REFINED ─────────────────────────── */}
      <section style={{ padding: 'var(--section-padding-top) 0 var(--section-padding-bottom) 0', backgroundColor: 'transparent', position: 'relative' }}>
        <div className="container" suppressHydrationWarning>

          {/* Intro card */}
          <ScrollReveal blur direction="scale">
            <div className="liquid-card-organic" style={{ textAlign: 'center', maxWidth: '800px', margin: `0 auto var(--content-gap) auto` }}>
              <motion.span
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                whileInView={{ opacity: 0.6, letterSpacing: '0.4em' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{ color: 'var(--secondary)', fontWeight: '950', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '2.5rem', display: 'block' }}
              >
                A Holistic Vision
              </motion.span>
               <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--h2-size)', color: 'var(--secondary)', fontWeight: '700', lineHeight: '1', letterSpacing: '-0.03em', marginBottom: '2.5rem' }}>
                Nature Refined for the <br /> <span style={{ color: 'var(--primary)' }}>Global Experience</span>.
              </h2>
              <p style={{ fontSize: '1.35rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', lineHeight: '1.8', fontWeight: '450' }}>
                From the fertile soils of Uganda to the world's most discerning markets, Shemous captures the raw essence of nature with clinical precision.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats row */}
          <ScrollReveal direction="up" delay={0.1} style={{ marginBottom: 'var(--content-gap)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '2rem' }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as any }}
                  whileHover={{ y: -8, scale: 1.04 }}
                  style={{
                    textAlign: 'center',
                    padding: '3rem 2rem',
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 24,
                    border: '1px solid rgba(255,183,3,0.15)',
                    boxShadow: '0 20px 60px -20px rgba(0,45,38,0.08)',
                    cursor: 'default',
                  }}
                >
                  <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '900', color: 'var(--secondary)', lineHeight: 1 }}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.8rem' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Suspense fallback={<div style={{ height: 400 }} />}>
              <BananaBenefitsTabs />
            </Suspense>
          </ScrollReveal>
        </div>
        <CurvedDivider color="var(--secondary)" position="bottom" height="150px" />
      </section>

      {/* ── SECTION 2: GLOBAL LOGISTICS ────────────────────────── */}
      <section style={{ padding: 'var(--section-padding-top) 0 var(--section-padding-bottom) 0', backgroundColor: 'var(--secondary)', position: 'relative', overflow: 'hidden' }}>
        <CurvedDivider color="var(--secondary)" position="top" height="150px" flip />
        {/* dot grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }} suppressHydrationWarning>
          <div className="hero-split-grid" style={{ alignItems: 'center' }}>
            <ScrollReveal direction="right" blur>
              <div className="liquid-card-organic" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--h2-size)', fontWeight: '700', color: 'white', marginBottom: '3.5rem', lineHeight: '1.1' }}>
                  We Bridge Continents.
                </h2>
                <p style={{ fontSize: '1.3rem', color: 'white', lineHeight: '1.8', opacity: 0.8, fontWeight: '400', marginBottom: '4.5rem' }}>
                  From the rich biodiversity of Uganda to high-end global marketplaces. We handle the complexity of international export with masterful efficiency.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '2rem' }}>
                  {[
                    { value: 40,  suffix: '+', label: 'Export Hubs' },
                    { value: 100, suffix: '%', label: 'Organic Purity' },
                    { value: 25,  suffix: '+', label: 'Global Markets' },
                    { value: 48,  suffix: 'h', label: 'Direct Dispatch' }
                  ].map((s) => (
                    <div key={s.label}>
                      <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary)' }}>
                        <AnimatedCounter value={s.value} suffix={s.suffix} />
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'white', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.5rem' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.3} blur>
              <Suspense fallback={<div style={{ height: 500, borderRadius: 32, background: 'rgba(255,183,3,0.08)' }} />}>
                <ExportMap />
              </Suspense>
            </ScrollReveal>
          </div>
        </div>
        <CurvedDivider color="var(--background)" position="bottom" height="150px" />
      </section>

      {/* ── SECTION 3: SPIRIT OF OMUBISI ───────────────────────── */}
      <section style={{ padding: 'var(--section-padding-top) 0 var(--section-padding-bottom) 0', backgroundColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
        <CurvedDivider color="white" position="top" height="150px" />

        <div className="container" style={{ position: 'relative', zIndex: 10 }} suppressHydrationWarning>
          <ScrollReveal blur direction="scale">
            <div style={{ textAlign: 'center', marginBottom: 'var(--content-gap)' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--h2-size)', fontWeight: '700', color: 'var(--secondary)', letterSpacing: '-0.03em', position: 'relative', display: 'inline-block' }}>
                The Spirit of Omubisi.
                <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '10px', color: 'var(--primary)', opacity: 0.5 }}>
                  <svg viewBox="0 0 200 10" fill="none">
                    <path d="M5 5 Q 50 1, 100 5 T 195 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </h2>
              <p style={{ fontFamily: '"Gochi Hand", cursive', fontSize: '1.6rem', color: 'var(--primary-dark)', marginTop: '2.5rem', transform: 'rotate(-2deg)' }}>
                Heritage in every drop
              </p>
            </div>
          </ScrollReveal>

          <div className="products-grid">
            {steps.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.15} blur direction="up">
                <motion.div
                  className="shemous-scurve-card"
                  whileHover={{ y: -20, boxShadow: '0 60px 130px -30px rgba(0,45,38,0.15)' }}
                  transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                  style={{ height: '100%' }}
                >
                  <div className="scurve-bg-fix" style={{ height: '240px' }} />
                  <div className="card-scurve-header" style={{ height: '200px' }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: '900', color: 'rgba(255,255,255,0.2)', zIndex: 2 }}>{item.step}</div>
                  </div>
                  <div className="card-scurve-content" style={{ marginTop: '-60px', padding: 'var(--content-gap) 2.8rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--h3-size)', fontWeight: '700', color: 'var(--secondary)', marginBottom: '1.5rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7', fontWeight: '450' }}>{item.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.4} direction="up" blur style={{ textAlign: 'center', marginTop: 'var(--content-gap)' }}>
            <Link
              href="/products"
              className="liquid-blob-btn btn-hover text-white"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem 4rem',
                background: 'var(--secondary)',
                color: 'white',
                fontWeight: '800',
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 25px 50px rgba(0,77,64,0.15)',
              }}
            >
              Explore All Products <ArrowRight size={20} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
