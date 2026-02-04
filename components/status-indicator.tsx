interface StatusIndicatorProps {
  connected: boolean
}

export function StatusIndicator({ connected }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center">
        <div
          className={`w-2 h-2 rounded-full ${
            connected ? "bg-emerald-500" : "bg-red-500"
          }`}
        />
        {connected && (
          <div className="absolute w-2 h-2 rounded-full bg-emerald-500 animate-ping-slow" />
        )}
      </div>
      <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
        {connected ? "Connected" : "Offline"}
      </span>
    </div>
  )
}
