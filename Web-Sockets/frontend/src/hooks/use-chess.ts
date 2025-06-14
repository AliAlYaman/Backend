import { useState, useCallback } from "react"

export interface GameState {
  isPlaying: boolean
  timeControl: string
  playerColor: "white" | "black"
  opponent: string
  gameMode: "online" | "computer" | "friend"
}

export function useChessGame() {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    timeControl: "10+0",
    playerColor: "white",
    opponent: "",
    gameMode: "online",
  })

  const startGame = useCallback((mode: GameState["gameMode"], timeControl: string) => {
    setGameState((prev) => ({
      ...prev,
      isPlaying: true,
      gameMode: mode,
      timeControl,
      opponent: mode === "computer" ? "Computer" : "Finding opponent...",
    }))
  }, [])

  const endGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
      opponent: "",
    }))
  }, [])

  const setPlayerColor = useCallback((color: "white" | "black") => {
    setGameState((prev) => ({
      ...prev,
      playerColor: color,
    }))
  }, [])

  return {
    gameState,
    startGame,
    endGame,
    setPlayerColor,
  }
}
