'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, HelpCircle, ArrowRight, Truck } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Product {
  id: string | number
  name: string
  category: string
  image: string
  price?: string
  desc?: string
}

interface WhatsAppOrderModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

export default function WhatsAppOrderModal({ isOpen, onClose, product }: WhatsAppOrderModalProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!product || !mounted) return null

  const handleWhatsAppRedirect = (question: string) => {
    let text = `Hello Shemous! I am interested in:\n\n`
    text += `*${product.name}*\n`
    text += `Category: ${product.category}\n`
    if (product.price) text += `Price: ${product.price}\n`
    text += `\n*My Inquiry:*\n${question}\n\n`
    text += `Link: ${window.location.origin}/products/${product.id}`

    const encodedText = encodeURIComponent(text)
    window.open(`https://wa.me/256705436657?text=${encodedText}`, '_blank')
    onClose()
  }

  const faqs = [
    { id: 1, text: "Can I know more about this product?", icon: <HelpCircle size={18} /> },
    { id: 2, text: "How much is this product?", icon: <ArrowRight size={18} /> },
    { id: 3, text: "Can you make delivery?", icon: <Truck size={18} /> },
    { id: 4, text: "I want to place an export order.", icon: <ArrowRight size={18} /> }
  ]

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: isMobile ? 'flex-end' : 'center',
          justifyContent: 'center',
          zIndex: 999999,
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 20, 15, 0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          />

          {/* Modal Card */}
          <motion.div
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.85, y: 40 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            style={{
              position: 'relative',
              width: isMobile ? '100%' : '90%',
              maxWidth: isMobile ? 'none' : '520px',
              maxHeight: isMobile ? '92vh' : '90vh',
              backgroundColor: 'white',
              borderRadius: isMobile ? '32px 32px 0 0' : '32px',
              padding: isMobile ? '1.5rem 1.5rem 2.5rem' : '3rem',
              boxShadow: '0 -10px 80px rgba(0,0,0,0.6), 0 40px 80px rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Scrollable inner */}
            <div style={{ overflowY: 'auto', flex: 1, scrollbarWidth: 'none' }}>

              {/* Mobile drag handle */}
              {isMobile && (
                <div style={{
                  width: '44px', height: '4px',
                  backgroundColor: 'rgba(0,0,0,0.12)',
                  borderRadius: '2px',
                  margin: '0 auto 1.8rem',
                }} />
              )}

              {/* Desktop close */}
              {!isMobile && (
                <button
                  onClick={onClose}
                  style={{
                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                    background: 'rgba(0,0,0,0.06)', border: 'none',
                    borderRadius: '50%', width: '40px', height: '40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--secondary)', transition: 'background 0.2s',
                    zIndex: 10,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.12)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
                >
                  <X size={18} />
                </button>
              )}

              {/* Product info row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: isMobile ? '74px' : '90px',
                      height: isMobile ? '74px' : '90px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '4px solid rgba(0,45,38,0.12)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    }}
                  />
                  <div style={{
                    position: 'absolute', bottom: '-3px', right: '-3px',
                    width: '28px', height: '28px', borderRadius: '50%',
                    backgroundColor: '#25D366',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '3px solid white',
                    boxShadow: '0 4px 12px rgba(37,211,102,0.4)',
                    zIndex: 2,
                  }}>
                    <WhatsAppIcon size={15} fill="white" />
                  </div>
                </div>

                <div style={{ minWidth: 0 }}>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: '900', color: '#25D366',
                    textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '0.25rem',
                  }}>
                    {product.category}
                  </span>
                  <h3 style={{
                    fontSize: isMobile ? '1.3rem' : '1.6rem',
                    fontWeight: '950', color: 'var(--secondary)',
                    margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em', wordBreak: 'break-word',
                  }}>
                    {product.name}
                  </h3>
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: 'rgba(0,0,0,0.07)', marginBottom: '2rem' }} />

              <h4 style={{
                fontSize: '1rem', fontWeight: '900', color: 'var(--secondary)',
                marginBottom: '1.5rem', opacity: 0.85,
              }}>
                How can we help you?
              </h4>

              {/* Inquiry buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {faqs.map(faq => (
                  <button
                    key={faq.id}
                    onClick={() => handleWhatsAppRedirect(faq.text)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '1.2rem 1.6rem',
                      backgroundColor: 'rgba(0,45,38,0.04)',
                      border: '1.5px solid rgba(0,45,38,0.1)',
                      borderRadius: '22px',
                      color: 'var(--secondary)', fontWeight: '800', fontSize: '0.93rem',
                      cursor: 'pointer', textAlign: 'left', gap: '1rem',
                      transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      outline: 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'var(--secondary)'
                      e.currentTarget.style.color = 'white'
                      e.currentTarget.style.borderColor = 'var(--secondary)'
                      e.currentTarget.style.transform = 'scale(1.025)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(0,45,38,0.04)'
                      e.currentTarget.style.color = 'var(--secondary)'
                      e.currentTarget.style.borderColor = 'rgba(0,45,38,0.1)'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ opacity: 0.7, display: 'flex' }}>{faq.icon}</span>
                      {faq.text}
                    </div>
                    <WhatsAppIcon size={17} fill="currentColor" style={{ opacity: 0.35, flexShrink: 0 }} />
                  </button>
                ))}
              </div>

              {/* Mobile dismiss */}
              {isMobile && (
                <button
                  onClick={onClose}
                  style={{
                    width: '100%', marginTop: '2rem',
                    padding: '1rem', background: 'rgba(0,0,0,0.05)',
                    border: 'none', borderRadius: '100px',
                    color: 'var(--secondary)', fontWeight: '900',
                    fontSize: '0.85rem', cursor: 'pointer',
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  // Portal: render directly into document.body to escape any CSS transform constraints
  return createPortal(modalContent, document.body)
}
