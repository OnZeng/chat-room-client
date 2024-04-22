import { createRouter, createWebHistory } from 'vue-router'
import index from '@/views/index/index.vue'
import { useCounterStore } from '@/stores/counter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: index
    },
    {
      path: '/chat-room',
      name: 'chat-room',
      component: () => import('@/views/ChatRoom/index.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const stores = useCounterStore()
  if (to.path === '/chat-room') {
    if (stores.user.name === '') {
      alert('已断开连接，请重新登录')
      return next('/')
    }
  }
  next()
})

export default router
