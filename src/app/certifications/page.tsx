'use client'

import { motion } from 'framer-motion'
import { Award, FileCheck, Globe2, ShieldCheck } from 'lucide-react'
import CurvedDivider from '@/components/CurvedDivider'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'

export default function CertificationsPage() {
  const certifications = [
    {
      title: 'Global Organic Certification',
      issuer: 'International Organic Body',
      desc: 'Our farms and facilities operate under strict 100% organic regulations, ensuring no synthetic chemicals are used at any point in the supply chain.',
      icon: <Globe2 size={40} />
    },
    {
      title: 'Uganda Export Promotion Board',
      issuer: 'Government of Uganda',
      desc: 'Officially registered and compliant with all national agricultural export standards for international shipping.',
      icon: <Award size={40} />
    },
    {
      title: 'Phytosanitary Certification',
      issuer: 'Ministry of Agriculture',
      desc: 'Every export batch is rigorously inspected and certified free of pests and diseases before leaving the country.',
      icon: <ShieldCheck size={40} />
    },
    {
      title: 'Fair Trade Registered',
      issuer: 'Fair Trade Alliance',
      desc: 'Committed to ethical labor practices and equitable wealth distribution among our smallholder farming partners.',
      icon: <FileCheck size={40} />
    }
  ]

  return (
    <div suppressHydrationWarning style={{ 
      backgroundColor: 'var(--bg-creme)', 
      minHeight: '100vh', 
      padding: 'var(--section-padding-top) 0 var(--section-padding-bottom) 0', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }} suppressHydrationWarning>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: `0 auto var(--content-gap) auto` }} suppressHydrationWarning>
          <ScrollReveal blur direction="up">
            <div suppressHydrationWarning>
              <h1 style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'var(--h1-size)', 
                fontWeight: '700', 
                color: 'var(--secondary)', 
                lineHeight: '1.05', 
                letterSpacing: '-0.04em', 
                marginBottom: '2rem' 
              }}>
                Uncompromising <br />
                <span className="text-gradient-gold">Global Standards</span>
              </h1>
              
              <p style={{ 
                fontSize: '1.25rem', 
                color: 'var(--text-muted)', 
                lineHeight: '1.8', 
                fontWeight: '450',
                margin: '0 auto'
              }}>
                To compete on the world stage, we hold ourselves to the highest international benchmarks of quality, safety, and ethics. Review our key operational credentials below.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Certifications Grid */}
      <section style={{ backgroundColor: 'white', padding: 'var(--section-padding-top) 0', position: 'relative' }} suppressHydrationWarning>
        <CurvedDivider color="var(--bg-creme)" position="top" height="150px" />
        
        <div className="container" suppressHydrationWarning>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem' 
          }} suppressHydrationWarning>
            {certifications.map((cert, i) => (
              <ScrollReveal key={i} delay={i * 0.1} blur direction="up">
                <div suppressHydrationWarning className="shemous-scurve-card" style={{ 
                  background: 'var(--bg-creme)', 
                  padding: '3rem', 
                  borderRadius: '24px', 
                  height: '100%',
                  border: '1px solid rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} suppressHydrationWarning>
                    <div style={{ color: 'var(--primary)' }} suppressHydrationWarning>{cert.icon}</div>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--secondary)', margin: 0, lineHeight: 1.2 }}>{cert.title}</h3>
                        <span style={{ fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cert.issuer}</span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{cert.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        
        <CurvedDivider color="var(--bg-creme)" position="bottom" height="150px" />
      </section>
      
      {/* Disclaimer */}
      <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }} suppressHydrationWarning>
         <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
            * Copies of specific registration certificates and phytosanitary laboratory results are available to verified wholesale buyers upon request.
         </p>
         <div style={{ marginTop: '2rem' }}>
            <Link href="/wholesale" className="btn-hover" style={{ color: 'var(--primary-dark)', fontWeight: 'bold', textDecoration: 'none' }}>
                Request Official Documents →
            </Link>
         </div>
      </div>
    </div>
  )
}
