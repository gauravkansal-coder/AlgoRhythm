"use client"

interface AudioVisualizerProps {
  isPlaying: boolean
}

export function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  const bars = 24

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div className="absolute w-80 h-80 rounded-full bg-primary/5 animate-pulse-glow" />
      
      {/* Inner circle container */}
      <div className="relative w-72 h-72 rounded-full bg-card border border-border flex items-center justify-center overflow-hidden">
        {/* Circular visualizer bars */}
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: bars }).map((_, i) => {
            const angle = (i / bars) * 360
            const delay = i * 0.08
            
            return (
              <div
                key={i}
                className="absolute w-1 origin-bottom"
                style={{
                  transform: `rotate(${angle}deg) translateY(-60px)`,
                  height: "80px",
                }}
              >
                <div
                  className={`w-full bg-gradient-to-t from-primary to-primary/30 rounded-full transition-all duration-300 ${
                    isPlaying ? "visualizer-bar" : "h-[20%]"
                  }`}
                  style={{
                    animationDelay: `${delay}s`,
                    opacity: isPlaying ? 1 : 0.4,
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className={`w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center ${isPlaying ? "animate-pulse" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-primary/40" />
          </div>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            {isPlaying ? "Streaming" : "Paused"}
          </span>
        </div>
      </div>
    </div>
  )
}
