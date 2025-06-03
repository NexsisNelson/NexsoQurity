"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  // Canvas reference for drawing
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Define colors for gradient points
    const colors = [
      { r: 20, g: 184, b: 166, a: 0.15 }, // teal
      { r: 13, g: 148, b: 136, a: 0.12 }, // darker teal
      { r: 0, g: 0, b: 0, a: 0.2 }, // black
    ]

    // Create simplified gradient points
    const gradientPoints = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 300 + 200,
      color: colors[i % colors.length],
    }))

    // Animation loop
    const animate = () => {
      // Clear canvas with black background
      ctx.fillStyle = "rgb(0, 0, 0)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw each gradient point
      gradientPoints.forEach((point) => {
        // Move point based on velocity
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1

        // Create and draw gradient
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)
        gradient.addColorStop(0, `rgba(${point.color.r}, ${point.color.g}, ${point.color.b}, ${point.color.a})`)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      // Add subtle grid pattern
      ctx.strokeStyle = "rgba(20, 184, 166, 0.03)"
      ctx.lineWidth = 0.5

      // Vertical lines
      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" style={{ pointerEvents: "none" }} />
}
