"use client"

interface AudioVisualizerProps {
  isPlaying: boolean
}

export function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  const bars = 32

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow container */}
      <div 
        className={`absolute w-[320px] h-[320px] md:w-[360px] md:h-[360px] rounded-full ${
          isPlaying ? "animate-pulse-glow" : ""
        }`}
        style={{
          boxShadow: isPlaying 
            ? "0 0 60px 15px rgba(6, 182, 212, 0.4), 0 0 100px 30px rgba(6, 182, 212, 0.2)"
            : "0 0 40px 10px rgba(6, 182, 212, 0.15), 0 0 80px 20px rgba(6, 182, 212, 0.08)"
        }}
      />
      
      {/* Main circle */}
      <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full bg-zinc-950 border border-zinc-800/50 flex items-center justify-center overflow-hidden">
        {/* Visualizer bars arranged in a circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: bars }).map((_, i) => {
            const angle = (i / bars) * 360
            const delay = i * 0.05
            
            return (
              <div
                key={i}
                className="absolute origin-bottom"
                style={{
                  width: "3px",
                  height: "60px",
                  transform: `rotate(${angle}deg) translateY(-80px)`,
                }}
              >
                <div
                  className={`w-full h-full rounded-full transition-all duration-200 ${
                    isPlaying ? "visualizer-bar" : ""
                  }`}
                  style={{
                    background: "linear-gradient(to top, #06b6d4, rgba(6, 182, 212, 0.2))",
                    animationDelay: `${delay}s`,
                    opacity: isPlaying ? 1 : 0.3,
                    transform: isPlaying ? undefined : "scaleY(0.3)",
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Inner ring */}
        <div className="absolute w-[180px] h-[180px] md:w-[200px] md:h-[200px] rounded-full border border-zinc-800/30" />

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
            isPlaying 
              ? "bg-cyan-500/20 animate-pulse" 
              : "bg-zinc-800/50"
          }`}>
            <div className={`w-10 h-10 rounded-full ${
              isPlaying ? "bg-cyan-500/40" : "bg-zinc-700/50"
            }`} />
          </div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em]">
            {isPlaying ? "Streaming" : "Paused"}
          </span>
        </div>
      </div>
    </div>
  )
}
