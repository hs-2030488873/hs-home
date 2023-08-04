<template>
    <div class="h-lifecycle-container">
        <h5>hello lifecycle child!</h5>
        <div>
            <span> count: {{ count }} </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'lifecycle-child',
    props: {
        count: Number
    },
    data() {
        return {}
    },

    setup() {
        console.log('lifecycle child setup')
    },
    beforeCreate() {
        console.log('lifecycle child before create')
    },
    created() {
        console.log('lifecycle child created')
    },
    beforeMount() {
        console.log('lifecycle child before mount')
    },
    mounted() {
        console.log('lifecycle child mounted')
    },
    unmounted() {
        console.log('lifecycle child unmounted')
    },
    activated() {
        console.log('lifecycle child activated')
    },
    deactivated() {
        console.log('lifecycle child deactivated')
    },
    beforeUpdate() {
        console.log('lifecycle child before update')
    },
    updated() {
        console.log('lifecycle child updated')
    }
})
</script>
