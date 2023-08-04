<template>
    <div>
        <h5>this is test page!</h5>
        <div>
            <!-- <virtual-scroller></virtual-scroller> -->
            <FunctionalComponent :msg="msg" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import VirtualScroller from '@/components/VirtualScroller/index.vue'
import FunctionalComponent from '@/components/FunctionalComponent/index.vue'

const msg = ref('hello world')
</script>

<style scoped></style>
