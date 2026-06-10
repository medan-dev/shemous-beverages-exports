'use client'

import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
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
                    <Link href="/privacy" style={{ padding: '0.5rem 1rem', borderRadius: '6px', background: 'var(--primary-15)', color: 'var(--primary-dark)', fontWeight: '700', textDecoration: 'none', fontSize: '0.95rem' }}>Privacy Policy</Link>
                    <Link href="/terms" style={{ padding: '0.5rem 1rem', borderRadius: '6px', color: '#475569', fontWeight: '500', textDecoration: 'none', fontSize: '0.95rem', transition: 'background 0.2s' }} className="doc-link-hover">Terms of Service</Link>
                </nav>
            </div>

            <div suppressHydrationWarning>
                <h3 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>On this page</h3>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #e2e8f0', paddingLeft: '1rem' }}>
                    <a href="#introduction" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="on-page-link">1. Introduction</a>
                    <a href="#information-we-collect" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="on-page-link">2. Information We Collect</a>
                    <a href="#how-we-use-data" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="on-page-link">3. How We Use Your Data</a>
                    <a href="#data-security" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="on-page-link">4. Data Security</a>
                    <a href="#contact-us" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="on-page-link">5. Contact Us</a>
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
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f1111', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>Privacy Policy</h1>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>Last Updated: October 2023</p>
                </div>

                <div suppressHydrationWarning style={{ display: 'flex', flexDirection: 'column', gap: '3rem', color: '#334155', lineHeight: '1.8', fontSize: '1.05rem' }} className="doc-content">
                    
                    <section id="introduction" suppressHydrationWarning>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f1111', marginBottom: '1rem', letterSpacing: '-0.02em' }}>1. Introduction</h2>
                        <p style={{ marginBottom: '1rem' }}>Welcome to Shemous Beverages & Exports. We are committed to protecting your personal data and respecting your privacy. This policy outlines how we collect, use, and protect your information when you interact with our platform or engage with our B2B export services.</p>
                    </section>

                    <section id="information-we-collect" suppressHydrationWarning>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f1111', marginBottom: '1rem', letterSpacing: '-0.02em' }}>2. Information We Collect</h2>
                        <p style={{ marginBottom: '1rem' }}>We may collect and process the following data about you:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyleType: 'disc' }}>
                            <li><strong>Identity Data:</strong> First name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> Billing address, delivery address, email address, and telephone numbers.</li>
                            <li><strong>Financial Data:</strong> Bank account and payment card details (processed securely via third-party gateways).</li>
                            <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of products you have purchased from us.</li>
                        </ul>
                    </section>

                    <section id="how-we-use-data" suppressHydrationWarning>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f1111', marginBottom: '1rem', letterSpacing: '-0.02em' }}>3. How We Use Your Data</h2>
                        <p style={{ marginBottom: '1rem' }}>We will only use your personal data when the law allows us to. Most commonly, we use your data to:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyleType: 'disc' }}>
                            <li>Process and deliver bulk export orders.</li>
                            <li>Manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
                            <li>Administer and protect our business and this website.</li>
                            <li>Deliver relevant website content and advertisements to you.</li>
                        </ul>
                    </section>

                    <section id="data-security" suppressHydrationWarning>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f1111', marginBottom: '1rem', letterSpacing: '-0.02em' }}>4. Data Security</h2>
                        <p style={{ marginBottom: '1rem' }}>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorised way, altered, or disclosed. Access to your personal data is limited to those employees, agents, contractors, and other third parties who have a business need to know.</p>
                    </section>

                    <section id="contact-us" suppressHydrationWarning>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f1111', marginBottom: '1rem', letterSpacing: '-0.02em' }}>5. Contact Us</h2>
                        <p style={{ marginBottom: '1rem' }}>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                            <p style={{ margin: 0, fontWeight: '700', color: '#0f1111' }}>export@Shemousbeveragesexports.shop</p>
                            <p style={{ margin: '0.2rem 0 0 0' }}>Plot 12, Industrial Area, Kampala, Uganda</p>
                        </div>
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
