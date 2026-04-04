'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const benefits = [
  { 
    id: 'P', 
    name: 'POTASSIUM', 
    content: 'Bananas are famous for their high potassium content. This essential mineral helps maintain healthy blood pressure levels and supports heart function, making it a natural choice for cardiovascular wellness.' 
  },
  { 
    id: 'E', 
    name: 'QUICK ENERGY', 
    content: 'Packed with natural sugars balanced by fiber, our banana juice provides a sustained energy boost. It\'s the perfect pre-workout or mid-day refresher to keep you focused and active without the crash.' 
  },
  { 
    id: 'O', 
    name: 'ORGANIC PURITY', 
    content: 'Sourced from the heart of Uganda, our juice captures the raw, unadulterated essence of organic bananas. No added sugars, no preservatives—just 100% authentic nectar as nature intended.' 
  }
]

const BananaBenefitsTabs = () => {
  const [activeTab, setActiveTab] = useState('P')

  return (
    <div style={{ position: 'relative', marginTop: '6rem' }}>
      {/* 
        ORGANIC TAB NAVIGATION 
        Replaced the straight horizontal line with a wavy, liquid-morphed container.
      */}
      <div style={{ position: 'relative', display: 'inline-flex', gap: '3.5rem', marginBottom: '3.5rem', padding: '1rem 2rem' }}>
        {benefits.map((b) => (
          <button
            key={b.id}
            onClick={() => setActiveTab(b.id)}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '0.5rem 1rem', 
              position: 'relative',
              fontSize: '1rem',
              fontWeight: '950',
              color: activeTab === b.id ? 'var(--foreground)' : 'rgba(2, 48, 71, 0.4)',
              letterSpacing: '0.1em',
              transition: 'var(--transition)',
              zIndex: 10
            }}
          >
            {b.name}
            {activeTab === b.id && (
              <motion.div 
                layoutId="activeTabBananaLiquid"
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  backgroundColor: 'rgba(255, 183, 3, 0.12)',
                  borderRadius: '40px 15px 50px 20px', // Refined professional organic shape
                  zIndex: -1
                }}
              />
            )}
          </button>
        ))}
        
        {/* Animated Wavy Line Below Tabs */}
        <div style={{ position: 'absolute', bottom: -10, left: 0, width: '100%', height: '8px', opacity: 0.15 }}>
           <svg width="100%" height="100%" viewBox="0 0 400 20" preserveAspectRatio="none">
             <motion.path 
                animate={{ d: [
                  "M0 10 C 50 0, 100 20, 150 10 C 200 0, 250 20, 300 10 C 350 0, 400 20, 450 10",
                  "M0 10 C 50 20, 100 0, 150 10 C 200 20, 250 0, 300 10 C 350 20, 400 0, 450 10",
                  "M0 10 C 50 0, 100 20, 150 10 C 200 0, 250 20, 300 10 C 350 0, 400 20, 450 10"
                ]}}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                d="M0 10 C 50 0, 100 20, 150 10 C 200 0, 250 20, 300 10 C 350 0, 400 20, 450 10" 
                stroke="var(--primary)" 
                strokeWidth="4" 
                fill="none" 
             />
           </svg>
        </div>
      </div>

      {/* 
        LIQUID CONTENT CARD
        Replaced the standard rounded box with a hand-carved, organic shape (liquid-card-organic).
      */}
      <div className="liquid-card-organic" style={{ 
        minHeight: '260px', 
        maxWidth: '600px', 
        position: 'relative',
        padding: '3.5rem'
      }}>
        <AnimatePresence mode="wait">
          {benefits.map((b) => b.id === activeTab && (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{ 
                color: 'var(--foreground)', 
                fontSize: '1.35rem', 
                lineHeight: '1.7',
                fontWeight: '450',
                marginBottom: '1rem',
                opacity: 0.8
              }}>
                {b.content}
              </p>
              
              {/* Hand-drawn Nectar Annotation */}
              <div style={{ 
                fontFamily: '"Gochi Hand", cursive', 
                color: 'var(--primary-dark)', 
                fontSize: '1.4rem',
                marginTop: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                   <svg width="45" height="25" viewBox="0 0 45 25" fill="none">
                     <path d="M5 12 C 15 2, 30 22, 40 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                     <path d="M35 18 L 41 12 L 35 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                   </svg>
                </motion.div>
                Harvested With Care
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BananaBenefitsTabs
