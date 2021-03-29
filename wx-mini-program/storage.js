function storage (...arg) {
  const [key, value] = arg
  const paramLength = arg.length
  validateKey(key)
  // 只有一个参数就获取
  if (paramLength === 1) {
    return wx.getStorageSync(key)
  }
  // 两个参数 set
  if (paramLength === 2) {
    wx.setStorageSync(key, value)
  }
}

storage.remove = function (key) {
  validateKey(key)
  wx.removeStorageSync(key)
}

storage.get = function (key) {
  validateKey(key)
  return wx.getStorageSync(key)
}

storage.set = function (key) {
  validateKey(key)
  wx.setStorageSync(key, value)
}

function validateKey (key) {
  if (!key || !typeof key === 'string') {
    throw new Error('key must string')
  }
}

export default storage
