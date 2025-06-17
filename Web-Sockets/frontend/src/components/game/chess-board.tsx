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
  K: "♔", // White King
  Q: "♕", // White Queen
  R: "♖", // White Rook
  B: "♗", // White Bishop
  N: "♘", // White Knight
  P: "♙", // White Pawn
  k: "♚", // Black King
  q: "♛", // Black Queen
  r: "♜", // Black Rook
  b: "♝", // Black Bishop
  n: "♞", // Black Knight
  p: "♟", // Black Pawn
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
      "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold cursor-pointer transition-all duration-200 relative select-none"

    const lightSquare = isLightSquare(fileIndex, rankIndex)
    const colorClasses = lightSquare ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-900 hover:bg-gray-800"

    let additionalClasses = ""

    // Selected square highlighting
    if (selectedSquare === square) {
      additionalClasses += " ring-4 ring-blue-400 ring-opacity-75 z-10"
    }

    // Possible moves highlighting
    if (possibleMoves.includes(square)) {
      const piece = board[rankIndex][fileIndex]
      if (piece) {
        // Capture move - red circle
        additionalClasses +=
          " after:absolute after:inset-1 after:border-4 after:border-red-400 after:border-opacity-70 after:rounded-full after:pointer-events-none"
      } else {
        // Normal move - green dot
        additionalClasses +=
          " after:absolute after:top-1/2 after:left-1/2 after:w-4 after:h-4 after:bg-green-400 after:bg-opacity-70 after:rounded-full after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:pointer-events-none"
      }
    }

    // Disabled state
    if (disabled) {
      additionalClasses += " cursor-not-allowed opacity-60"
    }

    // Last move highlighting (you can add this later)
    // if (lastMove && (lastMove.from === square || lastMove.to === square)) {
    //   additionalClasses += " bg-yellow-300 bg-opacity-50"
    // }

    return `${baseClasses} ${colorClasses} ${additionalClasses}`
  }

  const getPieceClasses = (piece: string): string => {
    const isWhite = piece === piece.toUpperCase()
    return `drop-shadow-sm ${
      isWhite
        ? "text-gray-100 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]"
        : "text-gray-800 filter drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]"
    }`
  }

  return (
    <div className="inline-block">
      {/* Board container with border and coordinates */}
      <div className="relative">
        {/* File coordinates (a-h) at bottom */}
        <div className="flex justify-center">
          <div className="grid grid-cols-8 gap-0 w-fit">
            {displayFiles.map((file, index) => (
              <div key={file} className="w-12 sm:w-14 md:w-16 text-center text-sm font-medium text-gray-300 py-1">
                {file}
              </div>
            ))}
          </div>
        </div>

        <div className="flex">
          {/* Rank coordinates (1-8) on left */}
          <div className="flex flex-col justify-center">
            {displayRanks.map((rank, index) => (
              <div
                key={rank}
                className="h-12 sm:h-14 md:h-16 flex items-center justify-center text-sm font-medium text-gray-300 px-2"
              >
                {rank}
              </div>
            ))}
          </div>

          {/* Chess board */}
          <div className="border-4 border-gray-800 rounded-lg overflow-hidden shadow-lg">
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
                      title={`${square}${piece ? ` - ${piece}` : ""}`}
                    >
                      {piece && (
                        <span
                          className={getPieceClasses(piece)}
                          style={{
                            userSelect: "none",
                            WebkitUserSelect: "none",
                            MozUserSelect: "none",
                            msUserSelect: "none",
                          }}
                        >
                          {pieceSymbols[piece]}
                        </span>
                      )}
                    </div>
                  )
                }),
              )}
            </div>
          </div>

          {/* Rank coordinates (1-8) on right */}
          <div className="flex flex-col justify-center">
            {displayRanks.map((rank, index) => (
              <div
                key={rank}
                className="h-12 sm:h-14 md:h-16 flex items-center justify-center text-sm font-medium text-gray-300 px-2"
              >
                {rank}
              </div>
            ))}
          </div>
        </div>

        {/* File coordinates (a-h) at top */}
        <div className="flex justify-center">
          <div className="grid grid-cols-8 gap-0 w-fit">
            {displayFiles.map((file, index) => (
              <div key={file} className="w-12 sm:w-14 md:w-16 text-center text-sm font-medium text-gray-300 py-1">
                {file}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game status indicator */}
      {disabled && (
        <div className="text-center mt-2">
          <span className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-full">Waiting for your turn...</span>
        </div>
      )}
    </div>
  )
}

export default memo(ChessBoard)
