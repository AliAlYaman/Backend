"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { io, type Socket } from "socket.io-client"
import { Chess, type Square } from "chess.js"
import { Chessboard } from "react-chessboard"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"
import {
  User,
  Clock,
  Flag,
  Handshake,
  RotateCcw,
  Crown,
  AlertTriangle,
  CheckCircle,
  Wifi,
  WifiOff,
  Copy,
  Share2,
  Users,
} from "lucide-react"
import { useAuth } from "../../contexts/auth-context"

interface ChessMove {
  from: string
  to: string
  piece: string
  captured?: string
  promotion?: string
  timestamp: number
  player: string
}

interface GameState {
  _id?: string
  roomId: string
  fen: string
  moves: ChessMove[]
  whitePlayer: string | null
  blackPlayer: string | null
  currentTurn: "w" | "b"
  gameStarted: boolean
  createdAt?: string
  updatedAt?: string
}

interface ChessRoomProps {
  roomId: string
}

const ChessRoom: React.FC<ChessRoomProps> = ({ roomId }) => {
  const { user } = useAuth()
  const playerName = user?.username || "Anonymous"

  const [game] = useState(new Chess())
  const [fen, setFen] = useState(game.fen())
  const [playerColor, setPlayerColor] = useState<"white" | "black" | null>(null)
  const [gameState, setGameState] = useState<GameState>({
    roomId,
    fen: game.fen(),
    moves: [],
    whitePlayer: null,
    blackPlayer: null,
    currentTurn: "w",
    gameStarted: false,
  })
  const [isConnected, setIsConnected] = useState(false)
  const [copied, setCopied] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    // Connect to the backend server
    const socket = io("http://localhost:3000", {
      transports: ["websocket", "polling"],
    })
    socketRef.current = socket

    socket.on("connect", () => {
      setIsConnected(true)
      setConnectionError(null)
      console.log("Connected to server")

      // Join room and request current game state
      socket.emit("join_room", { roomId, playerName })
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
      console.log("Disconnected from server")
    })

    socket.on("connect_error", (error) => {
      setConnectionError("Failed to connect to game server")
      console.error("Connection error:", error)
    })

    // Handle player assignment from server
    socket.on(
      "player_assigned",
      ({ color, gameState: serverGameState }: { color: "white" | "black"; gameState: GameState }) => {
        console.log(`Server assigned as ${color} player`)
        setPlayerColor(color)

        if (serverGameState) {
          // Update chess.js instance with server state
          if (serverGameState.fen !== game.fen()) {
            game.load(serverGameState.fen)
          }
          setFen(serverGameState.fen)
          setGameState(serverGameState)
          console.log("Loaded game state from server:", serverGameState)
        }
      },
    )

    // Handle game state updates from server
    socket.on("game_state_update", (newGameState: GameState) => {
      console.log("Game state updated:", newGameState)

      // Update chess.js instance
      if (newGameState.fen !== game.fen()) {
        game.load(newGameState.fen)
      }
      setFen(newGameState.fen)
      setGameState(newGameState)
    })

    // Handle moves from other players
    socket.on(
      "move_made",
      ({ from, to, gameState: newGameState }: { from: Square; to: Square; gameState: GameState }) => {
        console.log("Move received:", { from, to })

        // Update chess.js instance
        if (newGameState.fen !== game.fen()) {
          game.load(newGameState.fen)
        }
        setFen(newGameState.fen)
        setGameState(newGameState)
      },
    )

    // Handle when another player joins
    socket.on("player_joined", (updatedGameState: GameState) => {
      console.log("Player joined, game state updated")
      setGameState(updatedGameState)

      // If game just started, update the chess board
      if (updatedGameState.gameStarted && updatedGameState.fen !== game.fen()) {
        game.load(updatedGameState.fen)
        setFen(updatedGameState.fen)
      }
    })

    // Handle when a player leaves
    socket.on("player_left", (updatedGameState: GameState) => {
      console.log("Player left")
      setGameState(updatedGameState)
    })

    return () => {
      socket.disconnect()
    }
  }, [roomId, playerName, game])

  const handleMove = (from: Square, to: Square) => {
    // Check if connected to server
    if (!isConnected) {
      console.log("Not connected to server")
      return false
    }

    // Check if game has started and player color is assigned
    if (!playerColor || !gameState.gameStarted) {
      console.log("Game not started or player color not assigned")
      return false
    }

    // Check if it's the player's turn
    const isPlayerTurn =
      (gameState.currentTurn === "w" && playerColor === "white") ||
      (gameState.currentTurn === "b" && playerColor === "black")

    if (!isPlayerTurn) {
      console.log("Not your turn!")
      return false
    }

    // Check if the piece being moved belongs to the player
    const piece = game.get(from)
    if (!piece) {
      console.log("No piece at source square")
      return false
    }

    const pieceColor = piece.color === "w" ? "white" : "black"
    if (pieceColor !== playerColor) {
      console.log("Cannot move opponent's piece")
      return false
    }

    // Test the move locally first
    const testGame = new Chess(game.fen())
    const testMove = testGame.move({ from, to })

    if (!testMove) {
      console.log("Invalid move")
      return false
    }

    // If move is valid, send it to the server
    socketRef.current?.emit("make_move", {
      roomId,
      from,
      to,
      playerName,
      playerColor,
    })

    return true
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy room ID:", err)
    }
  }

  const shareGame = async () => {
    const gameUrl = `${window.location.origin}/game/${roomId}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join my Chess Game",
          text: `Play chess with me! Room ID: ${roomId}`,
          url: gameUrl,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(gameUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy URL:", err)
      }
    }
  }

  const getGameStatus = () => {
    if (!gameState.gameStarted) {
      const waitingFor = !gameState.whitePlayer
        ? "white player"
        : !gameState.blackPlayer
          ? "black player"
          : "game to start"
      return {
        text: `Waiting for ${waitingFor}...`,
        color: "secondary",
        icon: <User className="h-4 w-4" />,
      }
    }

    if (game.isCheckmate()) {
      const winner = game.turn() === "w" ? "Black" : "White"
      return {
        text: `Checkmate! ${winner} wins`,
        color: "destructive",
        icon: <Crown className="h-4 w-4" />,
      }
    }

    if (game.isStalemate()) {
      return {
        text: "Stalemate - Draw",
        color: "secondary",
        icon: <CheckCircle className="h-4 w-4" />,
      }
    }

    if (game.isDraw()) {
      return {
        text: "Game ended in a draw",
        color: "secondary",
        icon: <CheckCircle className="h-4 w-4" />,
      }
    }

    if (game.inCheck()) {
      const player = game.turn() === "w" ? "White" : "Black"
      return {
        text: `${player} is in check!`,
        color: "destructive",
        icon: <AlertTriangle className="h-4 w-4" />,
      }
    }

    const currentPlayer = game.turn() === "w" ? "White" : "Black"
    const isMyTurn =
      (game.turn() === "w" && playerColor === "white") || (game.turn() === "b" && playerColor === "black")

    return {
      text: isMyTurn ? "Your turn" : `${currentPlayer}'s turn`,
      color: isMyTurn ? "default" : "outline",
      icon: null,
    }
  }

  const status = getGameStatus()
  const opponentColor = playerColor === "white" ? "black" : "white"
  const opponentName = playerColor === "white" ? gameState.blackPlayer : gameState.whitePlayer

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Chess Game</h1>
                <p className="text-sm text-gray-400">Room: {roomId}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                {isConnected ? (
                  <>
                    <Wifi className="h-4 w-4 text-green-400" />
                    <span>Connected</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-4 w-4 text-red-400" />
                    <span>Disconnected</span>
                  </>
                )}
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

        {/* Connection Error */}
        {connectionError && (
          <div className="mb-6 bg-red-900/50 border border-red-700 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-red-300">
              <AlertTriangle className="h-5 w-5" />
              <span>{connectionError}</span>
            </div>
          </div>
        )}

        {/* Player Assignment Info */}
        {playerColor && (
          <div className="mb-6 bg-blue-900/50 border border-blue-700 rounded-lg p-4 text-center text-white">
            <div className="flex items-center justify-center space-x-2">
              <Badge variant={playerColor === "white" ? "secondary" : "default"} className="text-sm">
                You are playing as {playerColor}
              </Badge>
              {!gameState.gameStarted && (
                <span className="text-blue-300 text-sm">Waiting for {opponentColor} player to join...</span>
              )}
            </div>
          </div>
        )}

        {/* Waiting for opponent */}
        {!gameState.gameStarted && (
          <div className="mb-6 bg-blue-900/50 border border-blue-700 rounded-lg p-6 text-center">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-blue-200 mb-2">Setting up game...</h3>
              <p className="text-blue-300 mb-4">
                Players: {gameState.whitePlayer ? "White ✓" : "White ⏳"} |{" "}
                {gameState.blackPlayer ? "Black ✓" : "Black ⏳"}
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-blue-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              {/* Opponent Info */}
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {opponentName ? opponentName.charAt(0).toUpperCase() : "?"}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{opponentName || "Waiting..."}</span>
                        {opponentName && (
                          <Badge
                            variant={opponentColor === "black" ? "default" : "secondary"}
                            className={
                              opponentColor === "black" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
                            }
                          >
                            {opponentColor}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {gameState.gameStarted && (
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                        <Clock className="h-4 w-4" />
                        <span>Time Left</span>
                      </div>
                      <div className="font-mono text-lg text-white">10:00</div>
                    </div>
                  )}
                </div>
              </CardHeader>

              {/* Chess Board */}
              <CardContent className="flex justify-center p-4">
                <div className="w-full max-w-lg">
                  <Chessboard
                    position={fen}
                    onPieceDrop={handleMove}
                    boardOrientation={playerColor || "white"}
                    customBoardStyle={{
                      borderRadius: "8px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                    }}
                    customDarkSquareStyle={{ backgroundColor: "#374151" }}
                    customLightSquareStyle={{ backgroundColor: "#9CA3AF" }}
                    arePiecesDraggable={gameState.gameStarted && playerColor !== null && isConnected}
                  />
                </div>
              </CardContent>

              {/* Player Info */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{playerName.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{playerName}</span>
                        {playerColor && (
                          <Badge
                            variant={playerColor === "white" ? "secondary" : "default"}
                            className={playerColor === "white" ? "bg-gray-200 text-gray-900" : "bg-gray-900 text-white"}
                          >
                            {playerColor}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {gameState.gameStarted && playerColor && (
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                        <Clock className="h-4 w-4" />
                        <span>Time Left</span>
                      </div>
                      <div className="font-mono text-lg text-white">10:00</div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Game Info & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Status */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm text-white">
              <CardHeader>
                <CardTitle className="text-white">Game Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center">
                  <Badge variant={status.color as any} className="text-sm px-4 py-2">
                    {status.icon && <span className="mr-2">{status.icon}</span>}
                    {status.text}
                  </Badge>
                </div>

                {gameState.gameStarted && (
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-400">Current Turn</div>
                      <div className="font-medium text-white capitalize">{game.turn() === "w" ? "White" : "Black"}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Move Count</div>
                      <div className="font-medium text-white">{Math.ceil(game.history().length / 2)}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Move History */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Move History</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  {gameState.moves.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">No moves yet</div>
                  ) : (
                    <div className="space-y-2">
                      {gameState.moves.map((move, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-gray-700/50">
                          <div className="flex items-center space-x-3">
                            <span className="font-mono text-sm text-white">
                              {move.from}-{move.to}
                            </span>
                            <span className="text-xs text-gray-400">by {move.player}</span>
                          </div>
                          <span className="text-xs text-gray-500">{new Date(move.timestamp).toLocaleTimeString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Game Controls */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Game Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  disabled={!gameState.gameStarted || !isConnected}
                >
                  <Handshake className="h-4 w-4 mr-2" />
                  Offer Draw
                </Button>
                <Button
                  variant="destructive"
                  className="w-full bg-red-900/50 border-red-700 text-red-200 hover:bg-red-900"
                  disabled={!gameState.gameStarted || !isConnected}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Resign
                </Button>
                <Button
                  variant="secondary"
                  className="w-full bg-gray-700 text-gray-200 hover:bg-gray-600"
                  onClick={() => window.location.reload()}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Leave Game
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChessRoom
