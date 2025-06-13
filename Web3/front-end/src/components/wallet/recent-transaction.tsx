import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "convert" | "bet"
  amount: string
  cryptoSymbol?: string
  fiatAmount?: string
  status: "pending" | "completed" | "failed"
  timestamp: string
}

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No recent transactions</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
        >
          <div className="flex items-center">
            <div className={`p-2 rounded-full ${getTransactionIconBg(transaction.type)}`}>
              {transaction.type === "deposit" ? (
                <ArrowDownRight className="h-4 w-4 text-white" />
              ) : transaction.type === "withdrawal" ? (
                <ArrowUpRight className="h-4 w-4 text-white" />
              ) : (
                <span className="h-4 w-4 flex items-center justify-center text-white text-xs font-bold">
                  {transaction.type === "convert" ? "C" : "B"}
                </span>
              )}
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">{getTransactionTitle(transaction)}</div>
              <div className="text-xs text-gray-500">{new Date(transaction.timestamp).toLocaleString()}</div>
            </div>
          </div>

          <div className="text-right">
            <div
              className={`text-sm font-medium ${transaction.type === "deposit" ? "text-green-600" : "text-gray-900"}`}
            >
              {transaction.type === "deposit" ? "+" : transaction.type === "withdrawal" ? "-" : ""}
              {transaction.amount} {transaction.cryptoSymbol || ""}
            </div>
            {transaction.fiatAmount && <div className="text-xs text-gray-500">${transaction.fiatAmount}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

function getTransactionIconBg(type: string): string {
  switch (type) {
    case "deposit":
      return "bg-green-500"
    case "withdrawal":
      return "bg-blue-600"
    case "convert":
      return "bg-purple-500"
    case "bet":
      return "bg-orange-500"
    default:
      return "bg-gray-500"
  }
}

function getTransactionTitle(transaction: Transaction): string {
  switch (transaction.type) {
    case "deposit":
      return `Deposit ${transaction.cryptoSymbol}`
    case "withdrawal":
      return `Withdraw ${transaction.cryptoSymbol}`
    case "convert":
      return "Convert to USD"
    case "bet":
      return "Betting Transaction"
    default:
      return "Transaction"
  }
}
