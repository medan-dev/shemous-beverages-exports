'use client'

interface CurvedDividerProps {
  color?: string;
  backgroundColor?: string;
  position?: 'top' | 'bottom';
  height?: string;
  flip?: boolean;
}

const path = "M0,160L80,186.7C160,213,320,267,480,261.3C640,256,800,192,960,170.7C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"

const CurvedDivider = ({ 
  color = 'white', 
  backgroundColor = 'transparent', 
  position = 'bottom',
  height = '120px',
  flip = false
}: CurvedDividerProps) => {
  return (
    <div style={{ 
      position: 'absolute', 
      [position]: 0, 
      left: 0, 
      width: '100%', 
      height: height, 
      overflow: 'hidden', 
      lineHeight: 0, 
      zIndex: 5,
      backgroundColor: backgroundColor,
      transform: flip ? `scaleX(-1) ${position === 'top' ? 'rotate(180deg)' : ''}` : position === 'top' ? 'rotate(180deg)' : 'none'
    }}>
      <svg 
        viewBox="0 0 1440 320" 
        preserveAspectRatio="none" 
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <path fill={color} fillOpacity="1" d={path} />
      </svg>
    </div>
  )
}

export default CurvedDivider
