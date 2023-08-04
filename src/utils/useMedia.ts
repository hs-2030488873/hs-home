// ! UserMediaService

export class UserMediaController {
  private constraint: MediaStreamConstraints
  private stream: MediaStream | null
  constructor(constraint: MediaStreamConstraints) {
    this.constraint = constraint
    this.stream = null
  }

  async getUserMediaStream(constraint: MediaStreamConstraints) {
    const result: [Error | null, MediaStream | null] = [null, null]
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        ...this.constraint,
        ...constraint
      })
      result[1] = stream
      // !用于关闭摄像头和麦克风
      this.stream = stream
    } catch (err) {
      console.log('createMediaError', err)
      result[0] = err as Error
    } finally {
      return result
    }
  }

  async closeUserMediaStream() {
    // TODO: 实现关闭音视频流的方法
    try {
      this.stream?.getVideoTracks().forEach(track => {
        track.stop()
        console.log('userMediaStream closed')
      })
    } catch (err) {
      console.log('关闭摄像头失败', err)
    }
  }
}

export default UserMediaController
