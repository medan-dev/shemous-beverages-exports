'use client'

import { useState } from 'react'
import { Send, Globe, Package, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function ExportPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      full_name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company_name: formData.get('company') as string,
      country: formData.get('country') as string,
      message: formData.get('message') as string,
      type: 'export',
    }

    let text = `Hello Shemous! I'm submitting an Export Partnership Inquiry:\n\n`
    text += `*Name:* ${data.full_name}\n`
    if (data.company_name) text += `*Company:* ${data.company_name}\n`
    if (data.email) text += `*Email:* ${data.email}\n`
    if (data.phone) text += `*Phone:* ${data.phone}\n`
    text += `*Target Market:* ${data.country}\n\n`
    text += `*Scope & Volume Request:*\n${data.message}\n`

    const waUrl = `https://wa.me/256705436657?text=${encodeURIComponent(text)}`

    const { error } = await supabase.from('leads').insert([data])

    setLoading(false)
    if (!error) {
      setSubmitted(true)
      window.open(waUrl, '_blank')
    } else {
      setSubmitted(true)
      window.open(waUrl, '_blank')
    }
  }

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  }

  return (
    <div style={{ 
      backgroundColor: 'var(--bg-creme)', 
      minHeight: '100vh', 
      padding: 'var(--section-padding-top) 0 var(--section-padding-bottom) 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Blob */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255, 183, 3, 0.1) 0%, rgba(255, 183, 3, 0) 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
        >
          {/* Centered Hero Header */}
          <motion.div variants={itemVars} style={{ textAlign: 'center', maxWidth: '950px', margin: `0 auto var(--content-gap) auto` }}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '2px', background: 'var(--primary)' }} />
              <span style={{ color: 'var(--secondary)', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.3em' }}>
                Global Partnerships
              </span>
              <div style={{ width: '40px', height: '2px', background: 'var(--primary)' }} />
            </div>
            
            <h1 style={{ 
              fontSize: 'var(--h1-size)', 
              fontWeight: '950', 
              color: 'var(--secondary)', 
              lineHeight: '0.95',
              letterSpacing: '-0.04em',
              marginBottom: '3.5rem'
            }}>
              Exporting the <span className="text-gradient-gold">Spirit</span> of Uganda.
            </h1>
            
            <p style={{ 
              color: 'var(--text-muted)', 
              fontSize: '1.4rem', 
              lineHeight: '1.8', 
              fontWeight: '450',
              margin: '0 auto',
              maxWidth: '800px'
            }}>
              From the heart of East Africa to the world's most discerning markets. We specialize in the global distribution of premium beverages and agricultural masterpieces.
            </p>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '6rem', 
            alignItems: 'start' 
          }}>
            {/* Left Content: Features */}
            <motion.div variants={itemVars} style={{ display: 'grid', gap: '3rem', paddingTop: '2rem' }}>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '72px', 
                  height: '72px', 
                  background: 'white', 
                  borderRadius: '24px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 15px 35px rgba(0, 45, 38, 0.08)',
                  flexShrink: 0,
                  color: 'var(--primary)'
                }}><Globe size={32} strokeWidth={2.5} /></div>
                <div>
                  <h4 style={{ fontWeight: '900', color: 'var(--secondary)', fontSize: '1.3rem', marginBottom: '0.6rem' }}>Global Reach</h4>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '500', lineHeight: '1.6' }}>Active distribution channels across 4 continents with integrated logistics.</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '72px', 
                  height: '72px', 
                  background: 'white', 
                  borderRadius: '24px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 15px 35px rgba(0, 45, 38, 0.08)',
                  flexShrink: 0,
                  color: 'var(--primary)'
                }}><Package size={32} strokeWidth={2.5} /></div>
                <div>
                  <h4 style={{ fontWeight: '900', color: 'var(--secondary)', fontSize: '1.3rem', marginBottom: '0.6rem' }}>Bespoke Solutions</h4>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '500', lineHeight: '1.6' }}>Private label configurations and custom volume scaling for international partners.</p>
                </div>
              </div>

              <div className="liquid-card-organic" style={{ padding: '3.5rem', marginTop: '1rem', background: 'var(--secondary)', color: 'white' }}>
                 <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem' }}>Quality Assurance</h4>
                 <p style={{ opacity: 0.8, lineHeight: '1.7', fontSize: '1rem' }}>
                    Every batch undergoes clinical-grade testing to ensure 100% organic compliance and taste consistency for the global market.
                 </p>
              </div>
            </motion.div>

            {/* Right Content: Inquiry Form Card */}
            <motion.div variants={itemVars} className="glass-card-organic" style={{ position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                top: '-25px', 
                right: '-25px', 
                width: '100px', 
                height: '100px', 
                background: 'var(--primary)', 
                borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%',
                zIndex: -1,
                opacity: 0.15,
                filter: 'blur(10px)'
              }} />

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ 
                      width: '120px', 
                      height: '120px', 
                      background: 'var(--primary)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      margin: '0 auto 3rem', 
                      color: 'var(--secondary)',
                      boxShadow: '0 25px 50px rgba(255, 183, 3, 0.4)'
                    }}
                  >
                    <CheckCircle size={60} />
                  </motion.div>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: '950', color: 'var(--secondary)' }}>Transmission Successful</h3>
                  <p style={{ color: 'var(--text-muted)', marginTop: '2rem', fontSize: '1.2rem', fontWeight: '500', lineHeight: '1.6', maxWidth: '400px', margin: '2rem auto' }}>
                    Our international trade specialists are analyzing your scope and will initiate contact within 12 business hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className="liquid-blob-btn"
                    style={{ 
                      marginTop: '3.5rem', 
                      padding: '1.4rem 4rem', 
                      background: 'var(--secondary)', 
                      color: 'white', 
                      fontWeight: '900', 
                      border: 'none', 
                      cursor: 'pointer' 
                    }}
                  >
                    Initialize New Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div>
                    <h3 style={{ fontSize: '2rem', fontWeight: '950', color: 'var(--secondary)', marginBottom: '0.75rem' }}>Partner with Shemous</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '600', marginBottom: '2.5rem' }}>Securely submit your global beverage requirements.</p>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.8rem' }}>
                    <div>
                      <label className="shemous-label">Full Name</label>
                      <input name="name" required className="shemous-input" placeholder="Primary Contact" />
                    </div>
                    <div>
                      <label className="shemous-label">Organization</label>
                      <input name="company" className="shemous-input" placeholder="Company Name" />
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.8rem' }}>
                    <div>
                      <label className="shemous-label">Corporate Email</label>
                      <input name="email" type="email" required className="shemous-input" placeholder="name@company.com" />
                    </div>
                    <div>
                      <label className="shemous-label">Target Market</label>
                      <input name="country" required className="shemous-input" placeholder="Destination Region" />
                    </div>
                  </div>

                  <div>
                    <label className="shemous-label">Scope & Volume</label>
                    <textarea name="message" required className="shemous-input" style={{ height: '140px', resize: 'none' }} placeholder="Specify your beverage interests and anticipated volume for the first quarter..."></textarea>
                  </div>

                  <button 
                    disabled={loading} 
                    type="submit" 
                    className="liquid-blob-btn btn-hover"
                    style={{ 
                      backgroundColor: 'var(--primary)', 
                      color: 'var(--secondary)', 
                      padding: '1.6rem', 
                      fontWeight: '950', 
                      border: 'none', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '1.2rem', 
                      marginTop: '1rem',
                      fontSize: '1.1rem'
                    }}
                  >
                    {loading ? 'Processing...' : 'Submit Partnership Inquiry'} <Send size={24} strokeWidth={2.5} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}

