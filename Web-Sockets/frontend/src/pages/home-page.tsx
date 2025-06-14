import Header from "../components/header"
import Hero from "../components/hero"
import GameModes from "../components/game-modes"
import NewsSection from "../components/news-section"
import PuzzlesSection from "../components/puzzles"
import LearnSection from "../components/learn-section"
import Footer from "../components/footer"

export default function ChessHomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <GameModes />
        <PuzzlesSection />
        <NewsSection />
        <LearnSection />
      </main>
      <Footer />
    </div>
  )
}
