"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { ArrowLeft, Users, Play, Search, Crown, Zap } from "lucide-react"
import DashboardHeader from "../components/dashboard/dashboard-header"

export default function JoinRoomPage() {
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState("")
  const [isJoining, setIsJoining] = useState(false)

  const handleJoinRoom = async () => {
    if (!roomId.trim()) return

    setIsJoining(true)
    // Simulate a brief loading state
    await new Promise((resolve) => setTimeout(resolve, 500))
    navigate(`/game/${roomId.trim().toUpperCase()}`)
  }

  const handleQuickJoin = () => {
    navigate("/game/MAIN_ROOM")
  }

  const popularRooms = [
    { id: "MAIN_ROOM", name: "Main Room", players: "2/2", status: "Active" },
    { id: "BEGINNERS", name: "Beginners Only", players: "1/2", status: "Waiting" },
    { id: "BLITZ", name: "Blitz Games", players: "0/2", status: "Empty" },
    { id: "MASTERS", name: "Masters Club", players: "2/2", status: "Active" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/play")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Chess Room</h1>
          <p className="text-gray-600">Enter a room ID to join a specific game or browse popular rooms</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Join by Room ID */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Join by Room ID
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="roomId" className="text-sm font-medium text-gray-700">
                  Room ID
                </label>
                <Input
                  id="roomId"
                  placeholder="Enter room ID (e.g., MAIN_ROOM)"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                  className="text-center font-mono text-lg"
                  onKeyPress={(e) => e.key === "Enter" && handleJoinRoom()}
                />
              </div>

              <Button
                onClick={handleJoinRoom}
                disabled={!roomId.trim() || isJoining}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isJoining ? "Joining..." : "Join Room"}
              </Button>

              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">or</div>
                <Button variant="outline" onClick={handleQuickJoin} className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Quick Join Main Room
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Popular Rooms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Popular Rooms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularRooms.map((room) => (
                  <div
                    key={room.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/game/${room.id}`)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Crown className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{room.name}</div>
                        <div className="text-sm text-gray-500">Room ID: {room.id}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge
                        variant={
                          room.status === "Active" ? "default" : room.status === "Waiting" ? "secondary" : "outline"
                        }
                        className="mb-1"
                      >
                        {room.status}
                      </Badge>
                      <div className="text-xs text-gray-500">{room.players} players</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Room Guidelines</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Room IDs are case-insensitive</li>
                  <li>• Maximum 2 players per room</li>
                  <li>• Games start automatically when room is full</li>
                  <li>• Use MAIN_ROOM for quick matches</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/game/MAIN_ROOM")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Main Room</h3>
              <p className="text-gray-600 text-sm mb-4">Join the main chess room</p>
              <Badge variant="secondary">MAIN_ROOM</Badge>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/game/BEGINNERS")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Beginners</h3>
              <p className="text-gray-600 text-sm mb-4">Perfect for new players</p>
              <Badge variant="secondary">BEGINNERS</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/game/BLITZ")}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Blitz Games</h3>
              <p className="text-gray-600 text-sm mb-4">Fast-paced chess games</p>
              <Badge variant="secondary">BLITZ</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
