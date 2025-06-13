"use client"

import { useState } from "react"
import { Copy, CheckCircle, AlertCircle, ExternalLink, RefreshCw, Wallet } from "lucide-react"
import CryptoSelector from "../components/wallet/crypto-selector"
import QRCodeDisplay from "../components/wallet/qr-code-display"
import TransactionHistory from "../components/wallet/transaction-history"
import SecurityNotice from "../components/wallet//security-notice"
import NetworkSelector from "../components/wallet/network-selector"
import { useCryptoWallet } from "../hooks/use-crypto-wallet"

export default function WalletDeposit() {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC")
  const [selectedNetwork, setSelectedNetwork] = useState("Bitcoin")
  const [copied, setCopied] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const { walletAddress, balance, transactions, refreshBalance } = useCryptoWallet(selectedCrypto, selectedNetwork)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleRefreshBalance = async () => {
    setRefreshing(true)
    await refreshBalance()
    setRefreshing(false)
  }

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="w-full grid md:grid-cols-2 shadow-lg rounded-lg overflow-hidden">
          {/* Left Side - Dark Panel */}
          <div className="bg-slate-800 text-white p-8 flex flex-col">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Deposit Crypto</h1>
              <p className="text-gray-300">
                Fund your account with cryptocurrency to start betting with the best odds and instant payouts.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <span>Instant deposits with low fees</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span>Secure and verified transactions</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <RefreshCw className="h-5 w-5 text-white" />
                </div>
                <span>Real-time balance updates</span>
              </div>
            </div>

            <div className="mt-auto">
              <QRCodeDisplay value={walletAddress} cryptoSymbol={selectedCrypto} size={180} />
              <div className="mt-4 p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-md font-medium text-white">Current Balance</h3>
                  <button
                    onClick={handleRefreshBalance}
                    className="flex items-center text-sm text-blue-300 hover:text-blue-100"
                    disabled={refreshing}
                  >
                    <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? "animate-spin" : ""}`} />
                    {refreshing ? "Refreshing..." : "Refresh"}
                  </button>
                </div>
                <p className="text-2xl font-bold text-white">
                  {balance} {selectedCrypto}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Deposit Form */}
          <div className="bg-white p-8">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Select Cryptocurrency</h2>
              <CryptoSelector selectedCrypto={selectedCrypto} onSelectCrypto={setSelectedCrypto} />
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Select Network</h2>
              <NetworkSelector
                selectedCrypto={selectedCrypto}
                selectedNetwork={selectedNetwork}
                onSelectNetwork={setSelectedNetwork}
              />
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Important</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Make sure to select the correct network. Sending funds on the wrong network may result in
                      permanent loss.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Your {selectedCrypto} Deposit Address</h2>
              <p className="text-sm text-gray-500 mb-4">
                Send only {selectedCrypto} to this address on the {selectedNetwork} network
              </p>

              <div className="relative">
                <div className="flex items-center">
                  <div className="flex-1 border border-gray-300 rounded-md p-3 bg-gray-50 font-mono text-sm break-all">
                    {walletAddress}
                  </div>
                  <button
                    onClick={handleCopyAddress}
                    className="ml-2 p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                    aria-label="Copy address"
                  >
                    {copied ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {copied && (
                  <span className="absolute -bottom-6 left-0 text-xs text-green-600">Address copied to clipboard!</span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">How to Deposit {selectedCrypto}</h2>
              <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                <li>Copy your {selectedCrypto} deposit address above or scan the QR code with your wallet app.</li>
                <li>
                  Make sure you're sending on the <strong>{selectedNetwork}</strong> network.
                </li>
                <li>Enter the amount of {selectedCrypto} you want to deposit from your external wallet.</li>
                <li>Confirm the transaction in your wallet.</li>
                <li>
                  Wait for the network confirmations. This can take from a few minutes to an hour depending on network
                  congestion.
                </li>
              </ol>
              <div className="mt-4">
                <a
                  href={`https://www.blockchain.com/explorer/search?search=${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  Track your transaction on blockchain explorer
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Deposits</h2>
              <TransactionHistory transactions={transactions} cryptoSymbol={selectedCrypto} />
            </div>

            <SecurityNotice />
          </div>
        </div>
      </div>
    </div>
  )
}
