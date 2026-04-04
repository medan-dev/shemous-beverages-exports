'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

// Random droplet positions - stable (generated once)
const DROPLETS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: `${5 + Math.sin(i * 1.7) * 45 + 50}%`,
  y: `${5 + Math.cos(i * 2.3) * 45 + 50}%`,
  size: 3 + (i % 7),
  delay: (i * 0.15) % 3,
  duration: 2 + (i % 4) * 0.5,
}))

export default function CinematicSplashHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const { scrollY } = useScroll()

  // Parallax — image moves slower than scroll
  const imageY = useTransform(scrollY, [0, 800], [0, 200])
  const imageScale = useTransform(scrollY, [0, 600], [1, 1.15])
  const contentY = useTransform(scrollY, [0, 600], [0, -80])
  const overlayOpacity = 0.2 // Static low opacity to ensure image is visible

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 700,
        overflow: 'hidden',
        backgroundColor: '#001a14',
        /* Cinematic convex curve at bottom */
        clipPath: 'ellipse(160% 100% at 50% 0%)',
      }}
    >
      {/* ── Cinematic splash image (parallax + slow zoom) ─────── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-15%',
          y: imageY,
          scale: imageScale,
          zIndex: 1, // Explicit z-index
        }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }} // Bypass 'loaded' check for now to ensure visibility
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          src="/videos/Create_cinematic_realistic_202604040302.mp4"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            filter: 'saturate(1.2) brightness(1.2) contrast(1.1)',
          }}
        />
      </motion.div>

      {/* ── Cinematic gradient vignette ───────────────────────── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: overlayOpacity,
          background: `
            radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.05) 100%),
            linear-gradient(to bottom,
              rgba(0,10,5,0.15) 0%,
              transparent 40%,
              transparent 60%,
              rgba(0,10,5,0.4) 100%
            )
          `,
          zIndex: 2,
        }}
      />

      {/* ── Animated floating droplets overlay ───────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }} suppressHydrationWarning>
        {mounted && loaded && DROPLETS.map((d) => (
          <motion.div
            key={d.id}
            style={{
              position: 'absolute',
              left: d.x,
              top: d.y,
              width: d.size,
              height: d.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255,210,0,0.9), rgba(255,160,0,0.4))`,
              boxShadow: `0 0 ${d.size * 2}px rgba(255,200,0,0.6)`,
            }}
            animate={{
              y: [0, -(20 + d.size * 4), -5, -(15 + d.size * 3), 0],
              x: [0, d.size * 2, -d.size, d.size * 1.5, 0],
              opacity: [0, 0.9, 0.7, 0.8, 0],
              scale: [0.5, 1.2, 0.9, 1.1, 0.3],
            }}
            transition={{
              duration: d.duration,
              delay: d.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── Scan line / film grain texture ───────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          pointerEvents: 'none',
          opacity: 0.04,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* ── Chromatic aberration edge glow ────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          pointerEvents: 'none',
          borderRadius: 0,
          boxShadow: 'inset 0 0 120px rgba(255,183,3,0.18), inset 0 0 40px rgba(255,100,0,0.08)',
        }}
      />

      {/* ── Hero content ─────────────────────────────────────── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 5vw, 6rem) 0 clamp(1.5rem, 5vw, 6rem)', /* Lowered for header clearance */
          y: contentY,
          /* Sophisticated centered scrim to lift content without dulling edges */
          background: 'radial-gradient(circle at center, rgba(0,25,20,0.55) 0%, rgba(0,25,20,0.2) 50%, transparent 85%)',
        }}
      >
        {/* Brand pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.55rem 1.4rem',
            borderRadius: 100,
            background: 'rgba(255,183,3,0.18)',
            border: '1px solid rgba(255,183,3,0.4)',
            backdropFilter: 'blur(12px)',
            marginBottom: '2rem',
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.25em' }}>
            Premium Ugandan Exports
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: '700',
            color: 'white',
            lineHeight: '0.9',
            letterSpacing: '-0.04em',
            marginBottom: '2.5rem',
            /* Enhanced multi-layered shadow for cinematic lift */
            textShadow: `
              0 2px 10px rgba(0,0,0,0.8),
              0 10px 40px rgba(0,0,0,0.5),
              0 20px 80px rgba(0,0,0,0.3)
            `,
          }}
        >
          Fresh, Pure
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #FFB703, #FB8500, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              /* Strong dark drop-shadow specifically for gold-on-gold contrast */
              filter: 'drop-shadow(0 4px 12px rgba(0,20,15,0.9)) drop-shadow(0 10px 30px rgba(0,20,15,0.6))',
            }}
          >
            &amp; Authentic.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            color: 'rgba(255,255,255,0.95)', /* Increased opacity for legibility */
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            lineHeight: '1.7',
            maxWidth: 650,
            marginBottom: '3.5rem',
            fontWeight: '600', /* Thicker for better definition */
            textShadow: '0 4px 15px rgba(0,0,0,0.9)',
          }}
        >
          Experience the pinnacle of Ugandan fruit exports. Sustainably sourced,
          organic‑certified, and globally delivered with clinical mastery.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link
            href="/products"
            className="liquid-blob-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '1.2rem 3rem',
              background: 'var(--primary)',
              color: 'var(--secondary)',
              fontWeight: '950',
              fontSize: '0.95rem',
              textDecoration: 'none',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 10px 20px rgba(255,183,3,0.3)',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            Shop Now <ArrowRight size={18} />
          </Link>

          <Link
            href="/export"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '1.2rem 3rem',
              background: 'var(--secondary)', /* Dark contrast bg for visibility */
              border: '1.5px solid rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: '700',
              fontSize: '0.95rem',
              textDecoration: 'none',
              borderRadius: 100,
              boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            Export Partnership <ArrowRight size={18} />
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────── */}

      {/* Pulse keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </div>
  )
}
