"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { User, AlertCircle, Wifi, WifiOff, Timer, Flag, Handshake, RotateCcw } from "lucide-react"
import {socket} from "../../lib/socket"
import ChessBoard from "./chess-board"
import GameInfo from "./game-info"
import MoveHistory from "./move-history"
import { useAuth } from "../../contexts/auth-context"

interface ChessGameProps {
  roomId: string
  username?: string
}

interface Player {
  id: string
  username: string
  color: "white" | "black"
  rating?: number
}

interface Move {
  from: string
  to: string
  piece: string
  captured?: string
  promotion?: string
  timestamp: number
  player: string
}

interface GameState {
  board: (string | null)[][]
  currentPlayer: "white" | "black"
  isCheck: boolean
  isCheckmate: boolean
  isStalemate: boolean
  winner?: "white" | "black" | "draw"
}

const initialBoard: (string | null)[][] = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
]

export default function ChessGame({ roomId, username }: ChessGameProps) {
  const { user } = useAuth()
  const playerName = username || user?.username || "Anonymous"

  // Game state
  const [opponentJoined, setOpponentJoined] = useState(false)
  const [moves, setMoves] = useState<Move[]>([])
  const [myTurn, setMyTurn] = useState(false)
  const [gameState, setGameState] = useState<GameState>({
    board: initialBoard,
    currentPlayer: "white",
    isCheck: false,
    isCheckmate: false,
    isStalemate: false,
  })

  // Player state
  const [players, setPlayers] = useState<Player[]>([])
  const [myColor, setMyColor] = useState<"white" | "black" | null>(null)
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<string[]>([])

  // Connection state
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  // Timer state
  const [timeLeft, setTimeLeft] = useState({ white: 600, black: 600 }) // 10 minutes each
  const [gameStarted, setGameStarted] = useState(false)

  // Connect to socket and join game room
  useEffect(() => {
    socket.connect()

    socket.on("connect", () => {
      setIsConnected(true)
      setConnectionError(null)
      socket.emit("join-game", { roomId, username: playerName })
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
    })

    socket.on("connect_error", (error) => {
      setConnectionError("Failed to connect to game server")
      console.error("Socket connection error:", error)
    })

    socket.on("player-joined", ({ players: gamePlayers, playerColor }) => {
      console.log("Player joined room:", gamePlayers)
      setPlayers(gamePlayers)

      if (playerColor) {
        setMyColor(playerColor)
      }

      if (gamePlayers.length === 2) {
        setOpponentJoined(true)
        setGameStarted(true)
        setMyTurn(playerColor === "white")
      }
    })

    socket.on("opponent-move", (moveData) => {
      console.log("Opponent moved:", moveData)
      const newMove: Move = {
        ...moveData,
        timestamp: Date.now(),
      }

      setMoves((prev) => [...prev, newMove])
      setGameState(moveData.gameState)
      setMyTurn(true)
      setTimeLeft(moveData.timeLeft)
    })

    socket.on("game-state-update", (newGameState) => {
      setGameState(newGameState)
    })

    socket.on("room-full", () => {
      setConnectionError("Room is full! Cannot join the game.")
    })

    socket.on("player-disconnected", () => {
      setConnectionError("Your opponent has disconnected")
      setOpponentJoined(false)
    })

    socket.on("game-ended", ({ winner, reason }) => {
      setGameState((prev) => ({ ...prev, winner }))
      setMyTurn(false)
      console.log(`Game ended. Winner: ${winner}, Reason: ${reason}`)
    })

    socket.on("timer-update", (newTimeLeft) => {
      setTimeLeft(newTimeLeft)
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("connect_error")
      socket.off("player-joined")
      socket.off("opponent-move")
      socket.off("game-state-update")
      socket.off("room-full")
      socket.off("player-disconnected")
      socket.off("game-ended")
      socket.off("timer-update")
      socket.disconnect()
    }
  }, [roomId, playerName])

  // Handle piece selection and movement
  const handleSquareClick = useCallback(
    (square: string) => {
      if (!myTurn || !gameStarted || gameState.isCheckmate) return

      const [file, rank] = square.split("")
      const col = file.charCodeAt(0) - 97
      const row = 8 - Number.parseInt(rank)
      const piece = gameState.board[row][col]

      if (selectedSquare === null) {
        if (piece && isPieceOwnedByPlayer(piece, myColor)) {
          setSelectedSquare(square)
          setPossibleMoves(calculatePossibleMoves(square, piece, gameState.board))
        }
      } else {
        if (selectedSquare === square) {
          setSelectedSquare(null)
          setPossibleMoves([])
        } else if (piece && isPieceOwnedByPlayer(piece, myColor)) {
          setSelectedSquare(square)
          setPossibleMoves(calculatePossibleMoves(square, piece, gameState.board))
        } else if (possibleMoves.includes(square)) {
          handleMove({
            from: selectedSquare,
            to: square,
            piece: gameState.board[Number.parseInt(selectedSquare[1]) - 1][selectedSquare.charCodeAt(0) - 97] || "",
          })
          setSelectedSquare(null)
          setPossibleMoves([])
        }
      }
    },
    [myTurn, gameStarted, gameState, selectedSquare, possibleMoves, myColor],
  )

  // Handle move submission
  const handleMove = useCallback(
    (move: Partial<Move>) => {
      if (!myTurn || !gameStarted) return

      const moveData = {
        ...move,
        player: playerName,
        timestamp: Date.now(),
      }

      socket.emit("move", { roomId, move: moveData })
      setMoves((prev) => [...prev, moveData as Move])
      setMyTurn(false)
    },
    [myTurn, gameStarted, roomId, playerName],
  )

  // Helper functions
  const isPieceOwnedByPlayer = (piece: string, playerColor: "white" | "black" | null): boolean => {
    if (!playerColor) return false
    return playerColor === "white" ? piece === piece.toUpperCase() : piece === piece.toLowerCase()
  }

  const calculatePossibleMoves = (square: string, piece: string, board: (string | null)[][]): string[] => {
    // Simplified implementation - in production, use a proper chess engine
    return []
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Get player info
  const currentPlayer = players.find((p) => p.color === gameState.currentPlayer)
  const opponent = players.find((p) => p.username !== playerName)

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Connection Error */}
        {connectionError && (
          <div className="mb-6 bg-red-900/50 border border-red-700 rounded-lg p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
            <span className="text-red-200">{connectionError}</span>
          </div>
        )}

        {/* Waiting for opponent */}
        {!opponentJoined && !connectionError && (
          <div className="mb-6 bg-blue-900/50 border border-blue-700 rounded-lg p-6 text-center">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-blue-200 mb-2">Waiting for opponent...</h3>
              <p className="text-blue-300 mb-4">
                Share the room ID <code className="bg-blue-800 px-2 py-1 rounded text-blue-200">{roomId}</code> with
                your friend
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
                    {opponent ? (
                      <>
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {opponent.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">{opponent.username}</span>
                            <Badge
                              variant={opponent.color === "black" ? "default" : "secondary"}
                              className={
                                opponent.color === "black" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
                              }
                            >
                              {opponent.color}
                            </Badge>
                          </div>
                          {opponent.rating && <span className="text-sm text-gray-400">Rating: {opponent.rating}</span>}
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <span className="text-gray-400">Waiting for opponent...</span>
                      </div>
                    )}
                  </div>

                  {gameStarted && opponent && (
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                        <Timer className="h-4 w-4" />
                        <span>Time Left</span>
                      </div>
                      <div className="font-mono text-lg text-white">{formatTime(timeLeft[opponent.color])}</div>
                    </div>
                  )}
                </div>
              </CardHeader>

              {/* Chess Board */}
              <CardContent className="flex justify-center">
                <ChessBoard
                  board={gameState.board}
                  selectedSquare={selectedSquare}
                  possibleMoves={possibleMoves}
                  onSquareClick={handleSquareClick}
                  flipped={myColor === "black"}
                  disabled={!myTurn || !gameStarted}
                />
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
                        <Badge
                          variant={myColor === "white" ? "secondary" : "default"}
                          className={myColor === "white" ? "bg-gray-200 text-gray-900" : "bg-gray-900 text-white"}
                        >
                          {myColor || "spectator"}
                        </Badge>
                        {myTurn && gameStarted && (
                          <Badge variant="outline" className="border-green-400 text-green-400">
                            Your Turn
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        {isConnected ? (
                          <>
                            <Wifi className="h-3 w-3 text-green-400" />
                            <span>Connected</span>
                          </>
                        ) : (
                          <>
                            <WifiOff className="h-3 w-3 text-red-400" />
                            <span>Disconnected</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {gameStarted && (
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                        <Timer className="h-4 w-4" />
                        <span>Time Left</span>
                      </div>
                      <div className="font-mono text-lg text-white">{formatTime(timeLeft[myColor || "white"])}</div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Game Info & Controls */}
          <div className="lg:col-span-2 space-y-6">
            <GameInfo gameState={gameState} currentPlayer={currentPlayer} myTurn={myTurn} gameStarted={gameStarted} />

            <MoveHistory moves={moves} />

            {/* Game Controls */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Game Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  disabled={!gameStarted}
                >
                  <Handshake className="h-4 w-4 mr-2" />
                  Offer Draw
                </Button>
                <Button
                  variant="destructive"
                  className="w-full bg-red-900/50 border-red-700 text-red-200 hover:bg-red-900"
                  disabled={!gameStarted}
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
