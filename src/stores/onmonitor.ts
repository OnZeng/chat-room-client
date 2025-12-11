import { defineStore } from 'pinia'
import { ws } from '@/socket'
import { useRouter } from 'vue-router'
import { useCounterStore } from './counter'

export const useMonitorStore = defineStore('counter2', () => {
  const stores = useCounterStore()
  const router = useRouter()

  const init = async () => {
    /**
     * @description 监听连接成功
     */
    ws.on('connect', () => {
      // 刷新时如果本地有用户信息则免登录
      const token = localStorage.getItem('token') || stores.token
      if (token) {
        // 重新获取token
        ws.emit('reToken', token, (res: any) => {
          if (res.code === 0) {
            alert(res.message)
            localStorage.removeItem('token')
            router.push('/')
            return
          }
          stores.token = res.data.token
          stores.user = res.data.user
          stores.messageLists = res.data.msg
          stores.onlineUsers = res.data.onlineUsers
        })
        console.log('免登录')
        router.push('chat-room')
      }
    })

    /**
     * @description 监听服务器端的连接
     */
    ws.on('connection', () => {})

    /**
     * @description 监听服务器端的新消息
     */
    ws.on('newMessage', (data) => {
      stores.messageLists = data
      if (stores.el.scrollTop >= stores.el.scrollHeight - 650) {
        stores.rollToTheBottom()
      }
      if (stores.el2?.scrollTop >= stores.el2?.scrollHeight - 650) {
        stores.rollToTheBottom2()
      }
    })

    /**
     * @description 监听服务器端的日志
     */
    ws.on('logs', (data) => {
      stores.logs = data
      if (stores.el2?.scrollTop >= stores.el2?.scrollHeight - 650) {
        stores.rollToTheBottom2()
      }
    })

    /**
     * @description 监听历史访问数量
     */
    ws.on('historyCount', (data) => {
      stores.historyCount = data
    })
  }
  return { init }
})
