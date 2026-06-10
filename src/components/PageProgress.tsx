'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageProgress() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    setLoading(true)
    setProgress(0)
    
    // Rapid acceleration to 70%, then slow to 95%
    const t1 = setTimeout(() => setProgress(40), 80)
    const t2 = setTimeout(() => setProgress(72), 250)
    const t3 = setTimeout(() => setProgress(92), 600)
    const t4 = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setLoading(false), 300)
    }, 900)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [pathname])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="progress"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            zIndex: 99999,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--primary), var(--primary-dark), var(--primary))',
              backgroundSize: '200% 100%',
              boxShadow: '0 0 12px rgba(255, 183, 3, 0.8), 0 0 4px rgba(255, 183, 3, 1)',
              borderRadius: '0 4px 4px 0',
            }}
            animate={{
              width: `${progress}%`,
              backgroundPosition: ['0% 0%', '100% 0%'],
            }}
            transition={{
              width: { duration: 0.35, ease: 'easeOut' },
              backgroundPosition: { duration: 1.5, repeat: Infinity, ease: 'linear' },
            }}
          />
          {/* Glowing tip */}
          <motion.div
            style={{
              position: 'absolute',
              top: '-2px',
              right: `${100 - progress}%`,
              width: '80px',
              height: '7px',
              background: 'rgba(255, 183, 3, 0.6)',
              filter: 'blur(6px)',
              borderRadius: '50%',
            }}
            animate={{ width: `${progress}%` ? undefined : 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
