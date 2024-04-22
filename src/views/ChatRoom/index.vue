<template>
  <div class="box-title">
    <div class="box2-1">
      <img class="box2-avatar" :src="stores.user.avatar" />
      <div class="box2-name">{{ stores.user.name }}</div>
    </div>
    <div>在线人数({{ stores.onlineUsers.length }})</div>
  </div>
  <div class="box1">
    <div class="box2">
      <template v-for="item in stores.onlineUsers">
        <div class="box2-1" v-if="item.id != stores.user.id">
          <img class="box2-avatar" :src="item.avatar" />
          <div class="box2-name">{{ item.name }}</div>
        </div>
      </template>
    </div>
    <div class="box3">
      <div class="box4" id="el">
        <template v-for="item in stores.messageLists">
          <div class="box4-item" :class="[item.id == stores.user.id ? 'right' : '']">
            <img class="box4-avatar" :src="item.avatar" />
            <div class="box4-content-box">
              <div class="box4-name">{{ item.id == stores.user.id ? '' : item.name }}</div>
              <div class="box4-content">{{ item.content }}</div>
            </div>
          </div>
        </template>
      </div>
      <div class="box5">
        <input class="input1" v-model="stores.user.content" />
        <button class="button1" @click="sendMsg">发送</button>
      </div>
    </div>
    <div class="box6">
      <div class="box7">
        <a href="https://github.com/OnZeng/chat-room-server" target="_blank">Github</a>
      </div>
      <div style="text-align: center">日志</div>
      <div class="box8" id="log">
        <template v-for="item in stores.logs">
          <div class="box8-item">{{ item }}</div>
        </template>
      </div>
      <div style="text-align: center">服务器连接次数：{{ stores.historyCount }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { socket } from '@/socket'
import { onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'

const stores = useCounterStore()
const sendMsg = () => {
  if (stores.user.content.trim() === '') return
  // 发送消息
  socket.emit('newMessage', stores.user)
  stores.user.content = ''
  stores.rollToTheBottom()
}

onMounted(async () => {
  // 初始化dom元素
  const divElement = document.getElementById('el')
  const divElement2 = document.getElementById('log')
  stores.el = divElement
  stores.el2 = divElement2
  stores.rollToTheBottom()
  stores.rollToTheBottom2()
})
</script>
<style scoped>
@import url('./index.css');
</style>
