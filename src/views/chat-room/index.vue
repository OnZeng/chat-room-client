<template>
  <div>
    <div class="box1">
      <div class="box1-1">
        <img class="box1-1-avatar" :src="stores.user?.avatar" />
        <div class="box1-1-name">{{ stores.user?.name }}</div>
      </div>
      <div class="box1-2">
        <div>在线人数({{ stores.onlineUsers.length }})</div>
        <button class="back-btn" @click="logout">退出</button>
      </div>
    </div>
    <div class="box2">
      <div class="box2-1">
        <template v-for="(item, index) in stores.onlineUsers">
          <div class="box2-1-item" v-if="item.uuid != stores.user.uuid" :key="index">
            <img class="box2-1-item-avatar" :src="item.avatar" />
            <div class="box2-1-item-name">{{ item.name }}</div>
          </div>
        </template>
      </div>
      <div class="box3">
        <div class="box3-1" id="el">
          <div v-for="(item, index) in stores.msgList" :key="index" class="box3-1-item"
            :class="[item.uuid == stores.user.uuid ? 'right' : '']">
            <img class="box3-1-item-avatar" :src="item.avatar" />
            <div class="box3-1-item-box">
              <div class="box3-1-item-box-name">{{ item.uuid === stores.user.uuid ? '' : item.name }}</div>
              <div class="box3-1-item-box-content">{{ item.content }}</div>
            </div>
          </div>
        </div>
        <div class="box3-2">
          <input v-model="content" />
          <button class="box3-2-1" @click="sendMsg">发送</button>
        </div>
      </div>
      <div class="box4">
        <div class="box4-1" id="log">
          <div v-for="(item, index) in stores.logList" :key="index" class="box4-1-item">{{ item }}</div>
        </div>
        <div class="box4-2">
          <div>房间进入次数：{{ stores.connCount }}</div>
          <div>{{ stores.ping }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ws } from '@/socket/index'
import { ref, onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { useRouter } from 'vue-router'

const stores = useCounterStore()
const router = useRouter()

const content = ref('')

// 退出登录状态
const logout = () => {
  const token = localStorage.getItem('token')
  ws.emit('logout', { token }, (res) => {
    if (res.code === 0) {
      return alert(res.message)
    }
    localStorage.removeItem('token')
    stores.token = ''
    router.push('/')
  })
}

const sendMsg = () => {
  if (content.value.trim() === '') return
  const token = localStorage.getItem('token')
  // 发送消息
  ws.emit('sendMsg', {
    content: content.value,
    token
  }, (res) => {
    if (res.code === 0) {
      alert(res.message)
    }
  })
  content.value = ''
  stores.rollToTheBottom()
}

onMounted(async () => {
  // 初始化dom元素
  const divElement = document.getElementById('el')
  const divElement2 = document.getElementById('log')
  stores.el = divElement
  stores.el2 = divElement2
  await stores.rollToTheBottom()
  await stores.rollToTheBottom2()
})
</script>
<style scoped>
@import url('./index.css');
</style>
