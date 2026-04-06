'use client'

import { useEffect, useState } from 'react'
import { 
  Users, 
  Search, 
  Filter, 
  X, 
  Mail, 
  Phone, 
  Globe, 
  Building2, 
  MessageSquare, 
  Trash2, 
  ChevronRight,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle,
  FileText
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

interface Lead {
  id: string
  full_name: string
  email: string
  phone: string | null
  company_name: string | null
  country: string | null
  message: string | null
  type: string | null
  status: string
  created_at: string
}

export default function LeadsClient() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [mounted, setMounted] = useState(false)

  // Panel State
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Realtime Flash
  const [flashId, setFlashId] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    fetchLeads()

    // ── Supabase Realtime subscription ─────────────────────────────────────
    const channel = supabase
      .channel('admin-leads-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, (payload: any) => {
        fetchLeads()
        if (payload.new && (payload.new as any).id) {
          setFlashId((payload.new as any).id)
          setTimeout(() => setFlashId(null), 2000)
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) setLeads(data || [])
    setLoading(false)
  }

  const openPanel = (lead: Lead) => {
    setSelectedLead(lead)
    setIsPanelOpen(true)
  }

  const closePanel = () => {
    setIsPanelOpen(false)
    setSelectedLead(null)
  }

  const updateStatus = async (newStatus: string) => {
    if (!selectedLead) return
    setIsUpdating(true)
    const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', selectedLead.id)
    if (!error) setSelectedLead({ ...selectedLead, status: newStatus })
    setIsUpdating(false)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    await supabase.from('leads').delete().eq('id', deleteTarget.id)
    setDeleteTarget(null)
    setIsDeleting(false)
  }

  const filteredLeads = leads.filter(l => 
    l.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statusStyles: Record<string, { bg: string; color: string; dot: string }> = {
    new: { bg: '#EFF6FF', color: '#1D4ED8', dot: '#2563EB' },
    contacted: { bg: '#FEF3C7', color: '#D97706', dot: '#F59E0B' },
    resolved: { bg: '#D1FAE5', color: '#065F46', dot: '#10B981' },
    archived: { bg: '#F3F4F6', color: '#4B5563', dot: '#9CA3AF' }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <header style={{ marginBottom: 'clamp(1.5rem, 4vw, 3rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
           <Link href="/admin/dashboard" style={{ color: 'var(--primary)', fontSize: '0.82rem', fontWeight: '800', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}>← Dashboard</Link>
           <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '950', color: 'var(--secondary)', margin: 0 }}>Messages & Inquiries</h1>
           <p style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}>All incoming messages from the contact and export pages.</p>
        </div>
      </header>

      <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #E5E7EB', padding: '1.5rem', boxShadow: '0 4px 25px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
           <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input 
                 type="text" 
                 placeholder="Search names, emails, companies..." 
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
                 style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: '15px', border: '1.5px solid #E2E8F0', outline: 'none', fontSize: '0.9rem', fontWeight: '500' }}
              />
           </div>
           <button style={{ padding: '0.75rem 1.25rem', border: '1.5px solid #E2E8F0', background: 'white', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', color: 'var(--secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={16} /> Filter Origin
           </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <Users size={48} style={{ opacity: 0.1, margin: '0 auto' }} />
            <p style={{ color: 'var(--text-muted)', fontWeight: '700', fontSize: '1.1rem', marginTop: '1rem' }}>Sourcing global contacts…</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--text-muted)' }}>
             <Users size={48} style={{ opacity: 0.1, margin: '0 auto 1.5rem' }} />
             <p style={{ fontWeight: '800', color: 'var(--secondary)' }}>No inquiries found matching your search.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
               <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #F1F5F9' }}>
                     <th style={thStyle}>Contact Identity</th>
                     <th style={thStyle}>Origins & Market</th>
                     <th style={thStyle}>Inquiry Context</th>
                     <th style={thStyle}>Status</th>
                     <th style={{ ...thStyle, textAlign: 'right' }}>Management</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredLeads.map(lead => (
                    <motion.tr 
                       key={lead.id} 
                       layout
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1, background: flashId === lead.id ? 'rgba(16,185,129,0.08)' : 'transparent' }}
                       whileHover={{ background: '#F8FAFC' }}
                       onClick={() => openPanel(lead)}
                       style={{ borderBottom: '1px solid #F8FAFC', cursor: 'pointer' }}
                    >
                       <td style={tdStyle}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                             <div style={{ width: '42px', height: '42px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontWeight: '900', fontSize: '1.1rem' }}>
                                {lead.full_name?.[0].toUpperCase()}
                             </div>
                             <div>
                                <span style={{ fontWeight: '800', color: 'var(--secondary)', display: 'block', fontSize: '0.95rem' }}>{lead.full_name}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{lead.email}</span>
                             </div>
                          </div>
                       </td>
                       <td style={tdStyle}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                             <Globe size={14} color="var(--primary)" />
                             <span style={{ fontWeight: '700', color: 'var(--secondary)', fontSize: '0.85rem' }}>{lead.country || 'International'}</span>
                          </div>
                          <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '800', color: lead.type === 'export' ? '#D97706' : '#64748B' }}>
                             {lead.type || 'General'}
                          </span>
                       </td>
                       <td style={tdStyle}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                             {lead.message || 'No description provided.'}
                          </p>
                          <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: '600' }}>{new Date(lead.created_at).toLocaleDateString()}</span>
                       </td>
                       <td style={tdStyle}>
                          <span style={{ 
                             padding: '0.3rem 0.7rem', 
                             borderRadius: '8px', 
                             fontSize: '0.68rem', 
                             fontWeight: '900', 
                             textTransform: 'uppercase', 
                             display: 'inline-flex', 
                             alignItems: 'center', 
                             gap: '0.4rem',
                             ...statusStyles[lead.status || 'new'] 
                          }}>
                             <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusStyles[lead.status || 'new'].dot }} />
                             {lead.status || 'new'}
                          </span>
                       </td>
                       <td style={{ ...tdStyle, textAlign: 'right' }}>
                          <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(lead) }} style={{ padding: '0.5rem', background: 'rgba(220,38,38,0.06)', border: '1.5px solid rgba(220,38,38,0.1)', borderRadius: '10px', color: '#DC2626', cursor: 'pointer' }}>
                             <Trash2 size={16} />
                          </button>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Lead Detail Panel ──────────────────────────── */}
      <AnimatePresence>
        {isPanelOpen && selectedLead && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePanel}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,30,25,0.5)', backdropFilter: 'blur(8px)', zIndex: 200 }} />
            <motion.div
               initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 30, stiffness: 300 }}
               style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(100vw, 550px)', background: 'white', zIndex: 201, boxShadow: '-20px 0 80px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' }}
            >
               <div style={{ padding: '2rem', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <div style={{ width: '50px', height: '50px', background: 'var(--primary)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontWeight: '950', fontSize: '1.3rem' }}>
                        {selectedLead.full_name[0].toUpperCase()}
                     </div>
                     <div>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'var(--secondary)', margin: 0 }}>{selectedLead.full_name}</h2>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Inquiry Details</span>
                     </div>
                  </div>
                  <button onClick={closePanel} style={{ background: '#F8FAFC', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={20} color="#94A3B8" />
                  </button>
               </div>

               <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                  {/* Action Bar / Status */}
                  <div style={{ marginBottom: '2.5rem' }}>
                     <h3 style={sectionTitleStyle}>Lead Pipeline Status</h3>
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginTop: '1rem' }}>
                        {['new', 'contacted', 'resolved', 'archived'].map(stat => (
                          <button 
                             key={stat}
                             onClick={() => updateStatus(stat)}
                             disabled={isUpdating}
                             style={{
                                padding: '1rem', borderRadius: '16px', background: selectedLead.status === stat ? 'rgba(255,183,3,0.06)' : 'white', border: selectedLead.status === stat ? '2px solid var(--primary)' : '1.5px solid #E2E8F0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: '0.2s', opacity: isUpdating ? 0.6 : 1
                             }}
                          >
                             <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: selectedLead.status === stat ? 'var(--primary)' : '#CBD5E1' }} />
                             <span style={{ fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', color: selectedLead.status === stat ? 'var(--secondary)' : '#64748B' }}>{stat}</span>
                          </button>
                        ))}
                     </div>
                  </div>

                  {/* Contact Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#F8FAFC', borderRadius: '24px', padding: '2rem' }}>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                           <span style={detailLabelStyle}>Email Address</span>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.4rem', color: 'var(--secondary)', fontWeight: '700' }}>
                              <Mail size={16} /> {selectedLead.email}
                           </div>
                        </div>
                        <div>
                           <span style={detailLabelStyle}>Phone / WhatsApp</span>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.4rem', color: 'var(--secondary)', fontWeight: '700' }}>
                              <Phone size={16} /> {selectedLead.phone || 'N/A'}
                           </div>
                        </div>
                     </div>
                     
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed #E2E8F0' }}>
                        <div>
                           <span style={detailLabelStyle}>Organization</span>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.4rem', color: 'var(--secondary)', fontWeight: '700' }}>
                              <Building2 size={16} /> {selectedLead.company_name || 'Individual'}
                           </div>
                        </div>
                        <div>
                           <span style={detailLabelStyle}>Market Focus</span>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.4rem', color: 'var(--secondary)', fontWeight: '700' }}>
                              <Globe size={16} /> {selectedLead.country || 'Global'}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Message Content */}
                  <div style={{ marginTop: '2.5rem' }}>
                     <h3 style={sectionTitleStyle}>Inquiry Message</h3>
                     <div style={{ marginTop: '1rem', background: 'white', border: '1.5px solid #E2E8F0', borderRadius: '24px', padding: '2rem', minHeight: '150px' }}>
                        <div style={{ display: 'flex', gap: '1rem', color: '#94A3B8', marginBottom: '1.2rem' }}>
                           <FileText size={20} />
                           <span style={{ fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Message Content</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.7, color: 'var(--secondary)', fontWeight: '500' }}>
                           {selectedLead.message || 'The user did not provide a message body.'}
                        </p>
                     </div>
                  </div>

                  <div style={{ marginTop: '2.5rem', padding: '1.2rem', background: '#FFFBEB', borderRadius: '18px', border: '1px solid #FEF3C7', color: '#B45309', fontSize: '0.82rem', lineHeight: 1.6, fontWeight: '600' }}>
                     Mark as "Contacted" after you've reached out to this prospect. Use "Resolved" only when the inquiry has been fully addressed or partnership secured.
                  </div>
               </div>

               <div style={{ padding: '2rem', borderTop: '1px solid #F1F5F9' }}>
                  <button onClick={closePanel} style={{ width: '100%', padding: '1.2rem', background: 'var(--secondary)', color: 'white', fontWeight: '950', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '0.95rem' }}>
                     Back to Pipeline
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation ────────────────────────── */}
      {mounted && deleteTarget && createPortal(
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1rem' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setDeleteTarget(null)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)' }} />
          <motion.div initial={{ opacity: 0, scale: 0.85, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{ position: 'relative', background: 'white', borderRadius: '24px', padding: '2.5rem', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}
          >
            <div style={{ width: '60px', height: '60px', background: '#FEE2E2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
              <AlertTriangle size={28} color="#DC2626" />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'var(--secondary)', marginBottom: '0.6rem' }}>Permanently Remove?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Are you sure you want to delete lead <strong style={{ color: 'var(--secondary)' }}>{deleteTarget.full_name}</strong>? This action will remove them from your CRM.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button onClick={() => setDeleteTarget(null)} style={{ flex: 1, padding: '0.9rem', background: '#F3F4F6', border: 'none', borderRadius: '12px', fontWeight: '800', color: 'var(--secondary)', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleDelete} disabled={isDeleting} style={{ flex: 1, padding: '0.9rem', background: '#DC2626', border: 'none', borderRadius: '12px', fontWeight: '900', color: 'white', cursor: 'pointer' }}>
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </div>
  )
}

const thStyle: React.CSSProperties = { padding: '1.25rem', color: '#64748B', fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }
const tdStyle: React.CSSProperties = { padding: '1.25rem', fontSize: '0.9rem', verticalAlign: 'middle' }
const sectionTitleStyle: React.CSSProperties = { fontSize: '0.85rem', fontWeight: '950', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }
const detailLabelStyle: React.CSSProperties = { fontSize: '0.65rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }
