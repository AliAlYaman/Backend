import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { BookOpen, Video, Award } from "lucide-react"

export default function LearnSection() {
  const courses = [
    {
      title: "Beginner Bootcamp",
      description: "Learn the fundamentals of chess from scratch",
      lessons: 12,
      duration: "2 hours",
      level: "Beginner",
      students: "45K",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Tactical Patterns",
      description: "Master the most important tactical motifs",
      lessons: 18,
      duration: "3 hours",
      level: "Intermediate",
      students: "32K",
      icon: <Award className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "Endgame Mastery",
      description: "Essential endgame knowledge for improvement",
      lessons: 24,
      duration: "4 hours",
      level: "Advanced",
      students: "18K",
      icon: <Video className="h-6 w-6 text-green-500" />,
      color: "bg-green-50 border-green-200",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn & Improve</h2>
          <p className="text-lg text-gray-600">Structured courses to take your game to the next level</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {courses.map((course, index) => (
            <Card key={index} className={`${course.color} border-2 hover:shadow-lg transition-all`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {course.icon}
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <p className="text-gray-600">{course.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Lessons:</span>
                    <span className="font-medium">{course.lessons}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{course.students}</span>
                  </div>
                  <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white">Start Course</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Stats */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">2.5M</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
