import { ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

export function HedronSection() {
  return (
    <section className="relative py-24 px-8 bg-gradient-to-br from-gray-900 via-blue-900/20 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - 3D Crystal */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-80 h-80 group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-500/20 to-blue-600/30 rounded-full blur-3xl group-hover:from-blue-400/50 group-hover:via-purple-500/30 group-hover:to-blue-600/50 transition-all duration-700"></div>

              {/* Main crystal container */}
              <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700">
                {/* Crystal faces */}
                <div className="absolute inset-0 transform rotate-12 group-hover:rotate-6 transition-transform duration-1000">
                  {/* Top face */}
                  <div
                    className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 opacity-90"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                    }}
                  ></div>

                  {/* Left face */}
                  <div
                    className="absolute top-1/4 left-8 w-24 h-40 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 opacity-80"
                    style={{
                      clipPath: "polygon(0% 0%, 100% 25%, 100% 100%, 0% 75%)",
                    }}
                  ></div>

                  {/* Right face */}
                  <div
                    className="absolute top-1/4 right-8 w-24 h-40 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 opacity-85"
                    style={{
                      clipPath: "polygon(0% 25%, 100% 0%, 100% 75%, 0% 100%)",
                    }}
                  ></div>

                  {/* Center main face */}
                  <div
                    className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-28 h-32 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"
                    style={{
                      clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                    }}
                  ></div>

                  {/* Bottom face */}
                  <div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 opacity-70"
                    style={{
                      clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                    }}
                  ></div>
                </div>

                {/* Geometric lines overlay */}
                <div className="absolute inset-0 transform rotate-12 group-hover:rotate-6 transition-transform duration-1000">
                  <svg className="w-full h-full" viewBox="0 0 320 320">
                    <g stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none">
                      <path d="M160 40 L240 120 L160 200 L80 120 Z" />
                      <path d="M160 40 L160 200" />
                      <path d="M80 120 L240 120" />
                      <path d="M120 80 L200 160" />
                      <path d="M200 80 L120 160" />
                    </g>
                  </svg>
                </div>

                {/* Highlight effects */}
                <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-white/20 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-blue-300/30 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
                Secured by the{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                  Hedron.
                </span>
              </h2>

              <p className="text-gray-300 text-xl leading-relaxed max-w-lg">
                In return for securing the services on the Cronos Hub, transaction fees and staking rewards are
                distributed to HEDRON stakers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button
                variant="default"
                className="bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300"
              >
                Start Staking
              </Button>
              <Button
                variant="ghost"
                className="flex items-center space-x-3 px-10 py-4 text-lg border border-gray-600 hover:border-gray-400 rounded-xl hover:bg-white/5 transform hover:scale-105 transition-all duration-300"
              >
                <span>Learn more</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
