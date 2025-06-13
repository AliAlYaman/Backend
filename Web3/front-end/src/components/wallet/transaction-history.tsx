interface Transaction {
  id: string
  type: "deposit" | "withdrawal"
  amount: string
  cryptoSymbol: string
  status: "pending" | "completed" | "failed"
  timestamp: string
  confirmations: number
  txHash: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
  cryptoSymbol: string
}

export default function TransactionHistory({ transactions, cryptoSymbol }: TransactionHistoryProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No deposit transactions found for {cryptoSymbol}</p>
        <p className="text-sm text-gray-400 mt-1">Deposits will appear here once they are detected on the network</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction ID
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(transaction.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {transaction.amount} {transaction.cryptoSymbol}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${
                    transaction.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : transaction.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.status === "completed"
                    ? "Completed"
                    : transaction.status === "pending"
                      ? `Pending (${transaction.confirmations} confirmations)`
                      : "Failed"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a
                  href={`https://www.blockchain.com/explorer/transactions/${transaction.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 truncate block max-w-xs"
                >
                  {transaction.txHash.substring(0, 8)}...{transaction.txHash.substring(transaction.txHash.length - 8)}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
