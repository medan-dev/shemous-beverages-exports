'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, X, Truck, Ship, Globe, CheckCircle, Package, AlertTriangle, Monitor, Smartphone } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

interface Shipment {
  id: string
  order_id: string | null
  tracking_number: string
  carrier: string
  origin_port: string
  destination_port: string
  status: string
  estimated_arrival: string | null
  created_at: string
}

export default function ShipmentsClient() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  
  // Panel States
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Delete States
  const [deleteTarget, setDeleteTarget] = useState<Shipment | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Realtime Flash
  const [flashId, setFlashId] = useState<string | null>(null)

  // Form States
  const [orderId, setOrderId] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [carrier, setCarrier] = useState('')
  const [originPort, setOriginPort] = useState('Kampala')
  const [destinationPort, setDestinationPort] = useState('')
  const [status, setStatus] = useState('pending')
  const [estimatedArrival, setEstimatedArrival] = useState('')

  useEffect(() => {
    setMounted(true)
    fetchShipments()
    fetchOrders()

    // ── Supabase Realtime subscription ─────────────────────────────────────
    const channel = supabase
      .channel('admin-shipments-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shipments' }, (payload) => {
        fetchShipments()
        if (payload.new && (payload.new as any).id) {
          setFlashId((payload.new as any).id)
          setTimeout(() => setFlashId(null), 2000)
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
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

  const openAddPanel = () => {
    setEditingShipment(null)
    setOrderId(''); setTrackingNumber(''); setCarrier(''); 
    setOriginPort('Kampala'); setDestinationPort(''); 
    setStatus('pending'); setEstimatedArrival('')
    setIsPanelOpen(true)
  }

  const openEditPanel = (s: Shipment) => {
    setEditingShipment(s)
    setOrderId(s.order_id || '')
    setTrackingNumber(s.tracking_number)
    setCarrier(s.carrier)
    setOriginPort(s.origin_port)
    setDestinationPort(s.destination_port)
    setStatus(s.status)
    setEstimatedArrival(s.estimated_arrival ? s.estimated_arrival.split('T')[0] : '')
    setIsPanelOpen(true)
  }

  const closePanel = () => { setIsPanelOpen(false); setEditingShipment(null) }

  const handleSaveShipment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      order_id: orderId || null,
      tracking_number: trackingNumber,
      carrier,
      origin_port: originPort,
      destination_port: destinationPort,
      status,
      estimated_arrival: estimatedArrival || null
    }

    let error
    if (editingShipment) {
      ;({ error } = await supabase.from('shipments').update(payload).eq('id', editingShipment.id))
    } else {
      ;({ error } = await supabase.from('shipments').insert([payload]))
    }

    if (!error) {
      closePanel()
    } else {
      console.error("Save error:", error)
      alert("Error saving shipment. Check console.")
    }

    setIsSubmitting(false)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    await supabase.from('shipments').delete().eq('id', deleteTarget.id)
    setDeleteTarget(null)
    setIsDeleting(false)
  }

  const statusStyles: Record<string, { bg: string; color: string }> = {
    pending: { bg: '#F3F4F6', color: '#6B7280' },
    in_transit: { bg: '#DBEAFE', color: '#1D4ED8' },
    arrived: { bg: '#FEF3C7', color: '#D97706' },
    customs_cleared: { bg: '#E0E7FF', color: '#4338CA' },
    delivered: { bg: '#D1FAE5', color: '#059669' },
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1.5rem, 4vw, 4rem) clamp(1rem, 4vw, 2rem)' }}>
        
        {/* ── Header ────────────────────────────────────── */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'clamp(1.5rem, 4vw, 3rem)', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Link href="/admin/dashboard" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.6rem', textDecoration: 'none' }}>
              ← Dashboard
            </Link>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: 'var(--secondary)', fontWeight: '950', margin: 0 }}>Export Logistics</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
              {shipments.length} Active shipment{shipments.length !== 1 ? 's' : ''} &bull; <span style={{ color: '#10B981', fontWeight: '700' }}>● Global Tracking</span>
            </p>
          </div>
          <button onClick={openAddPanel} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 'clamp(0.7rem, 2vw, 1rem) clamp(1rem, 3vw, 1.75rem)', background: 'var(--primary)', color: 'var(--secondary)', fontWeight: '900', border: 'none', borderRadius: '100px', cursor: 'pointer', fontSize: 'clamp(0.82rem, 2vw, 0.95rem)', whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(255,183,3,0.35)' }}>
            <Plus size={18} strokeWidth={3} /> Initialize Cargo
          </button>
        </header>

        {/* ── Shipments List ─────────────────────────────── */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--text-muted)' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
              <Ship size={48} style={{ opacity: 0.3 }} />
            </motion.div>
            <p style={{ fontWeight: '600', marginTop: '1rem' }}>Syncing with global ports…</p>
          </div>
        ) : shipments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', background: 'white', borderRadius: '24px', border: '1px solid #E5E7EB' }}>
            <div style={{ width: '80px', height: '80px', background: '#F8FAFC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Globe size={40} style={{ opacity: 0.2 }} />
            </div>
            <p style={{ fontWeight: '700', color: 'var(--secondary)', fontSize: '1.1rem' }}>No cargo in transit</p>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.3rem' }}>Initialize cargo tracker to manage your first export.</p>
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="desktop-view" style={{ display: 'none' }}>
              <style>{`.desktop-view { display: block !important; } @media (max-width: 768px) { .desktop-view { display: none !important; } }`}</style>
              <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E5E7EB' }}>
                      <th style={thStyle}>Tracking & Carrier</th>
                      <th style={thStyle}>Route (Origin → Destination)</th>
                      <th style={thStyle}>Transit Status</th>
                      <th style={thStyle}>Est. Arrival</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Management</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {shipments.map((s) => (
                        <motion.tr
                          key={s.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1, background: flashId === s.id ? 'rgba(16,185,129,0.08)' : 'transparent' }}
                          exit={{ opacity: 0 }}
                          style={{ borderBottom: '1px solid #F3F4F6' }}
                        >
                          <td style={tdStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                              <div style={{ width: '40px', height: '40px', background: '#EFF6FF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1D4ED8' }}>
                                <Ship size={20} />
                              </div>
                              <div>
                                <span style={{ fontWeight: '800', color: 'var(--secondary)', display: 'block', fontSize: '0.9rem' }}>{s.tracking_number}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>{s.carrier}</span>
                              </div>
                            </div>
                          </td>
                          <td style={tdStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ fontWeight: '700', color: 'var(--secondary)' }}>{s.origin_port}</span>
                              <Globe size={14} color="var(--primary)" />
                              <span style={{ fontWeight: '700', color: 'var(--secondary)' }}>{s.destination_port || 'Pending'}</span>
                            </div>
                          </td>
                          <td style={tdStyle}>
                            <span style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', ...statusStyles[s.status] }}>
                              {s.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td style={{ ...tdStyle, color: 'var(--text-muted)', fontWeight: '600' }}>
                            {s.estimated_arrival ? new Date(s.estimated_arrival).toLocaleDateString() : 'TBD'}
                          </td>
                          <td style={{ ...tdStyle, textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                              <button onClick={() => openEditPanel(s)} style={actionBtnStyle}><Edit size={14} /> Edit</button>
                              <button onClick={() => setDeleteTarget(s)} style={{ ...actionBtnStyle, color: '#DC2626', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.1)' }}><Trash2 size={14} /> Delete</button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile View */}
            <div className="mobile-view" style={{ display: 'none' }}>
              <style>{`.mobile-view { display: none; } @media (max-width: 768px) { .mobile-view { display: flex; flex-direction: column; gap: 1rem; } }`}</style>
              {shipments.map((s) => (
                <motion.div key={s.id} layout style={{ background: 'white', borderRadius: '18px', border: '1px solid #E5E7EB', padding: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                       <div style={{ width: '40px', height: '40px', background: '#EFF6FF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1D4ED8' }}>
                          <Ship size={20} />
                       </div>
                       <div>
                          <span style={{ fontWeight: '900', color: 'var(--secondary)', display: 'block', fontSize: '0.95rem' }}>{s.tracking_number}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>{s.carrier}</span>
                       </div>
                    </div>
                    <span style={{ padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', ...statusStyles[s.status] }}>
                      {s.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6', marginBottom: '1rem' }}>
                     <div>
                        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '800', display: 'block' }}>Origin</span>
                        <span style={{ fontWeight: '700', color: 'var(--secondary)', fontSize: '0.9rem' }}>{s.origin_port}</span>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center' }}><Globe size={14} color="var(--primary)" /></div>
                     <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '800', display: 'block' }}>Destination</span>
                        <span style={{ fontWeight: '700', color: 'var(--secondary)', fontSize: '0.9rem' }}>{s.destination_port || 'TBD'}</span>
                     </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                     <button onClick={() => openEditPanel(s)} style={{ ...actionBtnStyle, flex: 1, justifyContent: 'center', padding: '0.75rem' }}><Edit size={14} /> Update</button>
                     <button onClick={() => setDeleteTarget(s)} style={{ ...actionBtnStyle, flex: 1, justifyContent: 'center', padding: '0.75rem', color: '#DC2626', background: 'rgba(220,38,38,0.06)' }}><Trash2 size={14} /> Remove</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Add / Edit Side Panel ───────────────────────── */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePanel}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,30,25,0.5)', backdropFilter: 'blur(6px)', zIndex: 200 }} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(100vw, 520px)', background: 'white', zIndex: 201, boxShadow: '-20px 0 80px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}
            >
              <div style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', flexShrink: 0, position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'var(--secondary)', margin: 0 }}>
                    {editingShipment ? 'Edit Package Tracker' : 'Initialize Cargo'}
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Configure global logistics routing.</p>
                </div>
                <button onClick={closePanel} style={{ background: '#F3F4F6', border: 'none', width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={18} color="var(--text-muted)" />
                </button>
              </div>

              <form onSubmit={handleSaveShipment} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flexGrow: 1 }}>
                
                <div>
                  <label style={labelStyle}>Linked Order (Optional)</label>
                  <select value={orderId} onChange={e => setOrderId(e.target.value)} style={inputStyle}>
                    <option value="">No link (Manual Tracker)</option>
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                   <div>
                      <label style={labelStyle}>Origin Port</label>
                      <input value={originPort} onChange={e => setOriginPort(e.target.value)} required placeholder="Kampala / Mombasa" style={inputStyle} />
                   </div>
                   <div>
                      <label style={labelStyle}>Destination Port</label>
                      <input value={destinationPort} onChange={e => setDestinationPort(e.target.value)} required placeholder="Rotterdam / Dubai" style={inputStyle} />
                   </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
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
                  <button type="submit" disabled={isSubmitting}
                    style={{ 
                      width: '100%', 
                      padding: '1.25rem', 
                      background: editingShipment ? 'var(--secondary)' : 'var(--primary)', 
                      color: editingShipment ? 'white' : 'var(--secondary)', 
                      fontWeight: '950', 
                      fontSize: '1rem', 
                      border: 'none', 
                      borderRadius: '16px', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      boxShadow: editingShipment ? 'none' : '0 10px 30px rgba(255,183,3,0.3)'
                    }}>
                    {isSubmitting ? 'Syncing...' : <><CheckCircle size={20} /> {editingShipment ? 'Update Tracker' : 'Register Shipment'}</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation ────────────────────────── */}
      {mounted && deleteTarget && createPortal(
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1rem' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setDeleteTarget(null)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{ position: 'relative', background: 'white', borderRadius: '24px', padding: '2.5rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}
          >
            <div style={{ width: '60px', height: '60px', background: '#FEE2E2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
              <AlertTriangle size={28} color="#DC2626" />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'var(--secondary)', marginBottom: '0.6rem' }}>Decommission Tracker?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.8rem' }}>
              This will permanently stop tracking <strong style={{ color: 'var(--secondary)' }}>{deleteTarget.tracking_number}</strong>.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setDeleteTarget(null)} style={{ flex: 1, padding: '0.85rem', background: '#F3F4F6', border: 'none', borderRadius: '12px', fontWeight: '800', color: 'var(--secondary)', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleConfirmDelete} disabled={isDeleting} style={{ flex: 1, padding: '0.85rem', background: '#DC2626', border: 'none', borderRadius: '12px', fontWeight: '900', color: 'white', cursor: 'pointer' }}>
                {isDeleting ? 'Removing...' : 'Yes, Delete'}
              </button>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </div>
  )
}

const thStyle: React.CSSProperties = { padding: '1.25rem', color: '#6B7280', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'left' }
const tdStyle: React.CSSProperties = { padding: '1.25rem', fontSize: '0.9rem', verticalAlign: 'middle' }
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.9rem 1rem', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', fontWeight: '500', color: 'var(--secondary)', boxSizing: 'border-box' }
const actionBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', background: 'rgba(0,45,38,0.06)', border: '1px solid rgba(0,45,38,0.1)', borderRadius: '10px', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }
