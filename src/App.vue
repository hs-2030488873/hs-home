<template>
    <div class="app">
        <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transition || 'fade'">
                <keep-alive :include="allAlivePagesNames" :max="10">
                    <component :is="Component"></component>
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// ! 需要保证在router meta 中定义的组件名与实际的组件名一致
const allAlivePagesNames = router.getRoutes().reduce((pre, cur) => {
    if (cur.meta.isAlive && cur.meta.componentName) {
        pre.push(cur.meta.componentName)
        return pre
    }
    return pre
}, [] as any[])
</script>

<style>
html,
body {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

#app,
.app {
    height: 100%;
    width: 100%;
    overflow: hidden;
}
</style>
