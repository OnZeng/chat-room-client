import { defineStore } from 'pinia'
import { useCounterStore } from './counter'
import { socket } from '@/socket'

export const useMonitorStore = defineStore('counter2', () => {
  const stores = useCounterStore()
  const init = async () => {
    // 监听服务器端的连接并且初始化
    socket.on('connection', async (data) => {
      stores.messageLists = data.messageLists
      stores.onlineUsers = data.onlineUsers
      stores.logs = data.logs
      stores.historyCount = data.historyCount
      stores.user.id = socket.id
      console.log(data)
    })
    // 监听服务器端的消息
    socket.on('newMessage', (data) => {
      stores.messageLists = data
      if (stores.el.scrollTop >= stores.el.scrollHeight - 650) {
        stores.rollToTheBottom()
      }
      if (stores.el2?.scrollTop >= stores.el2?.scrollHeight - 650) {
        stores.rollToTheBottom2()
      }
    })
    // 监听服务器端的用户上线消息
    socket.on('onlineUsers', (data) => {
      stores.onlineUsers = data
    })
    // 监听日志
    socket.on('logs', (data) => {
      stores.logs = data
      if (stores.el2?.scrollTop >= stores.el2?.scrollHeight - 650) {
        stores.rollToTheBottom2()
      }
    })
    // 监听历史人流量
    socket.on('historyCount', (data) => {
      stores.historyCount = data
    })
  }
  return { init }
})
