import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"

export default function NewsSection() {
  const articles = [
    {
      id: 1,
      title: "World Championship 2024: Ding Liren vs Gukesh",
      excerpt:
        "The youngest challenger in World Championship history faces the defending champion in what promises to be an epic battle.",
      author: "Chess.com Staff",
      date: "2 hours ago",
      category: "Tournament",
      image: "https://ss-i.thgim.com/public/incoming/pbsll2/article68976223.ece/alternates/LANDSCAPE_1200/Chess%20World%20Championship%202024.png",
      featured: true,
    },
    {
      id: 2,
      title: "Magnus Carlsen Wins Titled Tuesday",
      excerpt: "The former World Champion continues his dominance in online chess with another Titled Tuesday victory.",
      author: "Peter Doggers",
      date: "1 day ago",
      category: "Online",
      image: "https://i.guim.co.uk/img/media/8b41df4f2386812fc1229bdd21a22c667d2bec4a/0_50_3500_2100/master/3500.jpg?width=700&quality=85&auto=format&fit=max&s=696ffe8862b2bdb06028666db323e00a",
      featured: false,
    },
    {
      id: 3,
      title: "New Opening Trends in 2024",
      excerpt: "Analyzing the most popular openings among top players this year and their success rates.",
      author: "IM Danny Rensch",
      date: "3 days ago",
      category: "Analysis",
      image: "https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/phpGz90PL.png",
      featured: false,
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Chess News</h2>
            <p className="text-lg text-gray-600">Stay updated with the chess world</p>
          </div>
          <Button variant="outline">
            View All News
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={articles[0].image || "/placeholder.svg"}
                  alt={articles[0].title}
                  width={600}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-red-600">Featured</Badge>
              </div>
              <CardHeader>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <Badge variant="secondary">{articles[0].category}</Badge>
                  <span>•</span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {articles[0].date}
                  </div>
                </div>
                <CardTitle className="text-2xl hover:text-green-600 cursor-pointer">{articles[0].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{articles[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    {articles[0].author}
                  </div>
                  <Button variant="ghost" size="sm">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Articles */}
          <div className="space-y-6">
            {articles.slice(1).map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <div className="flex">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={120}
                    height={120}
                    className="w-24 h-24 object-cover rounded-l-lg"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-semibold text-sm hover:text-green-600 cursor-pointer mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="h-3 w-3 mr-1" />
                      {article.author}
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Newsletter Signup */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                <p className="text-sm text-gray-600 mb-4">Get the latest chess news delivered to your inbox</p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Subscribe to Newsletter</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
