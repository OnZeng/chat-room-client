<template>
  <RouterView />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';
import { useMonitorStore } from '@/stores/onmonitor'

const Monitor = useMonitorStore()

onMounted(() => {
  Monitor.init()
});
</script>
