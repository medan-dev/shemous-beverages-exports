'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Note: react-globe.gl requires browser environment.
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

export default function ExportMap() {
  const [mounted, setMounted] = useState(false)
  const globeRef = useRef<any>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Slowly rotate globe
  useEffect(() => {
    if (!globeRef.current) return;
    const interval = setTimeout(() => {
      if (globeRef.current && globeRef.current.controls) {
         const controls = globeRef.current.controls();
         if (controls) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 1.2;
            controls.enableZoom = false;
         }
      }
    }, 500);
    return () => clearTimeout(interval);
  }, [mounted, globeRef.current])

  const routes = useMemo(() => [
    { name: 'Ugandan Heart', city: 'Kampala', lat: 0.3476, lng: 32.5825, isMain: true },
    { name: 'Europe Hub', city: 'Amsterdam', lat: 52.3676, lng: 4.9041, isMain: false },
    { name: 'Middle East', city: 'Dubai', lat: 25.2048, lng: 55.2708, isMain: false },
    { name: 'North America', city: 'New York', lat: 40.7128, lng: -74.0060, isMain: false },
    { name: 'East Asia', city: 'Singapore', lat: 1.3521, lng: 103.8198, isMain: false },
  ], [])

  // Arcs from Kampala to the rest
  const arcsData = useMemo(() => {
    const uganda = routes[0]
    return routes.slice(1).map(route => ({
      startLat: uganda.lat,
      startLng: uganda.lng,
      endLat: route.lat,
      endLng: route.lng,
      color: ['#FFB703', 'rgba(0, 229, 255, 0.4)']
    }))
  }, [routes])

  return (
    <div className="liquid-card-organic" style={{ 
      padding: 'clamp(2rem, 5vw, 4rem)', 
      position: 'relative', 
      overflow: 'hidden', 
      minHeight: '650px', 
      /* Make it a cinematic dark transparent glass to match the realistic globe */
      background: 'rgba(0, 20, 15, 0.65)',
      backdropFilter: 'blur(30px)',
      boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.8)',
      border: '1px solid rgba(255,183,3,0.1)'
    }}>
       {/* Map and Stats Integration Layer */}
       <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column' }}>
          
          {/* Map Illustration Area */}
          <div style={{ position: 'relative', width: '100%', height: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Animated Globe Background Glow */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', background: 'var(--primary)', opacity: 0.15, filter: 'blur(100px)', borderRadius: '50%', zIndex: 1, pointerEvents: 'none' }} />
            
            {/* Extremely Realistic 3D Globe */}
            <div style={{ zIndex: 5, width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {mounted && (
                <Globe
                  ref={globeRef}
                  width={520}
                  height={520}
                  backgroundColor="rgba(0,0,0,0)"
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                  atmosphereColor="#FFB703"
                  atmosphereAltitude={0.15}
                  pointsData={routes}
                  pointLat="lat"
                  pointLng="lng"
                  pointColor={(d: any) => d.isMain ? '#FFB703' : '#00E5FF'}
                  pointAltitude={0.02}
                  pointRadius={(d: any) => d.isMain ? 0.8 : 0.4}
                  pointsMerge={false}
                  labelsData={routes}
                  labelLat="lat"
                  labelLng="lng"
                  labelText={(d: any) => d.city}
                  labelSize={(d: any) => d.isMain ? 1.5 : 1.2}
                  labelDotRadius={0}
                  labelColor={(d: any) => d.isMain ? 'rgba(255,183,3,1)' : 'rgba(255,255,255,0.8)'}
                  labelResolution={2}
                  labelAltitude={0.06}
                  arcsData={arcsData}
                  arcColor="color"
                  arcDashLength={0.4}
                  arcDashGap={0.2}
                  arcDashAnimateTime={2500}
                  arcAltitude={0.25}
                  arcStroke={0.6}
                />
              )}
            </div>
          </div>

          {/* FLEX STYLE STATS ROW - Below the globe, Left and Right */}
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '2rem', position: 'relative', zIndex: 10 }}>
            
            <div style={{ 
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '1.2rem',
              padding: '1.5rem 2.5rem', 
              background: 'rgba(255, 183, 3, 0.08)', 
              borderRadius: '100px', 
              border: '1px solid rgba(255, 183, 3, 0.15)',
              backdropFilter: 'blur(12px)',
            }}>
               <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>25+</div>
               <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', textAlign: 'left' }}>Global<br />Markets</div>
            </div>

            <div style={{ 
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '1.2rem',
              padding: '1.5rem 2.5rem', 
              background: 'rgba(0, 229, 255, 0.05)', 
              borderRadius: '100px', 
              border: '1px solid rgba(0, 229, 255, 0.1)',
              backdropFilter: 'blur(12px)',
            }}>
               <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#00E5FF', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>48h</div>
               <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', textAlign: 'left' }}>Direct<br />Dispatch</div>
            </div>

          </div>
       </div>
    </div>
  )
}
