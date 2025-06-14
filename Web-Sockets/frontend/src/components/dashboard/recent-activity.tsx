import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Play } from "lucide-react"

export default function RecentActivity() {
  return (
    <div className="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No games yet</h3>
            <p className="text-gray-600 mb-6">Start playing to see your game history here</p>
            <Button className="bg-green-600 hover:bg-green-700">Play Your First Game</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
