"use client"

import { useState, useEffect, useRef, memo } from "react"
import Image from "next/image"
import { useInView } from "@/lib/performance-utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  fill?: boolean
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  onLoad?: () => void
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  fill = false,
  sizes = "100vw",
  quality = 75,
  placeholder,
  blurDataURL,
  onLoad,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const { ref, isInView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  })
  const imageRef = useRef<HTMLImageElement>(null)

  // Generate placeholder if not provided
  const generatedBlurDataURL =
    blurDataURL ||
    `data:image/svg+xml;base64,${btoa(
      `<svg width="${width || 100}" height="${height || 100}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="100%" height="100%" fill="#6D28D9" opacity="0.1"/>
      </svg>`,
    )}`

  // Handle image load
  const handleImageLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  // Handle image error
  const handleImageError = () => {
    setError(true)
  }

  // Preload high priority images
  useEffect(() => {
    if (priority && src) {
      const img = new Image()
      img.src = src
    }
  }, [priority, src])

  // Fallback for error state
  if (error) {
    return (
      <div
        ref={ref}
        className={`bg-purple-100 flex items-center justify-center ${className}`}
        style={{ width: width || "100%", height: height || 200 }}
      >
        <span className="text-purple-800 text-sm">Image unavailable</span>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={!fill ? { width: width || "100%", height: height || "auto" } : undefined}
    >
      {(isInView || priority) && (
        <>
          <Image
            ref={imageRef}
            src={src || "/placeholder.svg"}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            sizes={sizes}
            quality={quality}
            className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={priority ? "eager" : "lazy"}
            placeholder={placeholder || "blur"}
            blurDataURL={generatedBlurDataURL}
          />
          {!isLoaded && <div className="absolute inset-0 bg-purple-100/20 animate-pulse" />}
        </>
      )}
    </div>
  )
}

export default memo(OptimizedImage)
