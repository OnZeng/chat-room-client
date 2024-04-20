import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
})

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://193.134.209.123:5000/'
const location_URL = 'http://localhost:5000/'
export const socket = io(URL)

socket.on('connect', () => {
  state.connected = true
  console.log('连接成功')
})

socket.on('disconnect', () => {
  state.connected = false
})

// socket.on('foo', (...args) => {
//   state.fooEvents.push(args)
//   console.log('foo', args)
// })

// socket.on('bar', (...args) => {
//   state.barEvents.push(args)
// })
