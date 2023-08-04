<template>
  <div>
    <h5>this is a functional component!</h5>
    <span>{{ msg }}</span>
  </div>
</template>

<!-- <script lang="ts" setup>
// 函数式组件
withDefaults(
  defineProps<{
    msg: string
  }>(),
  {
    msg: 'default msg'
  }
)
</script> -->

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  functional: true,
  props: {
    msg: {
      type: String,
      default: 'default msg'
    }
  }
})
</script>
