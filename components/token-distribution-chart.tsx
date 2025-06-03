"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

export default function TokenDistributionChart() {
  const [activeSegment, setActiveSegment] = useState<number | null>(null)
  const [isAnimated, setIsAnimated] = useState(false)

  const distributionData = [
    {
      label: "Community & Ecosystem",
      percentage: 40,
      color: "#14b8a6",
      description: "Community rewards, airdrops, and ecosystem development",
    },
    {
      label: "Team & Advisors",
      percentage: 20,
      color: "#c026d3",
      description: "Core team and advisor allocations with vesting",
    },
    { label: "Treasury", percentage: 15, color: "#f59e0b", description: "Strategic reserves for future development" },
    { label: "Liquidity", percentage: 15, color: "#8b5cf6", description: "DEX liquidity and market making" },
    { label: "Marketing", percentage: 10, color: "#3b82f6", description: "Marketing campaigns and partnerships" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Auto-rotate active segment
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSegment((prev) => {
        if (prev === null) return 0
        return (prev + 1) % distributionData.length
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [distributionData.length])

  const createPieSlice = (data: (typeof distributionData)[0], index: number, startAngle: number) => {
    const angle = (data.percentage / 100) * 360
    const endAngle = startAngle + angle
    const isLargeArc = angle > 180 ? 1 : 0

    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

    const pathData = [`M 50 50`, `L ${x1} ${y1}`, `A 40 40 0 ${isLargeArc} 1 ${x2} ${y2}`, `Z`].join(" ")

    const isActive = activeSegment === index
    const scale = isActive ? 1.05 : 1
    const opacity = isActive ? 1 : 0.8

    return (
      <g key={index}>
        <path
          d={pathData}
          fill={data.color}
          stroke="#1f2937"
          strokeWidth="1"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "50px 50px",
            transition: "all 0.3s ease",
            opacity: isAnimated ? opacity : 0,
            animation: isAnimated ? `fadeInSlice 0.6s ease-out ${index * 0.1}s both` : "none",
          }}
          onMouseEnter={() => setActiveSegment(index)}
          onMouseLeave={() => setActiveSegment(null)}
          className="cursor-pointer"
        />
        {/* Percentage label */}
        {isAnimated && (
          <text
            x={50 + 25 * Math.cos((((startAngle + endAngle) / 2) * Math.PI) / 180)}
            y={50 + 25 * Math.sin((((startAngle + endAngle) / 2) * Math.PI) / 180)}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-bold fill-white"
            style={{
              opacity: isActive ? 1 : 0.9,
              transition: "opacity 0.3s ease",
            }}
          >
            {data.percentage}%
          </text>
        )}
      </g>
    )
  }

  let currentAngle = -90 // Start from top

  return (
    <div className="w-full">
      <style jsx>{`
        @keyframes fadeInSlice {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 0.8;
            transform: scale(1);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
      `}</style>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Chart */}
        <div className="relative">
          <svg width="300" height="300" viewBox="0 0 100 100" className="w-64 h-64 sm:w-72 sm:h-72">
            {/* Background circle */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3" />

            {/* Pie slices */}
            {distributionData.map((data, index) => {
              const slice = createPieSlice(data, index, currentAngle)
              currentAngle += (data.percentage / 100) * 360
              return slice
            })}

            {/* Center circle */}
            <circle cx="50" cy="50" r="15" fill="#111827" stroke="#374151" strokeWidth="1" />

            {/* Center text */}
            <text x="50" y="47" textAnchor="middle" className="text-xs font-bold fill-white">
              $NEXQ
            </text>
            <text x="50" y="55" textAnchor="middle" className="text-xs fill-gray-400">
              100M
            </text>
          </svg>

          {/* Animated background glow */}
          <div
            className="absolute inset-0 rounded-full opacity-20 blur-xl"
            style={{
              background: `conic-gradient(from 0deg, ${distributionData.map((d) => d.color).join(", ")})`,
              animation: "pulse 4s ease-in-out infinite",
            }}
          />
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 w-full lg:w-auto">
          {distributionData.map((data, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                activeSegment === index
                  ? "border-gray-600 bg-gray-800/50 scale-105"
                  : "border-gray-800 bg-gray-900/30 hover:border-gray-700"
              }`}
              onMouseEnter={() => setActiveSegment(index)}
              onMouseLeave={() => setActiveSegment(null)}
              style={{
                animation: isAnimated ? `fadeInSlice 0.6s ease-out ${index * 0.1 + 0.3}s both` : "none",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: data.color }} />
                  <span className="text-sm font-medium text-white break-words">{data.label}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {data.percentage}%
                </Badge>
              </div>
              <p className="text-xs text-gray-400 break-words">{data.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
