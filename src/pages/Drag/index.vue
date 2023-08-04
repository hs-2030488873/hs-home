<template>
    <div class="drag">
        <div class="left">
            <draggable
                :group="ga"
                :list="leftList"
                animation="300"
                :force-fallback="true"
                ghost-class="ghost"
                chosen-class="chosenClass"
                @start="onStart"
                @end="onEnd"
            >
                <template #item="{ element }">
                    <div class="item">
                        {{ element.text }}
                    </div>
                </template>
            </draggable>
        </div>
        <div class="right">
            <draggable
                :group="ga"
                :list="rightList"
                animation="300"
                :force-fallback="true"
                ghost-class="ghost"
                chosen-class="chosenClass"
                @start="onStart"
                @end="onEnd"
            >
                <template #item="{ element }">
                    <div class="item">
                        {{ element.text }}
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const leftList = ref([
    {
        text: '这是左边第一条数据',
        id: 0
    },
    {
        text: '这是左边第二条数据',
        id: 1
    },
    {
        text: '这是左边第三条数据',
        id: 2
    }
])

const rightList = ref([
    {
        text: '这是右边第一条数据',
        id: 3
    },
    {
        text: '这是右边第二条数据',
        id: 4
    },
    {
        text: '这是右边第三条数据',
        id: 5
    }
])
const ga = ref({
    name: 'ga',
    pull: true, //允许拖出,如果设置 字符串'clone' 表示该组拖出的元素会被克隆
    put: true //允许拖入
})
//拖拽开始的事件
const onStart = () => {
    console.log('开始拖拽')
}

//拖拽结束的事件
const onEnd = () => {
    console.log('结束拖拽')
}
</script>

<style scoped lang="less">
.drag {
    width: 600px;
    display: flex;
}

.drag > div:nth-of-type(1) {
    flex: 1;
}

.drag > div:nth-of-type(2) {
    width: 270px;
    padding-left: 20px;
}

.item {
    border: solid 1px #eee;
    padding: 6px 10px;
    text-align: left;
}

.item:hover {
    cursor: move;
}

.item + .item {
    margin-top: 10px;
}

.ghost {
    border: solid 1px rgb(19, 41, 239);
}

.chosenClass {
    background-color: #f1f1f1;
}
</style>
