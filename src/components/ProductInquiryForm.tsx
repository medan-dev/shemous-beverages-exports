'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Globe, Mail, User, Phone, MessageSquare } from 'lucide-react'

export default function ProductInquiryForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('success'), 1500)
  }

  return (
    <div style={{ padding: '4rem', background: 'white', borderRadius: '50px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 40px 100px -20px rgba(0,45,38,0.08)' }}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '4rem 0' }}
          >
            <div style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>
              <CheckCircle size={80} strokeWidth={1} />
            </div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--secondary)', marginBottom: '1rem' }}>Inquiry Received</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>A global specialist will contact you within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="hero-split-grid"
            style={{ gap: '2rem' }}
          >
            <div style={{ gridColumn: 'span 2', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--primary)', fontWeight: '950', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>B2B Inquiry</span>
              <h3 style={{ fontSize: '2.8rem', fontWeight: '700', color: 'var(--secondary)', marginTop: '0.5rem' }}>Global Export Protocol</h3>
            </div>

            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.2)' }} size={18} />
              <input type="text" placeholder="Full Name" required style={{ width: '100%', padding: '1.2rem 1.2rem 1.2rem 3.5rem', borderRadius: '100px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: '#f8f9fa' }} />
            </div>

            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.2)' }} size={18} />
              <input type="email" placeholder="Professional Email" required style={{ width: '100%', padding: '1.2rem 1.2rem 1.2rem 3.5rem', borderRadius: '100px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: '#f8f9fa' }} />
            </div>

            <div style={{ position: 'relative' }}>
              <Globe style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.2)' }} size={18} />
              <input type="text" placeholder="Country of Destination" required style={{ width: '100%', padding: '1.2rem 1.2rem 1.2rem 3.5rem', borderRadius: '100px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: '#f8f9fa' }} />
            </div>

            <div style={{ position: 'relative' }}>
              <Phone style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.2)' }} size={18} />
              <input type="text" placeholder="Phone (with Country Code)" required style={{ width: '100%', padding: '1.2rem 1.2rem 1.2rem 3.5rem', borderRadius: '100px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: '#f8f9fa' }} />
            </div>

            <div style={{ gridColumn: 'span 2', position: 'relative' }}>
              <MessageSquare style={{ position: 'absolute', left: '1.5rem', top: '1.5rem', color: 'rgba(0,0,0,0.2)' }} size={18} />
              <textarea placeholder="Specific Requirements (Volume, Timing, Special Packaging)" required style={{ width: '100%', padding: '1.4rem 1.4rem 1.4rem 3.5rem', borderRadius: '30px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '1rem', background: '#f8f9fa', minHeight: '150px' }} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <button
                type="submit"
                className="btn-hover"
                style={{ 
                  width: '100%', 
                  padding: '1.4rem', 
                  background: 'var(--secondary)', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '100px', 
                  fontSize: '1.1rem', 
                  fontWeight: '700', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '1rem',
                  cursor: 'pointer'
                }}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Transmitting Inbound...' : <>Transmit Inquiry <Send size={20} /></>}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
