'use client'

import { Globe, MapPin, Navigation } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ExportMap() {
  const routes = [
    { name: 'Europe Hub', city: 'Amsterdam', x: '48%', y: '25%' },
    { name: 'Middle East', city: 'Dubai', x: '58%', y: '45%' },
    { name: 'North America', city: 'New York', x: '25%', y: '35%' },
    { name: 'East Asia', city: 'Singapore', x: '75%', y: '65%' },
  ]

  return (
    <div className="liquid-card-organic" style={{ 
      padding: '4rem', 
      position: 'relative', 
      overflow: 'hidden', 
      minHeight: '650px', 
      background: 'white',
      boxShadow: '0 40px 100px -20px rgba(0, 45, 38, 0.04)',
      border: '1px solid rgba(0,0,0,0.01)'
    }}>
       {/* Map Illustration Placeholder */}
       <div style={{ position: 'relative', width: '100%', height: '480px' }}>
          <Globe size={400} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--primary)', opacity: 0.1, filter: 'blur(30px)' }} />
          
          {/* Uganda Center - The Heart of the Project */}
          <div style={{ position: 'absolute', top: '55%', left: '52%', zIndex: 10 }}>
             <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                style={{ width: '20px', height: '20px', background: 'var(--secondary)', borderRadius: 'full', border: '4px solid white', boxShadow: '0 0 30px rgba(0, 77, 64, 0.4)' }}
             />
             <div style={{ 
               position: 'absolute', 
               top: '30px', 
               left: '-40px', 
               fontFamily: '"Gochi Hand", cursive',
               fontSize: '1.4rem', 
               color: 'var(--secondary)',
               whiteSpace: 'nowrap',
               opacity: 0.8
             }}>Ugandan Heart</div>
          </div>

          {/* Creative Routes - SVG Path Curves */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5, pointerEvents: 'none' }}>
             {routes.map((route, i) => (
                <motion.path
                  key={i}
                  d={`M 52 55 Q ${parseInt(route.x) + 10} ${parseInt(route.y) + 10} ${parseInt(route.x)} ${parseInt(route.y)}`}
                  stroke="var(--primary)"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 3, delay: i * 0.5 }}
                />
             ))}
          </svg>

          {/* Hub Markers */}
          {routes.map((route, i) => (
             <div key={i} style={{ position: 'absolute', top: route.y, left: route.x, zIndex: 10 }}>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.5, rotate: 180 }}
                  transition={{ delay: i * 0.5 + 2 }}
                  style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '3px', border: '2px solid white', cursor: 'pointer' }}
                />
                <div style={{ position: 'absolute', top: '20px', left: '-30px', width: '130px' }}>
                   <div style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{route.name}</div>
                   <div style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>{route.city}</div>
                </div>
             </div>
          ))}
       </div>

       {/* ORGANIC STATS GRID */}
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem', marginTop: '1rem', position: 'relative', zIndex: 10 }}>
          <div style={{ 
            padding: '2rem', 
            background: 'rgba(255, 183, 3, 0.05)', 
            borderRadius: '40% 60% 70% 30% / 40% 40% 60% 60%', // Liquid stats shape
            border: '1px solid rgba(255, 183, 3, 0.1)',
            textAlign: 'center'
          }}>
             <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary-dark)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>25+</div>
             <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.5rem' }}>Global Markets</div>
          </div>
          <div style={{ 
            padding: '2rem', 
            background: 'rgba(0, 77, 64, 0.05)', 
            borderRadius: '60% 40% 30% 70% / 60% 60% 40% 40%', // Inverse liquid shape
            border: '1px solid rgba(0, 77, 64, 0.1)',
            textAlign: 'center'
          }}>
             <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--secondary)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>48h</div>
             <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.5rem' }}>Direct Dispatch</div>
          </div>
       </div>
    </div>
  )
}
