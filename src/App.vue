<template>
  <RouterView />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { initSocketListeners } from '@/socket/socket'

onMounted(async () => {
  // 初始化监听器
  await initSocketListeners()
});


</script>
