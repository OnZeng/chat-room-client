<template>
    <div class="box1">
        <p>选择头像和昵称</p>
        <div class="box2">
            <template v-for="image in images" :key="image.id">
                <img class="img1" :src="image" @click="() => user.avatar = image" />
            </template>
        </div>
        <img class="img1" :src="user.avatar" />
        <input class="input1" v-model="user.name" placeholder="请输入昵称" />
        <button class="button1" @click="submit">进入聊天室</button>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useCounterStore } from '../stores/counter'

const stores = useCounterStore()
const router = useRouter()
const images: any = ref([
    'https://pic1.zhimg.com/80/v2-3c38945eed11ff8180a381cec5cdfe8d_1440w.webp?source=1def8aca',
    'https://picx.zhimg.com/80/v2-00105b995d93303f71ad982a105512cf_1440w.webp?source=1def8aca',
    'https://pic1.zhimg.com/80/v2-3c244d52366a45920a757839d82682eb_1440w.webp?source=1def8aca',
    'https://picx.zhimg.com/80/v2-d9f75dbace60cbb9416ec4ab824e1fdd_1440w.webp?source=1def8aca',
    'https://pic1.zhimg.com/80/v2-bd73fdb1ffc84e44970ecb3856ef86d9_1440w.webp?source=1def8aca',
    '//img2.huashi6.com/images/resource/thumbnail/2024/04/19/52024_22467256264.jpg?imageMogr2/quality/75/interlace/1/thumbnail/223x/gravity/North/crop/223x313/format/jpeg'
])

const user: any = ref({
    name: '',
    avatar: images.value[0]
})


const submit = () => {
    if (!user.value.name.trim()) return alert(`请输入昵称`);
    stores.user.name = user.value.name
    stores.user.avatar = user.value.avatar
    router.push('chat-room')
}
</script>
<style scoped>
.box1 {
    width: 400px;
    height: 400px;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.box2 {
    width: 300px;
    height: 40px;
    display: flex;
    gap: 10px;
}

.input1 {
    padding-block: 0;
    padding-inline: 0;
    padding: 0;
    margin: 0;
    border: 1px solid;
    width: 300px;
    height: 40px;
    box-sizing: border-box;
}

.input1:focus-visible {
    outline: none;
}

.button1 {
    background-color: white;
    padding: 0;
    margin: 0;
    border: 1px solid;
    width: 300px;
    height: 40px;
    cursor: pointer;
}

.img1 {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border: 1px solid;
    border-radius: 50%;
    cursor: pointer;
}
</style>