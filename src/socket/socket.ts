import { ws } from './index'
// 监听大厅
ws.on('ver-token', async (args, callback) => {
  console.log(ws.auth)
  console.log(localStorage.getItem('token'))
  const token = localStorage.getItem('token')
  await callback(token)
})
