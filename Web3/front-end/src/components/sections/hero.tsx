export function Hero() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-8">Welcome to Cronos</p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
          <span className="text-white">The Internet of</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Blockchains.
          </span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Cronos is an ever expanding ecosystem of connected apps and services, built for a decentralized future.
        </p>
      </div>
    </main>
  )
}
