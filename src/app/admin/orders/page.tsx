import { createClient } from '@/lib/supabase/server'
import { Package, Search, Filter } from 'lucide-react'

export const metadata = {
  title: 'Manage Orders | Shemous Admin',
}

export default async function OrdersPage() {
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.25rem' }}>Global Shipments</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track and fulfill incoming beverage and export orders.</p>
        </div>
      </header>

      <div className="liquid-card-organic" style={{ background: 'white', padding: '2rem' }}>
        {/* Table Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search ID or destination..." 
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none' }}
              disabled
            />
          </div>
          <button style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border)', background: '#F9FAFB', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', color: 'var(--text-muted)' }}>
            <Filter size={16} /> Filter Status
          </button>
        </div>

        {/* Orders Table */}
        {error ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#B91C1C', background: '#FEF2F2', borderRadius: '12px' }}>
            Failed to load orders: {error.message}
          </div>
        ) : !orders || orders.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ width: '64px', height: '64px', background: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Package size={24} color="#9CA3AF" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>No orders yet</h3>
            <p>Incoming export orders will automatically appear here.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem', fontWeight: '600' }}>Order ID</th>
                <th style={{ padding: '1rem', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '1rem', fontWeight: '600' }}>Destination</th>
                <th style={{ padding: '1rem', fontWeight: '600' }}>Amount</th>
                <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--primary)' }}>
                    {order.id.slice(0, 8).toUpperCase()}...
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>
                    {order.shipping_address || 'Unspecified'}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '800', color: 'var(--primary)' }}>
                    ${order.total_amount?.toLocaleString() || '0.00'}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '100px',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      ...getStatusStyle(order.status)
                    }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function getStatusStyle(status: string) {
  switch (status?.toLowerCase()) {
    case 'pending': return { background: '#FEF3C7', color: '#D97706' }
    case 'processing': return { background: '#DBEAFE', color: '#2563EB' }
    case 'shipped': return { background: '#E0E7FF', color: '#4F46E5' }
    case 'delivered': return { background: '#D1FAE5', color: '#059669' }
    case 'cancelled': return { background: '#FEE2E2', color: '#DC2626' }
    default: return { background: '#F3F4F6', color: '#6B7280' }
  }
}
