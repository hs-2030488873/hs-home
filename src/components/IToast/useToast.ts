import { createVNode, render } from 'vue'
import ToastComponent from '@/components/IToast/index.vue'

// type ToastInstance = InstanceType<typeof ToastComponent>

const divElement = document.createElement('div')
document.body.appendChild(divElement)

const Toast = {
    show: (options: ToastOptions | string) => {
        let timer: any = null

        const toastVnode = createVNode(ToastComponent, {
            msg: typeof options === 'string' ? options : options.text
        })
        clearTimeout(timer)
        render(toastVnode, divElement)

        // const $vm = createApp(ToastComponent)
        // console.log($vm);
        // const instance: any = $vm.mount(divElement)
        // console.log(instance);

        timer = setTimeout(
            () => {
                render(null, divElement)
                // $vm.unmount()
            },
            typeof options === 'string' ? 2000 : options.duration
        )
    }
}
const useToast = () => {
    return Toast
}
export default useToast
