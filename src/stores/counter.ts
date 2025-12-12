import { ref, nextTick, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  //  dom元素
  const el = ref() as Ref<HTMLElement>
  const el2 = ref() as Ref<HTMLElement>

  // 令牌
  const token = ref('')
  //  历史人数
  const historyCount = ref(0)
  //  在线人数
  const onlineUsers = ref([])
  //  消息列表
  const msgList = ref([])
  //  日志
  const logList = ref<string[]>([])
  //  当前用户
  const user = ref({
    content: ''
  })
  //  滚动到底部
  const rollToTheBottom = async () => {
    await nextTick()
    el.value.scrollTop = el.value?.scrollHeight
  }
  //  滚动到底部
  const rollToTheBottom2 = async () => {
    await nextTick()
    el2.value.scrollTop = el2.value?.scrollHeight
  }
  return {
    user,
    msgList,
    logList,
    onlineUsers,
    el,
    el2,
    token,
    historyCount,
    rollToTheBottom,
    rollToTheBottom2
  }
})
