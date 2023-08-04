<template>
  <div class="i-virtual-scroller" @scroll="onScroll">
    <section :style="{ height: allHeight }" class="i-container-scroller">
      <section
        :style="{ marginTop: currentScrollTopFix }"
        class="i-list-wrapper"
      >
        <div
          class="i-scroll-item"
          v-for="item in currentRenderList"
          :key="item.id"
        >
          <span>{{ item.msg }}</span>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Ref } from 'vue'

let data: any[] = []
let i = 0
while (i < 1000) {
  data.push({ msg: `测试虚拟列表${i}`, id: i + '' })
  i++
}
const renderList = ref(data)

const startIndex = ref(0) // 起始索引
const endIndex = ref(20) // 结束索引
const listItemHeight = 20 // 每个字元素高20px
const listTotal = endIndex.value - startIndex.value //可视区总长度
const listItemTotal = renderList.value.length // 数据总条数
const allHeight = listItemTotal * listItemHeight + 'px'
const currentScrollTop = ref(0) // 滚动距离
const currentScrollTopFix = computed(() => {
  return currentScrollTop.value + 'px'
})

const currentRenderList = computed(() => {
  return renderList.value.slice(startIndex.value, endIndex.value)
})

const resolveIndex = (
  scrollTop: number,
  start: Ref<number>,
  end: Ref<number>
) => {
  if (start.value < 0) {
    return
  }
  let num = Math.ceil(scrollTop / listItemHeight) // 向上取整
  start.value = num
  end.value = num + listTotal
}
const resolveOffset = (scrollTop: number) => {
  currentScrollTop.value = scrollTop
  if (scrollTop <= 0) {
    return
  }
  resolveIndex(scrollTop, startIndex, endIndex)
}

let time = 0
let fn = (e: any) => () => resolveOffset(e.target.scrollTop)
const onScroll = (e: any) => {
  let now = Date.now()
  if (now - time > 30) {
    time = now
    requestAnimationFrame(fn(e))
  }
}
</script>

<style scoped lang="less">
.i-virtual-scroller {
  width: 400px;
  height: 400px;
  position: relative;
  overflow-y: scroll;

  .i-container-scroller {
    background-color: #fff;
    width: 100%;
    position: relative;
  }

  .i-list-wrapper {
    width: 100%;
  }

  .i-scroll-item {
    height: 20px;
    line-height: 20px;
    width: 100%;
    background-color: red;
  }
}
</style>
