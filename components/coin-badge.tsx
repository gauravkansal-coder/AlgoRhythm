import { Coins } from "lucide-react"

interface CoinBadgeProps {
  amount: number
}

export function CoinBadge({ amount }: CoinBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-xl border border-border/50 shadow-lg">
      <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
        <Coins className="w-3 h-3 text-amber-400" />
      </div>
      <span className="text-sm font-medium text-foreground">
        {amount.toLocaleString()}
      </span>
      <span className="text-xs text-muted-foreground">Flow Coins</span>
    </div>
  )
}
