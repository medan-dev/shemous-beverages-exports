'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      style={{ 
        background: 'linear-gradient(to bottom, #001a14, #000c09)', 
        color: '#e2e8f0', 
        paddingTop: '5rem',
        paddingBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative organic shapes */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0 }} />

      <div style={{ width: '100%', maxWidth: '1800px', margin: '0 auto', padding: '0 4vw', position: 'relative', zIndex: 1 }}>
        
        {/* Main Grid Container */}
        <div 
          className="footer-grid"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', 
            gap: '4rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand Column */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link href="/" style={{ display: 'inline-block' }}>
              <img 
                src="/images/shemous_logo_master_transparent.png" 
                alt="Shemous Beverages Logo" 
                style={{ height: '70px', objectFit: 'contain' }} 
              />
            </Link>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '0.95rem', maxWidth: '350px' }}>
              Capturing the raw essence of African nature. We deliver premium, globally-certified organic fruit juices to the world.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="#" className="social-icon"><Twitter size={20} /></a>
              <a href="#" className="social-icon"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Links Column */}
          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Discover</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link href="/products" className="footer-link">Our Products</Link></li>
              <li><Link href="/export" className="footer-link">Global Export</Link></li>
              <li><Link href="/sustainability" className="footer-link">Sustainability</Link></li>
              <li><Link href="/about" className="footer-link">Our Heritage</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link href="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link href="/wholesale" className="footer-link">Wholesale Registration</Link></li>
              <li><Link href="/certifications" className="footer-link">Certifications</Link></li>
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div style={{ flex: '1 1 250px' }}>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>Plot 12, Industrial Area<br/>Kampala, Uganda</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={20} color="#10b981" style={{ flexShrink: 0 }} />
                <span style={{ color: '#94a3b8', fontSize: '0.95rem' }}>+256 705 436 657</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={20} color="#10b981" style={{ flexShrink: 0 }} />
                <span style={{ color: '#94a3b8', fontSize: '0.95rem' }}>export@Shemousbeveragesexports.shop</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)', marginBottom: '2rem' }} />

        {/* Bottom Bar */}
        <div 
          className="footer-bottom"
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            color: '#64748b',
            fontSize: '0.85rem'
          }}
        >
          <div>
            &copy; {currentYear} Shemous Beverages. All rights reserved.{' '}
            <span style={{ opacity: 0.5, margin: '0 0.5rem' }}>|</span>{' '}
            <a href="https://mctech-hubsystems.kesug.com/" target="_blank" rel="noopener noreferrer" className="footer-link-small" style={{ color: 'var(--primary)', fontWeight: '600' }}>Developed by Mctech-hub Systems.</a>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/terms" className="footer-link-small">Terms of Service</Link>
            <Link href="/privacy" className="footer-link-small">Privacy Policy</Link>
          </div>
        </div>

      </div>

      <style jsx>{`
        .footer-link {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: #f97316;
          transform: translateX(4px);
        }
        
        .footer-link-small {
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-link-small:hover {
          color: #cbd5e1;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .social-icon:hover {
          background: var(--primary);
          color: var(--secondary);
          transform: translateY(-3px);
        }

        @media (max-width: 1024px) {
          .footer-grid {
            gridTemplateColumns: 'repeat(2, 1fr)' !important;
          }
        }
        @media (max-width: 768px) {
          .footer-grid {
            gridTemplateColumns: '1fr' !important;
            gap: 3rem !important;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
