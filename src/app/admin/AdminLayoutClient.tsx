'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  Truck, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Package,
  Menu,
  X
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', href: '/admin/products', icon: <ShoppingBag size={20} /> },
    { name: 'Orders', href: '/admin/orders', icon: <Package size={20} /> },
    { name: 'Leads', href: '/admin/leads', icon: <Users size={20} /> },
    { name: 'Logistics', href: '/admin/shipments', icon: <Truck size={20} /> },
    { name: 'Analytics', href: '/admin/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Blog', href: '/admin/blog', icon: <MessageSquare size={20} /> },
  ]

  // Only run pathname check on client
  const isLoginPage = mounted && pathname === '/admin/login'
  if (isLoginPage) return <>{children}</>

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      
      {/* ── Desktop Sidebar ───────────────────────────── */}
      <aside style={{ 
        width: isCollapsed ? '90px' : '300px', 
        backgroundColor: '#002D26', 
        backgroundImage: 'linear-gradient(180deg, #002D26 0%, #001F1A 100%)',
        color: 'white',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '2rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
        boxShadow: '10px 0 50px rgba(0,0,0,0.15)',
      }} className="desktop-sidebar">
        <style>{`
          .desktop-sidebar { display: flex !important; }
          @media (max-width: 1024px) { .desktop-sidebar { display: none !important; } }
          .nav-link:hover { background: rgba(255,183,3,0.1) !important; color: white !important; }
          .nav-link.active { background: var(--primary) !important; color: var(--secondary) !important; box-shadow: 0 8px 20px rgba(255,183,3,0.2); }
        `}</style>
        
        {/* Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '4rem', paddingLeft: '0.6rem' }}>
          <div style={{ minWidth: '42px', height: '42px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontWeight: '950', fontSize: '1.3rem', boxShadow: '0 0 20px rgba(255,183,3,0.3)' }}>S</div>
          {!isCollapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '1.4rem', fontWeight: '950', letterSpacing: '0.08em', color: 'white' }}>
              SHEMOUS
            </motion.span>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1rem 1.25rem',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
              >
                <div style={{ color: isActive ? 'var(--secondary)' : 'inherit' }}>{item.icon}</div>
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer Actions */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
           <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between', gap: '1rem', transition: '0.3s' }}
           >
              {isCollapsed ? <ChevronRight size={20} /> : <span style={{ fontWeight: '800', fontSize: '0.85rem' }}>Collapse Panel</span>}
              {!isCollapsed && <ChevronLeft size={20} opacity={0.5} />}
           </button>
           <button 
              onClick={() => supabase.auth.signOut()}
              style={{ padding: '1.1rem', background: 'transparent', border: 'none', borderRadius: '16px', color: 'rgba(255, 255, 255, 0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', gap: '1.25rem', transition: '0.3s' }}
           >
              <LogOut size={20} />
              {!isCollapsed && <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>Sign Out</span>}
           </button>
        </div>
      </aside>

      {/* ── Mobile Header & Nav ───────────────────────── */}
      <div className="mobile-header" style={{ display: 'none' }}>
        <style>{`
          @media (max-width: 1024px) { 
            .mobile-header { 
              display: flex !important; 
              position: fixed; top: 0; left: 0; right: 0; height: 75px; 
              background: #002D26; color: white; align-items: center; justify-content: space-between; 
              padding: 0 1.5rem; z-index: 200; box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            } 
            .main-content { margin-left: 0 !important; width: 100% !important; padding-top: 100px !important; }
          }
        `}</style>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontWeight: '950', fontSize: '1rem' }}>S</div>
          <span style={{ fontWeight: '950', letterSpacing: '0.05em' }}>SHEMOUS</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'white' }}><Menu size={28} /></button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} style={{ position: 'fixed', inset: 0, background: '#002D26', zIndex: 1000, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem' }}>
              <div style={{ fontWeight: '950', fontSize: '1.5rem' }}>SHEMOUS</div>
              <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'white' }}><X size={32} /></button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {menuItems.map(item => (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: pathname === item.href ? 'var(--primary)' : 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '1.4rem', fontWeight: '900' }}>
                  {item.icon} {item.name}
                </Link>
              ))}
            </nav>
            <button onClick={() => supabase.auth.signOut()} style={{ marginTop: 'auto', padding: '1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: '900', fontSize: '1.1rem' }}>SIGN OUT</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Content Area ─────────────────────────── */}
      <main className="main-content" style={{ 
        flexGrow: 1, 
        marginLeft: isCollapsed ? '90px' : '300px',
        width: isCollapsed ? 'calc(100% - 90px)' : 'calc(100% - 300px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: 'clamp(2rem, 4vw, 4rem)',
        minHeight: '100vh'
      }}>
        {children}
      </main>
    </div>
  )
}
