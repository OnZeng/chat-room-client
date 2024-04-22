import { defineStore } from 'pinia'
import { useCounterStore } from './counter'
import { socket } from '@/socket'

export const useMonitorStore = defineStore('counter2', () => {
  const stores = useCounterStore()
  const init = async () => {
    /**
     * @description 监听服务器端的连接
     */
    socket.on('connection', async (data) => {
      stores.messageLists = data.messageLists
      stores.onlineUsers = data.onlineUsers
      stores.logs = data.logs
      stores.historyCount = data.historyCount

      stores.user.id = socket.id
      console.log(data)
    })

    /**
     * @description 监听服务器端的新消息
     */
    socket.on('newMessage', (data) => {
      stores.messageLists = data
      if (stores.el.scrollTop >= stores.el.scrollHeight - 650) {
        stores.rollToTheBottom()
      }
      if (stores.el2?.scrollTop >= stores.el2?.scrollHeight - 650) {
        stores.rollToTheBottom2()
      }
    })

    /**
     * @description 监听服务器端的用户上线
     */
    socket.on('onlineUsers', (data) => {
      stores.onlineUsers = data
    })

    /**
     * @description 监听服务器端的日志
     */
    socket.on('logs', (data) => {
      stores.logs = data
      if (stores.el2?.scrollTop >= stores.el2?.scrollHeight - 650) {
        stores.rollToTheBottom2()
      }
    })

    /**
     * @description 监听历史访问数量
     */
    socket.on('historyCount', (data) => {
      stores.historyCount = data
    })
  }
  return { init }
})
