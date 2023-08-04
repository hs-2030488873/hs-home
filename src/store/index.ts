import { defineStore, createPinia } from 'pinia'

const store = createPinia()

const enum StoreNames {
  globalStore = 'globalStore',
  todoStore = 'todoStore'
}

export const useGlobalStore = defineStore(StoreNames.globalStore, {
  state() {
    return {
      current: 100,
      name: 'heshan'
    }
  },
  getters: {
    // 整合修饰数据使用
    // 类似于组建内部的computed,同样有缓存
    getCurrentNum(): number {
      return this.current + 100
    }
  },
  actions: {
    // 建议修改数据全部使用actions
    // 同时支持同步与移步
    setCurrent(value: number) {
      this.current = value
    }
  }
})

export const useTodoStore = defineStore(StoreNames.todoStore, {
  state(): {
    todoList: TodoItem[]
  } {
    return {
      todoList: []
    }
  },
  getters: {},
  actions: {
    updateTodoList(todoList: TodoItem[]) {
      this.todoList = todoList
    }
  }
})

export default store
