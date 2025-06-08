import { ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-8 bg-black overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Marketplace */}
          <div className="group flex flex-col items-start space-y-6 p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800/50 backdrop-blur-sm hover:border-yellow-500/30 transition-all duration-500 hover:transform hover:scale-105">
            <div className="relative">
              <div className="w-24 h-24 relative group-hover:scale-110 transition-transform duration-500">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl group-hover:bg-yellow-400/40 transition-all duration-500"></div>
                {/* Main coin */}
                <div className="relative w-full h-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 rounded-full shadow-2xl transform rotate-12 group-hover:rotate-45 transition-transform duration-700">
                  <div className="absolute inset-1 bg-gradient-to-tl from-yellow-400 to-yellow-200 rounded-full">
                    <div className="absolute inset-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                      {/* Lightning bolt */}
                      <svg className="w-8 h-8 text-yellow-100" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 2L3 14h6l-2 8 10-12h-6l2-8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                Marketplace
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Set to operate a next-gen decentralized exchange, swapping digital assets from across the Interchain,
                with very low fees and instant transaction confirmation.
              </p>
            </div>
          </div>

          {/* Security Provider */}
          <div className="group flex flex-col items-start space-y-6 p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500 hover:transform hover:scale-105">
            <div className="relative">
              <div className="w-24 h-24 relative group-hover:scale-110 transition-transform duration-500">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:bg-blue-400/40 transition-all duration-500"></div>
                {/* Shield */}
                <div className="relative w-full h-full transform rotate-12 group-hover:rotate-45 transition-transform duration-700">
                  <div
                    className="w-full h-full bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 shadow-2xl"
                    style={{
                      clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tl from-slate-400 to-slate-200 opacity-50"></div>
                  </div>
                  {/* Checkmark */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                Security provider
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                With the upcoming Interchain Security feature, HEDRON will soon be securing many chains, in exchange for
                additional staking rewards.
              </p>
            </div>
          </div>

          {/* Router */}
          <div className="group flex flex-col items-start space-y-6 p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-500 hover:transform hover:scale-105">
            <div className="relative">
              <div className="w-24 h-24 relative group-hover:scale-110 transition-transform duration-500">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl group-hover:bg-purple-400/40 transition-all duration-500"></div>
                {/* Sphere */}
                <div className="relative w-full h-full rounded-full shadow-2xl overflow-hidden transform rotate-12 group-hover:rotate-45 transition-transform duration-700">
                  <div className="w-full h-1/2 bg-gradient-to-br from-slate-300 to-slate-500"></div>
                  <div className="w-full h-1/2 bg-gradient-to-br from-yellow-400 to-orange-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
                  {/* Connection lines */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-0.5 bg-white/30 transform rotate-45"></div>
                    <div className="w-12 h-0.5 bg-white/30 transform -rotate-45 absolute"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                Router
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                A core mission of the Hub — to connect chains by establishing IBC connections with compatible chains and
                operating decentralized bridges with chains like Ethereum and Bitcoin.
              </p>
            </div>
          </div>

          {/* Custodian */}
          <div className="group flex flex-col items-start space-y-6 p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800/50 backdrop-blur-sm hover:border-green-500/30 transition-all duration-500 hover:transform hover:scale-105">
            <div className="relative">
              <div className="w-24 h-24 relative group-hover:scale-110 transition-transform duration-500">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl group-hover:bg-green-400/40 transition-all duration-500"></div>
                {/* Location pin */}
                <div className="relative w-full h-full transform rotate-12 group-hover:rotate-45 transition-transform duration-700">
                  <div className="w-16 h-20 mx-auto bg-gradient-to-br from-slate-600 via-slate-700 to-slate-900 rounded-t-full shadow-2xl">
                    <div className="absolute inset-1 bg-gradient-to-tl from-slate-700 to-slate-500 rounded-t-full"></div>
                    {/* Pin bottom */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-slate-700"></div>
                  </div>
                  {/* Star */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                Custodian
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Located at the crossroads of the Interchain, the Hub is extremely secure, the best place to hold digital
                assets and manage accounts across many chains.
              </p>
            </div>
          </div>
        </div>

        {/* Cosmos Hub Button */}
        <div className="mt-20 flex justify-center">
          <Button
            variant="default"
            className="bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white flex items-center space-x-3 px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300"
          >
            <span>Cosmos Hub</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
