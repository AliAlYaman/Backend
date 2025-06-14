import type React from "react"

import { useState } from "react"
import { useAuth } from "../contexts/auth-context"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import DashboardHeader from "../components/dashboard/dashboard-header"
import { User, Mail, Calendar, Trophy, Settings, Save } from "lucide-react"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
  })

  if (!user) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    updateUser(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      username: user.username,
      email: user.email,
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
                <Button variant={isEditing ? "outline" : "default"} size="sm" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? (
                    "Cancel"
                  ) : (
                    <>
                      <Settings className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-green-600">{user.username.charAt(0).toUpperCase()}</span>
                  </div>
                  <h3 className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600">@{user.username}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    {isEditing ? (
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                      />
                    ) : (
                      <p className="text-gray-900">{user.firstName || "Not set"}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    {isEditing ? (
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                      />
                    ) : (
                      <p className="text-gray-900">{user.lastName || "Not set"}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  {isEditing ? (
                    <Input
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Username"
                    />
                  ) : (
                    <p className="text-gray-900">@{user.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email address"
                        className="flex-1"
                      />
                    ) : (
                      <p className="text-gray-900">{user.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Member Since</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats & Achievements */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Chess Ratings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rapid</span>
                  <Badge variant="secondary">{user.rating.rapid}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Blitz</span>
                  <Badge variant="secondary">{user.rating.blitz}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bullet</span>
                  <Badge variant="secondary">{user.rating.bullet}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Puzzle</span>
                  <Badge variant="secondary">{user.rating.puzzle}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Game Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Games Played</span>
                  <Badge variant="outline">{user.stats.gamesPlayed}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Wins</span>
                  <Badge variant="outline" className="text-green-600">
                    {user.stats.wins}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Losses</span>
                  <Badge variant="outline" className="text-red-600">
                    {user.stats.losses}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Draws</span>
                  <Badge variant="outline" className="text-gray-600">
                    {user.stats.draws}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Membership</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Badge variant={user.membership === "premium" ? "default" : "secondary"} className="mb-2 capitalize">
                    {user.membership}
                  </Badge>
                  <p className="text-sm text-gray-600">
                    {user.membership === "basic"
                      ? "Upgrade to unlock premium features"
                      : "Thank you for being a premium member!"}
                  </p>
                  {user.membership === "basic" && (
                    <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">Upgrade to Premium</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
