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
        <h2 className="text-lg font-medium text-foreground">Lo-Fi Focus</h2>
        <p className="text-sm text-muted-foreground font-mono">// System Idle</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Previous track"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        <button
          onClick={onPlayPause}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </button>

        <button
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Next track"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 w-48">
        <Volume2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-full h-1 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:hover:bg-primary/90 [&::-webkit-slider-thumb]:transition-colors"
          aria-label="Volume"
        />
        <span className="text-xs text-muted-foreground font-mono w-8 text-right">
          {volume}
        </span>
      </div>
    </div>
  )
}
