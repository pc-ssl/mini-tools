class Socket {
  baseUrl = ''
  socketMsgQueue = []
  socketOpen = false

  constructor () {
    wx.onSocketOpen(this.onSocketOpen)
    wx.onSocketClose(this.onSocketClose)
    wx.onSocketError(this.onSocketError)
  }

  create (option) {
    Object.assign(this, {
      baseUrl: option.baseUrl
    })
  }
  /**
   * 连接
   */
  connect (url) {
    const { baseUrl } = this
    wx.connectSocket({ url: `${baseUrl}${url}` })
  }
  /**
   * 发送
   */
  send (data) {
    if (this.socketOpen) {
      wx.sendSocketMessage({ data })
    } else {
      this.socketMsgQueue.push(data)
    }
  }
  /**
   * 关闭
   */
  close () {
    wx.closeSocket()
  }
  /**
   * 接受函数
   */
  onMessage (fn) {
    wx.onSocketMessage(res => {
      fn && fn(res)
    })
  }
  /**
   * socket 打开时
   */
  onSocketOpen (res) {
    this.socketOpen = true
    for (let i = 0; i < this.socketMsgQueue.length; i++) {
      this.sendSocketMessage(this.socketMsgQueue[i])
    }
    this.socketMsgQueue = []
  }
  /**
   * 关闭时
   */
  onSocketClose (res) {
    this.socketOpen = false
  }
  /**
   * 出粗时
   */
  onSocketError(){

  }
}

export default Socket
