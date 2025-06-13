import { useEffect, useRef } from "react"

interface BalanceChartProps {
  timeframe: "1d" | "7d" | "30d" | "90d"
}

export default function BalanceChart({ timeframe }: BalanceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Generate mock data based on timeframe
    const dataPoints = timeframe === "1d" ? 24 : timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90

    const data = generateMockData(dataPoints)

    // Draw chart
    drawChart(ctx, data, canvasRef.current.width, canvasRef.current.height)
  }, [timeframe])

  // Generate mock data
  const generateMockData = (points: number) => {
    const data = []
    let value = 1000 + Math.random() * 500

    for (let i = 0; i < points; i++) {
      // Add some randomness to create a realistic chart
      value = value + (Math.random() * 100 - 50)
      // Ensure value doesn't go below 500
      value = Math.max(500, value)
      data.push(value)
    }

    return data
  }

  // Draw chart function
  const drawChart = (ctx: CanvasRenderingContext2D, data: number[], width: number, height: number) => {
    const padding = 10
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Find min and max values
    const minValue = Math.min(...data) * 0.9
    const maxValue = Math.max(...data) * 1.1
    const valueRange = maxValue - minValue

    // Draw gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding)
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.5)") // blue-500 with opacity
    gradient.addColorStop(1, "rgba(59, 130, 246, 0)") // transparent

    // Draw line
    ctx.beginPath()
    ctx.moveTo(padding, height - padding - ((data[0] - minValue) / valueRange) * chartHeight)

    // Draw data points
    for (let i = 0; i < data.length; i++) {
      const x = padding + (i / (data.length - 1)) * chartWidth
      const y = height - padding - ((data[i] - minValue) / valueRange) * chartHeight
      ctx.lineTo(x, y)
    }

    // Complete the area under the line
    ctx.lineTo(width - padding, height - padding)
    ctx.lineTo(padding, height - padding)
    ctx.closePath()

    // Fill area
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw line
    ctx.beginPath()
    ctx.moveTo(padding, height - padding - ((data[0] - minValue) / valueRange) * chartHeight)

    for (let i = 0; i < data.length; i++) {
      const x = padding + (i / (data.length - 1)) * chartWidth
      const y = height - padding - ((data[i] - minValue) / valueRange) * chartHeight
      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = "#3b82f6" // blue-500
    ctx.lineWidth = 2
    ctx.stroke()
  }

  return (
    <div className="w-full h-32">
      <canvas ref={canvasRef} width={300} height={120} className="w-full h-full"></canvas>
    </div>
  )
}
