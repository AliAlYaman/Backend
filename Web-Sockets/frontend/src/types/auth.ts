export interface User {
  id: string
  username: string
  email: string
  firstName?: string
  lastName?: string
  avatar?: string
  rating: {
    rapid: number
    blitz: number
    bullet: number
    puzzle: number
  }
  stats: {
    gamesPlayed: number
    wins: number
    losses: number
    draws: number
  }
  preferences: {
    theme: "light" | "dark"
    boardTheme: string
    pieceSet: string
  }
  membership: "basic" | "premium" | "diamond"
  createdAt: string
  lastLoginAt: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupCredentials {
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
  agreeToTerms: boolean
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

export interface AuthError {
  message: string
  field?: string
  code?: string
}
