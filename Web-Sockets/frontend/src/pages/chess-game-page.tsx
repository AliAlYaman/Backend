import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { ArrowLeft } from "lucide-react"
import ChessRoom from "../components/game/chess-room"
import { useAuth } from "../contexts/auth-context"

export default function ChessGamePage() {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  useAuth()
  const [gameRoomId, setGameRoomId] = useState<string>("")

  useEffect(() => {
    if (roomId) {
      setGameRoomId(roomId)
    } else {
      // Default to MAIN_ROOM if no roomId provided
      const defaultRoomId = "MAIN_ROOM"
      setGameRoomId(defaultRoomId)
      navigate(`/game/${defaultRoomId}`, { replace: true })
    }
  }, [roomId, navigate])

  if (!gameRoomId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-white mb-2">Setting up game room...</h3>
          <p className="text-gray-400">Please wait while we prepare your chess game</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Chess Game */}
      <ChessRoom roomId={gameRoomId} />
    </div>
  )
}
