'use client'

export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
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
  Package
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', href: '/admin/products', icon: <ShoppingBag size={20} /> },
    { name: 'Orders', href: '/admin/orders', icon: <Package size={20} /> },
    { name: 'Leads', href: '/admin/leads', icon: <Users size={20} /> },
    { name: 'Export Shipments', href: '/admin/shipments', icon: <Truck size={20} /> },
    { name: 'Analytics', href: '/admin/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Blog', href: '/admin/blog', icon: <MessageSquare size={20} /> },
  ]

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: isCollapsed ? '80px' : '280px', 
        backgroundColor: '#1B4332', 
        color: 'white',
        transition: 'all 0.3s ease',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 50
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', padding: '0 0.5rem' }}>
          <div style={{ minWidth: '40px', height: '40px', background: 'var(--secondary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1B4332', fontWeight: '800' }}>S</div>
          {!isCollapsed && <span style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.05em' }}>SHEMOUS</span>}
        </div>

        {/* Menu Items */}
        <nav style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map((item) => (
             <Link 
                key={item.href} 
                href={item.href}
                style={{
                   display: 'flex',
                   alignItems: 'center',
                   gap: '1rem',
                   padding: '0.75rem 1rem',
                   borderRadius: '12px',
                   textDecoration: 'none',
                   color: pathname === item.href ? 'white' : 'rgba(255, 255, 255, 0.6)',
                   backgroundColor: pathname === item.href ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                   transition: 'all 0.2s ease',
                   overflow: 'hidden',
                   whiteSpace: 'nowrap'
                }}
             >
                {item.icon}
                {!isCollapsed && <span>{item.name}</span>}
             </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
           <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', gap: '1rem' }}
           >
              {isCollapsed ? <ChevronRight size={20} /> : <><ChevronLeft size={20} /> <span>Collapse Sidebar</span></>}
           </button>
           <button 
              onClick={() => supabase.auth.signOut()}
              style={{ padding: '0.75rem', background: 'transparent', border: 'none', borderRadius: '12px', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', gap: '1rem' }}
           >
              <LogOut size={20} />
              {!isCollapsed && <span>Sign Out</span>}
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        flexGrow: 1, 
        marginLeft: isCollapsed ? '80px' : '280px',
        width: isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 280px)',
        transition: 'all 0.3s ease',
        padding: '2.5rem'
      }}>
        {children}
      </main>
    </div>
  )
}
