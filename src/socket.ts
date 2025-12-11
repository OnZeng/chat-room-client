import { reactive } from 'vue'
import { io, Socket } from 'socket.io-client'

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
})

// console.log('WebSocket URL:', import.meta.env)
export const ws: Socket = io(import.meta.env.VITE_APP_WS_URL, {
  transports: ['websocket']
})

// ws.on('connect', () => {
//   state.connected = true
//   console.log('连接成功')
// })

// ws.on('disconnect', () => {
//   state.connected = false
// })
