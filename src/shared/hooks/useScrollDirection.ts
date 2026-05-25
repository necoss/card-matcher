import { useEffect, useRef, useState } from 'react'

type UseScrollDirectionOptions = {
  /** Scroll offset before hide-on-scroll-down is enabled */
  hideThreshold?: number
}

/**
 * Tracks scroll position and whether the navbar should be hidden.
 * Always visible near the top; hides on scroll down, shows on scroll up.
 */
export const useScrollDirection = ({
  hideThreshold = 64,
}: UseScrollDirectionOptions = {}) => {
  const [scrollY, setScrollY] = useState(0)
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    lastScrollY.current = window.scrollY
    setScrollY(window.scrollY)

    const update = () => {
      const currentY = window.scrollY
      setScrollY(currentY)

      if (currentY <= hideThreshold) {
        setIsHidden(false)
      } else if (currentY > lastScrollY.current) {
        setIsHidden(true)
      } else if (currentY < lastScrollY.current) {
        setIsHidden(false)
      }

      lastScrollY.current = currentY
      ticking.current = false
    }

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(update)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hideThreshold])

  return { scrollY, isHidden }
}
