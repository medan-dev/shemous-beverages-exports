'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Placeholder logic for auth integration
    setTimeout(() => {
      setLoading(false)
      setError('Invalid email or password. Please try again.')
    }, 1000)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', padding: '2rem 1rem' }}>
      <div style={{ background: 'white', padding: '3rem 2.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '420px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#131921', marginBottom: '0.5rem' }}>Welcome Back</h1>
          <p style={{ color: '#565959', fontSize: '0.9rem' }}>Sign in to track your global exports and wholesale orders.</p>
        </div>

        {error && (
          <div style={{ background: '#fce8e6', color: '#c5221f', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1.5rem', border: '1px solid #fad2cf' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#111', marginBottom: '0.4rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#888" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="buyer@company.com"
                style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', border: '1px solid #ddd', borderRadius: '6px', outline: 'none', fontSize: '0.95rem' }} 
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#111' }}>Password</label>
              <Link href="#" style={{ fontSize: '0.8rem', color: '#f97316', textDecoration: 'none' }}>Forgot Password?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#888" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', border: '1px solid #ddd', borderRadius: '6px', outline: 'none', fontSize: '0.95rem' }} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              background: '#f97316', 
              color: 'white', 
              border: 'none', 
              padding: '0.8rem', 
              borderRadius: '6px', 
              fontSize: '1rem', 
              fontWeight: '700', 
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem',
              transition: 'background 0.2s'
            }}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#565959', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
          New to Shemous Beverages?{' '}
          <Link href="/register" style={{ color: '#007185', fontWeight: '600', textDecoration: 'none' }}>Create an account</Link>
        </div>
      </div>
    </div>
  )
}
