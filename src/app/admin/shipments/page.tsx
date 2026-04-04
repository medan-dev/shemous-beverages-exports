'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, X, Truck, Ship, Globe, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

export default function AdminShipments() {
  const [shipments, setShipments] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form States
  const [orderId, setOrderId] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [carrier, setCarrier] = useState('')
  const [originPort, setOriginPort] = useState('Kampala')
  const [destinationPort, setDestinationPort] = useState('')
  const [status, setStatus] = useState('pending')
  const [estimatedArrival, setEstimatedArrival] = useState('')

  useEffect(() => {
    fetchShipments()
    fetchOrders()
  }, [])

  const fetchShipments = async () => {
    const { data, error } = await supabase.from('shipments').select('*').order('created_at', { ascending: false })
    if (!error) setShipments(data || [])
    setLoading(false)
  }

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('id, shipping_address').order('created_at', { ascending: false })
    if (data) setOrders(data)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this shipment?')) {
      const { error } = await supabase.from('shipments').delete().eq('id', id)
      if (!error) fetchShipments()
    }
  }

  const handleSaveShipment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Insert Shipment into Database
    const { error } = await supabase.from('shipments').insert([{
       order_id: orderId || null,
       tracking_number: trackingNumber,
       carrier,
       origin_port: originPort,
       destination_port: destinationPort,
       status,
       estimated_arrival: estimatedArrival || null
    }])

    if (!error) {
       setIsModalOpen(false)
       setOrderId('')
       setTrackingNumber('')
       setCarrier('')
       setDestinationPort('')
       setEstimatedArrival('')
       fetchShipments()
    } else {
       console.error("Insert error:", error)
       alert("Error adding shipment. Ensure you have applied the latest SQL schema in your Supabase dashboard.")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', position: 'relative' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
           <Link href="/admin/dashboard" style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>← Back to Dashboard</Link>
           <h1 style={{ fontSize: '2.5rem', color: 'var(--secondary)' }}>Export Logistics</h1>
           <p style={{ color: 'var(--text-muted)' }}>Track movement of cargo across global routes.</p>
        </div>
        <button 
           onClick={() => setIsModalOpen(true)}
           className="liquid-blob-btn btn-hover" 
           style={{ 
              padding: '1rem 1.5rem', 
              background: '#1D4ED8', 
              color: 'white', 
              fontWeight: '900', 
              border: 'none', 
              borderRadius: '100px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              cursor: 'pointer'
           }}
        >
          <Truck size={20} strokeWidth={3} /> Initialize Cargo Tracker
        </button>
      </header>

      <div className="liquid-card-organic" style={{ padding: '1.5rem', overflowX: 'auto', background: 'white' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={thStyle}>Tracking & Carrier</th>
              <th style={thStyle}>Route (Origin → Destination)</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Est. Arrival</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(shipments.length === 0 && !loading) ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No active shipments found. Initialize cargo tracking to get started!
                </td>
              </tr>
            ) : (
              shipments.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ 
                         width: '45px', 
                         height: '45px', 
                         background: '#EFF6FF', 
                         borderRadius: '12px',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         color: '#1D4ED8'
                      }}>
                         <Ship size={24} />
                      </div>
                      <div>
                         <span style={{ fontWeight: '800', color: 'var(--primary)', display: 'block', marginBottom: '0.1rem' }}>{s.tracking_number || 'UNASSIGNED'}</span>
                         <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>{s.carrier || 'Generic Carrier'}</span>
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: '700', color: 'var(--secondary)' }}>{s.origin_port}</span>
                        <Globe size={14} color="var(--primary)" />
                        <span style={{ fontWeight: '700', color: 'var(--secondary)' }}>{s.destination_port || 'Pending...'}</span>
                     </div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ 
                       padding: '0.35rem 0.6rem', 
                       borderRadius: '6px', 
                       fontSize: '0.75rem', 
                       fontWeight: '800', 
                       textTransform: 'uppercase',
                       ...getLogisticsStatusStyle(s.status)
                    }}>
                      {s.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={tdStyle}>
                     <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>
                        {s.estimated_arrival ? new Date(s.estimated_arrival).toLocaleDateString() : 'TBD'}
                     </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}><Edit size={18} /></button>
                      <button onClick={() => handleDelete(s.id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Shipment Modal */}
      <AnimatePresence>
        {isModalOpen && (
           <>
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setIsModalOpen(false)}
                 style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0, 45, 38, 0.4)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 100
                 }}
              />
              <motion.div
                 initial={{ x: '100%', opacity: 0.5 }}
                 animate={{ x: 0, opacity: 1 }}
                 exit={{ x: '100%', opacity: 0.5 }}
                 transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                 style={{
                    position: 'fixed',
                    top: 0, right: 0, bottom: 0,
                    width: '100%',
                    maxWidth: '500px',
                    background: 'white',
                    zIndex: 101,
                    boxShadow: '-20px 0 50px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto'
                 }}
              >
                 <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--secondary)' }}>Initialize Package</h2>
                    <button onClick={() => setIsModalOpen(false)} style={{ background: '#F3F4F6', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}>
                       <X size={20} color="var(--text-muted)" />
                    </button>
                 </div>

                 <form onSubmit={handleSaveShipment} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flexGrow: 1 }}>
                    
                    <div>
                       <label style={labelStyle}>Link to Order (Optional)</label>
                       <select value={orderId} onChange={e => setOrderId(e.target.value)} style={inputStyle}>
                          <option value="">Manual Entry (No link)</option>
                          {orders.map(o => (
                             <option key={o.id} value={o.id}>Order {o.id.slice(0,8).toUpperCase()}... ({o.shipping_address?.slice(0, 20)}...)</option>
                          ))}
                       </select>
                    </div>

                    <div>
                       <label style={labelStyle}>Tracking / Bill of Lading</label>
                       <input value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)} required placeholder="e.g. BL-UG-2026-X494" style={inputStyle} />
                    </div>

                    <div>
                       <label style={labelStyle}>Carrier / Shipping Line</label>
                       <input value={carrier} onChange={e => setCarrier(e.target.value)} required placeholder="e.g. Maersk / Emirates SkyCargo" style={inputStyle} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                       <div>
                          <label style={labelStyle}>Origin Port</label>
                          <input value={originPort} onChange={e => setOriginPort(e.target.value)} required placeholder="Entebbe / Mombasa" style={inputStyle} />
                       </div>
                       <div>
                          <label style={labelStyle}>Destination Port</label>
                          <input value={destinationPort} onChange={e => setDestinationPort(e.target.value)} required placeholder="Rotterdam / New York" style={inputStyle} />
                       </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                       <div>
                          <label style={labelStyle}>Transit Status</label>
                          <select value={status} onChange={e => setStatus(e.target.value)} style={inputStyle}>
                             <option value="pending">Pending</option>
                             <option value="in_transit">In Transit</option>
                             <option value="arrived">Arrived at Port</option>
                             <option value="customs_cleared">Customs Cleared</option>
                             <option value="delivered">Delivered</option>
                          </select>
                       </div>
                       <div>
                          <label style={labelStyle}>Est. Arrival</label>
                          <input value={estimatedArrival} onChange={e => setEstimatedArrival(e.target.value)} type="date" style={inputStyle} />
                       </div>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                       <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="liquid-blob-btn btn-hover"
                          style={{ 
                             width: '100%', 
                             padding: '1.25rem', 
                             background: '#1D4ED8', 
                             color: 'white', 
                             fontWeight: '900', 
                             fontSize: '1rem',
                             border: 'none', 
                             borderRadius: '12px',
                             cursor: 'pointer',
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center',
                             gap: '0.5rem'
                          }}
                       >
                          {isSubmitting ? 'Registering Cargo...' : <><CheckCircle size={20} /> Register Shipment</>}
                       </button>
                    </div>
                 </form>
              </motion.div>
           </>
        )}
      </AnimatePresence>
    </div>
  )
}

function getLogisticsStatusStyle(status: string) {
   switch (status) {
      case 'pending': return { background: '#F3F4F6', color: '#6B7280' }
      case 'in_transit': return { background: '#DBEAFE', color: '#1D4ED8' }
      case 'arrived': return { background: '#FEF3C7', color: '#D97706' }
      case 'customs_cleared': return { background: '#E0E7FF', color: '#4338CA' }
      case 'delivered': return { background: '#D1FAE5', color: '#059669' }
      default: return { background: '#F3F4F6', color: '#6B7280' }
   }
}

const thStyle = { padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase' as 'uppercase' }
const tdStyle = { padding: '1rem', fontSize: '0.95rem' }
const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase' as 'uppercase', letterSpacing: '0.05em' }
const inputStyle = { width: '100%', padding: '0.9rem 1rem', background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.95rem', outline: 'none', fontWeight: '500', color: 'var(--secondary)' }
