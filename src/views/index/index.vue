<template>
  <div class="box1">
    <p>选择头像和昵称</p>
    <div class="box2">
      <template v-for="image in images" :key="image.id">
        <img class="img1" :src="image" @click="() => (user.avatar = image)" />
      </template>
    </div>
    <img class="img1" :src="user.avatar" />
    <form class="form" @submit="submit">
      <input class="input1" v-model="user.name" placeholder="请输入昵称" />
      <button type="submit" class="button1">进入聊天室</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { ws } from '@/socket'

const stores = useCounterStore()
const router = useRouter()
const images: any = ref([
  '//pic1.zhimg.com/80/v2-3c38945eed11ff8180a381cec5cdfe8d_1440w.webp?source=1def8aca',
  '//picx.zhimg.com/80/v2-00105b995d93303f71ad982a105512cf_1440w.webp?source=1def8aca',
  '//pic1.zhimg.com/80/v2-3c244d52366a45920a757839d82682eb_1440w.webp?source=1def8aca',
  '//picx.zhimg.com/80/v2-d9f75dbace60cbb9416ec4ab824e1fdd_1440w.webp?source=1def8aca',
  '//pic1.zhimg.com/80/v2-bd73fdb1ffc84e44970ecb3856ef86d9_1440w.webp?source=1def8aca',
  '//img2.huashi6.com/images/resource/thumbnail/2024/04/19/52024_22467256264.jpg?imageMogr2/quality/75/interlace/1/thumbnail/223x/gravity/North/crop/223x313/format/jpeg'
])

const user: any = ref({
  name: '',
  avatar: images.value[0]
})

const submit = (e: Event) => {
  e.preventDefault()
  if (!user.value.name.trim()) return alert(`请输入昵称`)
  stores.user.name = user.value.name
  stores.user.avatar = user.value.avatar
  if (!ws.connected) return alert('服务器连接失败')
  // 登录
  ws.emit('onlineUsers', {
    id: ws.id,
    name: user.value.name,
    avatar: user.value.avatar
  })
  router.push('chat-room')
}
</script>
<style scoped>
@import url('./index.css');
</style>
