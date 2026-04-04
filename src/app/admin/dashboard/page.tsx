'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight,
  Globe,
  Truck,
  DollarSign,
  LogOut
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ leads: 0, products: 0, orders: 0 })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setLoading(false)
        return
      }
      
      const [leadsRes, productsRes, ordersRes] = await Promise.all([
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
      ])

      setStats({
        leads: leadsRes.count || 0,
        products: productsRes.count || 0,
        orders: ordersRes.count || 0,
      })
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  if (loading) return <div>Loading Dashboard...</div>

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.25rem' }}>Operations Hub</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time overview of your global export business.</p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="liquid-card-organic btn-hover" 
          style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border)', background: 'white', color: 'var(--text-muted)', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <StatCard icon={<DollarSign size={20} />} title="Total Revenue" value="$42,850" trend="+18.5%" />
        <StatCard icon={<Truck size={20} />} title="Active Shipments" value="12" trend="3 in transit" />
        <StatCard icon={<Users size={20} />} title="Pending Inquiries" value={stats.leads} trend="Action needed" />
        <StatCard icon={<Globe size={20} />} title="Export Regions" value="14" trend="New: UAE" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
         {/* Export Destinations Donut Chart Mockup */}
         <motion.div whileHover={{ y: -5 }} className="liquid-card-organic" style={{ padding: '2rem', background: 'white' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '950', marginBottom: '2rem', color: 'var(--secondary)' }}>Export Destinations</h3>
            <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
               <div style={{ width: '180px', height: '180px', borderRadius: '50%', border: '40px solid #1B4332', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', border: '40px solid #F4D03F', borderBottomColor: 'transparent', borderRightColor: 'transparent', transform: 'rotate(45deg)' }} />
               </div>
               <div style={{ position: 'absolute', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>72%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Europe</div>
               </div>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.85rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', background: '#1B4332', borderRadius: '3px' }} /> Europe
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', background: '#F4D03F', borderRadius: '3px' }} /> UAE
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', background: '#2D6A4F', borderRadius: '3px' }} /> Other
               </div>
            </div>
         </motion.div>

         {/* Recent Orders List */}
         <motion.div whileHover={{ y: -5 }} className="liquid-card-organic" style={{ padding: '2rem', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
               <h3 style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--secondary)' }}>Recent Shipments</h3>
               <button style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-light)', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
               {[
                  { id: 'EXP-1049', destination: 'Amsterdam, NL', status: 'In Transit', value: '$8,400' },
                  { id: 'EXP-1048', destination: 'Dubai, UAE', status: 'Processing', value: '$12,200' },
                  { id: 'EXP-1047', destination: 'New York, US', status: 'Delivered', value: '$5,900' },
               ].map((order) => (
                  <div key={order.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #F3F4F6' }}>
                     <div>
                        <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{order.destination}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {order.id}</div>
                     </div>
                     <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '800', color: 'var(--primary)' }}>{order.value}</div>
                        <div style={{ 
                           fontSize: '0.7rem', 
                           fontWeight: '800', 
                           textTransform: 'uppercase',
                           color: order.status === 'In Transit' ? '#2563EB' : order.status === 'Delivered' ? '#059669' : '#D97706'
                        }}>
                           {order.status}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </motion.div>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value, trend }: { icon: any, title: string, value: string | number, trend: string }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="liquid-card-organic" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div style={{ padding: '0.6rem', background: '#F0FDF4', borderRadius: '12px', color: '#166534' }}>{icon}</div>
         <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '800', background: '#ECFDF5', padding: '0.25rem 0.5rem', borderRadius: '6px' }}>
            {trend}
         </span>
      </div>
      <div>
         <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.25rem' }}>{title}</p>
         <h2 style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--secondary)', letterSpacing: '-0.02em' }}>{value}</h2>
      </div>
    </motion.div>
  )
}
