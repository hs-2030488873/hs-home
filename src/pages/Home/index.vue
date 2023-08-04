<template>
    <div class="home">
        <div class="home-header-title">
            <h5 class="home-header-title__text">南风知我意，吹梦入西州</h5>
            <div class="home-header-avatar" v-if="isLogin">
                <img class="img-avatar" src="@/assets/image/bar.jpeg" alt="" />
            </div>
        </div>
        <div class="home-container-wrapper">
            <nav class="home-nav-wrapper">
                <div
                    class="home-nav-item"
                    :class="[tabName == 'drag' ? 'home-nav-item__active' : '']"
                >
                    <router-link to="/drag">drag</router-link>
                </div>
                <div
                    class="home-nav-item"
                    :class="[tabName == 'test' ? 'home-nav-item__active' : '']"
                >
                    <router-link to="/test">test</router-link>
                </div>
                <div
                    class="home-nav-item"
                    :class="[
                        tabName == 'todolist' ? 'home-nav-item__active' : ''
                    ]"
                >
                    <router-link to="/todolist">todolist</router-link>
                </div>
                <div
                    class="home-nav-item"
                    :class="[
                        tabName == 'lifecycle' ? 'home-nav-item__active' : ''
                    ]"
                >
                    <router-link to="/lifecycle">lifecycle</router-link>
                </div>
                <div
                    class="home-nav-item"
                    :class="[
                        tabName == 'webrtc' ? 'home-nav-item__active' : ''
                    ]"
                >
                    <router-link to="/webrtc">webrtc</router-link>
                </div>
                <div
                    class="home-nav-item"
                    :class="[
                        tabName == 'instant-messaging'
                            ? 'home-nav-item__active'
                            : ''
                    ]"
                >
                    <router-link to="/instant-messaging">即时通讯</router-link>
                </div>
            </nav>
            <div class="home-content-wrapper">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const ctx = getCurrentInstance()
const isLogin = ref(false)

console.log(import.meta.env.VITE_BASE_API)
console.log(ctx?.appContext.config.globalProperties.msg)

const tabName = ref('')

watchEffect(() => {
    tabName.value = route.name as string
})

onMounted(() => {
    console.log('mounted!')
})
</script>
<script lang="ts">
export default {
    inheritAttrs: false,
    name: 'home' // vue3.3 可以使用defineOptions编译宏定义组件name属性
}
</script>

<style scoped lang="less">
.home {
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.home-header-title {
    border-bottom: 1px solid #4ca2fe;
    display: flex;
    align-items: center;
    .home-header-title__text {
        flex: 1;
        line-height: 60px;
        height: 60px;
        padding: 0;
        border: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        text-align: center;
    }
    .home-header-avatar {
        flex: 0 0 auto;
        height: 50px;
        width: 50px;
        margin-right: 50px;
        .img-avatar {
            display: inline-block;
            border-radius: 50%;
            height: 100%;
            width: 100%;
            font-size: 0;
            vertical-align: baseline;
            object-fit: cover;
        }
    }
}
.home-container-wrapper {
    display: flex;
    height: 100%;
    width: 100%;
}
.home-nav-wrapper {
    flex-basis: 200px;
    height: 100%;
    border-right: 1px solid greenyellow;
    .home-nav-item {
        font-weight: 700;
        font-size: 16px;
        & > a:nth-child(1) {
            display: block;
            width: 100%;
            height: 100%;
            padding: 15px;
        }
    }
    .home-nav-item:hover {
        background-color: aquamarine;
    }
    .home-nav-item__active {
        background-color: gold;
    }
}
.home-content-wrapper {
    flex: 1;
}
</style>
