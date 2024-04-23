import { reactive } from 'vue'
import { io, Socket } from 'socket.io-client'

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
})

// "undefined" means the URL will be computed from the `window.location` object
export const ws: Socket = io(import.meta.env.VITE_APP_WS_URL)

ws.on('connect', () => {
  state.connected = true
  console.log('连接成功')
})

ws.on('disconnect', () => {
  state.connected = false
})
