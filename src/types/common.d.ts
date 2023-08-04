// ! 解决找不到模块或者模块的类型声明
// declare module '*.ts'

declare interface ToastOptions {
    text: string
    duration?: number
}

declare interface TodoItem {
    id: number
    title: string
    description: string
    isDone: boolean
    createTime: Date
    finishTime: Date | undefined
    note: string | undefined
}
