import type { User, LoginCredentials, SignupCredentials } from "../types/auth"

class AuthService {
  private readonly STORAGE_KEY = "chess-auth"

  // Mock API delay
  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async login(credentials: LoginCredentials): Promise<User> {
    await this.delay(1000) // Simulate API call

    // Mock validation
    if (credentials.email === "demo@chess.com" && credentials.password === "password123") {
      const user: User = {
        id: "user_1",
        username: "ChessPlayer",
        email: credentials.email,
        firstName: "Chess",
        lastName: "Player",
        rating: {
          rapid: 1200,
          blitz: 1150,
          bullet: 1100,
          puzzle: 1300,
        },
        stats: {
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          draws: 0,
        },
        preferences: {
          theme: "light",
          boardTheme: "green",
          pieceSet: "classic",
        },
        membership: "basic",
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      }
      return user
    }

    // For demo purposes, create a user from email
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: credentials.email.split("@")[0],
      email: credentials.email,
      rating: {
        rapid: 1200,
        blitz: 1150,
        bullet: 1100,
        puzzle: 1300,
      },
      stats: {
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
      },
      preferences: {
        theme: "light",
        boardTheme: "green",
        pieceSet: "classic",
      },
      membership: "basic",
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    }

    return user
  }

  async signup(credentials: SignupCredentials): Promise<User> {
    await this.delay(1500) // Simulate API call

    // Mock user creation
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: credentials.username,
      email: credentials.email,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      rating: {
        rapid: 1200,
        blitz: 1200,
        bullet: 1200,
        puzzle: 1200,
      },
      stats: {
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
      },
      preferences: {
        theme: "light",
        boardTheme: "green",
        pieceSet: "classic",
      },
      membership: "basic",
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    }

    return user
  }

  async refreshUser(userId: string): Promise<User> {
    await this.delay(500)

    const storedUser = this.getStoredUser()
    if (storedUser && storedUser.id === userId) {
      return {
        ...storedUser,
        lastLoginAt: new Date().toISOString(),
      }
    }

    throw new Error("User not found")
  }

  storeUser(user: User): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
    } catch (error) {
      console.error("Failed to store user:", error)
    }
  }

  getStoredUser(): User | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error("Failed to get stored user:", error)
      return null
    }
  }

  clearStoredUser(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      console.error("Failed to clear stored user:", error)
    }
  }

  async forgotPassword(email: string): Promise<void> {
    await this.delay(1000)
    // Mock forgot password
    console.log("Password reset email sent to:", email)
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await this.delay(1000)
    // Mock password reset
    console.log("Password reset with token:", token)
  }
}

export const authService = new AuthService()
