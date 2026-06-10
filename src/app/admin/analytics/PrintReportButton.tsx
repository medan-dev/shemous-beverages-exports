'use client'

export default function PrintReportButton() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button 
      onClick={handlePrint}
      style={{ 
         width: '100%', 
         padding: '1rem', 
         background: 'rgba(255, 255, 255, 0.1)', 
         border: '1px solid rgba(255, 255, 255, 0.2)', 
         borderRadius: '12px', 
         color: 'white', 
         fontWeight: '700', 
         cursor: 'pointer',
         transition: '0.2s'
      }}
    >
      Print Full Report
    </button>
  )
}
