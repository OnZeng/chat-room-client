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
  </div>
</template>
<script setup lang="ts">
import { socket } from "@/socket";
import { onMounted } from "vue";
import { useCounterStore } from '../stores/counter'

const stores = useCounterStore()

const sendMsg = () => {
  if (stores.user.content.trim() === "") return;
  // 发送消息
  socket.emit("newMessage", stores.user);
  stores.user.content = "";
  stores.rollToTheBottom()
};

onMounted(() => {
  const divElement = document.getElementById('el')
  stores.el = divElement
  stores.rollToTheBottom()
});
</script>
<style scoped>
.box-title {
  width: 800px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid;
  border-bottom: 0;
  padding-right: 5px;
  box-sizing: border-box;
}

.box1 {
  width: 800px;
  height: 600px;
  border: 1px solid;
  display: flex;
}

.box2 {
  width: 150px;
  height: 100%;
  border-right: 1px solid;
  overflow-y: scroll;
}

.box2::-webkit-scrollbar {
  display: none;
}

.box3 {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.box4 {
  flex: 1;
  overflow-y: scroll;
}

.box4::-webkit-scrollbar {
  display: none;
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

.box4-item {
  padding: 10px;
  display: flex;
  gap: 10px;
}

.right {
  padding: 10px;
  display: flex;
  flex-direction: row-reverse;
  text-align: end;
  gap: 10px;
}

.box4-avatar {
  width: 40px;
  height: 40px;
  border: 1px solid;
  border-radius: 4px;
}

.box4-content-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
