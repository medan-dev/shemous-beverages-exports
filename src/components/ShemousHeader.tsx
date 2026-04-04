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
          height: 'clamp(90px, 15vh, 140px)', 
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
        {/* Left Side: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1.2, ease: "easeOut" }}
               style={{ height: 'clamp(70px, 10vh, 110px)', display: 'flex', alignItems: 'center' }}
             >
                <img 
                  src="/images/shemous_logo_master.png" 
                  alt="Shemous Beverages & Exports" 
                  style={{ height: '100%', width: 'auto', objectFit: 'contain', mixBlendMode: 'screen' }} 
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
          
          <Link href="/export" className="btn-hover hide-mobile" style={{ 
            padding: '0.6rem 1.4rem', 
            background: 'var(--primary)', 
            color: 'var(--secondary)', 
            borderRadius: '50px', 
            fontWeight: '900', 
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            display: 'inline-block'
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
             initial={{ opacity: 0, x: '100%' }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: '100%' }}
             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
             style={{
                position: 'fixed',
                inset: 0,
                background: 'linear-gradient(to bottom, var(--secondary), #002D26)',
                zIndex: 90,
                padding: '160px 2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
             }}
           >
             {navItems.map((item, i) => (
               <motion.div
                 key={item.name}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.1 * i }}
               >
                 <Link 
                   href={item.href}
                   style={{ 
                     fontSize: '2.5rem', 
                     fontWeight: '950', 
                     color: 'white', 
                     textDecoration: 'none',
                     letterSpacing: '-0.02em'
                   }}
                 >
                   {item.name}
                 </Link>
               </motion.div>
             ))}
             
             <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: '700', marginBottom: '1.5rem', fontSize: '0.9rem' }}>GLOBAL LOGISTICS</p>
                <Link href="/export" style={{ display: 'block', padding: '1.25rem', background: 'var(--primary)', color: 'var(--secondary)', borderRadius: '20px', textAlign: 'center', fontWeight: '950', textDecoration: 'none' }}>
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

        @media (max-width: 992px) {
           .desktop-nav { display: none !important; }
           .show-mobile-flex { display: flex !important; }
           .hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}

export default ShemousHeader
