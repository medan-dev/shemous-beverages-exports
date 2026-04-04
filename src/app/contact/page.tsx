'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import CurvedDivider from '@/components/CurvedDivider'
import { supabase } from '@/lib/supabase'

const ContactBlob = ({ color, size, delay, x, y }: { color: string, size: string, delay: number, x: string, y: string }) => (
  <motion.div
    animate={{ 
      y: [0, -50, 0],
      x: [0, 30, -30, 0],
      rotate: [0, 10, -10, 0],
      opacity: [0.05, 0.1, 0.05]
    }}
    transition={{ duration: 15, repeat: Infinity, delay: delay, ease: 'easeInOut' }}
    style={{ position: 'absolute', top: y, left: x, width: size, height: size, backgroundColor: color, borderRadius: '45% 55% 60% 40% / 40% 60% 40% 60%', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}
  />
)

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      full_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      type: 'general',
    }

    let text = `Hello Shemous! I'm reaching out from the Contact Page:\n\n`
    text += `*Name:* ${data.full_name}\n`
    text += `*Email:* ${data.email}\n\n`
    text += `*Message:*\n${data.message}\n`

    const waUrl = `https://wa.me/256705436657?text=${encodeURIComponent(text)}`

    const { error } = await supabase.from('leads').insert([data])

    setLoading(false)
    setSubmitted(true)
    window.open(waUrl, '_blank')
  }

  return (
    <div style={{ backgroundColor: '#FDFBE6', minHeight: '100vh', padding: 'clamp(140px, 20vh, 180px) 0 100px 0', position: 'relative', overflow: 'hidden' }}>
      <ContactBlob color="var(--primary)" size="600px" delay={0} x="-10%" y="10%" />
      <ContactBlob color="var(--secondary)" size="500px" delay={5} x="70%" y="40%" />
      
      <div className="container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 1 }}>
        <div className="hero-split-grid" style={{ alignItems: 'start' }}>
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: '950', color: 'var(--primary)', marginBottom: '1.5rem' }}>Let's Connect.</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '4rem', lineHeight: '1.6', fontWeight: '500' }}>
               Whether you're looking for distribution partnerships or have a question about our export routes, our team is ready to assist.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="liquid-card-organic" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem 2rem', background: 'white' }}>
                <div style={{ width: '56px', height: '56px', background: 'var(--secondary)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: '0 10px 20px rgba(0,45,38,0.1)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: '950', color: 'var(--secondary)' }}>Email Us</h4>
                  <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>hello@shemous.co.ug</p>
                </div>
              </div>
              <div className="liquid-card-organic" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem 2rem', background: 'white' }}>
                <div style={{ width: '56px', height: '56px', background: 'var(--secondary)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: '0 10px 20px rgba(0,45,38,0.1)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: '950', color: 'var(--secondary)' }}>Call Us</h4>
                  <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>+256 705 436 657</p>
                </div>
              </div>
              <div className="liquid-card-organic" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem 2rem', background: 'white' }}>
                <div style={{ width: '56px', height: '56px', background: 'var(--secondary)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: '0 10px 20px rgba(0,45,38,0.1)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: '950', color: 'var(--secondary)' }}>Visit Us</h4>
                  <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Plot 12, Industrial Area, Kampala</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="shemous-scurve-card"
             style={{ padding: '0', minHeight: 'auto' }}
          >
             <div className="scurve-bg-fix" />
             <div className="card-scurve-content" style={{ marginTop: '0', padding: '3.5rem' }}>
               {submitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                     <CheckCircle size={60} color="var(--primary)" style={{ margin: '0 auto 2rem' }} />
                     <h3 style={{ fontSize: '2rem', fontWeight: '950', color: 'var(--secondary)', marginBottom: '1rem' }}>Message Sent!</h3>
                     <p style={{ color: 'var(--text-muted)' }}>We have received your message and will be in touch shortly.</p>
                     <button onClick={() => setSubmitted(false)} className="liquid-blob-btn" style={{ padding: '1rem 2rem', background: 'var(--primary)', color: 'white', marginTop: '2rem', border: 'none', borderRadius: '100px', fontWeight: '800', cursor: 'pointer' }}>Send Another</button>
                  </div>
               ) : (
                 <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <div>
                          <label style={labelStyle}>First Name</label>
                          <input name="firstName" required type="text" placeholder="John" style={inputStyle} />
                       </div>
                       <div>
                          <label style={labelStyle}>Last Name</label>
                          <input name="lastName" required type="text" placeholder="Doe" style={inputStyle} />
                       </div>
                    </div>
                    <div>
                       <label style={labelStyle}>Email Address</label>
                       <input name="email" required type="email" placeholder="john@company.com" style={inputStyle} />
                    </div>
                    <div>
                       <label style={labelStyle}>Message</label>
                       <textarea name="message" required placeholder="How can we help?" style={{ ...inputStyle, height: '150px', resize: 'none' }}></textarea>
                    </div>
                    <button disabled={loading} className="liquid-blob-btn btn-hover" style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '1.25rem', borderRadius: '100px', fontWeight: '950', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1rem', fontSize: '1rem' }}>
                       {loading ? 'Sending...' : 'Send Message'} <Send size={20} />
                    </button>
                 </form>
               )}
             </div>
          </motion.div>
        </div>
      </div>
      <CurvedDivider color="white" position="bottom" height="150px" />
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: '0.9rem',
  fontWeight: '700',
  color: 'var(--primary)',
  marginBottom: '0.6rem'
}

const inputStyle = {
  width: '100%',
  padding: '1rem 1.25rem',
  background: '#F8FAFC',
  border: '1px solid rgba(203, 213, 225, 0.5)',
  borderRadius: '15px',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  color: 'var(--primary)'
}
