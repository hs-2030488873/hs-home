<template>
    <div class="h-input-wrap">
        <input
            :value="value"
            :length="length"
            @input="
                $emit(
                    'update:value',
                    ($event?.target as HTMLInputElement).value
                )
            "
            @change="onChange"
            type="text"
        />
        <slot name="after-fix" :slotsProps="'slotsPropValue'">--</slot>
    </div>
</template>

<script setup lang="ts">
import { ref, useAttrs, useSlots } from 'vue'

const slots = useSlots()
console.log('slots:', slots)
const attrs = useAttrs()
console.log('attrs:', attrs)

// 不含有默认值的props
// defineProps<{
//     value: string
// }>()

interface Props {
    value: string
    length?: number
}
withDefaults(defineProps<Props>(), {
    length: 20
})

// 不定义事件的类型
// const emit = defineEmits(['valChange', 'update:value'])

// 定义事件的类型
const emit = defineEmits<{
    (event: 'valChange', str: string): void
    (event: 'update:value', value: string): void
}>()

const onChange = () => {
    emit('valChange', '触发了change事件')
}

const testExpose = ref('testExpose')

// 导出属性以供访问
defineExpose({
    testExpose
})
</script>

<style scoped></style>
