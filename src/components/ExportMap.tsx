'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Hub positions as [lat, lng] — projected to CSS left/top % on the sphere face
// Using simple equirectangular → percentage conversion
// left% = (lng + 180) / 360 * 100
// top%  = (90 - lat) / 180 * 100
const HUBS = [
  { city: 'Kampala',   lat: 0.35,  lng: 32.58,  isMain: true  },
  { city: 'Amsterdam', lat: 52.37, lng: 4.90,   isMain: false },
  { city: 'Dubai',     lat: 25.20, lng: 55.27,  isMain: false },
  { city: 'New York',  lat: 40.71, lng: -74.01, isMain: false },
  { city: 'Singapore', lat: 1.35,  lng: 103.82, isMain: false },
]

function lngToPercent(lng: number) {
  return ((lng + 180) / 360) * 100
}
function latToPercent(lat: number) {
  return ((90 - lat) / 180) * 100
}

export default function ExportMap() {
  const [loaded, setLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Two candidate texture URLs — fallback to day version if night fails
  const textureUrl = imgError
    ? 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
    : 'https://unpkg.com/three-globe/example/img/earth-night.jpg'

  return (
    <div
      className="liquid-card-organic"
      style={{
        background: 'rgba(0, 14, 10, 0.82)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,183,3,0.15)',
        boxShadow: '0 40px 120px -20px rgba(0,0,0,0.8)',
        padding: 'clamp(1.25rem, 3vw, 2.5rem)',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header label */}
      <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '0.65rem', fontWeight: '900',
            color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.3em',
          }}
        >
          Global Export Network
        </motion.span>
      </div>

      {/* ── Globe Container ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          aspectRatio: '1 / 1',
        }}
      >
        {/* Outer atmospheric glow ring */}
        <div style={{
          position: 'absolute',
          inset: '-6%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,183,3,0.22) 0%, rgba(0,60,40,0.15) 55%, transparent 75%)',
          filter: 'blur(18px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* The globe sphere */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          zIndex: 1,
          boxShadow: `
            inset -30px -10px 60px rgba(0,0,0,0.85),
            inset 20px 20px 60px rgba(0,0,0,0.4),
            0 0 60px rgba(255,183,3,0.18),
            0 0 120px rgba(0,229,255,0.06)
          `,
        }}>
          {/* Scrolling Earth texture — doubled width for seamless loop */}
          <div style={{
            width: '200%',
            height: '100%',
            backgroundImage: `url('${textureUrl}')`,
            backgroundSize: '50% 100%',
            backgroundRepeat: 'repeat-x',
            backgroundPosition: '0% center',
            animation: 'globeRotate 28s linear infinite',
            filter: loaded ? 'saturate(1.15) brightness(0.85)' : 'brightness(0)',
            transition: 'filter 1.2s ease',
          }}>
            {/* Hidden img to detect load / error */}
            <img
              src={textureUrl}
              alt=""
              style={{ display: 'none' }}
              onLoad={() => setLoaded(true)}
              onError={() => { setImgError(true); setLoaded(true) }}
            />
          </div>

          {/* Sphere shading overlay — simulates 3-D lighting */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            background: `
              radial-gradient(
                ellipse 65% 65% at 35% 35%,
                rgba(255,255,255,0.06) 0%,
                transparent 60%
              ),
              radial-gradient(
                ellipse 80% 80% at 70% 60%,
                rgba(0,0,0,0.7) 0%,
                transparent 55%
              )
            `,
            pointerEvents: 'none',
          }} />

          {/* Atmosphere inner rim */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            boxShadow: 'inset 0 0 25px rgba(255,183,3,0.12)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Loading spinner (shown until texture loads) */}
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            zIndex: 5,
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              style={{
                width: 36, height: 36,
                border: '3px solid rgba(255,183,3,0.1)',
                borderTopColor: '#FFB703',
                borderRadius: '50%',
                marginBottom: '0.75rem',
              }}
            />
            <span style={{
              color: 'rgba(255,183,3,0.7)', fontSize: '0.65rem',
              fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em',
            }}>
              Loading…
            </span>
          </div>
        )}

        {/* Hub dots — positioned on the sphere face */}
        {loaded && HUBS.map((h, i) => {
          const leftBase = lngToPercent(h.lng)
          // We render dots at their longitude position and animate with the rotation
          return (
            <motion.div
              key={h.city}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + i * 0.15, duration: 0.4 }}
              style={{
                position: 'absolute',
                left: `${leftBase % 100}%`,
                top: `${latToPercent(h.lat)}%`,
                transform: 'translate(-50%,-50%)',
                zIndex: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              {/* Pulse ring for main hub */}
              {h.isMain && (
                <motion.div
                  animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    width: 14, height: 14,
                    borderRadius: '50%',
                    border: '2px solid #FFB703',
                  }}
                />
              )}
              <div style={{
                width: h.isMain ? 10 : 7,
                height: h.isMain ? 10 : 7,
                borderRadius: '50%',
                background: h.isMain ? '#FFB703' : '#00E5FF',
                boxShadow: h.isMain
                  ? '0 0 8px #FFB703, 0 0 20px rgba(255,183,3,0.5)'
                  : '0 0 6px #00E5FF, 0 0 14px rgba(0,229,255,0.4)',
              }} />
              <div style={{
                marginTop: 4,
                fontSize: '9px',
                fontWeight: '900',
                color: h.isMain ? '#FFB703' : 'rgba(255,255,255,0.85)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                whiteSpace: 'nowrap',
              }}>
                {h.city}
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Bottom badges */}
      <div style={{
        marginTop: '1.5rem',
        display: 'flex', justifyContent: 'center',
        alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap',
      }}>
        {[
          { dot: '#FFB703', text: '25+ Markets' },
          { dot: '#00E5FF', text: '5 Continents' },
          { dot: 'rgba(255,255,255,0.5)', text: '48 h Dispatch' },
        ].map(b => (
          <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: b.dot, flexShrink: 0 }} />
            <span style={{
              fontSize: '0.7rem', fontWeight: '800',
              color: b.dot, textTransform: 'uppercase',
              letterSpacing: '0.14em', whiteSpace: 'nowrap',
            }}>
              {b.text}
            </span>
          </div>
        ))}
      </div>

      {/* Rotation keyframe injected once */}
      <style>{`
        @keyframes globeRotate {
          from { background-position: 0% center; }
          to   { background-position: 50% center; }
        }
      `}</style>
    </div>
  )
}
