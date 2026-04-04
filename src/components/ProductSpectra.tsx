'use client'

import { motion } from 'framer-motion'
import { Shield, Droplet, Thermometer, Calendar, Globe, Award } from 'lucide-react'

interface SpecItemProps {
  icon: React.ReactNode
  label: string
  value: string
  delay: number
}

const SpecItem = ({ icon, label, value, delay }: SpecItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    style={{ 
      padding: '2rem', 
      background: 'rgba(255, 255, 255, 0.03)', 
      borderRadius: '24px', 
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)'
    }}
  >
    <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{icon}</div>
    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{label}</div>
    <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>{value}</div>
  </motion.div>
)

export default function ProductSpectra() {
  const specs = [
    { icon: <Award size={24} />, label: 'Certification', value: 'HACCP & ISO 22000' },
    { icon: <Calendar size={24} />, label: 'Shelf Life', value: '12 Months (Sealed)' },
    { icon: <Thermometer size={24} />, label: 'Storage', value: 'Cool, Dry Profile' },
    { icon: <Droplet size={24} />, label: 'Purity', value: '100% Cold-Pressed' },
    { icon: <Globe size={24} />, label: 'Origin', value: 'Uganda, East Africa' },
    { icon: <Shield size={24} />, label: 'Grade', value: 'Export Premium (A+)' },
  ]

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '1.5rem',
      padding: '4rem',
      background: 'var(--secondary)',
      borderRadius: '50px',
      marginTop: '4rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: 'var(--primary)', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%' }} />
      {specs.map((spec, i) => (
        <SpecItem key={i} {...spec} delay={i * 0.1} />
      ))}
    </div>
  )
}
