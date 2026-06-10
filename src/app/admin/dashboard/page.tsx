'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  Globe,
  DollarSign,
  TrendingUp,
  CircleDot,
  ArrowUpRight,
  MoreVertical
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface StatData {
  totalLeads: number
  newLeads: number
  totalProducts: number
  totalOrders: number
}

interface Lead {
  id: string
  full_name: string
  email: string
  type: string
  status: string
  created_at: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatData>({ totalLeads: 0, newLeads: 0, totalProducts: 0, totalOrders: 0 })
  const [recentLeads, setRecentLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
        return
      }
      
      // Fetch stats
      const [leadsRes, newLeadsRes, productsRes, ordersRes] = await Promise.all([
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
      ])

      // Fetch 5 most recent leads
      const { data: recentLeadsData } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6)

      setStats({
        totalLeads: leadsRes.count || 0,
        newLeads: newLeadsRes.count || 0,
        totalProducts: productsRes.count || 0,
        totalOrders: ordersRes.count || 0,
      })
      
      setRecentLeads(recentLeadsData || [])
      setLoading(false)
    }

    fetchDashboardData()

    const channel = supabase.channel('dashboard-leads')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, payload => {
        setStats(prev => ({ ...prev, totalLeads: prev.totalLeads + 1, newLeads: prev.newLeads + 1 }))
        setRecentLeads(prev => [payload.new as Lead, ...prev].slice(0, 6))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [router])

  const downloadCSV = () => {
    if (recentLeads.length === 0) {
      alert('No recent inquiries to export.')
      return
    }
    
    const headers = ['Name', 'Email', 'Type', 'Status', 'Date']
    const csvContent = [
      headers.join(','),
      ...recentLeads.map(l => 
        `"${l.full_name}","${l.email}","${l.type}","${l.status}","${new Date(l.created_at).toLocaleDateString()}"`
      )
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircleDot size={40} color="#EA580C" style={{ animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ color: '#0F172A', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>Operations Overview</h1>
          <p style={{ color: '#64748B', fontSize: '0.95rem' }}>Real-time metrics for your export business.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={downloadCSV} style={{ padding: '0.5rem 1rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', color: '#334155', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            Export Report
          </button>
          <button onClick={() => router.push('/admin/orders')} style={{ padding: '0.5rem 1rem', background: '#EA580C', border: 'none', borderRadius: '6px', color: 'white', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 1px 3px rgba(234, 88, 12, 0.3)' }}>
            Create Order
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <StatCard icon={<MessageSquare size={18} />} title="New Inquiries" value={stats.newLeads} trend={`+${stats.totalLeads} Total`} color="#EA580C" bg="#FFF7ED" />
        <StatCard icon={<ShoppingBag size={18} />} title="Active Products" value={stats.totalProducts} trend="In Catalog" color="#0EA5E9" bg="#F0F9FF" />
        <StatCard icon={<DollarSign size={18} />} title="Total Orders" value={stats.totalOrders} trend="Lifetime" color="#10B981" bg="#ECFDF5" />
        <StatCard icon={<Globe size={18} />} title="Global Regions" value="14" trend="Active Markets" color="#8B5CF6" bg="#F5F3FF" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
        <style>{`@media (max-width: 1024px) { div[style*="gridTemplateColumns: '1fr 350px'"] { grid-template-columns: 1fr !important; } }`}</style>
         
         {/* Live Inquiries Data Table */}
         <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
               <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 Live Inquiries Feed
                 <span style={{ display: 'inline-flex', width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', marginLeft: '0.5rem' }}></span>
               </h3>
               <button onClick={() => router.push('/admin/leads')} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                 View All <ArrowUpRight size={14} />
               </button>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                 <thead>
                   <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', background: '#FFFFFF' }}>
                     <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}>Contact</th>
                     <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}>Type</th>
                     <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}>Date</th>
                     <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', textAlign: 'right' }}>Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {recentLeads.length > 0 ? recentLeads.map((lead) => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                         <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ fontWeight: '600', color: '#0F172A', marginBottom: '0.15rem' }}>{lead.full_name}</div>
                            <div style={{ color: '#64748B', fontSize: '0.8rem' }}>{lead.email}</div>
                         </td>
                         <td style={{ padding: '1rem 1.5rem' }}>
                            <span style={{ 
                               padding: '0.2rem 0.5rem', 
                               borderRadius: '4px', 
                               fontSize: '0.75rem', 
                               fontWeight: '600',
                               background: lead.type === 'wholesale' ? '#F0F9FF' : lead.type === 'export' ? '#F5F3FF' : '#F1F5F9',
                               color: lead.type === 'wholesale' ? '#0284C7' : lead.type === 'export' ? '#7C3AED' : '#475569',
                               textTransform: 'capitalize'
                            }}>
                               {lead.type}
                            </span>
                         </td>
                         <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>
                            {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                         </td>
                         <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                            <span style={{ 
                               padding: '0.2rem 0.5rem', 
                               borderRadius: '4px', 
                               fontSize: '0.75rem', 
                               fontWeight: '700',
                               color: lead.status === 'new' ? '#EA580C' : '#64748B',
                               background: lead.status === 'new' ? '#FFF7ED' : 'transparent'
                            }}>
                               {lead.status === 'new' ? 'Unread' : 'Viewed'}
                            </span>
                         </td>
                      </tr>
                   )) : (
                     <tr>
                       <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: '#64748B' }}>No recent inquiries found.</td>
                     </tr>
                   )}
                 </tbody>
               </table>
            </div>
         </div>

         {/* Standard Analytics Module */}
         <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A' }}>Lead Analytics</h3>
              <MoreVertical size={16} color="#64748B" />
            </div>
            
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
               {/* Clean Ring Chart */}
               <svg viewBox="0 0 36 36" style={{ width: '160px', height: '160px' }}>
                 <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                 <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EA580C" strokeWidth="4" strokeDasharray="75, 100" />
               </svg>
               <div style={{ position: 'absolute', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A', lineHeight: '1' }}>{stats.totalLeads}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600', marginTop: '0.25rem' }}>Total Leads</div>
               </div>
            </div>
            
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontWeight: '500' }}>
                     <div style={{ width: '8px', height: '8px', background: '#EA580C', borderRadius: '50%' }} /> Wholesale
                  </div>
                  <span style={{ fontWeight: '700', color: '#0F172A' }}>75%</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontWeight: '500' }}>
                     <div style={{ width: '8px', height: '8px', background: '#F1F5F9', borderRadius: '50%' }} /> General
                  </div>
                  <span style={{ fontWeight: '700', color: '#0F172A' }}>25%</span>
               </div>
            </div>
         </div>

      </div>
    </div>
  )
}

function StatCard({ icon, title, value, trend, color, bg }: { icon: any, title: string, value: string | number, trend: string, color: string, bg: string }) {
  return (
    <div style={{ 
      padding: '1.5rem', 
      background: '#FFFFFF', 
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
         <div style={{ padding: '0.5rem', background: bg, borderRadius: '6px', color: color }}>
           {icon}
         </div>
         <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>
            {trend}
         </span>
      </div>
      <div>
         <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.02em', lineHeight: '1.2' }}>{value}</h2>
         <p style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '500', marginTop: '0.25rem' }}>{title}</p>
      </div>
    </div>
  )
}
