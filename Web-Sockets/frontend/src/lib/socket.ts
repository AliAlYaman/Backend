import { io } from "socket.io-client"

const URL = "http://localhost:3000" // backend URL

export const socket = io(URL, {
  withCredentials: true,
  autoConnect: false,
})
