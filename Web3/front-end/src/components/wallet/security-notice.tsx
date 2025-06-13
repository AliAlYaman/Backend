import { Shield, AlertTriangle } from "lucide-react"

export default function SecurityNotice() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <Shield className="h-5 w-5 text-blue-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">Security Information</h3>
          <div className="mt-2 text-sm text-blue-700">
            <ul className="list-disc pl-5 space-y-1">
              <li>Your deposit address is unique to your account and will not change.</li>
              <li>All deposits require network confirmations before they are credited to your account.</li>
              <li>The minimum number of confirmations varies by cryptocurrency.</li>
              <li>For large deposits, additional security checks may be required.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-blue-200 pt-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important Warning</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Never send funds from smart contracts, exchanges, or other platforms that don't support the selected
              network. Always double-check the address and network before sending.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
