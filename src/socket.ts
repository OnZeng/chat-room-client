import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
})

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://127.0.0.1:3000'

export const socket = io(URL)

socket.on('connect', () => {
  state.connected = true
  console.log('连接成功')
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('foo', (...args) => {
  state.fooEvents.push(args)
  console.log('foo', args)
})

socket.on('bar', (...args) => {
  state.barEvents.push(args)
})
