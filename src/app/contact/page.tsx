'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Ship, MessageSquare } from 'lucide-react'
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
  const [formType, setFormType] = useState<'general' | 'export'>('general')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    let data: any = {}
    let text = ''

    if (formType === 'general') {
      data = {
        full_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
        type: 'general',
      }
      text = `Hello Shemous! I'm reaching out from the Contact Page:\n\n`
      text += `*Name:* ${data.full_name}\n`
      text += `*Email:* ${data.email}\n\n`
      text += `*Message:*\n${data.message}\n`
    } else {
      data = {
        full_name: formData.get('name') as string,
        company_name: formData.get('company') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        country: formData.get('country') as string,
        message: formData.get('message') as string,
        type: 'export',
      }
      text = `Hello Shemous! I'm submitting an Export Partnership Inquiry:\n\n`
      text += `*Name:* ${data.full_name}\n`
      if (data.company_name) text += `*Company:* ${data.company_name}\n`
      if (data.email) text += `*Email:* ${data.email}\n`
      if (data.phone) text += `*Phone:* ${data.phone}\n`
      text += `*Target Market:* ${data.country}\n\n`
      text += `*Scope & Volume Request:*\n${data.message}\n`
    }

    const waUrl = `https://wa.me/256705436657?text=${encodeURIComponent(text)}`

    const { error } = await supabase.from('leads').insert([data])

    setLoading(false)
    setSubmitted(true)
    window.open(waUrl, '_blank')
  }

  return (
    <div style={{ backgroundColor: '#FDFBE6', minHeight: '100vh', padding: 'clamp(220px, 30vh, 300px) 0 100px 0', position: 'relative', overflow: 'hidden' }}>
      <ContactBlob color="var(--primary)" size="600px" delay={0} x="-10%" y="10%" />
      <ContactBlob color="var(--secondary)" size="500px" delay={5} x="70%" y="40%" />
      
      <div className="container" style={{ maxWidth: '1200px', position: 'relative', zIndex: 1 }}>
        <div className="hero-split-grid" style={{ alignItems: 'start', gap: '4rem' }}>
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
               
               {/* Form Type Selector */}
               {!submitted && (
                 <div style={{ 
                   display: 'flex', 
                   background: '#F1F5F9', 
                   borderRadius: '100px', 
                   padding: '0.4rem', 
                   marginBottom: '2.5rem',
                   position: 'relative'
                 }}>
                   <button
                     onClick={() => setFormType('general')}
                     style={{
                       flex: 1,
                       padding: '0.8rem 1rem',
                       borderRadius: '100px',
                       border: 'none',
                       background: formType === 'general' ? 'white' : 'transparent',
                       color: formType === 'general' ? 'var(--secondary)' : 'var(--text-muted)',
                       fontWeight: '800',
                       fontSize: '0.95rem',
                       cursor: 'pointer',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       gap: '0.5rem',
                       boxShadow: formType === 'general' ? '0 4px 10px rgba(0,0,0,0.05)' : 'none',
                       transition: 'all 0.3s ease'
                     }}
                   >
                     <MessageSquare size={18} /> General Inquiry
                   </button>
                   <button
                     onClick={() => setFormType('export')}
                     style={{
                       flex: 1,
                       padding: '0.8rem 1rem',
                       borderRadius: '100px',
                       border: 'none',
                       background: formType === 'export' ? 'var(--primary)' : 'transparent',
                       color: formType === 'export' ? 'var(--secondary)' : 'var(--text-muted)',
                       fontWeight: '900',
                       fontSize: '0.95rem',
                       cursor: 'pointer',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       gap: '0.5rem',
                       boxShadow: formType === 'export' ? '0 8px 20px rgba(255,183,3,0.3)' : 'none',
                       transition: 'all 0.3s ease'
                     }}
                   >
                     <Ship size={18} /> Export Partnership
                   </button>
                 </div>
               )}

               {submitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                     <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ margin: '0 auto 2rem', color: 'var(--primary)', display: 'flex', justifyContent: 'center' }}
                     >
                       <CheckCircle size={60} />
                     </motion.div>
                     <h3 style={{ fontSize: '2rem', fontWeight: '950', color: 'var(--secondary)', marginBottom: '1rem' }}>Message Sent!</h3>
                     <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>We have received your message and our team will be in touch shortly.</p>
                     <button onClick={() => setSubmitted(false)} className="liquid-blob-btn btn-hover" style={{ padding: '1rem 2rem', background: 'var(--primary)', color: 'var(--secondary)', marginTop: '2rem', border: 'none', fontWeight: '900', cursor: 'pointer' }}>Send Another</button>
                  </div>
               ) : (
                 <AnimatePresence mode="wait">
                   <motion.form 
                     key={formType}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.2 }}
                     onSubmit={handleSubmit} 
                     style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                   >
                     {formType === 'general' ? (
                       // General Form Fields
                       <>
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.5rem' }}>
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
                       </>
                     ) : (
                       // Export Form Fields
                       <>
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.5rem' }}>
                           <div>
                             <label style={labelStyle}>Full Name</label>
                             <input name="name" required className="shemous-input" placeholder="Primary Contact" style={inputStyle} />
                           </div>
                           <div>
                             <label style={labelStyle}>Organization</label>
                             <input name="company" className="shemous-input" placeholder="Company Name" style={inputStyle} />
                           </div>
                         </div>
                         
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.5rem' }}>
                           <div>
                             <label style={labelStyle}>Corporate Email</label>
                             <input name="email" type="email" required className="shemous-input" placeholder="name@company.com" style={inputStyle} />
                           </div>
                           <div>
                             <label style={labelStyle}>Target Market</label>
                             <input name="country" required className="shemous-input" placeholder="Destination Region" style={inputStyle} />
                           </div>
                         </div>

                         <div>
                           <label style={labelStyle}>Scope & Volume</label>
                           <textarea name="message" required className="shemous-input" style={{ ...inputStyle, height: '140px', resize: 'none' }} placeholder="Specify your beverage interests and anticipated volume for the first quarter..."></textarea>
                         </div>
                       </>
                     )}

                     <button disabled={loading} className="liquid-blob-btn btn-hover" style={{ 
                       backgroundColor: formType === 'export' ? 'var(--primary)' : 'var(--secondary)', 
                       color: formType === 'export' ? 'var(--secondary)' : 'white', 
                       padding: '1.25rem', 
                       borderRadius: '100px', 
                       fontWeight: '950', 
                       border: 'none', 
                       cursor: 'pointer', 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       gap: '0.75rem', 
                       marginTop: '1rem', 
                       fontSize: '1rem' 
                     }}>
                        {loading ? 'Sending...' : formType === 'export' ? 'Submit Inquiry' : 'Send Message'} <Send size={20} />
                     </button>
                   </motion.form>
                 </AnimatePresence>
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
  fontWeight: '800',
  color: 'var(--secondary)',
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
  transition: 'all 0.2s',
  color: 'var(--secondary)'
}

