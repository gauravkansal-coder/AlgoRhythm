"use client"

import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useColor } from "./color-context"

interface PlayerControlsProps {
  isPlaying: boolean
  onPlayPause: () => void
  // --- NEW PROPS ADDED ---
  onSkipBack: () => void
  onSkipNext: () => void
  // -----------------------
  progress: number
  onProgressChange: (value: number[]) => void
  volume: number
  onVolumeChange: (value: number[]) => void
  currentTime: string
  duration: string
  trackName: string
  artistName: string
}

export function PlayerControls({
  isPlaying,
  onPlayPause,
  onSkipBack,   // <--- Receive it
  onSkipNext,   // <--- Receive it
  progress,
  onProgressChange,
  volume,
  onVolumeChange,
  currentTime,
  duration,
  trackName,
  artistName,
}: PlayerControlsProps) {
  const { primary, primaryRgb } = useColor()

  return (
    <div className="w-full bg-card/50 backdrop-blur-xl border-t border-border px-4 py-3 md:px-8 md:py-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono w-10">{currentTime}</span>
          <div className="flex-1 relative">
            <Slider
              value={[progress]}
              onValueChange={onProgressChange}
              max={100}
              step={0.1}
              className="flex-1"
              style={{
                ["--slider-track-bg" as string]: `rgba(${primaryRgb}, 0.2)`,
                ["--slider-range-bg" as string]: primary,
                ["--slider-thumb-bg" as string]: primary,
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-mono w-10">{duration}</span>
        </div>

        {/* Controls and track info */}
        <div className="flex items-center justify-between">
          {/* Track info */}
          <div className="flex-1 min-w-0 hidden md:block">
            <p className="text-sm font-medium text-foreground truncate">{trackName}</p>
            <p className="text-xs text-muted-foreground truncate">{artistName}</p>
          </div>

          {/* Main controls */}
          <div className="flex items-center gap-2 md:gap-4 flex-1 justify-center">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Shuffle className="h-4 w-4" />
            </Button>
            
            {/* SKIP BACK WIRED UP */}
            <Button 
              onClick={onSkipBack} 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={onPlayPause}
              size="icon"
              className="h-12 w-12 md:h-14 md:w-14 rounded-full text-foreground transition-all duration-300"
              style={{
                backgroundColor: primary,
                color: "#0a0a0f",
                boxShadow: isPlaying
                  ? `0 0 30px rgba(${primaryRgb}, 0.5)`
                  : `0 0 15px rgba(${primaryRgb}, 0.3)`,
              }}
            >
              {isPlaying ? <Pause className="h-5 w-5 md:h-6 md:w-6" /> : <Play className="h-5 w-5 md:h-6 md:w-6 ml-0.5" />}
            </Button>
            
            {/* SKIP NEXT WIRED UP */}
            <Button 
              onClick={onSkipNext} 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex-1 hidden md:flex items-center justify-end gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={onVolumeChange}
              max={100}
              step={1}
              className="w-24"
            />
          </div>
        </div>

        {/* Mobile track info */}
        <div className="md:hidden text-center">
          <p className="text-sm font-medium text-foreground truncate">{trackName}</p>
          <p className="text-xs text-muted-foreground truncate">{artistName}</p>
        </div>
      </div>
    </div>
  )
}