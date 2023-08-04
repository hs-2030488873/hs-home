<template>
    <div class="h-todo-container">
        <div class="h-todo-add">
            <button @click="addTodo">新增</button>
        </div>

        <div class="h-todo-undone">
            <ul>
                <li
                    v-for="todo in allFinishedTodoList"
                    :key="todo.id"
                    class="h-todo-item"
                >
                    <div>
                        {{ todo.title }}
                    </div>
                    <div>
                        <span>已完成</span>
                    </div>
                </li>
            </ul>
        </div>

        <div class="h-todo-done">
            <ul>
                <li
                    v-for="todo in allUnfinishedTodoList"
                    :key="todo.id"
                    class="h-todo-item"
                >
                    <div>
                        {{ todo.title }}
                    </div>
                    <div>
                        <span @click="onTodoFinished(todo)"> 我完成了 </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useTodoStore } from '@/store'
import { onBeforeRouteLeave } from 'vue-router'

const todoStore = useTodoStore()

onMounted(() => {
    console.log('todoList page is mounted!')
    console.log(todoStore.todoList)
})

const todoList = ref<TodoItem[]>(todoStore.todoList ?? [])
const allFinishedTodoList = computed(() =>
    todoList.value.filter(todo => todo.isDone)
)
const allUnfinishedTodoList = computed(() =>
    todoList.value.filter(todo => !todo.isDone)
)

const addTodo = () => {
    const todo: Partial<TodoItem> = {}

    todo.id =
        1 +
        todoList.value.reduce((pre, cur, _) => {
            if (cur.id >= pre) {
                pre = cur.id
                return pre
            } else {
                return pre
            }
        }, 0)

    todo.title = 'Add Todo'
    todo.description = 'description'
    todo.isDone = false
    todo.createTime = new Date()
    todoList.value.push(todo as TodoItem)
}

const onTodoFinished = (item: TodoItem) => {
    item.isDone = true
    item.finishTime = new Date()
}

// 体验watch的使用
const unWatchTodo = watch(
    todoList,
    (newVal, _) => {
        console.log(newVal)
        unWatchTodo()
    },
    {
        deep: true
        // flush: "post", // 如需要在dom完成更新后触发回调
    }
)

onBeforeRouteLeave(() => {
    todoStore.updateTodoList(todoList.value)
})
</script>
