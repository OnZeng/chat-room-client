import { ref, nextTick } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const el: any = ref(null)
  const onlineUsers: any = ref([])
  const messageLists: any = ref([])
  const user: any = ref({
    id: '',
    name: '',
    avatar: '',
    content: ''
  })
  // 滚动条自动滚动
  const rollToTheBottom = async () => {
    await nextTick()
    el.value.scrollTop = el.value.scrollHeight
  }
  return { user, messageLists, onlineUsers, el, rollToTheBottom }
})
