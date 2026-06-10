'use client'

import React from 'react'

const AnimatedBackground = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      zIndex: -1, 
      overflow: 'hidden', 
      background: 'white',
      pointerEvents: 'none'
    }}>
      {/* Blob 1 - Ugandan Sun (Primary): Pure CSS animation on compositor thread */}
      <div style={{ 
        position: 'absolute', 
        top: '-20%', 
        left: '-20%', 
        width: '70%', 
        height: '70%', 
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--primary-15) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'blobDrift1 25s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* Blob 2 - Forest Green (Secondary) */}
      <div style={{ 
        position: 'absolute', 
        bottom: '-20%', 
        right: '-20%', 
        width: '80%', 
        height: '80%', 
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--secondary-10) 0%, transparent 70%)',
        filter: 'blur(100px)',
        animation: 'blobDrift2 30s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* Blob 3 - Accent (Juice) */}
      <div style={{ 
        position: 'absolute', 
        top: '20%', 
        left: '30%', 
        width: '40%', 
        height: '40%', 
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251, 133, 0, 0.1) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'blobDrift3 40s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* Blob 4 - Living Bloom (Soft Green) */}
      <div style={{ 
        position: 'absolute', 
        bottom: '10%', 
        left: '10%', 
        width: '50%', 
        height: '50%', 
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167, 201, 87, 0.12) 0%, transparent 70%)',
        filter: 'blur(90px)',
        animation: 'blobDrift4 35s ease-in-out infinite',
        willChange: 'transform',
      }} />
    </div>
  )
}

export default AnimatedBackground
