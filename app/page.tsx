"use client"

import { useState } from "react"
import { AudioVisualizer } from "@/components/audio-visualizer"
import { MediaControls } from "@/components/media-controls"
import { StatusIndicator } from "@/components/status-indicator"
import { CoinBadge } from "@/components/coin-badge"

export default function AlgoRhythmDashboard() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(75)

  console.log("[v0] AlgoRhythmDashboard rendering")

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: 'hsl(240 10% 4%)', color: 'hsl(0 0% 95%)' }}>
      {/* Header */}
      <header className="relative flex items-center justify-between p-6">
        {/* Status Indicator - Top Left */}
        <StatusIndicator connected={true} />

        {/* Logo - Center */}
        <h1 className="text-xl font-semibold tracking-tight" style={{ color: 'hsl(0 0% 95%)' }}>
          Algo<span style={{ color: 'hsl(165 80% 50%)' }}>Rhythm</span>
        </h1>

        {/* Coin Badge - Top Right */}
        <CoinBadge amount={500} />
      </header>

      {/* Main Content - Visualizer */}
      <div className="flex-1 flex items-center justify-center">
        <AudioVisualizer isPlaying={isPlaying} />
      </div>

      {/* Footer - Media Controls */}
      <footer className="p-8 pb-12">
        <MediaControls
          isPlaying={isPlaying}
          volume={volume}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onVolumeChange={setVolume}
        />
      </footer>

      {/* Ambient background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </main>
  )
}
