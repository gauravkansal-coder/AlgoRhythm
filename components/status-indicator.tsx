interface StatusIndicatorProps {
  connected: boolean
}

export function StatusIndicator({ connected }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            connected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        {connected && (
          <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-75" />
        )}
      </div>
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
        {connected ? "Connected" : "Offline"}
      </span>
    </div>
  )
}
