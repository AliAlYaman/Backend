import type React from "react"
import { Header } from "./header"
import { BackgroundEffects } from "./background-effects"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundEffects />
      <Header />
      {children}
    </div>
  )
}
