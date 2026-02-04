"use client"

import { useState } from "react"
import { AudioVisualizer } from "@/components/audio-visualizer"
import { MediaControls } from "@/components/media-controls"
import { StatusIndicator } from "@/components/status-indicator"
import { CoinBadge } from "@/components/coin-badge"

export default function AlgoRhythmDashboard() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(75)

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        {/* Status Indicator - Top Left */}
        <StatusIndicator connected={true} />

        {/* Logo - Center */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Algo<span className="text-primary">Rhythm</span>
          </h1>
        </div>

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
