'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Portal({ children }: { children: React.ReactNode }) {
  const ref = useRef<Element | null>(null)

  useEffect(() => {
    ref.current = document.body
  }, [])

  if (!ref.current) return null
  return createPortal(children, ref.current)
}
