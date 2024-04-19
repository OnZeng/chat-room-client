import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const user = ref({
    name: '',
    avatar: '',
    content: ''
  })
  return { user }
})
