"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface NetworkOption {
  id: string
  name: string
  cryptoSupport: string[]
}

interface NetworkSelectorProps {
  selectedCrypto: string
  selectedNetwork: string
  onSelectNetwork: (network: string) => void
}

export default function NetworkSelector({ selectedCrypto, selectedNetwork, onSelectNetwork }: NetworkSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const networkOptions: NetworkOption[] = [
    { id: "Bitcoin", name: "Bitcoin", cryptoSupport: ["BTC"] },
    { id: "Ethereum", name: "Ethereum (ERC20)", cryptoSupport: ["ETH", "USDT", "USDC"] },
    { id: "BSC", name: "BNB Smart Chain (BEP20)", cryptoSupport: ["BNB", "USDT", "USDC"] },
    { id: "Polygon", name: "Polygon", cryptoSupport: ["ETH", "USDT", "USDC"] },
    { id: "Solana", name: "Solana", cryptoSupport: ["SOL", "USDT", "USDC"] },
    { id: "Ripple", name: "Ripple", cryptoSupport: ["XRP"] },
    { id: "Cardano", name: "Cardano", cryptoSupport: ["ADA"] },
  ]

  // Filter networks that support the selected crypto
  const compatibleNetworks = networkOptions.filter((network) => network.cryptoSupport.includes(selectedCrypto))

  // Set first compatible network when crypto changes
  useEffect(() => {
    if (compatibleNetworks.length > 0 && !compatibleNetworks.some((n) => n.id === selectedNetwork)) {
      onSelectNetwork(compatibleNetworks[0].id)
    }
  }, [selectedCrypto, compatibleNetworks, selectedNetwork, onSelectNetwork])

  const selectedNetworkOption = networkOptions.find((option) => option.id === selectedNetwork)

  return (
    <div className="relative">
      <button
        type="button"
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate">{selectedNetworkOption?.name}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto focus:outline-none">
          {compatibleNetworks.map((option) => (
            <button
              key={option.id}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                selectedNetwork === option.id ? "bg-gray-50 font-medium" : ""
              }`}
              onClick={() => {
                onSelectNetwork(option.id)
                setIsOpen(false)
              }}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
