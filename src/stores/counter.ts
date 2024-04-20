import { ref, nextTick } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const el: any = ref(null)
  const el2: any = ref(null)

  const onlineUsers: any = ref([])
  const messageLists: any = ref([])
  const logs: any = ref([])
  const user: any = ref({
    id: '',
    name: '',
    avatar: '',
    content: ''
  })
  const rollToTheBottom = async () => {
    await nextTick()
    el.value.scrollTop = el.value.scrollHeight
  }
  const rollToTheBottom2 = async () => {
    await nextTick()
    el2.value.scrollTop = el2.value.scrollHeight
  }
  return { user, messageLists, onlineUsers, el, logs, el2, rollToTheBottom, rollToTheBottom2 }
})
