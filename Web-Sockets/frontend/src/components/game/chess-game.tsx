"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { User, AlertCircle, Wifi, WifiOff } from "lucide-react"
import socket from "../../lib/socket"
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
  board: string[][]
  currentPlayer: "white" | "black"
  isCheck: boolean
  isCheckmate: boolean
  isStalemate: boolean
  winner?: "white" | "black" | "draw"
}

const initialBoard = [
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
        // White player starts first
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

      // Update timer
      setTimeLeft(moveData.timeLeft)
    })

    socket.on("game-state-update", (newGameState) => {
      setGameState(newGameState)
    })

    socket.on("room-full", () => {
      setConnectionError("Room is full! Cannot join the game.")
    })

    socket.on("player-disconnected", ({ playerId }) => {
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
      const col = file.charCodeAt(0) - 97 // a=0, b=1, etc.
      const row = 8 - Number.parseInt(rank) // 8=0, 7=1, etc.
      const piece = gameState.board[row][col]

      if (selectedSquare === null) {
        // Select a piece
        if (piece && isPieceOwnedByPlayer(piece, myColor)) {
          setSelectedSquare(square)
          setPossibleMoves(calculatePossibleMoves(square, piece, gameState.board))
        }
      } else {
        // Make a move or select a different piece
        if (selectedSquare === square) {
          // Deselect
          setSelectedSquare(null)
          setPossibleMoves([])
        } else if (piece && isPieceOwnedByPlayer(piece, myColor)) {
          // Select a different piece
          setSelectedSquare(square)
          setPossibleMoves(calculatePossibleMoves(square, piece, gameState.board))
        } else if (possibleMoves.includes(square)) {
          // Make the move
          handleMove({
            from: selectedSquare,
            to: square,
            piece: gameState.board[Number.parseInt(selectedSquare[1]) - 1][selectedSquare.charCodeAt(0) - 97],
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

  // Helper function to check if piece belongs to player
  const isPieceOwnedByPlayer = (piece: string, playerColor: "white" | "black" | null): boolean => {
    if (!playerColor) return false
    return playerColor === "white" ? piece === piece.toUpperCase() : piece === piece.toLowerCase()
  }

  // Calculate possible moves (simplified - you'd want a full chess engine here)
  const calculatePossibleMoves = (square: string, piece: string, board: string[][]): string[] => {
    // This is a simplified implementation
    // In a real chess game, you'd implement full chess rules
    const moves: string[] = []
    const [file, rank] = square.split("")
    const col = file.charCodeAt(0) - 97
    const row = 8 - Number.parseInt(rank)

    // Add basic movement patterns based on piece type
    const pieceType = piece.toLowerCase()

    switch (pieceType) {
      case "p": // Pawn
        // Add pawn movement logic
        break
      case "r": // Rook
        // Add rook movement logic
        break
      case "n": // Knight
        // Add knight movement logic
        break
      case "b": // Bishop
        // Add bishop movement logic
        break
      case "q": // Queen
        // Add queen movement logic
        break
      case "k": // King
        // Add king movement logic
        break
    }

    return moves
  }

  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Get current player info
  const currentPlayer = players.find((p) => p.color === gameState.currentPlayer)
  const opponent = players.find((p) => p.username !== playerName)
  const myPlayer = players.find((p) => p.username === playerName)

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chess Game</h1>
              <p className="text-gray-600">Room: {roomId}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isConnected ? (
                  <Wifi className="h-5 w-5 text-green-500" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm text-gray-600">{isConnected ? "Connected" : "Disconnected"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Error */}
        {connectionError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-700">{connectionError}</span>
          </div>
        )}

        {/* Waiting for opponent */}
        {!opponentJoined && !connectionError && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-md p-4 text-center">
            <div className="animate-pulse">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Waiting for opponent...</h3>
              <p className="text-blue-700">
                Share this room ID with your friend: <strong>{roomId}</strong>
              </p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    {opponent && (
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4" />
                        </div>
                        <span>{opponent.username}</span>
                        <Badge variant={opponent.color === "black" ? "default" : "secondary"}>{opponent.color}</Badge>
                      </div>
                    )}
                  </CardTitle>
                  {gameStarted && (
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Time Left</div>
                      <div className="font-mono text-lg">{formatTime(timeLeft[opponent?.color || "black"])}</div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ChessBoard
                  board={gameState.board}
                  selectedSquare={selectedSquare}
                  possibleMoves={possibleMoves}
                  onSquareClick={handleSquareClick}
                  flipped={myColor === "black"}
                  disabled={!myTurn || !gameStarted}
                />
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="font-medium">{playerName}</span>
                    <Badge variant={myColor === "white" ? "secondary" : "default"}>{myColor || "spectator"}</Badge>
                    {myTurn && gameStarted && (
                      <Badge variant="outline" className="text-green-600">
                        Your Turn
                      </Badge>
                    )}
                  </div>
                  {gameStarted && (
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Time Left</div>
                      <div className="font-mono text-lg">{formatTime(timeLeft[myColor || "white"])}</div>
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
            <Card>
              <CardHeader>
                <CardTitle>Game Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full" disabled={!gameStarted}>
                  Offer Draw
                </Button>
                <Button variant="destructive" className="w-full" disabled={!gameStarted}>
                  Resign
                </Button>
                <Button variant="secondary" className="w-full" onClick={() => window.location.reload()}>
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
