"use client"

import { useEffect, useState, useCallback } from "react"

/**
 * Utility to measure and report component render time
 * @param componentName - Name of the component being measured
 */
export function useRenderTime(componentName: string) {
  useEffect(() => {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime

      // Only log in development
      if (process.env.NODE_ENV === "development") {
        console.log(`[Performance] ${componentName} rendered in ${renderTime.toFixed(2)}ms`)
      }
    }
  }, [componentName])
}

/**
 * Debounce function to limit how often a function is called
 * @param func - Function to debounce
 * @param wait - Time to wait in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Hook to detect if the page is being prerendered
 */
export function useIsPrerendering() {
  const [isPrerendering, setIsPrerendering] = useState(true)

  useEffect(() => {
    setIsPrerendering(false)
  }, [])

  return isPrerendering
}

/**
 * Hook to detect if the page is visible
 */
export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible")
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  return isVisible
}

/**
 * Hook to detect network status
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return isOnline
}

/**
 * Hook to prefetch resources
 * @param urls - Array of URLs to prefetch
 */
export function usePrefetch(urls: string[]) {
  useEffect(() => {
    if (!urls.length) return

    const prefetchLink = document.createElement("link")
    prefetchLink.rel = "prefetch"

    urls.forEach((url) => {
      prefetchLink.href = url
      document.head.appendChild(prefetchLink.cloneNode())
    })
  }, [urls])
}

/**
 * Hook to measure and report component load time
 * @param componentName - Name of the component being measured
 */
export function useLoadTime(componentName: string) {
  useEffect(() => {
    const startTime = performance.now()

    return () => {
      const loadTime = performance.now() - startTime

      // Report to analytics in production
      if (process.env.NODE_ENV === "production") {
        // Replace with your analytics service
        // analytics.trackTiming('Component Load', loadTime, componentName);
      }
    }
  }, [componentName])
}

/**
 * Hook to detect idle time and preload resources
 * @param preloadFn - Function to call when the user is idle
 * @param timeout - Time to wait before considering the user idle
 */
export function useIdlePreload(preloadFn: () => void, timeout = 2000) {
  useEffect(() => {
    let idleTimer: number

    const handleUserActivity = debounce(() => {
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(preloadFn, timeout)
    }, 200)

    // Set up event listeners for user activity
    window.addEventListener("mousemove", handleUserActivity)
    window.addEventListener("keydown", handleUserActivity)
    window.addEventListener("scroll", handleUserActivity)
    window.addEventListener("touchstart", handleUserActivity)

    // Initial setup
    idleTimer = window.setTimeout(preloadFn, timeout)

    return () => {
      window.clearTimeout(idleTimer)
      window.removeEventListener("mousemove", handleUserActivity)
      window.removeEventListener("keydown", handleUserActivity)
      window.removeEventListener("scroll", handleUserActivity)
      window.removeEventListener("touchstart", handleUserActivity)
    }
  }, [preloadFn, timeout])
}

/**
 * Utility to measure performance metrics
 */
export const PerformanceMetrics = {
  markStart: (label: string) => {
    performance.mark(`${label}-start`)
  },

  markEnd: (label: string) => {
    performance.mark(`${label}-end`)
    performance.measure(label, `${label}-start`, `${label}-end`)

    const entries = performance.getEntriesByName(label)
    const duration = entries[0]?.duration || 0

    if (process.env.NODE_ENV === "development") {
      console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`)
    }

    return duration
  },

  clearMarks: (label: string) => {
    performance.clearMarks(`${label}-start`)
    performance.clearMarks(`${label}-end`)
    performance.clearMeasures(label)
  },
}

/**
 * Hook to optimize animations based on device performance
 */
export function useOptimizedAnimations() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)
  const [devicePerformance, setDevicePerformance] = useState<"low" | "medium" | "high">("high")

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setShouldReduceMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)

    // Estimate device performance
    const estimatePerformance = () => {
      const start = performance.now()
      let count = 0

      while (performance.now() - start < 5) {
        count++
      }

      if (count < 10000) return "low"
      if (count < 50000) return "medium"
      return "high"
    }

    setDevicePerformance(estimatePerformance())

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return { shouldReduceMotion, devicePerformance }
}

/**
 * Hook to detect when an element is in viewport
 * @param options - IntersectionObserver options
 */
export function useInView(options = {}) {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  const callback = useCallback(([entry]: IntersectionObserverEntry[]) => {
    setIsInView(entry.isIntersecting)
  }, [])

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(callback, options)
    observer.observe(ref)

    return () => observer.disconnect()
  }, [ref, callback, options])

  return { ref: setRef, isInView }
}
