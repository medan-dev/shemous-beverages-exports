'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const vitamins = [
  { 
    id: 'C', 
    name: 'VITAMIN C', 
    content: 'Vitamin C is a powerful antioxidant that helps protect cells from damage and supports immune function. Essential for collagen production and healthy skin.' 
  },
  { 
    id: 'D', 
    name: 'VITAMIN D', 
    content: 'Vitamin D helps regulate the amount of calcium and phosphate in the body. These nutrients are needed to keep bones, teeth and muscles healthy.' 
  },
  { 
    id: 'E', 
    name: 'VITAMIN E', 
    content: 'Vitamin E is a group of fat-soluble vitamins with antioxidant effects. It helps maintain healthy skin and eyes, and strengthen the body\'s natural defense against illness and infection.' 
  }
]

const VitaminTabs = () => {
  const [activeTab, setActiveTab] = useState('C')

  return (
    <div style={{ position: 'relative', marginTop: '4rem' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '3rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
        {vitamins.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveTab(v.id)}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '0 0.5rem', 
              position: 'relative',
              fontSize: '1rem',
              fontWeight: '800',
              color: activeTab === v.id ? 'var(--orange-dark)' : 'rgba(2, 48, 71, 0.4)',
              letterSpacing: '0.05em',
              transition: 'var(--transition-fast)'
            }}
          >
            {v.name}
            {activeTab === v.id && (
              <motion.div 
                layoutId="activeTab"
                style={{ 
                  position: 'absolute', 
                  bottom: '-1.6rem', 
                  left: 0, 
                  right: 0, 
                  height: '3px', 
                  backgroundColor: 'var(--orange-primary)',
                  borderRadius: '100px'
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ minHeight: '120px', maxWidth: '400px' }}>
        <AnimatePresence mode="wait">
          {vitamins.map((v) => v.id === activeTab && (
            <motion.p
              key={v.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ 
                color: 'rgba(2, 48, 71, 0.6)', 
                fontSize: '1.1rem', 
                lineHeight: '1.8',
                fontWeight: '500'
              }}
            >
              {v.content}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default VitaminTabs
