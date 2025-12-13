<template>
  <div class="box">
    <div class="box1" v-if="is === 1">
      <div class="box1-1">
        <input v-model="user.email" placeholder="请输入邮箱" />
        <input v-model="user.password" placeholder="请输入密码" />
        <button type="submit" @click="regView">注册</button>
        <button type="submit" @click="login">登录</button>
      </div>
    </div>
    <div class="box1" v-if="is === 2">
      <button class="back-login" @click="back">返回</button>
      <div class="box1-1">
        <input v-model="user.email" placeholder="请输入邮箱" />
        <input v-model="user.password" placeholder="请输入密码" />
        <input v-model="user.cfmPassword" placeholder="请再次输入密码" />
        <button type="submit" @click="register">注册并登录</button>
      </div>
    </div>
    <div class="box1" v-if="is === 3">
      <p>选择头像和昵称</p>
      <div class="box1-2">
        <template v-for="image in images" :key="image">
          <img class="img" :src="image" @click="() => (user.avatar = image)" />
        </template>
      </div>
      <img class="img" :src="user.avatar" />
      <div class="box1-1">
        <input v-model="user.name" placeholder="请输入昵称" />
        <button type="submit" @click="enterChatRoom">进入聊天室</button>
      </div>
    </div>
    <p class="ping">{{ stores.ping }}</p>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { ws } from '@/socket/index'

const stores = useCounterStore()
const router = useRouter()

const is = ref(1)

const images = ref([
  '//pic1.zhimg.com/80/v2-3c38945eed11ff8180a381cec5cdfe8d_1440w.webp?source=1def8aca',
  '//picx.zhimg.com/80/v2-00105b995d93303f71ad982a105512cf_1440w.webp?source=1def8aca',
  '//pic1.zhimg.com/80/v2-3c244d52366a45920a757839d82682eb_1440w.webp?source=1def8aca',
  '//picx.zhimg.com/80/v2-d9f75dbace60cbb9416ec4ab824e1fdd_1440w.webp?source=1def8aca',
  '//pic1.zhimg.com/80/v2-bd73fdb1ffc84e44970ecb3856ef86d9_1440w.webp?source=1def8aca',
  '//img2.huashi6.com/images/resource/thumbnail/2024/04/19/52024_22467256264.jpg?imageMogr2/quality/75/interlace/1/thumbnail/223x/gravity/North/crop/223x313/format/jpeg'
])

const user = ref({
  email: '123456@qq.com',
  password: '123456',
  cfmPassword: '',
  name: '',
  avatar: images.value[0]
})

// 注册页面
const regView = () => {
  user.value.email = ''
  user.value.password = ''
  user.value.cfmPassword = ''
  user.value.name = ''
  user.value.avatar = images.value[0]
  is.value = 2
}

// 返回登录页面
const back = () => {
  user.value.email = '123456@qq.com'
  user.value.password = '123456'
  user.value.cfmPassword = ''
  user.value.name = ''
  user.value.avatar = images.value[0]
  is.value = 1
}

const login = () => {
  if (!user.value.email.trim()) return alert(`请输入邮箱`)
  if (!ws.connected) {
    return alert('服务器连接失败')
  }
  // 登录请求
  ws.emit('login', {
    email: user.value.email,
    password: user.value.password
  }, (res) => {
    if (res.code === 0) {
      return alert(res.message)
    }
    // 是否初始化
    if (res.code === 2) {
      stores.token = res.data.token
      is.value = 3
      return alert('请先设置昵称和头像')
    }
    // 登录成功
    localStorage.setItem('token', res.data.token)
    stores.user = res.data.user
    router.push('chat-room')
  })
}

const register = () => {
  // 请输入正确的邮箱
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:gmail|qq|163|126|sina|sohu|hotmail|outlook|yahoo|foxmail)\.(?:com|com\.cn|net|cn|org)$/i
  if (!emailRegex.test(user.value.email)) return alert('请输入正确的邮箱')
  if (!user.value.password.trim()) return alert('请输入密码')
  if (user.value.password !== user.value.cfmPassword) {
    return alert('两次输入的密码不一致')
  }
  //注册请求
  ws.emit('register', {
    email: user.value.email,
    password: user.value.password,
    cfmPassword: user.value.cfmPassword
  }, (res) => {
    if (res.code === 0) {
      return alert(res.message)
    }
    localStorage.setItem('token', res.data.token)
    // 注册成功，进入选择头像和昵称页面
    is.value = 3
  })
}

// 设置昵称和头像，进入聊天室
const enterChatRoom = () => {
  const token = localStorage.getItem('token')
  // 昵称需为1-6个文字或字母
  const nameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9_]{1,6}$/
  if (!nameRegex.test(user.value.name)) return alert('昵称需为1-6个文字或字母')
  // 设置昵称和头像请求
  ws.emit('init', {
    name: user.value.name,
    avatar: user.value.avatar,
    token: token
  }, (res) => {
    if (res.code === 0) {
      return alert(res.message)
    }
    // 设置成功
    localStorage.setItem('token', res.data.token)
    stores.user = res.data.user
    router.push('chat-room')
  })
}
</script>
<style scoped>
@import url('./index.css');
</style>
