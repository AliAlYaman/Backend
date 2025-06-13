import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react"

interface CryptoBalance {
  name: string
  symbol: string
  icon: string
  color: string
  balance: number
  balanceUsd: number
  price: number
  change24h: number
}

interface CryptoBalanceCardProps {
  crypto: CryptoBalance
}

export default function CryptoBalanceCard({ crypto }: CryptoBalanceCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`${crypto.color} p-2 rounded-full`}>
            <span className="text-white font-bold">{crypto.icon}</span>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">{crypto.name}</div>
            <div className="text-xs text-gray-500">{crypto.symbol}</div>
          </div>
        </div>

        <div className="flex items-center">
          <button className="text-gray-400 hover:text-gray-600 mr-2">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-end">
        <div>
          <div className="text-lg font-bold text-gray-900">
            {crypto.balance} {crypto.symbol}
          </div>
          <div className="text-sm text-gray-500">${crypto.balanceUsd.toLocaleString()}</div>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-900">${crypto.price.toLocaleString()}</div>
          <div className={`text-xs ${crypto.change24h >= 0 ? "text-green-600" : "text-red-600"}`}>
            {crypto.change24h >= 0 ? "+" : ""}
            {crypto.change24h}%
          </div>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="flex-1 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded-md text-sm transition-colors">
          <ArrowDownRight className="h-4 w-4 mr-1" />
          Deposit
        </button>
        <button className="flex-1 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded-md text-sm transition-colors">
          <ArrowUpRight className="h-4 w-4 mr-1" />
          Withdraw
        </button>
      </div>
    </div>
  )
}
