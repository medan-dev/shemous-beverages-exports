'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import CurvedDivider from '@/components/CurvedDivider'

export default function OrangeJuicePage() {
  return (
    <div style={{ backgroundColor: 'var(--orange-bg)', minHeight: '100vh', overflow: 'hidden', position: 'relative', paddingTop: '180px' }}>
      <CurvedDivider color="var(--orange-bg)" position="bottom" height="150px" />
      
      {/* Background Large Text */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        zIndex: 0,
        width: '100%',
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ 
            fontSize: 'max(20vw, 30rem)', 
            fontWeight: '900', 
            margin: 0, 
            color: 'var(--orange-dark)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}
        >
          ORANGE
        </motion.h1>
      </div>

      <main className="container shemous-orange-grid" style={{ position: 'relative', zIndex: 10, display: 'grid', gap: '2rem', minHeight: 'calc(100vh - 120px)' }}>
        
        {/* Left Sidebar - Vertical Text */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{ 
              writingMode: 'vertical-rl', 
              transform: 'rotate(180deg)', 
              color: 'rgba(2, 48, 71, 0.2)',
              fontSize: '0.9rem',
              fontWeight: '800',
              letterSpacing: '0.5em',
              textTransform: 'uppercase'
            }}
          >
            BENEFITS OF JUICE
          </motion.div>
        </div>

        {/* Hero Image Section */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '600px' }}
          >
            <Image 
              src="/images/orange_glass.png" 
              alt="Fresh Orange Juice" 
              width={800} 
              height={1000} 
              style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 40px 80px rgba(251, 133, 0, 0.2))' }}
            />
          </motion.div>

          {/* Floating Leaf 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: -50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
            style={{ position: 'absolute', top: '15%', left: '0', width: '150px', zIndex: 3 }}
          >
            <Image 
              src="/images/citrus_leaves.png" 
              alt="Orange Leaf" 
              width={200} 
              height={200} 
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </motion.div>
        </div>

        {/* Content Section */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: '3.5rem', 
              fontWeight: '700', 
              color: 'var(--orange-dark)', 
              lineHeight: '1.1', 
              marginBottom: '2rem' 
            }}>
              Pure Organic <br /> 
              <span style={{ color: 'var(--orange-primary)' }}>Nectar Evolution</span>
            </h2>
            
            <p style={{ 
              color: 'rgba(2, 48, 71, 0.6)', 
              fontSize: '1.2rem', 
              lineHeight: '1.6', 
              maxWidth: '450px',
              fontWeight: '500',
              marginBottom: '3rem'
            }}>
              Experience the vibrance of summer in every drop. Freshly squeezed, naturally sweetened, and packed with vital nutrients.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--orange-primary)', 
                  border: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px rgba(255, 183, 3, 0.3)'
                }}
              >
                <Play fill="currentColor" size={24} />
              </motion.button>
              <span style={{ 
                color: 'var(--orange-dark)', 
                fontWeight: '900', 
                fontSize: '0.8rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em' 
              }}>Watch Video</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Decorative Circles */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 183, 3, 0.05) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251, 133, 0, 0.03) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 1 }} />
      
      <style jsx global>{`
        body {
          background-color: var(--orange-bg) !important;
        }
        .shemous-orange-grid {
          grid-template-columns: 80px 1fr 1fr;
        }
        @media (max-width: 992px) {
          .shemous-orange-grid {
            grid-template-columns: 1fr;
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
          .shemous-orange-grid > div:first-child {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
