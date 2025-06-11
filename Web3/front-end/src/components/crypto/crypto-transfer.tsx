import { useState, type SetStateAction } from "react"
import {
  ArrowLeft,
  ArrowUpDown,
  Send,
  Clock,
  Shield,
  AlertCircle,
  CheckCircle,
  Copy,
  ExternalLink,
  Zap,
} from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select } from "../ui/select"
import { useNavigate } from "react-router-dom"
import { transferCrypto } from "../../services/api/api"; // adjust path if needed


interface Token {
  symbol: string
  name: string
  balance: string
  usdValue: string
  icon: string
  network: string
}

interface Network {
  name: string
  chainId: string
  icon: string
  gasToken: string
}

export function CryptoTransfer() {
  const [fromToken] = useState<Token>({
    symbol: "CRO",
    name: "Cronos",
    balance: "1,250.50",
    usdValue: "125.05",
    icon: "🔷",
    network: "Cronos",
  })

  const [toNetwork, setToNetwork] = useState("ethereum")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"form" | "confirm" | "processing" | "success">("form")


  const networks: Network[] = [
    { name: "Cronos", chainId: "25", icon: "🔷", gasToken: "CRO" },
    { name: "Ethereum", chainId: "1", icon: "⟠", gasToken: "ETH" },
    { name: "Bitcoin", chainId: "0", icon: "₿", gasToken: "BTC" },
    { name: "Polygon", chainId: "137", icon: "🟣", gasToken: "MATIC" },
  ]

  const estimatedFee = "0.001 CRO (~$0.10)"
  const estimatedTime = "2-5 minutes"
  const navigate = useNavigate();
  const handleTransfer = async () => {
  setIsLoading(true)
  setStep("processing")

  try {
    const res = await transferCrypto({
      senderAddress: "0xYourSenderWallet", 
      recipientAddress,
      amount,
      tokenSymbol: fromToken.symbol,
      network: toNetwork,
    });

    console.log("Transaction successful:", res.txHash);
    setStep("success");
  } catch (err: any) {
    console.error("Transfer failed:", err.message);
    alert("Transfer failed: " + err.message);
    setStep("form");
  }

  setIsLoading(false);
}


  const handleMaxAmount = () => {
    const maxAmount = Number.parseFloat(fromToken.balance.replace(",", "")) - 0.001 // Reserve for gas
    setAmount(maxAmount.toString())
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Transfer Successful!</h2>
            <p className="text-gray-400 mb-8">
              Your {amount} {fromToken.symbol} has been sent successfully.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-xl">
                <span className="text-gray-400">Transaction Hash</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm font-mono">0x1234...5678</span>
                  <button className="text-gray-400 hover:text-white">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => navigate('/')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Back to Wallet
              </Button>
              <Button
                variant="ghost"
                onClick={() => setStep("form")}
                className="w-full border border-gray-600/50 hover:border-gray-500/50"
              >
                Make Another Transfer
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6 border-b border-gray-800/50">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-xl font-bold text-white">Transfer Crypto</h1>
        <div className="w-16"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">
        {step === "processing" ? (
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Processing Transfer</h2>
            <p className="text-gray-400 mb-8">Please wait while we process your transaction...</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
            <p className="text-sm text-gray-500">This may take a few minutes</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Transfer Form */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Send Crypto</h2>
                  <p className="text-gray-400 text-sm">Transfer tokens to another wallet</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* From Token */}
                <div className="space-y-3">
                  <Label>From</Label>
                  <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-600/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{fromToken.icon}</span>
                        <div>
                          <div className="text-white font-semibold">{fromToken.symbol}</div>
                          <div className="text-gray-400 text-sm">{fromToken.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{fromToken.balance}</div>
                        <div className="text-gray-400 text-sm">${fromToken.usdValue}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="flex-1 text-lg"
                      />
                      <Button variant="ghost" onClick={handleMaxAmount} className="text-blue-400 hover:text-blue-300">
                        MAX
                      </Button>
                    </div>
                    {amount && (
                      <div className="mt-2 text-right text-gray-400 text-sm">
                        ≈ ${(Number.parseFloat(amount) * 0.1).toFixed(2)} USD
                      </div>
                    )}
                  </div>
                </div>

                {/* Swap Icon */}
                <div className="flex justify-center">
                  <div className="w-10 h-10 bg-gray-800 border border-gray-600 rounded-full flex items-center justify-center">
                    <ArrowUpDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* To Network */}
                <div className="space-y-3">
                  <Label>To Network</Label>
                  <Select value={toNetwork} onChange={(e: { target: { value: SetStateAction<string> } }) => setToNetwork(e.target.value)}>
                    {networks.map((network) => (
                      <option key={network.chainId} value={network.name.toLowerCase()}>
                        {network.icon} {network.name}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Recipient Address */}
                <div className="space-y-3">
                  <Label>Recipient Address</Label>
                  <Input
                    type="text"
                    placeholder="0x... or wallet address"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>

              </div>
            </div>

            {/* Transaction Details */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Transaction Details</span>
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Network Fee</span>
                  <span className="text-white">{estimatedFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Estimated Time</span>
                  </span>
                  <span className="text-white">{estimatedTime}</span>
                </div>
                <div className="border-t border-gray-600/50 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Total Amount</span>
                    <span className="text-white font-semibold">
                      {amount || "0"} {fromToken.symbol}
                    </span>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-yellow-400 font-medium mb-1">Important</p>
                  <p className="text-gray-300">
                    Double-check the recipient address. Transactions cannot be reversed once confirmed.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {step === "form" ? (
                <Button
                  onClick={() => setStep("confirm")}
                  disabled={!amount || !recipientAddress}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-14 text-lg font-semibold rounded-xl text-white"
                >
                  Review Transfer
                </Button>
              ) : (
                <div className="space-y-4">
                  <Button
                    onClick={handleTransfer}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 h-14 text-lg font-semibold rounded-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Confirming...</span>
                      </div>
                    ) : (
                      "Confirm Transfer"
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setStep("form")}
                    className="w-full border border-gray-600/50 hover:border-gray-500/50 h-12"
                  >
                    Back to Edit
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
