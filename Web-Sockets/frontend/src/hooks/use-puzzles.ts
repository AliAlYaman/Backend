import { useState, useCallback } from "react"

export interface Puzzle {
  id: string
  fen: string
  moves: string[]
  rating: number
  themes: string[]
  solution: string[]
}

export interface PuzzleStats {
  solved: number
  attempted: number
  rating: number
  streak: number
}

export function usePuzzles() {
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null)
  const [stats, setStats] = useState<PuzzleStats>({
    solved: 0,
    attempted: 0,
    rating: 1200,
    streak: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchPuzzle = useCallback(async (difficulty?: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockPuzzle: Puzzle = {
        id: Math.random().toString(36).substr(2, 9),
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: [],
        rating: Math.floor(Math.random() * 1000) + 1000,
        themes: ["fork", "pin"],
        solution: ["Nf3", "Nc6", "Bb5"],
      }
      setCurrentPuzzle(mockPuzzle)
      setIsLoading(false)
    }, 1000)
  }, [])

  const solvePuzzle = useCallback((correct: boolean) => {
    setStats((prev) => ({
      ...prev,
      attempted: prev.attempted + 1,
      solved: correct ? prev.solved + 1 : prev.solved,
      streak: correct ? prev.streak + 1 : 0,
      rating: correct ? prev.rating + 10 : Math.max(prev.rating - 5, 800),
    }))
  }, [])

  return {
    currentPuzzle,
    stats,
    isLoading,
    fetchPuzzle,
    solvePuzzle,
  }
}
