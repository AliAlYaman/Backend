"use client"

import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Play, Target, BookOpen, Trophy } from "lucide-react"

export default function QuickActions() {
  const actions = [
    {
      icon: <Play className="h-6 w-6 text-green-600" />,
      title: "Play Now",
      description: "Start a quick game",
      color: "bg-green-100",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    {
      icon: <Target className="h-6 w-6 text-purple-600" />,
      title: "Puzzles",
      description: "Solve tactical puzzles",
      color: "bg-purple-100",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      title: "Learn",
      description: "Improve your skills",
      color: "bg-blue-100",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: <Trophy className="h-6 w-6 text-orange-600" />,
      title: "Tournaments",
      description: "Join competitions",
      color: "bg-orange-100",
      buttonColor: "bg-orange-600 hover:bg-orange-700",
    },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {actions.map((action, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              {action.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{action.description}</p>
            <Button className={`w-full ${action.buttonColor}`}>{action.title}</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
