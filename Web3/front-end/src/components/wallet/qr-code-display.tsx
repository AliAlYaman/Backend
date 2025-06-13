import { useEffect, useRef } from "react"
import QRCode from "qrcode"

interface QRCodeDisplayProps {
  value: string
  cryptoSymbol: string
  size: number
}

export default function QRCodeDisplay({ value, cryptoSymbol, size }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const generateQR = async () => {
      if (!qrRef.current) return

      try {

        // Generate QR code
        await QRCode.toCanvas(qrRef.current, value)

        // Add crypto symbol overlay
        const ctx = qrRef.current.getContext('2d')
        if (ctx) {
          // Add white background for crypto symbol
          const centerSize = size * 0.2
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(
            size / 2 - centerSize / 2,
            size / 2 - centerSize / 2,
            centerSize,
            centerSize
          )

          // Add crypto symbol
          ctx.fillStyle = '#000000'
          ctx.font = `bold ${centerSize * 0.7}px sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(cryptoSymbol, size / 2, size / 2)
        }
      } catch (err) {
        console.error("Error generating QR code:", err)
      }
    }

    generateQR()
  }, [value, cryptoSymbol, size])

  return (
    <div className="flex flex-col items-center">
      <div className="p-4 bg-white rounded-xl shadow-lg">
        <canvas
          ref={qrRef}
          className="rounded-lg" />
      </div>
      <div className="mt-4 text-sm font-medium text-gray-300">
        <span className="bg-gray-800 px-3 py-1 rounded-full">
          Scan to deposit {cryptoSymbol}
        </span>
      </div>
    </div>
  )
}
