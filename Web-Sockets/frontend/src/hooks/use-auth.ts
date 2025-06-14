"use client"

import React from "react"

import { useState, useContext, createContext, useEffect } from "react"

interface User {
  id: string
  username: string
  email: string
  rating: number
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("chess-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const userData: User = {
        id: "1",
        username: email.split("@")[0],
        email,
        rating: 1200,
        createdAt: new Date().toISOString(),
      }
      setUser(userData)
      localStorage.setItem("chess-user", JSON.stringify(userData))
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (username: string, email: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email,
        rating: 1200,
        createdAt: new Date().toISOString(),
      }
      setUser(userData)
      localStorage.setItem("chess-user", JSON.stringify(userData))
    } catch (error) {
      throw new Error("Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("chess-user")
  }

  return (
    React.createElement(AuthContext.Provider, { value: { user, login, signup, logout, isLoading } }, children)
  )
}


export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
