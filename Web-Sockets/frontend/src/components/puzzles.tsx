import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Zap, Star, TrendingUp } from "lucide-react"

export default function PuzzlesSection() {
  const puzzles = [
    {
      id: 1,
      title: "Daily Puzzle",
      difficulty: "Intermediate",
      rating: 1450,
      theme: "Fork",
      solved: "12.4K",
      color: "bg-purple-50 border-purple-200",
    },
    {
      id: 2,
      title: "Puzzle Rush",
      difficulty: "Mixed",
      rating: "Varies",
      theme: "Speed Training",
      solved: "8.9K",
      color: "bg-red-50 border-red-200",
    },
    {
      id: 3,
      title: "Puzzle Battle",
      difficulty: "Advanced",
      rating: 1650,
      theme: "Endgame",
      solved: "5.2K",
      color: "bg-blue-50 border-blue-200",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sharpen Your Skills</h2>
          <p className="text-lg text-gray-600">Solve puzzles and improve your tactical vision</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {puzzles.map((puzzle) => (
            <Card key={puzzle.id} className={`${puzzle.color} border-2 hover:shadow-lg transition-all`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{puzzle.title}</CardTitle>
                  <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{puzzle.difficulty}</Badge>
                  <Badge variant="outline">Rating: {puzzle.rating}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Theme:</span>
                    <span className="font-medium">{puzzle.theme}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Solved by:</span>
                    <span className="font-medium">{puzzle.solved} players</span>
                  </div>
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                    <Star className="h-4 w-4 mr-2" />
                    Solve Puzzle
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Puzzle Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Puzzles Solved Today</span>
                  <span className="font-bold text-2xl text-green-600">2.1M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-bold text-2xl text-blue-600">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-bold text-2xl text-purple-600">73%</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Track Your Progress</h4>
              <p className="text-gray-600 mb-4">See detailed statistics and improvement over time</p>
              <Button variant="outline">View My Stats</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
