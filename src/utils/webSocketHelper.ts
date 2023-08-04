interface WebSocketHelperType {
  init(): Promise<WebSocket | null>
}

type MessageCallback = (data: any) => void

class WebSocketHelper implements WebSocketHelperType {
  private url: string
  private onMessageCallback: MessageCallback
  socket: WebSocket | undefined

  constructor(url: string, cb: MessageCallback) {
    this.url = url
    this.onMessageCallback = cb
  }

  init() {
    return new Promise<WebSocket | null>(async (resolve, reject) => {
      try {
        const ws = new WebSocket(this.url)
        ws.onopen = () => {
          this.socket = ws
          resolve(ws)
        }
        ws.onerror = _ => {
          // TODO: 连接失败时的触发暂时不清楚
          reject(null)
        }
        ws.onmessage = event => {
          let result = event.data

          if (/^\{\}$/.test(event.data)) {
            result = JSON.parse(event.data)
          }

          this.onMessageCallback(result)
        }
      } catch (e) {
        reject(e)
      }
    })
  }
  close() {
    this.socket?.close()
  }
  send(data: Record<string, any>) {
    this.socket?.send(JSON.stringify(data))
  }
}

export default WebSocketHelper
