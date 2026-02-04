"use client"

import React from "react"

import { createContext, useContext, useMemo } from "react"

interface DynamicColor {
  primary: string
  primaryRgb: string
  hue: number
}

const ColorContext = createContext<DynamicColor>({
  primary: "rgb(0, 210, 190)",
  primaryRgb: "0, 210, 190",
  hue: 174,
})

export function useColor() {
  return useContext(ColorContext)
}

// Color palette that cycles through multiple times as the song plays
const colorPalette = [
  { hue: 174, name: "cyan" },
  { hue: 200, name: "blue" },
  { hue: 260, name: "purple" },
  { hue: 320, name: "magenta" },
  { hue: 10, name: "red" },
  { hue: 45, name: "gold" },
  { hue: 120, name: "green" },
  { hue: 174, name: "cyan" },
  { hue: 200, name: "blue" },
  { hue: 260, name: "purple" },
  { hue: 320, name: "magenta" },
  { hue: 10, name: "red" },
  { hue: 45, name: "gold" },
  { hue: 120, name: "green" },
  { hue: 174, name: "cyan" },
  { hue: 200, name: "blue" },
  { hue: 260, name: "purple" },
  { hue: 320, name: "magenta" },
  { hue: 10, name: "red" },
  { hue: 45, name: "gold" },
  { hue: 120, name: "green" },
  { hue: 174, name: "cyan" },
]

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
  }
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}

function interpolateHue(progress: number): number {
  const segments = colorPalette.length - 1
  const segmentProgress = (progress / 100) * segments
  const segmentIndex = Math.min(Math.floor(segmentProgress), segments - 1)
  const localProgress = segmentProgress - segmentIndex
  
  const startHue = colorPalette[segmentIndex].hue
  const endHue = colorPalette[segmentIndex + 1].hue
  
  // Handle hue wraparound
  let diff = endHue - startHue
  if (diff > 180) diff -= 360
  if (diff < -180) diff += 360
  
  let result = startHue + diff * localProgress
  if (result < 0) result += 360
  if (result >= 360) result -= 360
  
  return result
}

interface ColorProviderProps {
  children: React.ReactNode
  progress: number
  isPlaying: boolean
}

export function ColorProvider({ children, progress, isPlaying }: ColorProviderProps) {
  const color = useMemo(() => {
    const hue = interpolateHue(progress)
    const [r, g, b] = hslToRgb(hue, 85, 50)
    
    return {
      primary: `rgb(${r}, ${g}, ${b})`,
      primaryRgb: `${r}, ${g}, ${b}`,
      hue,
    }
  }, [progress])

  return (
    <ColorContext.Provider value={color}>
      <div
        style={{
          ["--dynamic-primary" as string]: color.primary,
          ["--dynamic-primary-rgb" as string]: color.primaryRgb,
          ["--dynamic-hue" as string]: color.hue,
        }}
      >
        {children}
      </div>
    </ColorContext.Provider>
  )
}
