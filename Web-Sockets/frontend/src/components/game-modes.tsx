import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Clock, Zap, Target, Trophy } from 'lucide-react'

export default function GameModes() {
  const gameModes = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Bullet",
      description: "1 minute games",
      time: "1+0",
      players: "2.1M",
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-500" />,
      title: "Blitz",
      description: "3-5 minute games",
      time: "3+0, 5+0",
      players: "3.8M",
      color: "bg-orange-50 border-orange-200"
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      title: "Rapid",
      description: "10-15 minute games",
      time: "10+0, 15+10",
      players: "1.9M",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <Trophy className="h-8 w-8 text-blue-500" />,
      title: "Classical",
      description: "30+ minute games",
      time: "30+0",
      players: "421K",
      color: "bg-blue-50 border-blue-200"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Game Mode</h2>
          <p className="text-lg text-gray-600">Find the perfect time control for your style</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gameModes.map((mode, index) => (
            <Card key={index} className={`${mode.color} border-2 hover:shadow-lg transition-all cursor-pointer`}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  {mode.icon}
                </div>
                <CardTitle className="text-xl">{mode.title}</CardTitle>
                <p className="text-gray-600">{mode.description}</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900">{mode.time}</div>
                  <div className="text-sm text-gray-500">{mode.players} playing</div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Play {mode.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Game Modes
          </Button>
        </div>
      </div>
    </section>
  )
}
