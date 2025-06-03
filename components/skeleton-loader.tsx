"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "default" | "card" | "text" | "avatar" | "button" | "table"
  count?: number
  width?: string | number
  height?: string | number
  animated?: boolean
}

const Skeleton = ({ className, variant = "default", count = 1, width, height, animated = true }: SkeletonProps) => {
  const baseClasses = cn(
    "bg-gradient-to-r from-purple-100/70 via-purple-200/70 to-purple-100/70",
    animated && "animate-pulse",
    className,
  )

  // Generate skeleton based on variant
  const renderSkeleton = (index: number) => {
    switch (variant) {
      case "card":
        return (
          <div
            key={index}
            className={cn(baseClasses, "rounded-lg overflow-hidden")}
            style={{ width: width || "100%", height: height || "200px" }}
          >
            <div className="h-1/2 bg-purple-200/50"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-purple-200/50 rounded w-3/4"></div>
              <div className="h-3 bg-purple-200/50 rounded w-full"></div>
              <div className="h-3 bg-purple-200/50 rounded w-5/6"></div>
            </div>
          </div>
        )

      case "text":
        return (
          <div key={index} className="space-y-2">
            <div className={cn(baseClasses, "h-4 rounded w-full")}></div>
            <div className={cn(baseClasses, "h-4 rounded w-5/6")}></div>
            <div className={cn(baseClasses, "h-4 rounded w-4/6")}></div>
          </div>
        )

      case "avatar":
        return (
          <div
            key={index}
            className={cn(baseClasses, "rounded-full")}
            style={{
              width: width || "40px",
              height: height || "40px",
            }}
          ></div>
        )

      case "button":
        return (
          <div
            key={index}
            className={cn(baseClasses, "rounded-md")}
            style={{
              width: width || "100px",
              height: height || "36px",
            }}
          ></div>
        )

      case "table":
        return (
          <div key={index} className="space-y-3">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={cn(baseClasses, "h-8 rounded flex-1")}></div>
              ))}
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-2">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className={cn(baseClasses, "h-6 rounded flex-1")}></div>
                ))}
              </div>
            ))}
          </div>
        )

      default:
        return (
          <div
            key={index}
            className={cn(baseClasses, "rounded")}
            style={{
              width: width || "100%",
              height: height || "16px",
            }}
          ></div>
        )
    }
  }

  // Render multiple skeletons if count > 1
  if (count > 1) {
    return <div className="space-y-4">{[...Array(count)].map((_, index) => renderSkeleton(index))}</div>
  }

  return renderSkeleton(0)
}

export default memo(Skeleton)
