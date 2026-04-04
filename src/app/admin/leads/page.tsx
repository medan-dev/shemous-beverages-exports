import { createClient } from '@/lib/supabase/server'
import { Users, Search, Filter } from 'lucide-react'

export const metadata = {
  title: 'Manage Leads | Shemous Admin',
}

export default async function LeadsPage() {
  const supabase = await createClient()

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.25rem' }}>Inquiry Hub</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage and respond to global partnership requests and contacts.</p>
        </div>
      </header>

      <div className="liquid-card-organic" style={{ background: 'white', padding: '2rem' }}>
        {/* Table Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search names or companies..." 
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none' }}
              disabled
            />
          </div>
          <button style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border)', background: '#F9FAFB', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', color: 'var(--text-muted)' }}>
            <Filter size={16} /> Filter Origin
          </button>
        </div>

        {/* Leads Table */}
        {error ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#B91C1C', background: '#FEF2F2', borderRadius: '12px' }}>
            Failed to load leads: {error.message}
          </div>
        ) : !leads || leads.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ width: '64px', height: '64px', background: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Users size={24} color="#9CA3AF" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>No leads captured</h3>
            <p>Form submissions from your website will appear here instantly.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem', fontWeight: '600' }}>Contact Info</th>
                <th style={{ padding: '1rem', fontWeight: '600' }}>Origin (Type)</th>
                <th style={{ padding: '1rem', fontWeight: '600' }}>Location Focus</th>
                <th style={{ padding: '1rem', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '0.2rem' }}>{lead.full_name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{lead.email}</div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '800' }}>
                    <span style={{
                       padding: '0.25rem 0.5rem',
                       borderRadius: '6px',
                       fontSize: '0.7rem',
                       textTransform: 'uppercase',
                       background: lead.type === 'export' ? '#FEF3C7' : '#F3F4F6',
                       color: lead.type === 'export' ? '#D97706' : '#6B7280'
                    }}>
                      {lead.type || 'general'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--primary)', fontWeight: '500' }}>
                    {lead.company_name ? `${lead.company_name} - ` : ''} 
                    {lead.country || 'Global'}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <select 
                       disabled
                       defaultValue={lead.status || 'new'}
                       style={{ 
                          padding: '0.4rem 0.8rem', 
                          borderRadius: '8px', 
                          border: '1px solid var(--border)',
                          fontWeight: '800',
                          fontSize: '0.75rem',
                          outline: 'none',
                          color: 'var(--primary)',
                          background: 'white'
                       }}
                    >
                       <option value="new">NEW</option>
                       <option value="contacted">CONTACTED</option>
                       <option value="resolved">RESOLVED</option>
                    </select>
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
