'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { 
  Package, 
  Search, 
  Filter, 
  X, 
  CheckCircle, 
  Truck, 
  Clock, 
  AlertCircle, 
  MoreHorizontal,
  ChevronRight,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { AnimatePresence, motion } from 'framer-motion'

interface Order {
  id: string
  created_at: string
  status: string
  total_amount: number | null
  shipping_address: string | null
  customer_id: string | null
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Side Panel state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Realtime Flash
  const [flashId, setFlashId] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()

    // ── Supabase Realtime subscription ─────────────────────────────────────
    const channel = supabase
      .channel('admin-orders-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        fetchOrders()
        if (payload.new && (payload.new as any).id) {
          setFlashId((payload.new as any).id)
          setTimeout(() => setFlashId(null), 2000)
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) setOrders(data || [])
    setLoading(false)
  }

  const openOrderPanel = (order: Order) => {
    setSelectedOrder(order)
    setIsPanelOpen(true)
  }

  const closePanel = () => {
    setIsPanelOpen(false)
    setSelectedOrder(null)
  }

  const updateOrderStatus = async (newStatus: string) => {
    if (!selectedOrder) return
    setIsUpdating(true)
    
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', selectedOrder.id)

    if (!error) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    } else {
      alert("Error updating status: " + error.message)
    }
    setIsUpdating(false)
  }

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.shipping_address?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{ marginBottom: 'clamp(1.5rem, 4vw, 3rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '950', color: 'var(--secondary)', margin: 0 }}>Incoming Orders</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Global export and beverage fulfillment hub.</p>
        </div>
      </header>

      <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #E5E7EB', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input 
              type="text" 
              placeholder="Search by Order ID or Address..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: '14px', border: '1.5px solid #E2E8F0', outline: 'none', fontSize: '0.9rem', fontWeight: '500' }}
            />
          </div>
          <button style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1.5px solid #E2E8F0', background: 'white', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', color: 'var(--secondary)', fontSize: '0.85rem' }}>
            <Filter size={16} /> Filter Status
          </button>
        </div>

        {/* Orders Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
               <Package size={48} style={{ opacity: 0.15, margin: '0 auto' }} />
            </motion.div>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginTop: '1rem' }}>Fetching incoming requests...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--text-muted)' }}>
             <Package size={48} style={{ opacity: 0.1, margin: '0 auto 1rem' }} />
             <p style={{ fontWeight: '700', color: 'var(--secondary)' }}>No orders match your criteria</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F1F5F9' }}>
                  <th style={thStyle}>Order ID</th>
                  <th style={thStyle}>Date & Time</th>
                  <th style={thStyle}>Destination</th>
                  <th style={thStyle}>Total Value</th>
                  <th style={thStyle}>Current Status</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <motion.tr 
                    key={order.id} 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, background: flashId === order.id ? 'rgba(16,185,129,0.08)' : 'transparent' }}
                    style={{ borderBottom: '1px solid #F8FAFC', cursor: 'pointer' }}
                    onClick={() => openOrderPanel(order)}
                    whileHover={{ background: '#F8FAFC' }}
                  >
                    <td style={{ ...tdStyle, fontWeight: '800', color: 'var(--primary)' }}>
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Calendar size={14} />
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: '600' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                         <MapPin size={14} color="var(--primary)" />
                         {order.shipping_address || 'Unspecified'}
                      </div>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: '900', color: 'var(--secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
                        <DollarSign size={14} />
                        {order.total_amount?.toLocaleString() || '0.00'}
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span style={{
                        padding: '0.35rem 0.8rem',
                        borderRadius: '8px',
                        fontSize: '0.7rem',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        ...getStatusStyle(order.status)
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                       <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                          <ChevronRight size={20} />
                       </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Order Management Side Panel ────────────────── */}
      <AnimatePresence>
        {isPanelOpen && selectedOrder && (
          <>
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
               onClick={closePanel}
               style={{ position: 'fixed', inset: 0, background: 'rgba(0,30,25,0.5)', backdropFilter: 'blur(8px)', zIndex: 200 }} 
            />
            <motion.div
               initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 30, stiffness: 300 }}
               style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(100vw, 550px)', background: 'white', zIndex: 201, boxShadow: '-20px 0 80px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' }}
            >
               {/* Panel Header */}
               <div style={{ padding: '2rem', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Order Management</span>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: '950', color: 'var(--secondary)', margin: '0.2rem 0 0' }}>#{selectedOrder.id.toUpperCase()}</h2>
                  </div>
                  <button onClick={closePanel} style={{ background: '#F8FAFC', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={20} color="#94A3B8" />
                  </button>
               </div>

               <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                  {/* Status Timeline / Selector */}
                  <div style={{ marginBottom: '3rem' }}>
                    <h3 style={sectionTitleStyle}>Fulfillment Status</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginTop: '1rem' }}>
                       {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(stat => (
                         <button 
                            key={stat}
                            onClick={() => updateOrderStatus(stat)}
                            disabled={isUpdating}
                            style={{
                               padding: '1rem',
                               borderRadius: '16px',
                               border: selectedOrder.status === stat ? '2px solid var(--primary)' : '1.5px solid #E2E8F0',
                               background: selectedOrder.status === stat ? 'rgba(255,183,3,0.05)' : 'white',
                               cursor: 'pointer',
                               textAlign: 'left',
                               display: 'flex',
                               alignItems: 'center',
                               gap: '0.75rem',
                               transition: 'all 0.2s',
                               opacity: isUpdating ? 0.6 : 1
                            }}
                         >
                            <div style={{ 
                               width: '12px', height: '12px', borderRadius: '50%', 
                               background: selectedOrder.status === stat ? 'var(--primary)' : '#CBD5E1' 
                            }} />
                            <span style={{ 
                               fontWeight: '800', 
                               fontSize: '0.85rem', 
                               textTransform: 'uppercase',
                               color: selectedOrder.status === stat ? 'var(--secondary)' : '#64748B' 
                            }}>{stat}</span>
                         </button>
                       ))}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div style={{ background: '#F8FAFC', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                     <div>
                        <span style={detailLabelStyle}>Shipping Destination</span>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                           <MapPin size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                           <p style={{ margin: 0, fontWeight: '700', color: 'var(--secondary)', lineHeight: 1.5 }}>
                              {selectedOrder.shipping_address || 'No address provided'}
                           </p>
                        </div>
                     </div>

                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed #E2E8F0' }}>
                        <div>
                           <span style={detailLabelStyle}>Received At</span>
                           <p style={{ margin: '0.4rem 0 0', fontWeight: '800', color: 'var(--secondary)' }}>
                             {new Date(selectedOrder.created_at).toLocaleDateString()}
                           </p>
                        </div>
                        <div>
                           <span style={detailLabelStyle}>Order Value</span>
                           <p style={{ margin: '0.4rem 0 0', fontWeight: '900', color: 'var(--primary)', fontSize: '1.2rem' }}>
                             ${selectedOrder.total_amount?.toLocaleString()}
                           </p>
                        </div>
                     </div>
                  </div>

                  <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#FFF7ED', borderRadius: '20px', border: '1px solid #FFEDD5', display: 'flex', gap: '1rem' }}>
                     <AlertCircle size={24} color="#D97706" style={{ flexShrink: 0 }} />
                     <p style={{ margin: 0, fontSize: '0.85rem', color: '#92400E', lineHeight: 1.6, fontWeight: '600' }}>
                        Updating the status will notify the logistics team automatically. Ensure payment is confirmed before marking as "Shipped".
                     </p>
                  </div>
               </div>

               <div style={{ padding: '2rem', background: 'white', borderTop: '1px solid #F1F5F9' }}>
                  <button 
                    onClick={closePanel}
                    style={{ 
                       width: '100%', 
                       padding: '1.25rem', 
                       borderRadius: '16px', 
                       background: 'var(--secondary)', 
                       color: 'white', 
                       fontWeight: '900', 
                       border: 'none', 
                       cursor: 'pointer' 
                    }}
                  >
                    Close Panel
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function getStatusStyle(status: string) {
  switch (status?.toLowerCase()) {
    case 'pending': return { background: '#FEF3C7', color: '#D97706' }
    case 'processing': return { background: '#DBEAFE', color: '#1D4ED8' }
    case 'shipped': return { background: '#E0E7FF', color: '#4338CA' }
    case 'delivered': return { background: '#D1FAE5', color: '#059669' }
    case 'cancelled': return { background: '#FEE2E2', color: '#DC2626' }
    default: return { background: '#F3F4F6', color: '#6B7280' }
  }
}

const thStyle: React.CSSProperties = { padding: '1.25rem', color: '#64748B', fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }
const tdStyle: React.CSSProperties = { padding: '1.25rem', fontSize: '0.9rem', verticalAlign: 'middle' }
const sectionTitleStyle: React.CSSProperties = { fontSize: '0.9rem', fontWeight: '900', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }
const detailLabelStyle: React.CSSProperties = { fontSize: '0.7rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }
