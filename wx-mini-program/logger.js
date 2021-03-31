const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null
class Logger {
  info () {
    if (!log) return
    log.info.apply(log, arguments)
  }
  warn () {
    if (!log) return
    log.warn.apply(log, arguments)
  }
  error () {
    if (!log) return
    log.error.apply(log, arguments)
  }
  setFilterMsg (msg) {
    if (!log || !log.setFilterMsg) return
    if (typeof msg !== 'string') return
    log.setFilterMsg(msg)
  }
  addFilterMsg (msg) {
    if (!log || !log.addFilterMsg) return
    if (typeof msg !== 'string') return
    log.addFilterMsg(msg)
  }
}

export default new Logger()
