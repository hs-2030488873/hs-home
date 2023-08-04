<template>
    <div>
        <div>
            <div>通信方式</div>
            <div>
                <button
                    :class="[
                        communicateMethods == 'WebSocket'
                            ? 'common-btn__active'
                            : ''
                    ]"
                    @click="changeMethod('WebSocket')"
                >
                    WebSocket
                </button>
                <button
                    :class="[
                        communicateMethods == 'webRTC'
                            ? 'common-btn__active'
                            : ''
                    ]"
                    @click="changeMethod('webRTC')"
                >
                    webRTC
                </button>
            </div>
        </div>
        <div v-if="communicateMethods === 'WebSocket'">
            <div>成员列表</div>
            <div>消息内容区</div>
        </div>
        <div v-if="communicateMethods === 'webRTC'">
            <div>控制区</div>
            <div>内容区</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WebSocketHelper from '@/utils/webSocketHelper'

type CommunicateMethodsType = 'WebSocket' | 'webRTC'
const communicateMethods = ref<CommunicateMethodsType>('WebSocket')
function changeMethod(method: CommunicateMethodsType) {
    communicateMethods.value = method
}

const wsHelper = new WebSocketHelper(
    'ws://localhost:3456/websocket',
    (data: any) => {
        console.log('message', data)
    }
)

wsHelper
    .init()
    .then(_socket => {
        wsHelper.send({ code: '999', data: '你好服务端' })
    })
    .catch(err => {
        console.log(err)
        window.alert('ws 连接失败')
    })
</script>
<script lang="ts">
export default {
    name: 'instant-messaging'
}
</script>
