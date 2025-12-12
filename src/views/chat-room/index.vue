<template>
  <div>
    <div class="box-head">
      <div class="box-head-left">
        <img class="box-head-left-avatar" :src="stores.user.avatar" />
        <div class="box-head-left-name">{{ stores.user.name }}</div>
      </div>
      <div class="box-head-rigt">
        <div>在线人数({{ stores.onlineUsers.length }})</div>
        <button class="back-btn" @click="logout">退出</button>
      </div>
    </div>
    <div class="content">
      <div class="content-left">
        <template v-for="(item, index) in stores.onlineUsers">
          <div class="content-left-item" v-if="item.uuid != stores.user.uuid" :key="index">
            <img class="content-left-item-avatar" :src="item.avatar" />
            <div class="content-left-item-name">{{ item.name }}</div>
          </div>
        </template>
      </div>
      <div class="content-center">
        <div class="content-center-text" id="el">
          <div v-for="(item, index) in stores.msgList" :key="index" class="content-center-text-item"
            :class="[item.uuid == stores.user.uuid ? 'right' : '']">
            <img class="content-center-text-item-avatar" :src="item.avatar" />
            <div class="content-center-text-item-box">
              <div class="content-center-text-item-box-name">{{ item.uuid === stores.user.uuid ? '' : item.name }}</div>
              <div class="content-center-text-item-box-content">{{ item.content }}</div>
            </div>
          </div>
        </div>
        <div class="content-center-input">
          <input v-model="content" />
          <button class="content-center-input-send" @click="sendMsg">发送</button>
        </div>
      </div>
      <div class="content-right">
        <div class="content-right-top">
          <a href="https://github.com/OnZeng/chat-room-server" target="_blank">Github</a>
        </div>
        <div style="text-align: center">日志</div>
        <div class="content-right-content" id="log">
          <div v-for="(item, index) in stores.logList" :key="index" class="content-right-content-item">{{ item }}</div>
        </div>
        <!-- <div style="text-align: center">服务器连接次数：{{ stores.historyCount }}</div> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ws } from '@/socket'
import { ref, onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { useRouter } from 'vue-router'

const stores = useCounterStore()
const router = useRouter()

const content = ref('')

// 退出登录状态
const logout = () => {
  ws.emit('logout', { token: stores.token }, (res) => {
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
    token: token
  }, (res) => {
    if (res.code === 0) {
      alert(res.message)
    }
  })
  content.value = ''
  stores.rollToTheBottom()
}

// 根据uuid来匹配头像
const alotAvatar = (uuid) => {
  const user = stores.onlineUsers.find(user => user.uuid === uuid);
  return user ? user.avatar : 'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEMiI1pO8DZ-cWvycasF5roA7Tx0y5XpQACZx8AAlAH2FVUX1Gc83ij5zYE.jpg';
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
