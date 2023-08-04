<template>
  <div>
    <div></div>
    <div>
      <div>{{ content }}</div>
    </div>
    <div>
      <div>确定</div>
      <div>取消</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const content = ref('')
</script>

<style scoped></style>
