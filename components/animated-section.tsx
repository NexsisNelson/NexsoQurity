"use client"

import type React from "react"

import { type ReactNode, useEffect, useState } from "react"
import useIntersectionObserver from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "slide-in-left" | "slide-in-right" | "zoom-in" | "bounce"
  delay?: number
  threshold?: number
  duration?: number
  once?: boolean
}

export default function AnimatedSection({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
  duration = 0.6,
  once = true,
}: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold, freezeOnceVisible: once })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isIntersecting) {
      setHasAnimated(true)
    }
  }, [isIntersecting])

  const getAnimationStyles = () => {
    if (!isIntersecting && !hasAnimated) {
      switch (animation) {
        case "fade-up":
          return "opacity-0 translate-y-10"
        case "fade-in":
          return "opacity-0"
        case "slide-in-left":
          return "opacity-0 -translate-x-10"
        case "slide-in-right":
          return "opacity-0 translate-x-10"
        case "zoom-in":
          return "opacity-0 scale-95"
        case "bounce":
          return "opacity-0 translate-y-4"
        default:
          return "opacity-0"
      }
    }
    return ""
  }

  const getTransitionStyles = () => {
    return `transition-all duration-${Math.round(duration * 1000)} ease-out delay-${delay * 1000}`
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(className, getAnimationStyles(), getTransitionStyles())}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
