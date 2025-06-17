// src/services/api.ts
import axios from "axios"
import type { LoginCredentials, SignupCredentials, User } from "../types/auth"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
})

API.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401) {
      // Optional: attempt refresh token logic here
    }
    return Promise.reject(error)
  }
)

export async function register(credentials: SignupCredentials): Promise<User> {
  const { data } = await API.post("/auth/register", credentials)
  return data.user
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const { data } = await API.post("/auth/login", credentials)
  return data.user
}

export async function refreshToken(): Promise<{ accessToken: string }> {
  const { data } = await API.post("/auth/refresh-token")
  return data
}

export async function logout(): Promise<void> {
  await API.post("/auth/logout")
}

export async function getCurrentUser(): Promise<User> {
  const { data } = await API.get("/auth/me")
  return data.user
}
