import { ChevronRight } from "lucide-react"

export function FutureEconomySection() {
  return (
    <section className="relative py-24 px-8 bg-black overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-yellow-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 max-w-5xl mx-auto">
            Be Part of the{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 bg-clip-text text-transparent">
              Open Economy
            </span>{" "}
            of the Future.
          </h2>

          <a
            href="#"
            className="inline-flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 text-xl group bg-gray-800/30 px-6 py-3 rounded-full hover:bg-gray-700/40 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50"
          >
            <span>Powerful features</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Interchain Accounts - Enhanced */}
          <div className="group p-10 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/60 border border-gray-700/50 backdrop-blur-sm hover:border-yellow-500/40 transition-all duration-700 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/10 md:row-span-2">
            <div className="mb-8">
              <p className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-8 group-hover:text-yellow-400 transition-colors duration-300">
                Interchain Accounts
              </p>

              {/* Enhanced 3D Safe Icon */}
              <div className="w-40 h-40 mx-auto mb-10 relative group-hover:scale-110 transition-transform duration-700">
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-400/20 rounded-3xl blur-2xl group-hover:from-yellow-400/50 group-hover:to-orange-400/30 transition-all duration-700"></div>

                {/* Safe body with enhanced details */}
                <div className="relative w-full h-full bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 rounded-3xl shadow-2xl transform rotate-6 group-hover:rotate-3 transition-transform duration-700">
                  <div className="absolute inset-3 bg-gradient-to-tl from-slate-400 to-slate-200 rounded-2xl">
                    {/* Safe door with enhanced details */}
                    <div className="inset-6 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl border-4 border-slate-500 relative overflow-hidden">
                      {/* Metallic shine effect */}
                      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>

                      {/* Enhanced lock mechanism */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 rounded-full border-4 border-yellow-200 shadow-lg group-hover:rotate-45 transition-transform duration-700">
                          <div className="absolute inset-2 bg-gradient-to-tl from-yellow-400 to-yellow-200 rounded-full">
                            {/* Enhanced keyhole */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-800 rounded-full"></div>
                            <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-slate-800"></div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced handle */}
                      <div className="absolute top-1/2 right-3 transform -translate-y-1/2 w-3 h-8 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full shadow-md"></div>

                      {/* Additional safe details */}
                      <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
                      <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-60"></div>
                    </div>
                  </div>

                  {/* Safe legs */}
                  <div className="absolute -bottom-2 left-6 w-4 h-6 bg-gradient-to-b from-slate-500 to-slate-700 rounded-b-lg"></div>
                  <div className="absolute -bottom-2 right-6 w-4 h-6 bg-gradient-to-b from-slate-500 to-slate-700 rounded-b-lg"></div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-4xl font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                One secure account for all your digital assets.
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed">
                Manage multiple blockchain accounts through a single, secure interface with advanced cryptographic
                protection.
              </p>

              <div className="inline-block px-6 py-3 bg-gradient-to-r from-gray-800/60 to-gray-700/40 rounded-full border border-gray-600/50 group-hover:border-yellow-500/50 transition-all duration-300">
                <span className="text-gray-300 text-sm font-medium group-hover:text-yellow-400 transition-colors duration-300">
                  COMING SOON
                </span>
              </div>
            </div>
          </div>

          {/* Decentralized Exchange - Enhanced */}
          <div className="group p-10 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/60 border border-gray-700/50 backdrop-blur-sm hover:border-orange-500/40 transition-all duration-700 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10">
            <div className="mb-8">
              <p className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-8 group-hover:text-orange-400 transition-colors duration-300">
                Decentralized Exchange
              </p>

              {/* Enhanced 3D Coins */}
              <div className="relative w-32 h-32 mx-auto mb-10 group-hover:scale-110 transition-transform duration-700">
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/40 to-orange-400/30 rounded-full blur-2xl group-hover:from-yellow-400/60 group-hover:to-orange-400/50 transition-all duration-700"></div>

                {/* Main coin with enhanced details */}
                <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-full shadow-2xl transform rotate-12 group-hover:rotate-45 transition-transform duration-700">
                  <div className="absolute inset-1 bg-gradient-to-tl from-yellow-300 to-yellow-100 rounded-full">
                    <div className="inset-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center relative overflow-hidden">
                      {/* Coin shine effect */}
                      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>
                      <span className="text-yellow-100 font-bold text-lg relative z-10">$</span>
                    </div>
                  </div>
                </div>

                {/* Secondary coin with enhanced details */}
                <div className="absolute bottom-2 left-2 w-16 h-16 bg-gradient-to-br from-orange-200 via-orange-400 to-orange-600 rounded-full shadow-xl transform -rotate-12 group-hover:-rotate-45 transition-transform duration-700">
                  <div className="absolute inset-1 bg-gradient-to-tl from-orange-300 to-orange-100 rounded-full">
                    <div className="inset-2 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center relative overflow-hidden">
                      {/* Coin shine effect */}
                      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>
                      <span className="text-orange-100 font-bold text-sm relative z-10">₿</span>
                    </div>
                  </div>
                </div>

                {/* Third coin for more depth */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full shadow-lg opacity-80 group-hover:rotate-180 transition-transform duration-1000">
                  <div className="absolute inset-1 bg-gradient-to-tl from-purple-400 to-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-purple-100 font-bold text-xs">Ξ</span>
                  </div>
                </div>

                {/* Floating sparkles */}
                <div className="absolute top-4 left-8 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
                <div
                  className="absolute bottom-6 right-4 w-1.5 h-1.5 bg-orange-300 rounded-full animate-ping"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                Swap tokens & collectibles.
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed">
                Trade digital assets seamlessly across multiple blockchains with minimal fees and instant settlement.
              </p>

              <div className="inline-block px-6 py-3 bg-gradient-to-r from-gray-800/60 to-gray-700/40 rounded-full border border-gray-600/50 group-hover:border-orange-500/50 transition-all duration-300">
                <span className="text-gray-300 text-sm font-medium group-hover:text-orange-400 transition-colors duration-300">
                  COMING SOON
                </span>
              </div>
            </div>
          </div>

          {/* Liquidity Pool - Enhanced */}
          <div className="group p-10 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/60 border border-gray-700/50 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-700 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="mb-8">
              <p className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-8 group-hover:text-blue-400 transition-colors duration-300">
                Liquidity Pool
              </p>

              {/* Enhanced 3D Pool Icon */}
              <div className="w-32 h-32 mx-auto mb-10 relative group-hover:scale-110 transition-transform duration-700">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-400/20 rounded-full blur-2xl group-hover:from-blue-400/50 group-hover:to-cyan-400/30 transition-all duration-700"></div>

                {/* Pool container */}
                <div className="relative w-full h-full bg-gradient-to-br from-slate-300 to-slate-600 rounded-full shadow-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-700 overflow-hidden">
                  {/* Water/liquid effect */}
                  <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-blue-400 via-blue-300 to-cyan-200 rounded-full">
                    {/* Liquid surface animation */}
                    <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-yellow-400 rounded-full opacity-80 animate-bounce"></div>
                  <div
                    className="absolute top-1/2 right-1/4 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  ></div>

                  {/* Pool edge highlight */}
                  <div className="absolute inset-2 border-2 border-white/20 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                Provide liquidity, earn rewards.
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed">
                Stake your tokens in liquidity pools and earn passive income through trading fees and yield farming.
              </p>

              <div className="inline-block px-6 py-3 bg-gradient-to-r from-gray-800/60 to-gray-700/40 rounded-full border border-gray-600/50 group-hover:border-blue-500/50 transition-all duration-300">
                <span className="text-gray-300 text-sm font-medium group-hover:text-blue-400 transition-colors duration-300">
                  COMING SOON
                </span>
              </div>
            </div>
          </div>

          {/* Wrapped ETH - Enhanced */}
          <div className="group p-10 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/60 border border-gray-700/50 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-700 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="mb-8">
              <p className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-8 group-hover:text-purple-400 transition-colors duration-300">
                Wrapped ETH
              </p>

              {/* Enhanced 3D ETH Icon */}
              <div className="w-32 h-32 mx-auto mb-10 relative group-hover:scale-110 transition-transform duration-700">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-indigo-400/20 rounded-full blur-2xl group-hover:from-purple-400/50 group-hover:to-indigo-400/30 transition-all duration-700"></div>

                {/* ETH Diamond shape */}
                <div className="relative w-full h-full flex items-center justify-center transform rotate-6 group-hover:rotate-12 transition-transform duration-700">
                  {/* Main diamond */}
                  <div className="relative w-20 h-24">
                    {/* Top part */}
                    <div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gradient-to-b from-purple-300 to-purple-500"
                      style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                    ></div>
                    {/* Bottom part */}
                    <div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gradient-to-t from-purple-600 to-purple-400"
                      style={{ clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }}
                    ></div>

                    {/* Inner lines for detail */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-0.5 bg-white/30"></div>
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-white/20"></div>
                    <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-8 h-0.5 bg-white/20"></div>
                  </div>

                  {/* Wrapping effect - circular bands */}
                  <div
                    className="absolute inset-0 border-4 border-dashed border-purple-400/40 rounded-full animate-spin"
                    style={{ animationDuration: "8s" }}
                  ></div>
                  <div
                    className="absolute inset-4 border-2 border-dashed border-indigo-400/30 rounded-full animate-spin"
                    style={{ animationDuration: "6s", animationDirection: "reverse" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                Eth Included
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed">
                Seamlessly bridge Ethereum assets to Cronos with wrapped tokens for enhanced interoperability.
              </p>

              <div className="inline-block px-6 py-3 bg-gradient-to-r from-gray-800/60 to-gray-700/40 rounded-full border border-gray-600/50 group-hover:border-purple-500/50 transition-all duration-300">
                <span className="text-gray-300 text-sm font-medium group-hover:text-purple-400 transition-colors duration-300">
                  COMING SOON
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
