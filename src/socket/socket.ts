import { useCounterStore } from '../stores/counter'
import { useRouter } from 'vue-router'
import { ws } from './index'

export const initSocketListeners = async () => {
  const stores = useCounterStore()
  const router = useRouter()

  // 延迟检测
  setInterval(() => {
    const start = Date.now()

    ws.emit('ping', () => {
      const duration = Date.now() - start
      stores.ping = ` ${duration} ms`
    })
  }, 1000)

  // 连接成功
  ws.on('connect', () => {
    // 刷新时如果本地有用户信息则免登录
    const token = localStorage.getItem('token')
    if (token) {
      // 刷新token
      ws.emit('reToken', { token }, (res: any) => {
        if (res.code === 0) {
          alert(res.message)
          localStorage.removeItem('token')
          router.push('/')
          return
        }
        stores.user = res.data.user
        localStorage.setItem('token', res.data.token)
      })
      router.push('chat-room')
    }
  })

  // 连接断开
  ws.on('disconnect', () => {
    stores.ping = '连接已断开, 正在重连...'
  })

  // 版本检测
  ws.on('version', (val) => {
    const localVersion = localStorage.getItem('version')
    if (!localVersion) {
      localStorage.setItem('version', val)
      return
    }
    console.log('客户端版本', localVersion)
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
    stores.connCount = data.connCount
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
}
