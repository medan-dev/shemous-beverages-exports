'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Send, Ship } from 'lucide-react'
import CurvedDivider from '@/components/CurvedDivider'
import ScrollReveal from '@/components/ScrollReveal'

export default function WholesalePage() {
  return (
    <div suppressHydrationWarning style={{ 
      backgroundColor: 'var(--bg-creme)', 
      minHeight: '100vh', 
      padding: 'var(--section-padding-top) 0 var(--section-padding-bottom) 0', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }} suppressHydrationWarning>
        
        <div className="hero-split-grid" style={{ gap: '4rem', alignItems: 'flex-start' }} suppressHydrationWarning>
            {/* Left side: Information */}
            <ScrollReveal direction="left" blur>
                <div suppressHydrationWarning>
                    <div suppressHydrationWarning style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Ship size={24} color="var(--primary)" />
                        <span style={{ color: 'var(--primary-dark)', fontWeight: '950', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                            B2B Global Export
                        </span>
                    </div>
                    
                    <h1 style={{ 
                        fontFamily: 'var(--font-serif)', 
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                        fontWeight: '700', 
                        color: 'var(--secondary)', 
                        lineHeight: '1.05', 
                        letterSpacing: '-0.04em', 
                        marginBottom: '2rem' 
                    }}>
                        Partner for <br />
                        <span className="text-gradient-gold">Bulk Supply</span>
                    </h1>
                    
                    <p style={{ 
                        fontSize: '1.2rem', 
                        color: 'var(--text-muted)', 
                        lineHeight: '1.8', 
                        fontWeight: '450',
                        marginBottom: '3rem'
                    }}>
                        We supply major retailers, distributors, and hospitality brands across Europe, Asia, and North America with premium Ugandan organic juices. Register below to access wholesale pricing, logistics support, and sample shipments.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} suppressHydrationWarning>
                        {[
                            'Priority allocation on seasonal harvests',
                            'Dedicated multilingual export account manager',
                            'Custom packaging and private label options',
                            'End-to-end cold-chain logistics facilitation'
                        ].map((benefit, i) => (
                            <div key={i} suppressHydrationWarning style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <CheckCircle size={20} color="var(--primary)" />
                                <span style={{ fontSize: '1.1rem', color: 'var(--secondary)', fontWeight: '600' }}>{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Right side: Form */}
            <ScrollReveal direction="right" blur delay={0.2}>
                <div suppressHydrationWarning className="shemous-scurve-card" style={{ 
                    background: 'white', 
                    padding: '3rem', 
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px -12px rgba(0, 45, 38, 0.1)'
                }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '2rem' }}>Registration Inquiry</h3>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--secondary)' }}>First Name</label>
                                <input type="text" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '1rem' }} placeholder="John" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--secondary)' }}>Last Name</label>
                                <input type="text" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '1rem' }} placeholder="Doe" />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--secondary)' }}>Company Name</label>
                            <input type="text" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '1rem' }} placeholder="Global Foods Ltd" />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--secondary)' }}>Corporate Email</label>
                            <input type="email" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '1rem' }} placeholder="purchasing@company.com" />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--secondary)' }}>Target Region / Country</label>
                            <input type="text" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '1rem' }} placeholder="e.g. United Kingdom" />
                        </div>

                        <button 
                            type="button"
                            className="btn-hover"
                            style={{ 
                                marginTop: '1rem',
                                padding: '1.2rem', 
                                background: 'var(--primary)', 
                                color: 'var(--secondary)', 
                                border: 'none', 
                                fontSize: '1.1rem', 
                                fontWeight: '900', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '0.5rem',
                                borderRadius: '12px',
                                cursor: 'pointer'
                            }}
                        >
                            Submit Inquiry <Send size={18} />
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            Our export team will respond within 24-48 hours.
                        </p>
                    </form>
                </div>
            </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
