'use client'

import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'

export default function TermsOfServicePage() {
  return (
    <div suppressHydrationWarning style={{ 
      backgroundColor: '#f8fafc', // Light sleek background for docs
      minHeight: '100vh', 
      position: 'relative',
      paddingTop: 'var(--section-padding-top)'
    }}>
      {/* Doc Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '2rem 0' }} suppressHydrationWarning>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} suppressHydrationWarning>
          <div style={{ width: '4px', height: '40px', background: 'var(--primary)', borderRadius: '4px' }} />
          <div>
            <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: '800', color: '#0f1111', margin: 0, letterSpacing: '-0.02em' }}>
              Legal Documentation
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0.2rem 0 0 0' }}>Shemous Beverages & Exports</p>
          </div>
        </div>
      </div>

      {/* Doc Layout */}
      <div className="container" style={{ display: 'flex', gap: '3rem', padding: '3rem 1rem', alignItems: 'flex-start' }} suppressHydrationWarning>
        
        {/* Sticky Sidebar Navigation */}
        <aside style={{ 
            position: 'sticky', 
            top: '120px', 
            width: '260px', 
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
        }} className="hide-on-mobile">
            
            <div suppressHydrationWarning>
                <h3 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Documents</h3>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Link href="/privacy" style={{ padding: '0.5rem 1rem', borderRadius: '6px', color: '#475569', fontWeight: '500', textDecoration: 'none', fontSize: '0.95rem', transition: 'background 0.2s' }} className="doc-link-hover">Privacy Policy</Link>
                    <Link href="/terms" style={{ padding: '0.5rem 1rem', borderRadius: '6px', background: 'var(--primary-15)', color: 'var(--primary-dark)', fontWeight: '700', textDecoration: 'none', fontSize: '0.95rem' }}>Terms of Service</Link>
                </nav>
            </div>

            <div suppressHydrationWarning>
                <h3 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>On this page</h3>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #e2e8f0', paddingLeft: '1rem' }}>
                    <a href="#agreement-to-terms" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="on-page-link">1. Agreement to Terms</a>
                    <a href="#export-wholesale-conditions" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="on-page-link">2. Export & Wholesale</a>
                    <a href="#intellectual-property-rights" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="on-page-link">3. Intellectual Property</a>
                    <a href="#user-representations" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="on-page-link">4. User Representations</a>
                    <a href="#limitation-of-liability" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="on-page-link">5. Limitation of Liability</a>
                </nav>
            </div>
        </aside>

        {/* Main Content Area */}
        <main style={{ 
            flexGrow: 1, 
            background: 'white', 
            padding: '3.5rem', 
            borderRadius: '16px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            border: '1px solid #f1f5f9'
        }} suppressHydrationWarning>
            <ScrollReveal blur direction="up">
                <div style={{ marginBottom: '3rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '2rem' }} suppressHydrationWarning>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f1111', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>Terms of Service</h1>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>Last Updated: October 2023</p>
                </div>

                <div suppressHydrationWarning style={{ display: 'flex', flexDirection: 'column', gap: '3rem', color: '#334155', lineHeight: '1.8', fontSize: '1.05rem' }} className="doc-content">
                    
                    <section id="agreement-to-terms" suppressHydrationWarning>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f1111', marginBottom: '1rem', letterSpacing: '-0.02em' }}>1. Agreement to Terms</h2>
                        <p style={{ marginBottom: '1rem' }}>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Shemous Beverages & Exports ("we", "us", or "our"), concerning your access to and use of our website as well as any other media form, media channel, or mobile website related, linked, or otherwise connected thereto.</p>
                    </section>

                    <section id="export-wholesale-conditions" suppressHydrationWarning>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f1111', marginBottom: '1rem', letterSpacing: '-0.02em' }}>2. Export & Wholesale Conditions</h2>
                        <p style={{ marginBottom: '1rem' }}>All bulk and wholesale orders are subject to a separate export contract which details specific incoterms, shipping responsibilities, and payment milestones. The information provided on this website regarding pricing and availability is subject to change without notice and does not constitute a formal offer to sell.</p>
                    </section>

                    <section id="intellectual-property-rights" suppressHydrationWarning>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f1111', marginBottom: '1rem', letterSpacing: '-0.02em' }}>3. Intellectual Property Rights</h2>
                        <p style={{ marginBottom: '1rem' }}>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by us.</p>
                    </section>

                    <section id="user-representations" suppressHydrationWarning>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f1111', marginBottom: '1rem', letterSpacing: '-0.02em' }}>4. User Representations</h2>
                        <p style={{ marginBottom: '1rem' }}>By using the Site, you represent and warrant that:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyleType: 'disc' }}>
                            <li>All registration information you submit will be true, accurate, current, and complete.</li>
                            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
                        </ul>
                    </section>

                    <section id="limitation-of-liability" suppressHydrationWarning>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f1111', marginBottom: '1rem', letterSpacing: '-0.02em' }}>5. Limitation of Liability</h2>
                        <p style={{ marginBottom: '1rem' }}>In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.</p>
                    </section>

                </div>
            </ScrollReveal>
        </main>
      </div>

      {/* Add some basic styles for the docs hover states and responsive behavior */}
      <style jsx>{`
        .doc-link-hover:hover {
            background: #f1f5f9;
            color: #0f1111 !important;
        }
        .on-page-link:hover {
            color: var(--primary-dark) !important;
        }
        @media (max-width: 768px) {
            .hide-on-mobile {
                display: none !important;
            }
            main {
                padding: 2rem !important;
            }
        }
      `}</style>
    </div>
  )
}
