import { createRouter, createWebHistory } from 'vue-router'

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
  if (to.path === '/chat-room') {
    if (localStorage.getItem('token') === null) {
      return next('/')
    }
  }
  if (to.path === '/') {
    if (localStorage.getItem('token') !== null) {
      return next('/chat-room')
    }
  }
  next()
})

export default router
