"use client"

import { Coins, Music2, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useColor } from "./color-context"

interface HeaderProps {
  coinBalance: number
}

export function Header({ coinBalance }: HeaderProps) {
  const { primary, primaryRgb } = useColor()

  return (
    <header className="w-full bg-card/30 backdrop-blur-xl border-b border-border px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-500"
            style={{ 
              backgroundColor: `rgba(${primaryRgb}, 0.2)`,
              boxShadow: `0 0 20px rgba(${primaryRgb}, 0.3)` 
            }}
          >
            <Music2 className="h-4 w-4 md:h-5 md:w-5 transition-colors duration-500" style={{ color: primary }} />
          </div>
          <span className="text-lg md:text-xl font-bold text-foreground tracking-tight">
            Algo<span className="transition-colors duration-500" style={{ color: primary }}>Rhythm</span>
          </span>
        </div>

        {/* Navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#" 
            className="text-sm font-medium transition-colors duration-300" 
            style={{ color: primary }}
          >
            Library
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Discover
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Playlists
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Artists
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Coin Balance Badge */}
          <Badge
            variant="secondary"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/80 text-foreground transition-all duration-500"
            style={{ 
              borderColor: `rgba(${primaryRgb}, 0.3)`,
              borderWidth: 1,
              boxShadow: `0 0 15px rgba(${primaryRgb}, 0.2)` 
            }}
          >
            <Coins className="h-3.5 w-3.5 transition-colors duration-500" style={{ color: primary }} />
            <span className="font-mono font-medium text-sm">{coinBalance.toLocaleString()}</span>
          </Badge>

          {/* Notification - hidden on mobile */}
          <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
