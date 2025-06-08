export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-32 left-16 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-tl from-blue-600/15 to-purple-500/15 rounded-full blur-3xl"></div>
    </div>
  )
}
