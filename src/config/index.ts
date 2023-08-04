import { App } from 'vue'

declare module 'vue' {
    interface ComponentCustomProperties {
        msg: string
    }
}

export default {
    install: (app: App) => {
        app.config.globalProperties.msg = 'hello world!'
    }
}

// 已插件的形式定义全局属性，全局组件，全局自定义指令
// 在setup中访问
// const ctx = getCurrentInstance()
// console.log(ctx?.appContext.config.globalProperties.msg);
// 其他方式可用this. 访问属性
