import { useEffect, useRef, useState } from 'react'

/**
 * Auto-rotates through an array of items periodically.
 * Pauses rotation when hoveredIndex is set.
 */
export const useAutoRotate = (count: number, intervalMs = 3000) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (hoveredIndex !== null) {
      if (timer.current) clearInterval(timer.current)
      return
    }

    timer.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count)
    }, intervalMs)

    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [count, intervalMs, hoveredIndex])

  const displayIndex = hoveredIndex ?? activeIndex

  return { activeIndex: displayIndex, setHoveredIndex }
}
