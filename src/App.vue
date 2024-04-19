<template>
  <RouterView />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { state } from "@/socket";
import { onMounted } from 'vue';

onMounted(() => {
  state.connected
});
</script>
