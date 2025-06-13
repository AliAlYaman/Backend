"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface CryptoOption {
  symbol: string
  name: string
  icon: string
  color: string
}

interface CryptoSelectorProps {
  selectedCrypto: string
  onSelectCrypto: (crypto: string) => void
}

export default function CryptoSelector({ selectedCrypto, onSelectCrypto }: CryptoSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const cryptoOptions: CryptoOption[] = [
    { symbol: "BTC", name: "Bitcoin", icon: "₿", color: "bg-orange-500" },
    { symbol: "ETH", name: "Ethereum", icon: "Ξ", color: "bg-blue-500" },
    { symbol: "USDT", name: "Tether", icon: "₮", color: "bg-green-500" },
    { symbol: "USDC", name: "USD Coin", icon: "$", color: "bg-blue-400" },
    { symbol: "BNB", name: "Binance Coin", icon: "BNB", color: "bg-yellow-500" },
    { symbol: "XRP", name: "Ripple", icon: "XRP", color: "bg-blue-600" },
    { symbol: "ADA", name: "Cardano", icon: "ADA", color: "bg-blue-700" },
    { symbol: "SOL", name: "Solana", icon: "SOL", color: "bg-purple-500" },
  ]

  const selectedOption = cryptoOptions.find((option) => option.symbol === selectedCrypto)

  return (
    <div className="relative">
      <button
        type="button"
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span
            className={`flex items-center justify-center h-8 w-8 rounded-full text-white ${selectedOption?.color} text-lg font-medium`}
          >
            {selectedOption?.icon}
          </span>
          <span className="ml-3 block">
            <span className="text-sm font-medium text-gray-900">{selectedOption?.name}</span>
            <span className="text-sm text-gray-500 block">{selectedOption?.symbol}</span>
          </span>
        </div>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto focus:outline-none">
          {cryptoOptions.map((option) => (
            <button
              key={option.symbol}
              className={`w-full text-left px-3 py-2 flex items-center hover:bg-gray-100 ${
                selectedCrypto === option.symbol ? "bg-gray-50" : ""
              }`}
              onClick={() => {
                onSelectCrypto(option.symbol)
                setIsOpen(false)
              }}
            >
              <span
                className={`flex items-center justify-center h-8 w-8 rounded-full text-white ${option.color} text-lg font-medium`}
              >
                {option.icon}
              </span>
              <span className="ml-3 block">
                <span className="text-sm font-medium text-gray-900">{option.name}</span>
                <span className="text-sm text-gray-500 block">{option.symbol}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
