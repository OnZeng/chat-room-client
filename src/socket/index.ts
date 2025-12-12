import { io, Socket } from 'socket.io-client'

// console.log('WebSocket URL:', import.meta.env)
export const ws: Socket = io(import.meta.env.VITE_APP_WS_URL, {
  transports: ['websocket'],
  auth: {
    token: null
  }
})
