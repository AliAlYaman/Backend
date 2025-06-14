import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authService } from "../services/auth-services"
import type { User, LoginCredentials, SignupCredentials } from "../types/auth"
import React from "react"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (credentials: SignupCredentials) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      setIsLoading(true)
      const storedUser = authService.getStoredUser()
      if (storedUser) {
        // Validate stored user token if needed
        setUser(storedUser)
      }
    } catch (error) {
      console.error("Failed to initialize auth:", error)
      authService.clearStoredUser()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      const userData = await authService.login(credentials)
      setUser(userData)
      authService.storeUser(userData)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (credentials: SignupCredentials) => {
    try {
      setIsLoading(true)
      const userData = await authService.signup(credentials)
      setUser(userData)
      authService.storeUser(userData)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    authService.clearStoredUser()
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      authService.storeUser(updatedUser)
    }
  }

  const refreshUser = async () => {
    if (user) {
      try {
        const refreshedUser = await authService.refreshUser(user.id)
        setUser(refreshedUser)
        authService.storeUser(refreshedUser)
      } catch (error) {
        console.error("Failed to refresh user:", error)
        logout()
      }
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser,
    refreshUser,
  }

  return React.createElement(AuthContext.Provider, { value }, children)
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
