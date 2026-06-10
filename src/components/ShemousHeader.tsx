'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

const ShemousHeader = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Close menu on route change
  useEffect(() => setIsOpen(false), [pathname])

  // Handle scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Exports', href: '/export' },
    { name: 'Contact', href: '/contact' },
  ]

  const isHomePage = pathname === '/';
  const isLightTheme = !isHomePage;

  const headerBackground = scrolled 
    ? (isLightTheme ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 20, 15, 0.85)')
    : 'transparent';
  
  const textColor = isLightTheme ? 'var(--secondary)' : 'white';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          background: headerBackground,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled 
            ? (isLightTheme ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)') 
            : '1px solid transparent',
          padding: scrolled ? '0.8rem 0' : '1.5rem 0',
        }}
      >
        <div suppressHydrationWarning style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', zIndex: 1001 }}>
            <img 
              src="/images/shemous_logo_master_transparent.png" 
              alt="Shemous Beverages Logo" 
              style={{ 
                height: scrolled ? '80px' : '120px', 
                objectFit: 'contain',
                filter: isLightTheme ? 'brightness(0)' : 'none',
                transition: 'height 0.4s ease, filter 0.4s ease'
              }} 
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} suppressHydrationWarning>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  color: textColor,
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  letterSpacing: '0.02em',
                  opacity: 0.9,
                  transition: 'opacity 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '0.9'}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions - Right aligned */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} suppressHydrationWarning>
            <Link 
              href="/login" 
              style={{ 
                color: textColor, 
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <User size={18} /> Sign In
            </Link>
            <Link 
              href="/register" 
              style={{ 
                background: 'var(--primary)', 
                color: 'var(--secondary)', 
                padding: '0.6rem 1.5rem', 
                borderRadius: '100px',
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: '800',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="show-mobile"
            onClick={() => setIsOpen(!isOpen)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: textColor, 
              cursor: 'pointer',
              zIndex: 1001,
              display: 'none' // Handled by CSS
            }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 20, 15, 0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '2rem',
                fontWeight: '700',
                letterSpacing: '-0.02em'
              }}
            >
              {link.name}
            </Link>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <Link href="/login" onClick={() => setIsOpen(false)} style={{ color: '#f97316', textDecoration: 'none', fontSize: '1.2rem', fontWeight: '700' }}>
              Sign In
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem', fontWeight: '700' }}>
              Create Account
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </>
  )
}

export default ShemousHeader
