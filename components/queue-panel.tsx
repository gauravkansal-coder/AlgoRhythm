"use client"

import { MoreHorizontal, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useColor } from "./color-context"

const queueItems = [
  { id: 1, title: "Midnight Protocol", artist: "Circuit Breaker", duration: "3:45", playing: true },
  { id: 2, title: "Digital Horizons", artist: "Neon Pulse", duration: "4:12" },
  { id: 3, title: "Binary Sunset", artist: "Data Stream", duration: "3:58" },
  { id: 4, title: "Cyber Dawn", artist: "The Algorithm", duration: "5:01" },
  { id: 5, title: "Neural Network", artist: "Quantum Beats", duration: "4:33" },
]

export function QueuePanel() {
  const { primary, primaryRgb } = useColor()

  return (
    <aside className="hidden xl:flex flex-col w-72 bg-card/30 backdrop-blur-xl border-l border-border p-4">
      <h2 className="text-sm font-semibold text-foreground mb-4">Up Next</h2>
      
      <div className="flex-1 space-y-1 overflow-y-auto">
        {queueItems.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-300 group cursor-pointer ${
              item.playing ? "" : "hover:bg-secondary/50"
            }`}
            style={item.playing ? { 
              backgroundColor: `rgba(${primaryRgb}, 0.1)`,
              borderWidth: 1,
              borderColor: `rgba(${primaryRgb}, 0.2)`,
              boxShadow: `0 0 20px rgba(${primaryRgb}, 0.1)` 
            } : {}}
          >
            {/* Track number or play icon */}
            <div className="w-6 h-6 flex items-center justify-center">
              {item.playing ? (
                <div className="flex items-center gap-0.5">
                  <div 
                    className="w-0.5 h-3 rounded-full animate-pulse transition-colors duration-300" 
                    style={{ backgroundColor: primary }}
                  />
                  <div 
                    className="w-0.5 h-4 rounded-full animate-pulse delay-75 transition-colors duration-300" 
                    style={{ backgroundColor: primary }}
                  />
                  <div 
                    className="w-0.5 h-2 rounded-full animate-pulse delay-150 transition-colors duration-300" 
                    style={{ backgroundColor: primary }}
                  />
                </div>
              ) : (
                <span className="text-xs text-muted-foreground group-hover:hidden">{index + 1}</span>
              )}
              {!item.playing && (
                <Play className="h-3.5 w-3.5 text-foreground hidden group-hover:block" />
              )}
            </div>

            {/* Track info */}
            <div className="flex-1 min-w-0">
              <p 
                className={`text-sm font-medium truncate transition-colors duration-300 ${item.playing ? "" : "text-foreground"}`}
                style={item.playing ? { color: primary } : {}}
              >
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">{item.artist}</p>
            </div>

            {/* Duration */}
            <span className="text-xs text-muted-foreground font-mono">{item.duration}</span>

            {/* More button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Queue stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>5 songs in queue</span>
          <span className="font-mono">21:29</span>
        </div>
      </div>
    </aside>
  )
}
