import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Play, Users, Bot, Zap } from "lucide-react"
import FutureFeaturePopup from "./ui/future-feature-popup"

export default function Hero() {


  const navigate= useNavigate();
  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Play Chess Online</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join millions of players worldwide. Play, learn, and have fun with the most popular board game in the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Play Online</h3>
              <p className="text-gray-600 text-sm mb-4">Play with millions of players around the world</p>
              <Button onClick={()=> {
                navigate('/game')
              }} className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Play className="h-4 w-4 mr-2" />
                Play Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Play Computer</h3>
              <p className="text-gray-600 text-sm mb-4">Challenge our smart AI opponents</p>
              {/* <Button variant="outline" className="w-full">
                <Play className="h-4 w-4 mr-2" />
                vs Computer
              </Button> */}
              <FutureFeaturePopup />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Puzzles</h3>
              <p className="text-gray-600 text-sm mb-4">Solve tactical puzzles and improve</p>
              {/* <Button variant="outline" className="w-full">
                <Zap className="h-4 w-4 mr-2" />
                Solve Puzzles
              </Button> */}

              <FutureFeaturePopup />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-xl">📚</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Learn</h3>
              <p className="text-gray-600 text-sm mb-4">Improve with lessons and courses</p>
              {/* <Button variant="outline" className="w-full">
                Start Learning
              </Button> */}
              <FutureFeaturePopup />
            </CardContent>
          </Card>
        </div>

        {/* Chess Board Preview */}
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="grid grid-cols-8 gap-0 w-64 h-64">
              {Array.from({ length: 64 }, (_, i) => {
                const row = Math.floor(i / 8)
                const col = i % 8
                const isLight = (row + col) % 2 === 0
                return (
                  <div
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center text-lg ${
                      isLight ? "bg-amber-100" : "bg-amber-800"
                    }`}
                  >
                    {i === 0 && "♜"}
                    {i === 1 && "♞"}
                    {i === 2 && "♝"}
                    {i === 3 && "♛"}
                    {i === 4 && "♚"}
                    {i === 5 && "♝"}
                    {i === 6 && "♞"}
                    {i === 7 && "♜"}
                    {i >= 8 && i <= 15 && "♟"}
                    {i >= 48 && i <= 55 && "♙"}
                    {i === 56 && "♖"}
                    {i === 57 && "♘"}
                    {i === 58 && "♗"}
                    {i === 59 && "♕"}
                    {i === 60 && "♔"}
                    {i === 61 && "♗"}
                    {i === 62 && "♘"}
                    {i === 63 && "♖"}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
