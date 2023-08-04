<template>
    <div class="h-lifecycle-container">
        <h5>hello lifecycle!</h5>
        <div>
            <button @click="count++">count++</button>
        </div>
        <Child :count="count"></Child>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Child from './child.vue'

export default defineComponent({
    name: 'lifecycle',
    components: {
        Child
    },
    data() {
        return {
            count: 0
        }
    },
    setup() {
        console.log('lifecycle setup')
    },
    beforeCreate() {
        console.log('lifecycle before create')
    },
    created() {
        console.log('lifecycle created')
    },
    beforeMount() {
        console.log('lifecycle before mount')
    },
    mounted() {
        console.log('lifecycle mounted')
    },
    unmounted() {
        console.log('lifecycle unmounted')
    },
    activated() {
        console.log('lifecycle activated')
    },
    deactivated() {
        console.log('lifecycle deactivated')
    },
    beforeUpdate() {
        console.log('lifecycle before update')
    },
    updated() {
        console.log('lifecycle updated')
    }
})
</script>
