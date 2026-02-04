/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
// 1. Import your Engine
import { useAudio } from "@/hooks/useAudio" 
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { AudioVisualizer } from "@/components/audio-visualizer"
import { PlayerControls } from "@/components/player-controls"
import { QueuePanel } from "@/components/queue-panel"
import { ColorProvider, useColor } from "@/components/color-context"

function DashboardContent({
  status,
  isPlaying,      // <--- RECEIVED FROM ENGINE (Real Truth)
  toggleAudio,    // <--- NEW CONTROL (Master Switch)
  setGlobalVolume,// <--- NEW CONTROL (Volume)
  restart,        // <--- NEW CONTROL (Skip Back)
  coins,
  progress,
  setProgress,
  volume,
  setVolume,
}: any) {
  
  const { primaryRgb } = useColor()
  
  // NOTE: We no longer calculate 'isPlaying' here. We trust the engine.

  const formatTime = (percentage: number) => {
    const totalSeconds = Math.floor((percentage / 100) * 225)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // 1. Handle Play/Pause (Toggles the Master Switch)
  const handlePlayPause = () => {
    toggleAudio();
  };

  // 2. Handle Volume (Updates UI + Real Audio)
  const handleVolumeChange = (vals: number[]) => {
    const newVol = vals[0];
    setVolume(newVol);
    setGlobalVolume(newVol / 100); // Howler needs 0.0 to 1.0
  };

  // 3. Handle Skip Back (Restarts Track)
  const handleSkipBack = () => {
    restart();
    setProgress(0);
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Header coinBalance={coins} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Background gradient */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: `radial-gradient(ellipse at center, rgba(${primaryRgb}, 0.15) 0%, transparent 70%)`,
              opacity: 0.5,
            }}
          />

          <div
            className="absolute inset-0 transition-all duration-700"
            style={{
              background: `radial-gradient(circle at 30% 70%, rgba(${primaryRgb}, 0.08) 0%, transparent 50%)`,
            }}
          />

          {/* Visualizer area */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-10">
              <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                Midnight Protocol
              </h1>
              <p className="text-sm text-muted-foreground">Circuit Breaker</p>
            </div>

            <div className="w-full max-w-lg aspect-square">
              {/* Visualizer listens to Master Switch */}
              <AudioVisualizer isPlaying={isPlaying} />
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span 
                  className="w-2 h-2 rounded-full animate-pulse transition-colors duration-500" 
                  style={{ backgroundColor: `rgb(${primaryRgb})` }}
                />
                {/* Status Text Update */}
                <span>Status: {isPlaying ? status : 'PAUSED'}</span>
              </div>
            </div>
          </div>
        </main>

        <QueuePanel />
      </div>

      {/* Player controls - WIRED UP */}
      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        
        onSkipBack={handleSkipBack}     // <--- Wired
        onSkipNext={() => {}}           // Placeholder
        
        progress={progress}
        onProgressChange={(value: any) => setProgress(value[0])}
        
        volume={volume}
        onVolumeChange={handleVolumeChange} // <--- Wired
        
        currentTime={formatTime(progress)}
        duration="3:45"
        trackName="Midnight Protocol"
        artistName="Circuit Breaker"
      />
    </div>
  )
}

export default function AlgoRhythmDashboard() {
  // 1. Initialize YOUR Engine (New Tools)
  const { status, isPlaying, toggleAudio, setGlobalVolume, restart } = useAudio();
  
  const [coins, setCoins] = useState(500);
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(75)

  // 3. Coin Mining Logic (Only mines if Switch is ON)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && status === 'FLOW') {
        setCoins((prev) => prev + 10);
      }
    }, 5000); 
    return () => clearInterval(interval);
  }, [status, isPlaying]);

  // 4. Progress Bar Simulation
  useEffect(() => {
    if (!isPlaying) return; // Stop bar if paused

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 0.1
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <ColorProvider progress={progress} isPlaying={isPlaying && status === 'FLOW'}>
      <DashboardContent
        // Pass the Engine down
        status={status}
        isPlaying={isPlaying}
        toggleAudio={toggleAudio}
        setGlobalVolume={setGlobalVolume}
        restart={restart}
        
        coins={coins}
        // Pass UI state
        progress={progress}
        setProgress={setProgress}
        volume={volume}
        setVolume={setVolume}
      />
    </ColorProvider>
  )
}