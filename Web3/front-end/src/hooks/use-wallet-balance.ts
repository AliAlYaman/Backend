"use client"

import { useState, useEffect, useCallback } from "react"

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

interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "convert" | "bet"
  amount: string
  cryptoSymbol?: string
  fiatAmount?: string
  status: "pending" | "completed" | "failed"
  timestamp: string
}

export function useWalletBalances(timeframe: "1d" | "7d" | "30d" | "90d") {
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalBalanceChange, setTotalBalanceChange] = useState(0)
  const [cryptoBalances, setCryptoBalances] = useState<CryptoBalance[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch balances
  const fetchBalances = useCallback(async () => {
    setIsLoading(true)

    try {
      // In a real app, you would fetch from an API
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data
      const mockCryptoBalances: CryptoBalance[] = [
        {
          name: "Bitcoin",
          symbol: "BTC",
          icon: "₿",
          color: "bg-orange-500",
          balance: 0.12,
          balanceUsd: 7245.36,
          price: 60378,
          change24h: 2.4,
        },
        {
          name: "Ethereum",
          symbol: "ETH",
          icon: "Ξ",
          color: "bg-blue-500",
          balance: 1.5,
          balanceUsd: 3456.75,
          price: 2304.5,
          change24h: -0.8,
        },
        {
          name: "Tether",
          symbol: "USDT",
          icon: "₮",
          color: "bg-green-500",
          balance: 500,
          balanceUsd: 500,
          price: 1,
          change24h: 0.01,
        },
        {
          name: "USD Coin",
          symbol: "USDC",
          icon: "$",
          color: "bg-blue-400",
          balance: 750,
          balanceUsd: 750,
          price: 1,
          change24h: 0,
        },
      ]

      // Calculate total balance
      const total = mockCryptoBalances.reduce((sum, crypto) => sum + crypto.balanceUsd, 0)

      // Generate mock change based on timeframe
      let change = 0
      switch (timeframe) {
        case "1d":
          change = Math.random() * 5 - 2 // -2% to +3%
          break
        case "7d":
          change = Math.random() * 10 - 4 // -4% to +6%
          break
        case "30d":
          change = Math.random() * 20 - 8 // -8% to +12%
          break
        case "90d":
          change = Math.random() * 40 - 15 // -15% to +25%
          break
      }

      // Generate mock transactions
      const mockTransactions: Transaction[] = [
        {
          id: "tx1",
          type: "deposit",
          amount: "0.05",
          cryptoSymbol: "BTC",
          fiatAmount: "3,018.90",
          status: "completed",
          timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
        {
          id: "tx2",
          type: "withdrawal",
          amount: "0.5",
          cryptoSymbol: "ETH",
          fiatAmount: "1,152.25",
          status: "completed",
          timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
        {
          id: "tx3",
          type: "convert",
          amount: "200",
          cryptoSymbol: "USDT",
          fiatAmount: "200.00",
          status: "completed",
          timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        },
        {
          id: "tx4",
          type: "bet",
          amount: "50",
          fiatAmount: "50.00",
          status: "completed",
          timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        },
        {
          id: "tx5",
          type: "deposit",
          amount: "250",
          cryptoSymbol: "USDC",
          fiatAmount: "250.00",
          status: "completed",
          timestamp: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
        },
        {
          id: "tx6",
          type: "withdrawal",
          amount: "0.01",
          cryptoSymbol: "BTC",
          fiatAmount: "603.78",
          status: "pending",
          timestamp: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
        },
      ]

      setTotalBalance(total)
      setTotalBalanceChange(Number.parseFloat(change.toFixed(2)))
      setCryptoBalances(mockCryptoBalances)
      setTransactions(mockTransactions)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching balances:", error)
      setIsLoading(false)
    }
  }, [timeframe])

  // Fetch on mount and when timeframe changes
  useEffect(() => {
    fetchBalances()
  }, [fetchBalances, timeframe])

  // Refresh balances function for manual refresh
  const refreshBalances = useCallback(async () => {
    await fetchBalances()
    return true
  }, [fetchBalances])

  return {
    totalBalance,
    totalBalanceChange,
    cryptoBalances,
    transactions,
    isLoading,
    refreshBalances,
  }
}
