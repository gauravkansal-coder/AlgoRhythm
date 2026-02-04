"use client"

import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"

interface MediaControlsProps {
  isPlaying: boolean
  volume: number
  onPlayPause: () => void
  onVolumeChange: (value: number) => void
}

export function MediaControls({
  isPlaying,
  volume,
  onPlayPause,
  onVolumeChange,
}: MediaControlsProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Track Info */}
      <div className="text-center">
        <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
          Lo-Fi Focus
        </h2>
        <p className="text-sm text-zinc-500 font-mono">
          {"// System Idle"}
        </p>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center gap-3">
        <button
          className="p-3 text-zinc-500 hover:text-white transition-colors duration-200"
          aria-label="Previous track"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        <button
          onClick={onPlayPause}
          className="w-16 h-16 rounded-full bg-cyan-500 text-zinc-950 flex items-center justify-center hover:bg-cyan-400 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/25"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-7 h-7" />
          ) : (
            <Play className="w-7 h-7 ml-1" />
          )}
        </button>

        <button
          className="p-3 text-zinc-500 hover:text-white transition-colors duration-200"
          aria-label="Next track"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3 w-52">
        <Volume2 className="w-4 h-4 text-zinc-500 flex-shrink-0" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="flex-1"
          aria-label="Volume"
        />
        <span className="text-xs text-zinc-500 font-mono w-8 text-right tabular-nums">
          {volume}
        </span>
      </div>
    </div>
  )
}
