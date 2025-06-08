export function TechnologySection() {
  return (
    <section className="relative py-24 px-8 bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/6 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <p className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-8">Technology</p>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
                The most trusted way to build value.
              </h2>

              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Cronos is a state-of-the-art blockchain framework that powers the Cronos Hub and its rapidly expanding
                  orbit of sovereign chains.
                </p>

                <p>
                  Developers can use the SDK to build innovative applications that create value through exchange with
                  the Cronos Hub.
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-2 gap-12 pt-8">
              {/* Low Fees */}
              <div className="space-y-4">
                <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">Low Fees</p>
                <div className="text-6xl md:text-7xl font-bold text-white">
                  <span className="text-green-400">$</span>0.01
                </div>
                <p className="text-gray-300 text-lg">Enjoy the lowest fees - almost zero</p>
              </div>

              {/* Fast Transactions */}
              <div className="space-y-4">
                <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">Fast Transactions</p>
                <div className="text-6xl md:text-7xl font-bold text-white">
                  5<span className="text-blue-400">sec</span>
                </div>
                <p className="text-gray-300 text-lg">Transactions confirmed in seconds.</p>
              </div>
            </div>
          </div>

          {/* Right - Proof of Stake Blob */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-96 h-96 group">
              {/* Main organic blob shape */}
              <div className="relative w-full h-full">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-500/15 to-purple-600/20 rounded-full blur-3xl group-hover:from-purple-400/30 group-hover:via-blue-500/25 group-hover:to-purple-600/30 transition-all duration-700"></div>

                {/* Main blob */}
                <div
                  className="relative w-full h-full bg-gradient-to-br from-purple-400 via-blue-500 to-purple-600 shadow-2xl group-hover:scale-105 transition-transform duration-700"
                  style={{
                    clipPath:
                      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 85% 85%, 70% 100%, 30% 100%, 15% 85%, 0% 70%, 0% 30%)",
                    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                  }}
                >
                  {/* Inner gradient overlay */}
                  <div
                    className="absolute inset-4 bg-gradient-to-tl from-purple-500/80 via-blue-400/60 to-purple-400/80 opacity-80"
                    style={{
                      clipPath:
                        "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 85% 85%, 75% 100%, 25% 100%, 15% 85%, 0% 75%, 0% 25%)",
                      borderRadius: "35% 65% 65% 35% / 35% 35% 65% 65%",
                    }}
                  ></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <div className="mb-4">
                      <p className="text-white/80 text-sm font-medium tracking-widest uppercase mb-2">Proof of Stake</p>
                      <div className="text-7xl md:text-8xl font-bold text-white mb-2">99%</div>
                      <p className="text-white/90 text-lg font-medium">Lower carbon footprint</p>
                    </div>
                  </div>

                  {/* Highlight effects */}
                  <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-white/20 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-purple-300/30 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>

                {/* Floating particles */}
                <div className="absolute top-8 right-8 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                <div
                  className="absolute bottom-12 left-12 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/2 right-4 w-1 h-1 bg-blue-300/50 rounded-full animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
