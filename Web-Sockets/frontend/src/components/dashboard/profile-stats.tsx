import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { User } from "lucide-react"
import type { User as UserType } from "../../types/auth"

interface ProfileStatsProps {
  user: UserType
}

export default function ProfileStats({ user }: ProfileStatsProps) {
  return (
    <div className="lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">{user.username.charAt(0).toUpperCase()}</span>
            </div>
            <h3 className="font-semibold text-lg">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Rapid Rating</span>
              <Badge variant="secondary">{user.rating.rapid}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Blitz Rating</span>
              <Badge variant="secondary">{user.rating.blitz}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bullet Rating</span>
              <Badge variant="secondary">{user.rating.bullet}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Puzzle Rating</span>
              <Badge variant="secondary">{user.rating.puzzle}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Games Played</span>
              <Badge variant="outline">{user.stats.gamesPlayed}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Membership</span>
              <Badge variant={user.membership === "premium" ? "default" : "secondary"} className="capitalize">
                {user.membership}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
