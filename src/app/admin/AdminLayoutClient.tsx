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
    { name: 'Exports', href: '/admin/exports', icon: <Package size={20} /> },
    { name: 'Orders', href: '/admin/orders', icon: <Package size={20} /> },
    { name: 'Messages', href: '/admin/leads', icon: <Users size={20} /> },
    { name: 'Logistics', href: '/admin/shipments', icon: <Truck size={20} /> },
    { name: 'Analytics', href: '/admin/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Blog', href: '/admin/blog', icon: <MessageSquare size={20} /> },
  ]

  // Only run pathname check on client
  const isLoginPage = mounted && pathname === '/admin/login'
  if (isLoginPage) return <>{children}</>

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC', color: '#0F172A', overflow: 'hidden' }}>
      
      {/* ── Desktop Sidebar ───────────────────────────── */}
      <aside style={{ 
        width: isCollapsed ? '80px' : '260px', 
        backgroundColor: '#FFFFFF', 
        borderRight: '1px solid #E2E8F0',
        color: '#334155',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        height: '100vh',
        zIndex: 100,
        boxSizing: 'border-box',
      }} className="desktop-sidebar">
        <style>{`
          .desktop-sidebar { display: flex !important; }
          @media (max-width: 1024px) { .desktop-sidebar { display: none !important; } }
          .nav-link:hover { background: #F1F5F9 !important; color: #0F172A !important; }
          .nav-link.active { background: #FFF7ED !important; color: #EA580C !important; border-right: 3px solid #EA580C; font-weight: 700 !important; }
        `}</style>
        
        {/* Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '1.5rem', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ width: '36px', height: '36px', background: '#EA580C', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '1.1rem', flexShrink: 0 }}>S</div>
          {!isCollapsed && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', lineHeight: '1.2' }}>SHEMOUS</span>
              <span style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: '600', letterSpacing: '0.05em' }}>ADMIN PORTAL</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '1.5rem 0.75rem', overflowY: 'auto' }}>
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
                  gap: '1rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: '#475569',
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  transition: 'background 0.2s',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }}
              >
                <div style={{ flexShrink: 0 }}>{item.icon}</div>
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer Actions */}
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
           <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{ padding: '0.75rem 1rem', background: 'transparent', border: 'none', borderRadius: '6px', color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', gap: '1rem' }}
           >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              {!isCollapsed && <span style={{ fontWeight: '500', fontSize: '0.85rem' }}>Collapse</span>}
           </button>
           <button 
              onClick={() => supabase.auth.signOut()}
              style={{ padding: '0.75rem 1rem', background: 'transparent', border: 'none', borderRadius: '6px', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', gap: '1rem' }}
              className="nav-link"
           >
              <LogOut size={20} />
              {!isCollapsed && <span style={{ fontWeight: '500', fontSize: '0.85rem' }}>Sign Out</span>}
           </button>
        </div>
      </aside>

      {/* ── Mobile Header & Nav ───────────────────────── */}
      <div className="mobile-header" style={{ display: 'none' }}>
        <style>{`
          @media (max-width: 1024px) { 
            .mobile-header { 
              display: flex !important; 
              position: fixed; top: 0; left: 0; right: 0; height: 60px; 
              background: #FFFFFF; border-bottom: 1px solid #E2E8F0;
              color: #0F172A; align-items: center; justify-content: space-between; 
              padding: 0 1.25rem; z-index: 200; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            } 
            .main-content { margin-left: 0 !important; width: 100% !important; padding-top: 80px !important; }
          }
        `}</style>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', background: '#EA580C', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '1rem' }}>S</div>
          <span style={{ fontWeight: '800', letterSpacing: '0.02em' }}>SHEMOUS</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'none', border: 'none', color: '#0F172A', display: 'flex', alignItems: 'center' }}><Menu size={24} /></button>
      </div>

      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: '#FFFFFF', zIndex: 1000, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <div style={{ fontWeight: '800', fontSize: '1.25rem', color: '#0F172A' }}>SHEMOUS ADMIN</div>
            <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#64748B' }}><X size={28} /></button>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {menuItems.map(item => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '8px', background: isActive ? '#FFF7ED' : 'transparent', color: isActive ? '#EA580C' : '#475569', textDecoration: 'none', fontSize: '1.1rem', fontWeight: isActive ? '700' : '500' }}>
                  {item.icon} {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      )}

      {/* ── Main Content Area ─────────────────────────── */}
      <main className="main-content" style={{ 
        flexGrow: 1, 
        marginLeft: isCollapsed ? '80px' : '260px',
        width: isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 260px)',
        transition: 'all 0.3s ease',
        padding: '2rem',
        minHeight: '100vh',
      }}>
        {children}
      </main>
    </div>
  )
}

