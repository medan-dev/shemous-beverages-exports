import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'
import CurvedDivider from './CurvedDivider'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ 
      background: 'var(--secondary)', 
      color: 'white', 
      paddingTop: '3.5rem', 
      paddingBottom: '2.5rem', 
      position: 'relative', 
      marginTop: '-60px', 
      borderRadius: '0', 
      overflow: 'visible',
      boxShadow: '0 -30px 80px rgba(0, 45, 38, 0.1)',
      isolation: 'isolate'
    }}>
      {/* 
        MASTERPIECE S-CURVE v3 (Solid Sense)
        Multi-layered rolling waves for high-fidelity depth.
      */}
      <div style={{ 
        position: 'absolute', 
        top: '-101px', 
        left: 0, 
        width: '100%', 
        height: '120px', 
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
          {/* Back Layer: Lighter Rolling Wave */}
          <path 
            d="M0 90 C360 170 1080 -10 1440 90 V121 H0 V90Z" 
            fill="rgba(0, 77, 64, 0.4)" 
          />
          {/* Front Layer: Solid Theme Wave (S-Curve) */}
          <path 
            d="M0 100 C480 180 960 -20 1440 100 V121 H0 V100Z" 
            fill="var(--secondary)" 
          />
        </svg>
      </div>

      
      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '2.5rem', marginBottom: '3rem', justifyItems: 'center' }}>
          {/* Brand Column: Compressed Branding */}
          {/* Brand Column: Sensible spacing without logo */}
          <div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', marginBottom: '1.2rem', fontSize: '0.85rem', fontWeight: '450', maxWidth: '280px', margin: '0 auto 1.2rem auto' }}>
              Uganda's premier exporter of organic fruit juices. Bringing the goodness of the Pearl of Africa to the world.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <a href="#" className="btn-hover" style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', color: 'var(--primary)', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex' }}><Facebook size={18} /></a>
              <a href="#" className="btn-hover" style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', color: 'var(--primary)', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex' }}><Instagram size={18} /></a>
              <a href="#" className="btn-hover" style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', color: 'var(--primary)', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex' }}><Twitter size={18} /></a>
            </div>
          </div>

          {/* Quick Links: Serious hierarchy, compressed spacing */}
          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '1.2rem', fontSize: '0.8rem', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Quick Links</h4>
             <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'center' }}>
               <li><Link href="/products" className="btn-hover" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none', fontWeight: '950', fontSize: '1rem', display: 'block' }}>Products</Link></li>
               <li><Link href="/export" className="btn-hover" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none', fontWeight: '950', fontSize: '1rem', display: 'block' }}>Export</Link></li>
               <li><Link href="/about" className="btn-hover" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none', fontWeight: '950', fontSize: '1rem', display: 'block' }}>About Us</Link></li>
               <li><Link href="/contact" className="btn-hover" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none', fontWeight: '950', fontSize: '1rem', display: 'block' }}>Contact</Link></li>
             </ul>
          </div>

          {/* Contact: Precise details, compressed grid */}
          <div>
            <h4 style={{ color: 'var(--primary)', marginBottom: '1.2rem', fontSize: '0.8rem', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
              <li style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                <MapPin size={16} color="var(--primary)" style={{ marginTop: '0.15rem' }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem', fontWeight: '500' }}>Plot 12, Ind. Area, Kampala</span>
              </li>
              <li style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
                <Phone size={16} color="var(--primary)" />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem', fontWeight: '500' }}>+256 705 436 657</span>
              </li>
              <li style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
                <Mail size={16} color="var(--primary)" />
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem', fontWeight: '500' }}>export@shemous.co.ug</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Compressed Footer Base */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', fontWeight: '500', letterSpacing: '0.05em' }}>
          &copy; {currentYear} Shemous Beverages & Exports.
        </div>
      </div>
    </footer>
  )
}
