"use client"

import { useEffect, useState } from "react"
import { Activity, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PerformanceData {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
  jsHeapSize: number | null
}

const PerformanceMonitor = () => {
  const [visible, setVisible] = useState(false)
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    jsHeapSize: null,
  })

  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== "development") return

    // Function to collect performance metrics
    const collectMetrics = () => {
      // Time to First Byte (TTFB)
      const navigationEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
      const ttfb = navigationEntries.length > 0 ? navigationEntries[0].responseStart : null

      // First Contentful Paint (FCP)
      const paintEntries = performance.getEntriesByType("paint")
      const fcpEntry = paintEntries.find((entry) => entry.name === "first-contentful-paint")
      const fcp = fcpEntry ? fcpEntry.startTime : null

      // JavaScript Heap Size
      const jsHeapSize = (performance as any).memory?.usedJSHeapSize || null

      setPerformanceData((prev) => ({
        ...prev,
        fcp,
        ttfb,
        jsHeapSize,
      }))
    }

    // Collect initial metrics
    collectMetrics()

    // Set up observers for web vitals
    if ("PerformanceObserver" in window) {
      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          const lastEntry = entries[entries.length - 1]
          setPerformanceData((prev) => ({
            ...prev,
            lcp: lastEntry ? lastEntry.startTime : null,
          }))
        })
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })
      } catch (e) {
        console.error("LCP observer error:", e)
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          const firstEntry = entries[0]
          setPerformanceData((prev) => ({
            ...prev,
            fid: firstEntry ? firstEntry.processingStart - firstEntry.startTime : null,
          }))
        })
        fidObserver.observe({ type: "first-input", buffered: true })
      } catch (e) {
        console.error("FID observer error:", e)
      }

      // Cumulative Layout Shift
      try {
        let clsValue = 0
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
            }
          }
          setPerformanceData((prev) => ({
            ...prev,
            cls: clsValue,
          }))
        })
        clsObserver.observe({ type: "layout-shift", buffered: true })
      } catch (e) {
        console.error("CLS observer error:", e)
      }
    }

    // Update metrics periodically
    const intervalId = setInterval(collectMetrics, 2000)

    // Keyboard shortcut to toggle visibility (Ctrl+Shift+P)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault()
        setVisible((v) => !v)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Format bytes to human-readable format
  const formatBytes = (bytes: number | null) => {
    if (bytes === null) return "N/A"
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Format milliseconds
  const formatMs = (ms: number | null) => {
    if (ms === null) return "N/A"
    return `${ms.toFixed(2)}ms`
  }

  if (!visible || process.env.NODE_ENV !== "development") return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-purple-200 rounded-lg shadow-lg p-3 text-xs w-64">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-purple-800 font-medium">
          <Activity className="h-4 w-4 mr-1" />
          Performance Monitor
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setVisible(false)}>
          <X className="h-3 w-3" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-600">FCP:</span>
          <span className="font-mono">{formatMs(performanceData.fcp)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">LCP:</span>
          <span className="font-mono">{formatMs(performanceData.lcp)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">FID:</span>
          <span className="font-mono">{formatMs(performanceData.fid)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">CLS:</span>
          <span className="font-mono">{performanceData.cls !== null ? performanceData.cls.toFixed(3) : "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">TTFB:</span>
          <span className="font-mono">{formatMs(performanceData.ttfb)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">JS Heap:</span>
          <span className="font-mono">{formatBytes(performanceData.jsHeapSize)}</span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-200 text-[10px] text-gray-500">Press Ctrl+Shift+P to toggle</div>
    </div>
  )
}

export default PerformanceMonitor
