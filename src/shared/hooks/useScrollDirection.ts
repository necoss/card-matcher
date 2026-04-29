import { useEffect, useRef, useState } from 'react'

/**
 * Detects scroll direction for navbar hide/show behavior.
 * Returns 'up' | 'down' | null
 */
export const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState<'up' | 'down' | null>(null)
  const lastScrollY = useRef<number>(0)
  const ticking = useRef(false)

  useEffect(() => {
    const updateScrollDir = () => {
      const currentY = window.scrollY
      const diff = currentY - lastScrollY.current

      if (Math.abs(diff) > 4) {
        setScrollDir(currentY < 16 ? 'up' : diff < 0 ? 'up' : 'down')
        lastScrollY.current = currentY
      }

      ticking.current = false
    }

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDir)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollDir
}
