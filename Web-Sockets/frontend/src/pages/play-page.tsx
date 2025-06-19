"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { ArrowLeft, Users, Bot, Clock, Zap, Search } from "lucide-react"
import { useAuth } from "../contexts/auth-context"
import DashboardHeader from "../components/dashboard/dashboard-header"

export default function PlayPage() {
  const navigate = useNavigate()
  useAuth()
  const [] = useState("")
  const [] = useState(false)

  const handleQuickPlay = () => {
    // Use a constant room ID so all users join the same room
    const constantRoomId = "MAIN_ROOM"
    navigate(`/game/${constantRoomId}`)
  }



  const gameOptions = [
    {
      title: "Quick Play",
      description: "Start a game immediately with random opponent",
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      color: "bg-yellow-50 border-yellow-200",
      action: handleQuickPlay,
      buttonText: "Play Now",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700",
    },
    {
      title: "Play with Friends",
      description: "Create or join a private room",
      icon: <Users className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-50 border-blue-200",
      action: () => {}, // Handled by the form below
      buttonText: "Create Room",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Play Computer",
      description: "Challenge AI opponents of different levels",
      icon: <Bot className="h-8 w-8 text-purple-500" />,
      color: "bg-purple-50 border-purple-200",
      action: () => navigate("/play/computer"),
      buttonText: "vs Computer",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ]

  const timeControls = [
    { name: "Bullet", time: "1+0", description: "1 minute", players: "2.1M" },
    { name: "Blitz", time: "3+0", description: "3 minutes", players: "3.8M" },
    { name: "Rapid", time: "10+0", description: "10 minutes", players: "1.9M" },
    { name: "Classical", time: "30+0", description: "30 minutes", players: "421K" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Play Chess</h1>
          <p className="text-gray-600">Choose your game mode and start playing!</p>
        </div>

        {/* Game Mode Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {gameOptions.map((option, index) => (
            <Card key={index} className={`${option.color} border-2 hover:shadow-lg transition-all cursor-pointer`}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">{option.icon}</div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </CardHeader>
              <CardContent className="text-center">
                {option.title === "Play with Friends" ? (
                  <div className="space-y-3">
                    <Button className={`w-full ${option.buttonColor}`} onClick={() => navigate("/join-room")}>
                      <Search className="h-4 w-4 mr-2" />
                      Join Room
                    </Button>
                    <div className="text-xs text-gray-500 mb-2">or</div>
                    <Button variant="outline" className="w-full" onClick={() => navigate("/game/MAIN_ROOM")}>
                      <Zap className="h-4 w-4 mr-2" />
                      Quick Join Main Room
                    </Button>
                  </div>
                ) : (
                  <Button className={`w-full ${option.buttonColor}`} onClick={option.action}>
                    {option.buttonText}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Time Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Time Controls
            </CardTitle>
            <p className="text-gray-600">Choose your preferred time control for quick play</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {timeControls.map((control, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => {
                    // You can store the selected time control and use it when starting a game
                    handleQuickPlay()
                  }}
                >
                  <div className="text-center">
                    <div className="font-bold text-lg">{control.name}</div>
                    <div className="text-2xl font-bold text-green-600 my-2">{control.time}</div>
                    <div className="text-sm text-gray-600 mb-2">{control.description}</div>
                    <Badge variant="outline" className="text-xs">
                      {control.players} playing
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Games */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recent games</h3>
              <p className="text-gray-600 mb-4">Your recent games will appear here</p>
              <Button onClick={handleQuickPlay} className="bg-green-600 hover:bg-green-700">
                Play Your First Game
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
