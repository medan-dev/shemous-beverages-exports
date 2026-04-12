'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Search, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const ShemousHeader = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => setIsOpen(false), [pathname])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Export', href: '/export' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <div style={{ position: 'relative', zIndex: 100 }}>
      {/* MASTERPIECE HEADER */}
      <motion.header 
        style={{ 
          position: scrolled ? 'fixed' : 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: 'clamp(110px, 16vh, 160px)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0 var(--container-padding)',
          backgroundColor: 'var(--secondary)',
          color: 'white',
          zIndex: 100,
          boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Left Side: Logo & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6rem' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', marginLeft: '-1.5rem' }}>
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1.2, ease: "easeOut" }}
               // Massively increased logo container bounds
               style={{ height: 'clamp(100px, 15vh, 150px)', display: 'flex', alignItems: 'center' }}
             >
                <img 
                  className="logo-img"
                  src="/images/shemous_logo_master_transparent.png" 
                  alt="Shemous Beverages & Exports" 
                  // Scaled to overcome any potential built-in PNG padding
                  style={{ height: '100%', width: 'auto', objectFit: 'contain', transform: 'scale(1.5)', transformOrigin: 'left center' }} 
                />
             </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem' }}>
            {navItems.map((item, i) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={item.href}
                    style={{ 
                      textDecoration: 'none', 
                      color: 'white', 
                      opacity: isActive ? 1 : 0.7,
                      fontWeight: isActive ? '950' : '900', 
                      fontSize: '1rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      transition: 'all 0.3s ease',
                    }}
                    className="header-link"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )
            })}
          </nav>
        </div>

        {/* Right Side: Utility */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div className="hide-mobile" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.9 }}>
             <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Uganda</span>
             <ChevronDown size={14} />
          </div>
          
          <Link href="/export" className="btn-hover shop-now-btn" style={{ 
            padding: '0.6rem 1.4rem', 
            background: 'var(--primary)', 
            color: 'var(--secondary)', 
            borderRadius: '50px', 
            fontWeight: '900', 
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }}>
            Shop Now
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="show-mobile-flex"
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: 'none', 
              borderRadius: '12px', 
              color: 'white', 
              width: '45px', 
              height: '45px', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* INTEGRATED LIQUID WAVE DIVIDER */}
        {!scrolled && (
          <div style={{ position: 'absolute', top: '99%', left: 0, width: '100%', zIndex: -1, pointerEvents: 'none' }}>
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
              <path 
                d="M0 0H1440V40C1440 40 1260 100 1080 100C900 100 720 40 540 40C360 40 180 100 0 100V0Z"
                fill="var(--secondary)"
              />
            </svg>
          </div>
        )}
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
           <motion.div
             initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
             animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
             exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
             transition={{ duration: 0.4 }}
             style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 45, 38, 0.95)',
                zIndex: 90,
                padding: 'clamp(120px, 15vh, 160px) 2rem 3rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                overflowY: 'auto'
             }}
           >
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
               {navItems.map((item, i) => {
                 const isActive = pathname === item.href
                 return (
                   <motion.div
                     key={item.name}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 * i, type: 'spring', stiffness: 100 }}
                     style={{ width: '100%' }}
                   >
                     <Link 
                       href={item.href}
                       onClick={() => setIsOpen(false)}
                       style={{ 
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'space-between',
                         fontSize: '1.75rem', 
                         fontWeight: isActive ? '950' : '800', 
                         color: isActive ? 'var(--primary)' : 'white', 
                         opacity: isActive ? 1 : 0.8,
                         textDecoration: 'none',
                         letterSpacing: '-0.01em',
                         padding: '1rem 0',
                         borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                         transition: 'all 0.3s ease'
                       }}
                     >
                       <span>{item.name}</span>
                       <span style={{ fontSize: '1rem', opacity: isActive ? 1 : 0.2 }}>
                         →
                       </span>
                     </Link>
                   </motion.div>
                 )
               })}
             </div>
             
             <div style={{ marginTop: 'auto', paddingTop: '3rem', width: '100%', maxWidth: '400px', margin: 'auto auto 0 auto' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700', marginBottom: '1rem', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center' }}>Global Logistics</p>
                <Link href="/export" onClick={() => setIsOpen(false)} style={{ display: 'block', padding: '1.2rem', background: 'var(--primary)', color: 'var(--secondary)', borderRadius: '16px', textAlign: 'center', fontWeight: '950', fontSize: '1rem', textDecoration: 'none', boxShadow: '0 10px 30px rgba(255, 183, 3, 0.15)' }}>
                   Start Export Inquiry
                </Link>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        .header-link:hover {
          color: var(--primary) !important;
          opacity: 1 !important;
        }
        
        .desktop-nav { display: flex; }
        .show-mobile-flex { display: none; }
        .hide-mobile { display: flex; }
        .shop-now-btn { margin-left: 0; }

        @media (max-width: 992px) {
           .desktop-nav { display: none !important; }
           .show-mobile-flex { display: flex !important; }
           .hide-mobile { display: none !important; }
           .shop-now-btn { margin-left: 1rem; font-size: 0.65rem !important; padding: 0.5rem 1rem !important; }
           .logo-img { transform: scale(1.2) !important; }
        }

        @media (max-width: 480px) {
           .shop-now-btn { font-size: 0.6rem !important; padding: 0.45rem 0.8rem !important; margin-left: 0.5rem; }
           .logo-img { transform: scale(1.0) !important; }
        }
      `}</style>
    </div>
  )
}

export default ShemousHeader
