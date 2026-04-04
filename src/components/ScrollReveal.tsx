'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  distance?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
  blur?: boolean
  stagger?: boolean
  once?: boolean
}

const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 60,
  duration = 0.8,
  className = '',
  style = {},
  blur = false,
  stagger = false,
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-60px' })

  const getInitial = () => {
    const base = {
      opacity: 0,
      filter: blur ? 'blur(12px)' : 'blur(0px)',
    }
    switch (direction) {
      case 'up':    return { ...base, y: distance }
      case 'down':  return { ...base, y: -distance }
      case 'left':  return { ...base, x: distance }
      case 'right': return { ...base, x: -distance }
      case 'scale': return { ...base, scale: 0.85 }
      case 'fade':  return { opacity: 0 }
      default:      return { ...base, y: distance }
    }
  }

  const getAnimate = () => {
    const base = {
      opacity: 1,
      filter: 'blur(0px)',
    }
    switch (direction) {
      case 'up':
      case 'down':  return { ...base, y: 0 }
      case 'left':
      case 'right': return { ...base, x: 0 }
      case 'scale': return { ...base, scale: 1 }
      case 'fade':  return { opacity: 1 }
      default:      return { ...base, y: 0 }
    }
  }

  // Stagger container variant
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    },
  }

  const childVariants = {
    hidden: getInitial(),
    visible: {
      ...getAnimate(),
      transition: { duration, ease: [0.22, 1, 0.36, 1] as any },
    },
  }

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        suppressHydrationWarning
        className={className}
        style={style}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {React.Children.map(children, (child, i) => (
          <motion.div key={i} variants={childVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <div ref={ref} className={className} style={style} suppressHydrationWarning>
      <motion.div
        initial={getInitial()}
        animate={isInView ? getAnimate() : getInitial()}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default ScrollReveal
