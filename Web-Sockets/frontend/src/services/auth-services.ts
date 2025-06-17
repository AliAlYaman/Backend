import * as api from "./api"
import type { LoginCredentials, SignupCredentials, User } from "../types/auth"

const USER_KEY = "chess-auth"

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const user = await api.login(credentials)
    this.storeUser(user)
    return user
  },

  async signup(credentials: SignupCredentials): Promise<User> {
    const user = await api.register(credentials)
    this.storeUser(user)
    return user
  },

  async logout(): Promise<void> {
    await api.logout()
    this.clearStoredUser()
  },

  async refreshToken(): Promise<string> {
    const { accessToken } = await api.refreshToken()
    localStorage.setItem("accessToken", accessToken)
    return accessToken
  },

  async getCurrentUser(): Promise<User> {
    const user = await api.getCurrentUser()
    this.storeUser(user)
    return user
  },

  async refreshUser(_id: string): Promise<User> {
    return this.getCurrentUser() // or a specific refresh call per user
  },

  getStoredUser(): User | null {
    const userJson = localStorage.getItem(USER_KEY)
    return userJson ? JSON.parse(userJson) : null
  },

  storeUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  clearStoredUser(): void {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem("accessToken")
  },
}

export default authService
