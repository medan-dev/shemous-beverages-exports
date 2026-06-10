'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Loader2, ArrowRight, User, Building } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Placeholder logic for auth integration
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

  if (success) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', padding: '2rem 1rem' }}>
        <div style={{ background: 'white', padding: '3rem 2.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: '#e6f4ea', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <span style={{ fontSize: '2rem', color: '#137333' }}>✓</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#131921', marginBottom: '1rem' }}>Registration Successful!</h1>
          <p style={{ color: '#565959', fontSize: '0.95rem', marginBottom: '2rem' }}>Your account has been created. A representative will contact you shortly regarding wholesale approval.</p>
          <Link href="/login" style={{ display: 'inline-block', background: '#f97316', color: 'white', textDecoration: 'none', padding: '0.8rem 2rem', borderRadius: '6px', fontWeight: '700' }}>
            Continue to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', padding: '2rem 1rem' }}>
      <div style={{ background: 'white', padding: '3rem 2.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '420px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#131921', marginBottom: '0.5rem' }}>Create Account</h1>
          <p style={{ color: '#565959', fontSize: '0.9rem' }}>Join our global network for wholesale and export trading.</p>
        </div>

        {error && (
          <div style={{ background: '#fce8e6', color: '#c5221f', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1.5rem', border: '1px solid #fad2cf' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#111', marginBottom: '0.4rem' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="#888" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              <input 
                type="text" 
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                required
                placeholder="John Doe"
                style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', border: '1px solid #ddd', borderRadius: '6px', outline: 'none', fontSize: '0.95rem' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#111', marginBottom: '0.4rem' }}>Company / Business Name (Optional)</label>
            <div style={{ position: 'relative' }}>
              <Building size={18} color="#888" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              <input 
                type="text" 
                value={formData.companyName}
                onChange={e => setFormData({...formData, companyName: e.target.value})}
                placeholder="Global Imports LLC"
                style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', border: '1px solid #ddd', borderRadius: '6px', outline: 'none', fontSize: '0.95rem' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#111', marginBottom: '0.4rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#888" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
                placeholder="buyer@company.com"
                style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', border: '1px solid #ddd', borderRadius: '6px', outline: 'none', fontSize: '0.95rem' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#111', marginBottom: '0.4rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#888" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              <input 
                type="password" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                required
                placeholder="••••••••"
                style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', border: '1px solid #ddd', borderRadius: '6px', outline: 'none', fontSize: '0.95rem' }} 
              />
            </div>
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.3rem' }}>Must be at least 8 characters long.</p>
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
            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Create Account <ArrowRight size={18} /></>}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#565959', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#007185', fontWeight: '600', textDecoration: 'none' }}>Sign in here</Link>
        </div>
      </div>
    </div>
  )
}
