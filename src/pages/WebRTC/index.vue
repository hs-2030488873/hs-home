<template>
    <div>
        <div>hello let us learn webRTC</div>

        <div>
            <button class="common-pc-btn" @click="getDevicesList">
                获取设备
            </button>
            <div @click="getStream">
                <button
                    v-for="device in deviceList"
                    :data-id="device.deviceId"
                    :key="device.deviceId"
                >
                    {{ `${device.label}` }}
                </button>
            </div>
            <div>
                <button @click="canvasPrint">canvas截图</button>
                <button @click="canvasFilter">canvas滤镜</button>
                <button @click="!isCanvasVideo && canvasSync()">
                    canvas同步
                </button>
                <button @click="cancelCanvasSync">取消同步</button>
            </div>
        </div>
        <div class="container">
            <video ref="videoEl"></video>
        </div>
        <div class="container">
            <canvas ref="canvasEl"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { UserMediaController } from '@/utils/index'
import { onBeforeRouteLeave } from 'vue-router'

const videoEl = ref<HTMLVideoElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
const canvasCtx = ref<CanvasRenderingContext2D | null>(null)

const deviceList = ref<MediaDeviceInfo[]>([])

const isVideoStream = ref<boolean>(false)
const isCanvasDraw = ref<boolean>(false)
const isCanvasVideo = ref<boolean>(false)
const isGray = ref<boolean>(false)

const userMediaController = new UserMediaController({
    video: true,
    audio: true
})

onMounted(async () => {
    canvasCtx.value = canvasEl!.value!.getContext('2d')
    canvasEl.value!.width = 480
    canvasEl.value!.height = 300
})

function getDevicesList() {
    navigator.mediaDevices.enumerateDevices().then(devices => {
        deviceList.value = devices.slice()
    })
}

async function getStream(event: Event) {
    const [error, localStream] = await userMediaController.getUserMediaStream({
        video: {
            // @ts-ignore
            deviceId: event.target.getAttribute('data-id'),
            width: 480,
            height: 300
        }
    })

    if (error === null && videoEl.value !== null) {
        if ('srcObject' in videoEl.value) {
            videoEl.value.srcObject = localStream
        } else if ('src' in videoEl.value) {
            // @ts-ignore
            videoEl.value.src = window.createObjectURL(localStream)
            // TODO: 是够需要在结束的时候revoke 这个创建的URL
        }

        videoEl.value.onloadedmetadata = function () {
            ;(videoEl.value as HTMLVideoElement).play()
            isVideoStream.value = true
        }
    } else {
        console.log('获取媒体失败')
    }
}

function canvasPrint() {
    console.log(videoEl.value!.width, videoEl.value!.height)
    canvasCtx.value!.drawImage(
        videoEl.value as HTMLVideoElement,
        0,
        0,
        480,
        300
    )
    isCanvasDraw.value = true
}

function getGray(imgData: ImageData) {
    const data = imgData.data
    const iData = new ImageData(imgData.width, imgData.height)

    for (let i = 0; i < data.length; i += 4) {
        let gray = (data[i] + data[i + 1] + data[i + 2]) / 3
        iData.data[i] = iData.data[i + 1] = iData.data[i + 2] = gray
        // !透明度保持不变
        iData.data[i + 3] = data[i + 3]
    }
    return iData
}

function canvasFilter(event?: Event) {
    if (event?.target) {
        isGray.value = !isGray.value
    }
    // !频繁访问getImageData函数有性能问题
    if (isCanvasDraw.value) {
        const imgData = canvasCtx.value!.getImageData(0, 0, 480, 300)
        const grayData = getGray(imgData)
        canvasCtx.value!.putImageData(grayData, 0, 0)
    }
}

let id: number
function canvasSync() {
    if (!isVideoStream.value) return
    id = requestAnimationFrame(canvasSync)
    if (isVideoStream.value && canvasCtx.value) {
        canvasPrint()
        if (isGray.value) {
            canvasFilter()
        }
        isCanvasVideo.value = true
    }
}

function cancelCanvasSync() {
    cancelAnimationFrame(id)
    isCanvasVideo.value = false
}

onBeforeRouteLeave(() => {
    userMediaController.closeUserMediaStream()
    cancelCanvasSync()
    if (videoEl.value) {
        videoEl.value.srcObject = null
    }
})
</script>

<style scoped lang="less">
.container {
    width: 480px;
    height: 300px;
    border: 1px solid blanchedalmond;
    video,
    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>
