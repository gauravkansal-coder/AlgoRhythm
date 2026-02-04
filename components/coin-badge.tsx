import { Coins } from "lucide-react"

interface CoinBadgeProps {
  amount: number
}

export function CoinBadge({ amount }: CoinBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg">
      <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
        <Coins className="w-3 h-3 text-amber-400" />
      </div>
      <span className="text-sm font-semibold text-white tabular-nums">
        {amount.toLocaleString()}
      </span>
      <span className="text-xs text-zinc-400">Flow Coins</span>
    </div>
  )
}
