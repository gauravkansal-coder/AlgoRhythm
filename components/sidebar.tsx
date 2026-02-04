"use client"

import { Home, Search, Library, Heart, Clock, ListMusic } from "lucide-react"
import { useColor } from "./color-context"

const menuItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Search, label: "Search", active: false },
  { icon: Library, label: "Your Library", active: false },
]

const playlistItems = [
  { icon: Heart, label: "Liked Songs", count: 234 },
  { icon: Clock, label: "Recently Played", count: 50 },
  { icon: ListMusic, label: "Lo-Fi Beats", count: 45 },
  { icon: ListMusic, label: "Workout Mix", count: 32 },
  { icon: ListMusic, label: "Chill Vibes", count: 67 },
]

export function Sidebar() {
  const { primary, primaryRgb } = useColor()

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-card/30 backdrop-blur-xl border-r border-border p-4">
      {/* Main menu */}
      <nav className="space-y-1 mb-8">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
              item.active
                ? ""
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
            style={item.active ? { 
              backgroundColor: `rgba(${primaryRgb}, 0.1)`,
              color: primary 
            } : {}}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Playlists */}
      <div className="flex-1 overflow-hidden">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
          Playlists
        </h3>
        <div className="space-y-1">
          {playlistItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                <span className="text-sm truncate">{item.label}</span>
              </div>
              <span className="text-xs text-muted-foreground/60 group-hover:text-muted-foreground">
                {item.count}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Now Playing Mini */}
      <div className="mt-4 p-3 rounded-xl bg-secondary/50 border border-border">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Now Playing</p>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500"
            style={{ 
              backgroundColor: `rgba(${primaryRgb}, 0.2)`,
              boxShadow: `0 0 15px rgba(${primaryRgb}, 0.2)` 
            }}
          >
            <ListMusic className="h-5 w-5 transition-colors duration-500" style={{ color: primary }} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Midnight Protocol</p>
            <p className="text-xs text-muted-foreground truncate">Circuit Breaker</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
