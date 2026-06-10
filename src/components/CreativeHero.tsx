'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import DynamicHeroSplash from './DynamicHeroSplash'

const LiquidParticle = ({ size, delay, x, y }: { size: number, delay: number, x: string, y: string }) => (
  <motion.div
    animate={{ 
      y: [0, -40, 0],
      x: [0, 10, -10, 0],
      opacity: [0.1, 0.3, 0.1],
      scale: [1, 1.2, 1]
    }}
    transition={{ 
      duration: 5 + Math.random() * 5, 
      repeat: Infinity, 
      delay: delay,
      ease: 'easeInOut' 
    }}
    style={{ 
      position: 'absolute', 
      top: y, 
      left: x, 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle, rgba(255, 183, 3, 0.8) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(4px)',
      zIndex: 1,
      pointerEvents: 'none'
    }}
  />
)

const CreativeHero = () => {
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const ySplash = useTransform(scrollY, [0, 500], [0, -80]);
  const yGlass = useTransform(scrollY, [0, 500], [0, -120]);
  const yText = useTransform(scrollY, [0, 500], [0, 40]);
  const rotateSplash = useTransform(scrollY, [0, 500], [0, 10]);

  // Masterpiece Blend Strategy: Luminance Masking
  const lumaMask = (url: string) => ({
    maskImage: `url(${url})`,
    WebkitMaskImage: `url(${url})`,
    maskMode: 'luminance' as const,
    WebkitMaskMode: 'luminance' as const,
    objectFit: 'contain' as const,
    width: '100%',
    height: 'auto'
  });

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: 'auto', 
      minHeight: 'clamp(700px, 100vh, 850px)',
      paddingTop: 'clamp(120px, 15vh, 160px)',
      paddingBottom: '5rem',
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: 'transparent',
      overflowX: 'hidden',
      overflowY: 'visible',
      isolation: 'isolate'
    }}>
      
      {/* 1. Immersive Ambient Background & Particles */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        background: 'radial-gradient(circle at 75% 35%, rgba(255, 183, 3, 0.2) 0%, transparent 60%)',
        zIndex: 0 
      }} />

      {/* High-Fidelity Liquid Particles System */}
      <LiquidParticle size={120} delay={0} x="10%" y="20%" />
      <LiquidParticle size={180} delay={1} x="80%" y="15%" />
      <LiquidParticle size={90} delay={2} x="45%" y="60%" />
      <LiquidParticle size={150} delay={3} x="15%" y="75%" />
      <LiquidParticle size={110} delay={4} x="85%" y="70%" />
      
      <div style={{ 
        position: 'absolute', 
        bottom: '-15%', 
        left: '-10%', 
        width: '50%', 
        opacity: 0.08, 
        filter: 'blur(30px)',
        zIndex: 0,
        transform: 'rotate(-15deg)'
      }}>
        <img src="/images/banana_leaves_black.png" style={{ width: '100%', mixBlendMode: 'screen' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-split-grid" style={{ alignItems: 'center' }}>
        
        {/* Left Content: Editorial Typography */}
        <motion.div 
          initial={{ opacity: 0, x: -100, filter: 'blur(20px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ y: yText }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center',
              gap: '0.8rem',
              padding: '0.6rem 1.4rem', 
              background: 'var(--secondary)', 
              borderRadius: '50px', 
              color: 'var(--primary)', 
              fontWeight: '800', 
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '2.5rem'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></span>
            Ugandan Origin Artistry
          </motion.div>

          <h1 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(4.5rem, 9.5vw, 7.5rem)', 
            fontWeight: '700', 
            color: 'var(--secondary)', 
            lineHeight: '0.85', 
            letterSpacing: '-0.04em',
            marginBottom: '3.5rem',
            position: 'relative'
          }}>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ display: 'block' }}
            >
              Fresh, Pure
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ display: 'block' }}
            >
              & <span style={{ color: 'var(--primary)' }}>Authentic.</span>
            </motion.span>
            
            {/* Sketchbook Annotation: Arrow + Text */}
            <motion.div 
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 0.8, rotate: 15 }}
              transition={{ duration: 1, delay: 1.5 }}
              style={{ 
                position: 'absolute', 
                top: '5%', 
                right: '-80px', 
                fontFamily: '"Gochi Hand", cursive', 
                color: 'var(--primary-dark)', 
                fontSize: '1.5rem',
                transform: 'rotate(15deg)',
                pointerEvents: 'none',
              }}
            >
              <svg width="120" height="70" viewBox="0 0 120 70" fill="none" style={{ position: 'absolute', left: '-130px', top: '15px' }}>
                <path d="M10 55 C 30 25, 90 25, 110 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M105 20 L 115 12 L 102 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
              The Spirit of <br />Omubisi
            </motion.div>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-muted)', 
              maxWidth: '480px', 
              lineHeight: '1.7',
              fontWeight: '450',
              marginBottom: '4.5rem'
            }}
          >
            Experience the pinnacle of Ugandan fruit exports. Sustainably sourced, organic-certified, and globally delivered with clinical mastery.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', position: 'relative' }}
          >
            {/* Nectar Pulse - Giving it more Life */}
            <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
               transition={{ duration: 4, repeat: Infinity }}
               style={{ position: 'absolute', top: -10, left: -10, width: '250px', height: '80px', background: 'var(--primary)', filter: 'blur(30px)', borderRadius: '50px', zIndex: -1 }}
            />

            <Link href="/products" style={{ 
              padding: '1.4rem 4rem', 
              background: 'var(--secondary)', 
              color: 'white', 
              fontWeight: '800', 
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 25px 50px rgba(0, 77, 64, 0.15)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'inline-block'
            }} className="btn-hover liquid-blob-btn text-white">
              Shop The Heritage
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Content: Canvas Juice Splash */}
        <div className="hero-splash-container" style={{ position: 'relative', height: 'clamp(400px, 60vh, 850px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DynamicHeroSplash />
        </div>
      </div>
    </div>


      <style jsx>{`
        .btn-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(0, 77, 64, 0.25) !important;
          background-color: var(--primary-dark) !important;
        }
      `}</style>
    </div>
  )
}

export default CreativeHero
