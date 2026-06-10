'use client'

import WhatsAppIcon from './WhatsAppIcon'

export default function WhatsAppButton() {
  const phoneNumber = '+256705436657' // Official contact number
  const message = 'Hello Shemous! I am interested in your products.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 100,
        transition: 'transform 0.3s ease'
      }}
      className="whatsapp-float"
    >
      <WhatsAppIcon size={32} fill="white" />
    </a>
  )
}
