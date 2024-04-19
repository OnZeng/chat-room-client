<template>
  <div class="box-title">
    <div class="box2-1">
      <img class="box2-avatar" :src="stores.user.avatar" />
      <div class="box2-name">{{ stores.user.name }}</div>
    </div>
  </div>
  <div class="box1">
    <div class="box2">
    </div>
    <div class="box3">
      <div class="box4">
        <template v-for="item in list">
          <div>{{ item.name }}: {{ item.content }}</div>
        </template>
      </div>
      <div class="box5">
        <input class="input1" v-model="stores.user.content" />
        <button class="button1" @click="sendMsg">发送</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { socket } from "@/socket";
import { onMounted, ref } from "vue";
import { useCounterStore } from '../stores/counter'

const stores = useCounterStore()
const list: any = ref([])


const sendMsg = () => {
  // 发送消息
  socket.emit("newMessage", stores.user, () => {
    console.log("发送成功")
  });
  stores.user.content = "";
};

onMounted(() => {
  // 监听服务器端的连接并且初始化
  socket.on("connection", (data) => {
    list.value = data
    console.log(data);
  });
  // 监听服务器端的消息
  socket.on("newMessage", (data) => {
    list.value = data
    console.log(data);
  });
});
</script>
<style scoped>
.box-title {
  width: 1000px;
  height: 50px;
  display: flex;
  align-items: center;
  border: 1px solid;
  border-bottom: 0;
}

.box1 {
  width: 1000px;
  height: 600px;
  border: 1px solid;
  display: flex;
}

.box2 {
  width: 150px;
  height: 100%;
  border-right: 1px solid;
}

.box3 {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.box4 {
  flex: 1;
}

.box5 {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
}

.input1 {
  padding-block: 0;
  padding-inline: 0;
  padding: 0;
  margin: 0;
  border: 1px solid;
  flex: 1;
  height: 40px;
  box-sizing: border-box;
  border-bottom: 0;
}

.input1:focus-visible {
  outline: none;
}

.button1 {
  padding: 0;
  margin: 0;
  border: 1px solid;
  width: 100px;
  height: 40px;
  border-bottom: 0;
  cursor: pointer;
  background-color: white;
}

.box2-1 {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  gap: 10px;
  box-sizing: border-box;
}

.box2-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid;
}

.box2-name {
  flex: 1;
}
</style>
