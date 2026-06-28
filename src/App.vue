<template>
  <div v-if="!isMobile">
    <RouterView />
  </div>
  <div v-else style="text-align: center">
    <div>没写自适应</div>
    <div>请在pc端打开</div>
  </div>
  <a class="a-link" href="https://github.com/OnZeng/chat-room-server" target="_blank">Github</a>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import { initSocketListeners } from "@/socket/socket";

const isMobile = ref(false);

onMounted(async () => {
  // 初始化监听器
  await initSocketListeners();
  // 检查是否为移动端
  const ua = navigator.userAgent.toLowerCase();
  const Mobile = /android|iphone|ipod|ipad|windows phone|mobile/.test(ua);
  if (Mobile) {
    isMobile.value = true;
  }
});
</script>
