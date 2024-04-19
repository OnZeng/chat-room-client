import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index.vue'

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
      component: () => import('../views/chat-room.vue')
    }
  ]
})

export default router
