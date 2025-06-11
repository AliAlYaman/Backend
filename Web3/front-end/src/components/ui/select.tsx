import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, placeholder, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "flex h-12 w-full rounded-xl border border-gray-600/50 bg-gradient-to-b from-gray-800/70 to-gray-900/70 px-4 py-3",
            "text-sm text-white placeholder-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "hover:border-blue-400/50 hover:bg-gray-800/60",
            "backdrop-blur-sm transition-all duration-200 appearance-none cursor-pointer",
            "shadow-lg shadow-black/10",
            className,
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-gray-900">
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400/70 pointer-events-none transition-transform group-hover:text-blue-400" />
      </div>
    )
  },
)
Select.displayName = "Select"

export { Select }
