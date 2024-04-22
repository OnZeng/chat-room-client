import { ref, nextTick } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  //dom元素
  const el: any = ref(null)
  const el2: any = ref(null)

  // 历史人数
  const historyCount: any = ref(0)
  // 在线人数
  const onlineUsers: any = ref([])
  // 消息列表
  const messageLists: any = ref([])
  // 日志
  const logs: any = ref([])
  // 当前用户
  const user: any = ref({
    id: '',
    name: '',
    avatar: '',
    content: ''
  })
  // 滚动到底部
  const rollToTheBottom = async () => {
    await nextTick()
    el.value.scrollTop = el.value?.scrollHeight
  }
  // 滚动到底部
  const rollToTheBottom2 = async () => {
    await nextTick()
    el2.value.scrollTop = el2.value?.scrollHeight
  }
  return {
    user,
    messageLists,
    onlineUsers,
    el,
    logs,
    el2,
    historyCount,
    rollToTheBottom,
    rollToTheBottom2
  }
})
