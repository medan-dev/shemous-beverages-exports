'use client'

import React, { useEffect, useRef } from 'react'

const DynamicHeroSplash = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 900
    canvas.height = 900

    type Droplet = { x: number; y: number; vx: number; vy: number; r: number; life: number; maxLife: number; hue: number }
    const droplets: Droplet[] = []
    let frame = 0

    // Spawn splash droplets in a crown pattern
    function spawnCrown() {
      const cx = 450, cy = 530, count = 48
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2
        const speed = 4 + Math.random() * 7
        const r = 2 + Math.random() * 6
        droplets.push({
          x: cx + Math.cos(angle) * 80,
          y: cy + Math.sin(angle) * 30,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 0.4 - (2 + Math.random() * 5),
          r,
          life: 0,
          maxLife: 80 + Math.random() * 60,
          hue: 42 + Math.random() * 15,
        })
      }
    }

    function drawGlass(ctx: CanvasRenderingContext2D, fillPct: number) {
      const cx = 450, top = 200, w = 160, h = 330
      const bot = top + h

      // Glass body (trapezoidal)
      const lTop = cx - w / 2, rTop = cx + w / 2
      const lBot = cx - w / 2 + 20, rBot = cx + w / 2 - 20

      // Juice fill
      const fillY = bot - h * fillPct
      ctx.save()
      const juiceGrad = ctx.createLinearGradient(lBot, fillY, rTop, bot)
      juiceGrad.addColorStop(0, 'rgba(255,215,0,0.92)')
      juiceGrad.addColorStop(0.5, 'rgba(255,190,0,0.88)')
      juiceGrad.addColorStop(1, 'rgba(220,155,0,0.9)')
      ctx.beginPath()
      ctx.moveTo(lBot, bot - 2)
      ctx.lineTo(rBot, bot - 2)
      ctx.lineTo(rTop, fillY)
      ctx.lineTo(lTop, fillY)
      ctx.closePath()
      ctx.fillStyle = juiceGrad
      ctx.fill()

      // Foam / bubbles on juice surface
      for (let i = 0; i < 18; i++) {
        const bx = lTop + (rTop - lTop) * (i / 17)
        const by = fillY + Math.sin(frame * 0.04 + i) * 3
        const br = 3 + Math.random() * 4
        ctx.beginPath()
        ctx.arc(bx, by, br, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,240,150,0.55)'
        ctx.fill()
      }

      // Glass walls
      const glassGrad = ctx.createLinearGradient(lTop, top, rTop, top)
      glassGrad.addColorStop(0, 'rgba(255,255,255,0.55)')
      glassGrad.addColorStop(0.3, 'rgba(255,255,255,0.08)')
      glassGrad.addColorStop(0.7, 'rgba(255,255,255,0.04)')
      glassGrad.addColorStop(1, 'rgba(255,255,255,0.45)')

      ctx.beginPath()
      ctx.moveTo(lTop, top)
      ctx.lineTo(rTop, top)
      ctx.lineTo(rBot, bot)
      ctx.lineTo(lBot, bot)
      ctx.closePath()
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'
      ctx.lineWidth = 2.5
      ctx.stroke()
      ctx.fillStyle = glassGrad
      ctx.fill()

      // Highlight stripe on left
      ctx.beginPath()
      ctx.moveTo(lTop + 18, top + 10)
      ctx.lineTo(lTop + 28, top + 10)
      ctx.lineTo(lBot + 22, bot - 20)
      ctx.lineTo(lBot + 12, bot - 20)
      ctx.closePath()
      ctx.fillStyle = 'rgba(255,255,255,0.28)'
      ctx.fill()

      // Glass base/foot
      ctx.beginPath()
      ctx.ellipse(cx, bot + 6, 50, 10, 0, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.25)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.4)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.restore()
    }

    function drawSplash(ctx: CanvasRenderingContext2D) {
      const cx = 450, cy = 527
      const arms = 14
      const t = frame * 0.018

      // Crown arms
      for (let i = 0; i < arms; i++) {
        const angle = (i / arms) * Math.PI * 2 + t * 0.3
        const len = 80 + Math.sin(t * 2 + i * 0.7) * 25
        const tipX = cx + Math.cos(angle) * (len + 20)
        const tipY = cy - 40 + Math.sin(angle) * 28
        const baseX = cx + Math.cos(angle) * 55
        const baseY = cy + Math.sin(angle) * 20

        ctx.save()
        const splashGrad = ctx.createLinearGradient(baseX, baseY, tipX, tipY)
        splashGrad.addColorStop(0, 'rgba(255,210,0,0.9)')
        splashGrad.addColorStop(0.6, 'rgba(255,190,0,0.7)')
        splashGrad.addColorStop(1, 'rgba(255,220,80,0.0)')

        ctx.beginPath()
        ctx.moveTo(baseX - Math.sin(angle) * 12, baseY + Math.cos(angle) * 5)
        ctx.quadraticCurveTo(
          cx + Math.cos(angle) * (len * 0.6),
          cy - 20 + Math.sin(angle) * 15,
          tipX, tipY
        )
        ctx.lineTo(baseX + Math.sin(angle) * 12, baseY - Math.cos(angle) * 5)
        ctx.closePath()
        ctx.fillStyle = splashGrad
        ctx.shadowColor = 'rgba(255,200,0,0.4)'
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.restore()

        // Tip droplet
        ctx.beginPath()
        ctx.arc(tipX, tipY, 5 + Math.sin(t + i) * 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,220,0,0.85)'
        ctx.fill()
      }

      // Inner glow pool
      const poolGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90)
      poolGrad.addColorStop(0, 'rgba(255,220,50,0.45)')
      poolGrad.addColorStop(0.5, 'rgba(255,190,0,0.18)')
      poolGrad.addColorStop(1, 'rgba(255,190,0,0)')
      ctx.beginPath()
      ctx.ellipse(cx, cy, 90, 38, 0, 0, Math.PI * 2)
      ctx.fillStyle = poolGrad
      ctx.fill()
    }

    function drawDroplet(ctx: CanvasRenderingContext2D, d: Droplet) {
      const alpha = 1 - d.life / d.maxLife
      ctx.save()
      ctx.beginPath()
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${d.hue}, 95%, 58%, ${alpha * 0.9})`
      ctx.shadowColor = `hsla(${d.hue}, 100%, 60%, 0.5)`
      ctx.shadowBlur = 6
      ctx.fill()
      ctx.restore()
    }

    function drawLightRays(ctx: CanvasRenderingContext2D) {
      const cx = 450, cy = 140
      ctx.save()
      for (let i = 0; i < 8; i++) {
        const angle = -Math.PI / 2 + (i - 4) * 0.18
        const len = 400 + Math.sin(frame * 0.02 + i) * 60
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len)
        ctx.lineWidth = 22 + i * 4
        ctx.strokeStyle = `rgba(255,215,0,${0.015 + Math.sin(frame * 0.03 + i) * 0.008})`
        ctx.stroke()
      }
      ctx.restore()
    }

    function drawGlow(ctx: CanvasRenderingContext2D) {
      const glow = ctx.createRadialGradient(450, 530, 0, 450, 530, 320)
      glow.addColorStop(0, 'rgba(255,210,0,0.22)')
      glow.addColorStop(0.5, 'rgba(255,180,0,0.08)')
      glow.addColorStop(1, 'rgba(255,180,0,0)')
      ctx.beginPath()
      ctx.arc(450, 530, 320, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()
    }

    function drawReflection(ctx: CanvasRenderingContext2D) {
      // Subtle ground reflection under glass
      const refGrad = ctx.createRadialGradient(450, 680, 0, 450, 680, 150)
      refGrad.addColorStop(0, 'rgba(255,200,0,0.12)')
      refGrad.addColorStop(1, 'rgba(255,200,0,0)')
      ctx.beginPath()
      ctx.ellipse(450, 685, 140, 30, 0, 0, Math.PI * 2)
      ctx.fillStyle = refGrad
      ctx.fill()
    }

    let animId: number
    function animate() {
      ctx.clearRect(0, 0, 900, 900)

      drawLightRays(ctx)
      drawGlow(ctx)
      drawSplash(ctx)

      // Fill animation: liquid rises to 72% then holds
      const fillPct = Math.min(0.72, frame < 90 ? frame / 90 * 0.72 : 0.72)
      drawGlass(ctx, fillPct)
      drawReflection(ctx)

      // Spawn droplets periodically
      if (frame % 18 === 0) spawnCrown()

      // Update & draw droplets
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i]
        d.x += d.vx
        d.y += d.vy
        d.vy += 0.18 // gravity
        d.vx *= 0.98
        d.life++
        if (d.life > d.maxLife) { droplets.splice(i, 1); continue }
        drawDroplet(ctx, d)
      }

      frame++
      animId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '750px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      isolation: 'isolate',
      overflow: 'visible',
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 60% 60%, rgba(255,210,0,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Canvas splash scene */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          maxWidth: '750px',
          height: 'auto',
          filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.10))',
        }}
      />
    </div>
  )
}

export default DynamicHeroSplash
