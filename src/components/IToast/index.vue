<template>
  <div class="i-toast-wrap">
    <span class="i-toast-text">{{ msg }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<style scoped>
.i-toast-wrap {
  width: 200px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
  border-radius: 6px;
}

.i-toast-text {
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
}
</style>
