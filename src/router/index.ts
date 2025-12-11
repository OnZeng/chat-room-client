import { createRouter, createWebHistory } from 'vue-router'
import { useCounterStore } from '@/stores/counter'

const baseTitle = import.meta.env.VITE_TITLE
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/chat-room',
      name: 'chat-room',
      component: () => import('@/views/chat-room/index.vue')
    }
  ]
})

router.afterEach(() => {
  document.title = baseTitle
})

router.beforeEach((to, _, next) => {
  const stores = useCounterStore()
  // console.log(stores.token)
  if (to.path === '/chat-room') {
    if (stores.token === '' && localStorage.getItem('token') === null) {
      alert('已断开连接，请重新登录')
      return next('/')
    }
  }
  if (to.path === '/') {
    if (stores.token !== '' || localStorage.getItem('token') !== null) {
      return next('/chat-room')
    }
  }
  next()
})

export default router
