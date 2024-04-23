import { ref, nextTick, type Ref } from 'vue'
import { defineStore } from 'pinia'

interface UserType {
  id: string
  name: string
  avatar: string
  content: string
}

export const useCounterStore = defineStore('counter', () => {
  //  dom元素
  const el = ref() as Ref<HTMLElement>
  const el2 = ref() as Ref<HTMLElement>

  //  历史人数
  const historyCount = ref<number>(0)
  //  在线人数
  const onlineUsers = ref<UserType[]>([])
  //  消息列表
  const messageLists = ref<UserType[]>([])
  //  日志
  const logs = ref<string[]>([])
  //  当前用户
  const user = ref<UserType>({
    id: '',
    name: '',
    avatar: '',
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
