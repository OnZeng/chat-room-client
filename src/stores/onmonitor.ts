import { defineStore } from 'pinia'
import { useCounterStore } from './counter'
import { socket } from '@/socket'

export const useMonitorStore = defineStore('counter2', () => {
  const stores = useCounterStore()
  const init = () => {
    // 监听服务器端的连接并且初始化
    socket.on('connection', async (data) => {
      stores.messageLists = data.messageLists
      stores.onlineUsers = data.onlineUsers
      stores.user.id = socket.id
      console.log(data)
    })
    // 监听服务器端的消息
    socket.on('newMessage', (data) => {
      stores.messageLists = data
      if (stores.el.scrollTop >= stores.el.scrollHeight - 650) {
        stores.rollToTheBottom()
      }
      // console.log(data);
    })
    // 监听服务器端的用户上线消息
    socket.on('onlineUsers', (data) => {
      stores.onlineUsers = data
      console.log(data)
    })
  }
  return { init }
})
