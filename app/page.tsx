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
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-10 md:py-6">
        {/* Left: Logo + Status */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Algo<span className="text-cyan-400">Rhythm</span>
          </h1>
          <StatusIndicator connected={true} />
        </div>

        {/* Right: Coin Badge */}
        <CoinBadge amount={500} />
      </header>

      {/* Main Content - Centered Visualizer */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <AudioVisualizer isPlaying={isPlaying} />
      </div>

      {/* Footer - Media Controls */}
      <footer className="px-6 py-8 md:px-10 md:py-10">
        <MediaControls
          isPlaying={isPlaying}
          volume={volume}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onVolumeChange={setVolume}
        />
      </footer>
    </main>
  )
}
