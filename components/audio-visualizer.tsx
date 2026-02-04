"use client"

import { useEffect, useRef } from "react"
import { useColor } from "./color-context"

interface AudioVisualizerProps {
  isPlaying: boolean
}

interface Bubble {
  x: number
  y: number
  radius: number
  targetRadius: number
  vx: number
  vy: number
  alpha: number
  wobble: number
  wobbleSpeed: number
  hueOffset: number
  lifespan: number
  age: number
}

export function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)
  const bubblesRef = useRef<Bubble[]>([])
  const lastBeatRef = useRef(0)
  const beatIntensityRef = useRef(0)
  const { primaryRgb, hue } = useColor()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const createBubble = (x: number, y: number, size: number = 1) => {
      const baseRadius = 15 + Math.random() * 40 * size
      bubblesRef.current.push({
        x,
        y,
        radius: 0,
        targetRadius: baseRadius,
        vx: (Math.random() - 0.5) * 2,
        vy: -0.5 - Math.random() * 1.5,
        alpha: 0.6 + Math.random() * 0.4,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        hueOffset: (Math.random() - 0.5) * 30,
        lifespan: 150 + Math.random() * 100,
        age: 0,
      })
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const centerX = width / 2
      const centerY = height / 2

      // Clear with slight fade for smoother trails
      ctx.fillStyle = "rgba(8, 10, 20, 0.12)"
      ctx.fillRect(0, 0, width, height)

      timeRef.current += isPlaying ? 0.03 : 0.01

      // Beat detection simulation
      const beatFrequency = isPlaying ? 0.35 : 2.5
      const timeSinceLastBeat = timeRef.current - lastBeatRef.current

      if (timeSinceLastBeat > beatFrequency && isPlaying) {
        lastBeatRef.current = timeRef.current
        beatIntensityRef.current = 0.8 + Math.random() * 0.4

        // Only spawn a bubble every few beats (30% chance) and max 5 bubbles on screen
        if (Math.random() < 0.3 && bubblesRef.current.length < 5) {
          const spawnX = Math.random() * width
          const spawnY = height * 0.6 + Math.random() * height * 0.4
          createBubble(spawnX, spawnY, beatIntensityRef.current)
        }

        // Make existing bubbles pulse
        bubblesRef.current.forEach((bubble) => {
          bubble.targetRadius *= 1.15
          bubble.vy -= 0.5
        })
      }

      // No ambient bubbles when paused

      beatIntensityRef.current *= 0.94

      // Draw and update bubbles
      bubblesRef.current = bubblesRef.current.filter((bubble) => {
        bubble.age++
        
        // Smooth radius animation
        bubble.radius += (bubble.targetRadius - bubble.radius) * 0.1
        
        // Movement with wobble
        bubble.wobble += bubble.wobbleSpeed
        bubble.x += bubble.vx + Math.sin(bubble.wobble) * 0.8
        bubble.y += bubble.vy * (isPlaying ? 1 : 0.3)
        
        // Slow down horizontal movement
        bubble.vx *= 0.99
        
        // Fade out based on age
        const lifeProgress = bubble.age / bubble.lifespan
        const fadeAlpha = bubble.alpha * (1 - Math.pow(lifeProgress, 2))

        if (fadeAlpha <= 0.01 || bubble.y < -bubble.radius * 2) return false

        // Calculate bubble color with hue offset
        const bubbleHue = (hue + bubble.hueOffset + 360) % 360
        const hslColor = `hsla(${bubbleHue}, 70%, 60%, ${fadeAlpha})`
        const hslColorLight = `hsla(${bubbleHue}, 80%, 75%, ${fadeAlpha * 0.8})`
        const hslColorGlow = `hsla(${bubbleHue}, 70%, 60%, ${fadeAlpha * 0.3})`

        // Outer glow
        const glowGrad = ctx.createRadialGradient(
          bubble.x, bubble.y, bubble.radius * 0.5,
          bubble.x, bubble.y, bubble.radius * 2
        )
        glowGrad.addColorStop(0, hslColorGlow)
        glowGrad.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius * 2, 0, Math.PI * 2)
        ctx.fillStyle = glowGrad
        ctx.fill()

        // Main bubble body with gradient
        const bubbleGrad = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          0,
          bubble.x,
          bubble.y,
          bubble.radius
        )
        bubbleGrad.addColorStop(0, `hsla(${bubbleHue}, 60%, 80%, ${fadeAlpha * 0.4})`)
        bubbleGrad.addColorStop(0.4, `hsla(${bubbleHue}, 70%, 60%, ${fadeAlpha * 0.3})`)
        bubbleGrad.addColorStop(0.8, `hsla(${bubbleHue}, 70%, 50%, ${fadeAlpha * 0.2})`)
        bubbleGrad.addColorStop(1, `hsla(${bubbleHue}, 70%, 40%, ${fadeAlpha * 0.1})`)

        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
        ctx.fillStyle = bubbleGrad
        ctx.fill()

        // Bubble outline
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${bubbleHue}, 70%, 70%, ${fadeAlpha * 0.5})`
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Highlight reflection (top-left shine)
        const highlightX = bubble.x - bubble.radius * 0.35
        const highlightY = bubble.y - bubble.radius * 0.35
        const highlightRadius = bubble.radius * 0.25

        const highlightGrad = ctx.createRadialGradient(
          highlightX, highlightY, 0,
          highlightX, highlightY, highlightRadius
        )
        highlightGrad.addColorStop(0, `rgba(255, 255, 255, ${fadeAlpha * 0.8})`)
        highlightGrad.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.arc(highlightX, highlightY, highlightRadius, 0, Math.PI * 2)
        ctx.fillStyle = highlightGrad
        ctx.fill()

        // Secondary smaller highlight
        const highlight2X = bubble.x - bubble.radius * 0.15
        const highlight2Y = bubble.y - bubble.radius * 0.5
        const highlight2Radius = bubble.radius * 0.12

        ctx.beginPath()
        ctx.arc(highlight2X, highlight2Y, highlight2Radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha * 0.5})`
        ctx.fill()

        // Bottom reflection arc
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius * 0.85, Math.PI * 0.15, Math.PI * 0.85)
        ctx.strokeStyle = `rgba(255, 255, 255, ${fadeAlpha * 0.15})`
        ctx.lineWidth = 2
        ctx.stroke()

        return true
      })

      // Draw ECG heartbeat lines
      const drawHeartbeatLine = (yOffset: number, amplitude: number, phaseOffset: number) => {
        ctx.beginPath()
        ctx.moveTo(0, centerY + yOffset)

        for (let x = 0; x < width; x += 2) {
          const normalizedX = (x / width + timeRef.current * (isPlaying ? 0.3 : 0.05) + phaseOffset) % 1
          let y = centerY + yOffset

          const beatPosition = normalizedX % 0.25
          if (beatPosition < 0.02) {
            y -= amplitude * 0.3 * Math.sin(beatPosition / 0.02 * Math.PI)
          } else if (beatPosition < 0.05) {
            y += amplitude * Math.sin((beatPosition - 0.02) / 0.03 * Math.PI)
          } else if (beatPosition < 0.08) {
            y -= amplitude * 0.6 * Math.sin((beatPosition - 0.05) / 0.03 * Math.PI)
          } else if (beatPosition < 0.12) {
            y += amplitude * 0.2 * Math.sin((beatPosition - 0.08) / 0.04 * Math.PI)
          }

          if (isPlaying) {
            y += (Math.random() - 0.5) * 2
          }

          ctx.lineTo(x, y)
        }

        const lineAlpha = isPlaying ? 0.25 : 0.1
        ctx.strokeStyle = `rgba(${primaryRgb}, ${lineAlpha})`
        ctx.lineWidth = 1.5
        ctx.shadowColor = `rgba(${primaryRgb}, ${lineAlpha})`
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      drawHeartbeatLine(-height * 0.3, 30, 0)
      drawHeartbeatLine(0, 40, 0.33)
      drawHeartbeatLine(height * 0.3, 30, 0.66)

      // Central pulsing heart
      const corePulse = 1 + beatIntensityRef.current * 0.4 + Math.sin(timeRef.current * 3) * 0.08
      const heartSize = 55 * corePulse

      // Draw heart shape function
      const drawHeart = (x: number, y: number, size: number) => {
        ctx.beginPath()
        const topY = y - size * 0.3
        ctx.moveTo(x, topY + size * 0.5)
        // Left curve
        ctx.bezierCurveTo(
          x - size * 0.5, topY,
          x - size, topY + size * 0.5,
          x, y + size * 0.6
        )
        // Right curve
        ctx.bezierCurveTo(
          x + size, topY + size * 0.5,
          x + size * 0.5, topY,
          x, topY + size * 0.5
        )
        ctx.closePath()
      }

      // Heart glow
      const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, heartSize * 4)
      coreGlow.addColorStop(0, `rgba(${primaryRgb}, ${isPlaying ? 0.3 : 0.1})`)
      coreGlow.addColorStop(0.5, `rgba(${primaryRgb}, ${isPlaying ? 0.1 : 0.03})`)
      coreGlow.addColorStop(1, "transparent")
      ctx.fillStyle = coreGlow
      ctx.fillRect(centerX - heartSize * 4, centerY - heartSize * 4, heartSize * 8, heartSize * 8)

      // Heart gradient fill
      const heartGrad = ctx.createRadialGradient(centerX, centerY - heartSize * 0.2, 0, centerX, centerY, heartSize * 1.2)
      heartGrad.addColorStop(0, `rgba(255, 255, 255, ${isPlaying ? 0.95 : 0.6})`)
      heartGrad.addColorStop(0.4, `rgba(${primaryRgb}, ${isPlaying ? 0.85 : 0.4})`)
      heartGrad.addColorStop(1, `rgba(${primaryRgb}, 0.2)`)

      // Draw filled heart with glow
      ctx.shadowColor = `rgba(${primaryRgb}, 0.9)`
      ctx.shadowBlur = 30
      drawHeart(centerX, centerY, heartSize)
      ctx.fillStyle = heartGrad
      ctx.fill()

      // Heart outline
      ctx.shadowBlur = 15
      drawHeart(centerX, centerY, heartSize)
      ctx.strokeStyle = `rgba(255, 255, 255, ${isPlaying ? 0.6 : 0.3})`
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.shadowBlur = 0

      // Inner highlight on heart
      ctx.save()
      ctx.clip()
      const highlightGrad = ctx.createRadialGradient(
        centerX - heartSize * 0.25, centerY - heartSize * 0.3, 0,
        centerX - heartSize * 0.25, centerY - heartSize * 0.3, heartSize * 0.4
      )
      highlightGrad.addColorStop(0, `rgba(255, 255, 255, ${isPlaying ? 0.5 : 0.25})`)
      highlightGrad.addColorStop(1, "transparent")
      ctx.fillStyle = highlightGrad
      ctx.fillRect(centerX - heartSize, centerY - heartSize, heartSize * 2, heartSize * 2)
      ctx.restore()

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying, primaryRgb, hue])

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at center, rgba(${primaryRgb}, ${isPlaying ? 0.06 : 0.02}) 0%, transparent 70%)`,
        }}
      />

      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(${primaryRgb}, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${primaryRgb}, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  )
}
