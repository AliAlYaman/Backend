"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ArrowLeft, Copy, Share2, Users, Clock, Wifi, Crown } from "lucide-react"
import ChessGame from "../components/game/chess-game"
import { useAuth } from "../contexts/auth-context"

export default function ChessGamePage() {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [gameRoomId, setGameRoomId] = useState<string>("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (roomId) {
      setGameRoomId(roomId)
    } else {
      // Generate a random room ID if none provided
      const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase()
      setGameRoomId(newRoomId)
      navigate(`/game/${newRoomId}`, { replace: true })
    }
  }, [roomId, navigate])

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(gameRoomId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy room ID:", err)
    }
  }

  const shareGame = async () => {
    const gameUrl = `${window.location.origin}/game/${gameRoomId}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join my Chess Game",
          text: `Play chess with me! Room ID: ${gameRoomId}`,
          url: gameUrl,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(gameUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy URL:", err)
      }
    }
  }

  if (!gameRoomId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-white mb-2">Setting up game room...</h3>
            <p className="text-gray-400">Please wait while we prepare your chess game</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Back button and game info */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <div className="hidden sm:block">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-white">Chess Game</h1>
                    <p className="text-xs text-gray-400">Room: {gameRoomId}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Room sharing */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 bg-gray-700/50 rounded-lg px-3 py-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">Room ID:</span>
                <code className="text-sm font-mono text-green-400 bg-gray-800 px-2 py-1 rounded">{gameRoomId}</code>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={copyRoomId}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy ID"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={shareGame}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile room info */}
      <div className="sm:hidden bg-gray-800/30 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">Chess Game</h1>
            <p className="text-sm text-gray-400">Room: {gameRoomId}</p>
          </div>
          <Badge variant="outline" className="border-green-400 text-green-400">
            <Users className="h-3 w-3 mr-1" />
            Multiplayer
          </Badge>
        </div>
      </div>

      {/* Game Content */}
      <div className="relative">
        <ChessGame roomId={gameRoomId} username={user?.username} />
      </div>

      {/* Footer */}
      <div className="bg-gray-800/30 border-t border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Real-time gameplay</span>
              </div>
              <div className="flex items-center space-x-1">
                <Wifi className="h-4 w-4 text-green-400" />
                <span>Connected</span>
              </div>
            </div>

            <div className="text-xs text-gray-500">Powered by Chess.com • {new Date().getFullYear()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
