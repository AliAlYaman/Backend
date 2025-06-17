"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area"

interface Move {
  from: string
  to: string
  piece: string
  captured?: string
  promotion?: string
  timestamp: number
  player: string
}

interface MoveHistoryProps {
  moves: Move[]
}

export default function MoveHistory({ moves }: MoveHistoryProps) {
  const formatMove = (move: Move, index: number): string => {
    const moveNumber = Math.floor(index / 2) + 1
    const isWhiteMove = index % 2 === 0

    let notation = `${move.from}-${move.to}`

    if (move.captured) {
      notation = `${move.from}x${move.to}`
    }

    if (move.promotion) {
      notation += `=${move.promotion.toUpperCase()}`
    }

    return `${isWhiteMove ? `${moveNumber}.` : ""} ${notation}`
  }

  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Move History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          {moves.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No moves yet</div>
          ) : (
            <div className="space-y-2">
              {moves.map((move, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-sm">{formatMove(move, index)}</span>
                    <span className="text-xs text-gray-500">by {move.player}</span>
                  </div>
                  <span className="text-xs text-gray-400">{formatTime(move.timestamp)}</span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
