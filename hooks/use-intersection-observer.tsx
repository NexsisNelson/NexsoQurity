"use client"

import { useState, useEffect, useRef } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export default function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when observer callback fires
        setIsIntersecting(entry.isIntersecting)

        // If we only want to detect once, unobserve after it becomes visible
        if (entry.isIntersecting && freezeOnceVisible) {
          observer.unobserve(node)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)

    return () => {
      observer.unobserve(node)
    }
  }, [threshold, rootMargin, freezeOnceVisible])

  return { ref, isIntersecting }
}
