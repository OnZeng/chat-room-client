import { io, Socket } from 'socket.io-client'

export const ws: Socket = io(import.meta.env.VITE_APP_WS_URL, {
  transports: ['websocket'],
  auth: (cb) => {
    // cb 是回调函数，参数为要传递的认证信息（会在连接时发给服务端）
    const token = localStorage.getItem('token') || '' // 从本地存储取 token
    cb({ token }) // 传递 token 给服务端
  }
})
