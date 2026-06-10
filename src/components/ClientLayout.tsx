'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import React from 'react'
import dynamic from 'next/dynamic'
import ShemousHeader from '@/components/ShemousHeader'
import PageProgress from '@/components/PageProgress'

const Footer = dynamic(() => import('@/components/Footer'), { ssr: false })
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false })

// Page transition variants - cinematic slide + blur
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 32,
    filter: 'blur(8px)',
    scale: 0.995,
  },
  enter: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as any,
    }
  },
  exit: { 
    opacity: 0, 
    y: -24,
    filter: 'blur(6px)',
    scale: 0.998,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 1, 1] as any,
    }
  }
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <>
      <PageProgress />
      {!isAdminRoute && <ShemousHeader />}
      
      {!isAdminRoute ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      ) : (
        <main>{children}</main>
      )}

      {!isAdminRoute && (
        <>
          <Footer />
          <WhatsAppButton />
        </>
      )}
    </>
  )
}
