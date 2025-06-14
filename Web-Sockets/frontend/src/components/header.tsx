"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, ChevronDown, User } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuth } from "../contexts/auth-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">♔</span>
              </div>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">Chess.com</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-green-600 font-medium">
                Play <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Online</DropdownMenuItem>
                <DropdownMenuItem>Computer</DropdownMenuItem>
                <DropdownMenuItem>Friends</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-green-600 font-medium">
                Puzzles <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Tactics</DropdownMenuItem>
                <DropdownMenuItem>Endgame</DropdownMenuItem>
                <DropdownMenuItem>Daily Puzzle</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/learn" className="text-gray-700 hover:text-green-600 font-medium">
              Learn
            </Link>
            <Link to="/watch" className="text-gray-700 hover:text-green-600 font-medium">
              Watch
            </Link>
            <Link to="/news" className="text-gray-700 hover:text-green-600 font-medium">
              News
            </Link>
            <Link to="/social" className="text-gray-700 hover:text-green-600 font-medium">
              Social
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-medium text-sm">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span>{user.username}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link to="/play" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Play
              </Link>
              <Link to="/puzzles" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Puzzles
              </Link>
              <Link to="/learn" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Learn
              </Link>
              <Link to="/watch" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Watch
              </Link>
              <Link to="/news" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                News
              </Link>
              <Link to="/social" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Social
              </Link>

              {isAuthenticated && user ? (
                <div className="flex flex-col space-y-2 px-3 py-2">
                  <span className="text-sm text-gray-600">Welcome, {user.username}!</span>
                  <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate("/profile")}>
                    Profile
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2 px-3 py-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
