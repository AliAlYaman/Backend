"use client"

import { memo } from "react"

interface ChessBoardProps {
  board: (string | null)[][]
  selectedSquare: string | null
  possibleMoves: string[]
  onSquareClick: (square: string) => void
  flipped?: boolean
  disabled?: boolean
}

const pieceSymbols: Record<string, string> = {
  K: "♔",
  Q: "♕",
  R: "♖",
  B: "♗",
  N: "♘",
  P: "♙",
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟",
}

function ChessBoard({
  board,
  selectedSquare,
  possibleMoves,
  onSquareClick,
  flipped = false,
  disabled = false,
}: ChessBoardProps) {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"]

  const displayFiles = flipped ? [...files].reverse() : files
  const displayRanks = flipped ? [...ranks].reverse() : ranks

  const getSquareName = (fileIndex: number, rankIndex: number): string => {
    const file = flipped ? files[7 - fileIndex] : files[fileIndex]
    const rank = flipped ? ranks[7 - rankIndex] : ranks[rankIndex]
    return `${file}${rank}`
  }

  const isLightSquare = (fileIndex: number, rankIndex: number): boolean => {
    return (fileIndex + rankIndex) % 2 === 0
  }

  const getSquareClasses = (square: string, fileIndex: number, rankIndex: number): string => {
    const baseClasses =
      "w-12 h-12 flex items-center justify-center text-2xl font-bold cursor-pointer transition-all duration-200 relative"
    const lightSquare = isLightSquare(fileIndex, rankIndex)
    const colorClasses = lightSquare ? "bg-amber-100" : "bg-amber-800"

    let additionalClasses = ""

    if (selectedSquare === square) {
      additionalClasses += " ring-4 ring-blue-400 ring-opacity-75"
    }

    if (possibleMoves.includes(square)) {
      additionalClasses +=
        " after:absolute after:inset-0 after:bg-green-400 after:bg-opacity-30 after:rounded-full after:m-2"
    }

    if (disabled) {
      additionalClasses += " cursor-not-allowed opacity-75"
    } else {
      additionalClasses += " hover:bg-opacity-80"
    }

    return `${baseClasses} ${colorClasses} ${additionalClasses}`
  }

  return (
    <div className="inline-block border-2 border-amber-900 rounded-lg overflow-hidden">
      <div className="grid grid-cols-8 gap-0">
        {displayRanks.map((rank, rankIndex) =>
          displayFiles.map((file, fileIndex) => {
            const square = getSquareName(fileIndex, rankIndex)
            const piece = board[rankIndex][fileIndex]

            return (
              <div
                key={square}
                className={getSquareClasses(square, fileIndex, rankIndex)}
                onClick={() => !disabled && onSquareClick(square)}
              >
                {piece && (
                  <span className={piece === piece.toUpperCase() ? "text-white" : "text-black"}>
                    {pieceSymbols[piece]}
                  </span>
                )}

                {/* Square coordinates */}
                {fileIndex === 0 && (
                  <span className="absolute top-1 left-1 text-xs font-normal opacity-60">{rank}</span>
                )}
                {rankIndex === displayRanks.length - 1 && (
                  <span className="absolute bottom-1 right-1 text-xs font-normal opacity-60">{file}</span>
                )}
              </div>
            )
          }),
        )}
      </div>
    </div>
  )
}

export default memo(ChessBoard)
