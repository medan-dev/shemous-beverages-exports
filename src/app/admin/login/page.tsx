'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User, LogIn } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

const LoginBlob = ({ color, size, delay, x, y }: { color: string, size: string, delay: number, x: string, y: string }) => (
  <motion.div
    animate={{ 
      y: [0, -50, 0],
      x: [0, 30, -30, 0],
      rotate: [0, 10, -10, 0],
      opacity: [0.05, 0.1, 0.05]
    }}
    transition={{ duration: 15, repeat: Infinity, delay: delay, ease: 'easeInOut' }}
    style={{ position: 'absolute', top: y, left: x, width: size, height: size, backgroundColor: color, borderRadius: '45% 55% 60% 40% / 40% 60% 40% 60%', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}
  />
)

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDFBE6', position: 'relative', overflow: 'hidden' }}>
      <LoginBlob color="var(--primary)" size="800px" delay={0} x="-20%" y="-10%" />
      <LoginBlob color="var(--secondary)" size="600px" delay={5} x="60%" y="40%" />
      
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="shemous-scurve-card" 
         style={{ padding: '0', width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1, minHeight: 'auto' }}
      >
        <div className="scurve-bg-fix" />
        <div className="card-scurve-content" style={{ marginTop: '0', padding: '3.5rem 2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ width: '64px', height: '64px', background: 'var(--secondary)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 20px rgba(0,45,38,0.1)' }}>
              <Lock size={30} color="var(--primary)" />
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: '950', color: 'var(--secondary)', letterSpacing: '-0.02em' }}>Admin Access</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem', fontWeight: '500' }}>Please verify your credentials</p>
          </div>

        {error && (
          <div style={{ padding: '0.75rem', background: '#FEE2E2', border: '1px solid #FECACA', color: '#B91C1C', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={iconStyle} />
              <input 
                type="email" 
                required 
                style={inputStyle} 
                placeholder="admin@shemous.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={iconStyle} />
              <input 
                type="password" 
                required 
                style={inputStyle} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button disabled={loading} type="submit" className="liquid-blob-btn btn-hover" style={{ width: '100%', backgroundColor: 'var(--secondary)', color: 'white', padding: '1.25rem', borderRadius: '100px', fontWeight: '950', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1rem', fontSize: '1rem' }}>
            {loading ? 'Authenticating...' : 'Secure Login'} <LogIn size={18} />
          </button>
        </form>
        </div>
      </motion.div>
    </div>
  )
}

const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary)' }
const inputStyle = { width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none', transition: 'border-color 0.2s' }
const iconStyle = { position: 'absolute' as 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }
