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
        // 刷新token
        ws.emit('reToken', { token }, (res: any) => {
          if (res.code === 0) {
            alert(res.message)
            localStorage.removeItem('token')
            router.push('/')
            return
          }
          stores.token = res.data.token
          stores.user = res.data.user
        })
        router.push('chat-room')
      }
    })

    /**
     * @description 监听服务器端的连接
     */
    ws.on('connection', () => {})

    // 版本检测
    ws.on('version', (val) => {
      const localVersion = localStorage.getItem('version')
      if (!localVersion) {
        localStorage.setItem('version', val)
        return
      }
      console.log('本地版本', localVersion)
      console.log('服务端版本', val)
      if (localVersion !== val) {
        localStorage.setItem('version', val)
        alert('发现新版本，页面即将刷新')
        window.location.reload()
      }
    })

    // 监听数据源
    ws.on('data', (data) => {
      console.log(data)
      stores.onlineUsers = data.onlineUsers
      stores.msgList = data.msgList
      stores.logList = data.logList
      if (stores.el?.scrollTop >= stores.el?.scrollHeight - 650) {
        stores.rollToTheBottom()
      }
      if (stores.el2?.scrollTop >= stores.el2?.scrollHeight - 650) {
        stores.rollToTheBottom2()
      }
      if (stores.el2?.scrollTop >= stores.el2?.scrollHeight - 650) {
        stores.rollToTheBottom2()
      }
    })

    // /**
    //  * @description 监听服务器端的新消息
    //  */
    // ws.on('newMessage', (data) => {
    //   stores.msgList = data
    //   if (stores.el.scrollTop >= stores.el.scrollHeight - 650) {
    //     stores.rollToTheBottom()
    //   }
    //   if (stores.el2?.scrollTop >= stores.el2?.scrollHeight - 650) {
    //     stores.rollToTheBottom2()
    //   }
    // })

    // /**
    //  * @description 监听服务器端的日志
    //  */
    // ws.on('logs', (data) => {
    //   stores.logList = data
    //   if (stores.el2?.scrollTop >= stores.el2?.scrollHeight - 650) {
    //     stores.rollToTheBottom2()
    //   }
    // })

    // /**
    //  * @description 监听历史访问数量
    //  */
    // ws.on('historyCount', (data) => {
    //   stores.historyCount = data
    // })
  }
  return { init }
})
