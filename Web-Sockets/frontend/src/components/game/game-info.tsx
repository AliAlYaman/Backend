"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Crown, AlertTriangle, CheckCircle } from "lucide-react"

interface GameInfoProps {
  gameState: {
    currentPlayer: "white" | "black"
    isCheck: boolean
    isCheckmate: boolean
    isStalemate: boolean
    winner?: "white" | "black" | "draw"
  }
  currentPlayer?: {
    username: string
    color: "white" | "black"
  }
  myTurn: boolean
  gameStarted: boolean
}

export default function GameInfo({ gameState, currentPlayer, myTurn, gameStarted }: GameInfoProps) {
  const getGameStatus = () => {
    if (!gameStarted) {
      return { text: "Waiting for game to start", color: "secondary", icon: null }
    }

    if (gameState.isCheckmate) {
      return {
        text: `Checkmate! ${gameState.winner} wins`,
        color: "destructive",
        icon: <Crown className="h-4 w-4" />,
      }
    }

    if (gameState.isStalemate) {
      return {
        text: "Stalemate - Draw",
        color: "secondary",
        icon: <CheckCircle className="h-4 w-4" />,
      }
    }

    if (gameState.winner === "draw") {
      return {
        text: "Game ended in a draw",
        color: "secondary",
        icon: <CheckCircle className="h-4 w-4" />,
      }
    }

    if (gameState.isCheck) {
      return {
        text: `${gameState.currentPlayer} is in check!`,
        color: "destructive",
        icon: <AlertTriangle className="h-4 w-4" />,
      }
    }

    if (myTurn) {
      return {
        text: "Your turn to move",
        color: "default",
        icon: null,
      }
    }

    return {
      text: `${currentPlayer?.username || gameState.currentPlayer}'s turn`,
      color: "outline",
      icon: null,
    }
  }

  const status = getGameStatus()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Game Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <Badge variant={status.color as any} className="text-sm px-4 py-2">
            {status.icon && <span className="mr-2">{status.icon}</span>}
            {status.text}
          </Badge>
        </div>

        {gameStarted && (
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-600">Current Player</div>
              <div className="font-medium capitalize">{gameState.currentPlayer}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Game State</div>
              <div className="font-medium">
                {gameState.isCheck
                  ? "Check"
                  : gameState.isCheckmate
                    ? "Checkmate"
                    : gameState.isStalemate
                      ? "Stalemate"
                      : "Active"}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
