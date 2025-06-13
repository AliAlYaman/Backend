import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, RefreshCw, TrendingUp, Wallet, ChevronRight } from "lucide-react"
import { useWalletBalances } from "../hooks/use-wallet-balance"
import BalanceChart from "../components/wallet/balance"
import CryptoBalanceCard from "../components/wallet/crypto-balance"
import RecentTransactions from "../components/wallet/recent-transaction"

export default function BalancePage() {
  const [timeframe, setTimeframe] = useState<"1d" | "7d" | "30d" | "90d">("7d")
  const [refreshing, setRefreshing] = useState(false)

  const { totalBalance, totalBalanceChange, cryptoBalances, transactions, refreshBalances } =
    useWalletBalances(timeframe)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refreshBalances()
    setRefreshing(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="w-full grid lg:grid-cols-3 gap-6">
          {/* Left Column - Total Balance */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Total Balance</h2>
                <button onClick={handleRefresh} className="text-gray-300 hover:text-white" disabled={refreshing}>
                  <RefreshCw className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
                </button>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold">${totalBalance.toLocaleString()}</div>
                <div
                  className={`flex items-center text-sm ${totalBalanceChange >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {totalBalanceChange >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingUp className="h-4 w-4 mr-1 transform rotate-180" />
                  )}
                  <span>
                    {totalBalanceChange >= 0 ? "+" : ""}
                    {totalBalanceChange}% in last {timeframe}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <BalanceChart timeframe={timeframe} />
              </div>

              <div className="flex space-x-2">
                {(["1d", "7d", "30d", "90d"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      timeframe === period ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors">
                  <ArrowDownRight className="h-5 w-5 mr-2" />
                  Deposit
                </button>
                <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                  <ArrowUpRight className="h-5 w-5 mr-2" />
                  Withdraw
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
                <a href="/wallet/transactions" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                  View All <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              <RecentTransactions transactions={transactions.slice(0, 5)} />
            </div>
          </div>

          {/* Right Column - Crypto Balances */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Your Crypto Assets</h2>
                <div className="flex space-x-2">
                  <button className="text-sm text-gray-500 hover:text-gray-700">Hide Small Balances</button>
                  <button className="text-sm text-blue-600 hover:text-blue-800">Manage</button>
                </div>
              </div>

              <div className="space-y-4">
                {cryptoBalances.map((crypto) => (
                  <CryptoBalanceCard key={crypto.symbol} crypto={crypto} />
                ))}
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Betting Balance</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-600 p-2 rounded-full">
                        <Wallet className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">Available for Betting</div>
                        <div className="text-xs text-gray-500">Instantly place bets with this balance</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">$250.00</div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button className="text-sm text-blue-600 hover:text-blue-800 mr-4">Convert Crypto</button>
                    <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md">
                      Add Funds
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Rewards</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">120 Points</div>
                    <div className="text-sm text-gray-500">Earn more by betting</div>
                  </div>
                  <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md">
                    Redeem
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Referrals</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">$25 Bonus</div>
                    <div className="text-sm text-gray-500">For each friend who signs up</div>
                  </div>
                  <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md">
                    Invite
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
