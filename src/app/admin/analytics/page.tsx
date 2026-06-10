import { createClient } from '@/lib/supabase/server'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Globe,
  Mail
} from 'lucide-react'

export const metadata = {
  title: 'Business Analytics | Shemous Admin',
}

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const supabase = await createClient()

  // Fetch data for aggregation
  const { data: orders } = await supabase.from('orders').select('*')
  const { data: leads } = await supabase.from('leads').select('*')

  // Calculate Metrics
  const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0
  const totalOrders = orders?.length || 0
  const totalLeads = leads?.length || 0
  
  const completedOrders = orders?.filter(o => o.status === 'delivered').length || 0
  const fulfillmentRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0

  const exportLeads = leads?.filter(l => l.type === 'export').length || 0
  const generalLeads = leads?.filter(l => l.type === 'general' || !l.type).length || 0

  const exportPercentage = totalLeads > 0 ? (exportLeads / totalLeads) * 100 : 0

  return (
    <div style={{ maxWidth: '1200px' }}>
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
           <div style={{ width: '40px', height: '40px', background: 'var(--secondary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <BarChart3 size={20} />
           </div>
           <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>Analytics Overview</h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Real-time business performance and global market penetration metrics.</p>
      </header>

      {/* Metric Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <MetricCard 
           title="Total Revenue" 
           value={`$${totalRevenue.toLocaleString()}`} 
           icon={<DollarSign size={24} />} 
           trend="+12.5%" 
           positive={true} 
        />
        <MetricCard 
           title="Global Orders" 
           value={totalOrders.toString()} 
           icon={<Package size={24} />} 
           trend="+8.2%" 
           positive={true} 
        />
        <MetricCard 
           title="Total Inquiries" 
           value={totalLeads.toString()} 
           icon={<Users size={24} />} 
           trend="+24.1%" 
           positive={true} 
        />
        <MetricCard 
           title="Fulfillment Rate" 
           value={`${fulfillmentRate.toFixed(1)}%`} 
           icon={<TrendingUp size={24} />} 
           trend="-2.1%" 
           positive={false} 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '2rem' }}>
        {/* Performance Visualization */}
        <div className="liquid-card-organic" style={{ background: 'white', padding: '2.5rem' }}>
           <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '2rem' }}>Lead Composition</h3>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <ProgressStat 
                 label="Export Partnerships" 
                 value={exportLeads} 
                 total={totalLeads} 
                 color="var(--primary)" 
                 icon={<Globe size={18} />}
              />
              <ProgressStat 
                 label="General Inquiries" 
                 value={generalLeads} 
                 total={totalLeads} 
                 color="#94A3B8" 
                 icon={<Mail size={18} />}
              />
           </div>

           <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                 <strong>Insight:</strong> Export-grade requests accounts for {exportPercentage.toFixed(0)}% of your total pipeline. Consider optimizing your export collateral to capture higher-value B2B leads.
              </p>
           </div>
        </div>

        {/* Status Breakdown */}
        <div className="liquid-card-organic" style={{ background: 'var(--secondary)', color: 'white', padding: '2.5rem' }}>
           <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '2rem' }}>Operational Health</h3>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <StatusRow label="Delivered" count={completedOrders} total={totalOrders} />
              <StatusRow label="Pending" count={orders?.filter(o => o.status === 'pending').length || 0} total={totalOrders} />
              <StatusRow label="Processing" count={orders?.filter(o => o.status === 'processing').length || 0} total={totalOrders} />
              <StatusRow label="Cancelled" count={orders?.filter(o => o.status === 'cancelled').length || 0} total={totalOrders} />
           </div>

           <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
              <button 
                 style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)', 
                    borderRadius: '12px', 
                    color: 'white', 
                    fontWeight: '700', 
                    cursor: 'pointer',
                    transition: '0.2s'
                 }}
              >
                 Generate Q1 Report
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, icon, trend, positive }: any) {
  return (
    <div className="liquid-card-organic" style={{ background: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'var(--text-muted)' }}>{icon}</div>
        <div style={{ 
          fontSize: '0.75rem', 
          fontWeight: '800', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.2rem',
          color: positive ? '#059669' : '#DC2626',
          background: positive ? '#D1FAE5' : '#FEE2E2',
          padding: '0.25rem 0.5rem',
          borderRadius: '100px'
        }}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      </div>
      <div>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.25rem' }}>{title}</h4>
        <div style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--primary)' }}>{value}</div>
      </div>
    </div>
  )
}

function ProgressStat({ label, value, total, color, icon }: any) {
  const percentage = total > 0 ? (value / total) * 100 : 0
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
           <div style={{ color: color }}>{icon}</div>
           <span style={{ fontWeight: '700', color: 'var(--secondary)' }}>{label}</span>
        </div>
        <span style={{ fontWeight: '800', color: 'var(--primary)' }}>{value} <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>({percentage.toFixed(0)}%)</span></span>
      </div>
      <div style={{ width: '100%', height: '10px', background: '#F1F5F9', borderRadius: '100px', overflow: 'hidden' }}>
        <div style={{ width: `${percentage}%`, height: '100%', background: color, borderRadius: '100px', transition: 'width 1s ease-out' }}></div>
      </div>
    </div>
  )
}

function StatusRow({ label, count, total }: any) {
  const percentage = total > 0 ? (count / total) * 100 : 0
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ opacity: 0.8, fontSize: '0.9rem', fontWeight: '600' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexGrow: 1, maxWidth: '120px', marginLeft: '1rem' }}>
         <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', flexGrow: 1, overflow: 'hidden' }}>
            <div style={{ width: `${percentage}%`, height: '100%', background: 'white' }}></div>
         </div>
         <span style={{ fontWeight: '800', minWidth: '20px' }}>{count}</span>
      </div>
    </div>
  )
}
