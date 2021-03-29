// 小程序页面类型
const PageType = {
  NORMAL: 'normal',
  TAB: 'tab'
}

/**
 * 对象拼接参数
 */
function obj2Params (obj = {}, encode = false) {
  const result = []
  Object.keys(obj).forEach(key =>
    result.push(`${key}=${encode ? encodeURIComponent(obj[key]) : obj[key]}`)
  )
  return result.join('&')
}

/**
 * url 和 query 字符串拼接
 */
function paramsParsing (path, query) {
  const routePath =
    typeof path === 'string' ? { type: PageType.NORMAL, path } : path
  const urlQuery = obj2Params(query)
  const toUrl = `${routePath.path}${urlQuery ? `?${urlQuery}` : ''}`
  return { routePath, toUrl }
}

class Navigator {
  // 最大深度
  maxDeep = 10
  gotoPage (options) {
    if (options.type === PageType.TAB) {
      return this.switchTab(options)
    }
    const pages = getCurrentPages()
    const pagesLength = pages.length
    if (pagesLength >= this.maxDeep) {
      this.redirectTo(options)
    } else {
      this.navigateTo(options)
    }
  }
  navigateTo ({ path, query, events = {} }) {
    const { toUrl: url } = paramsParsing(path, query)
    return new Promise((resolve, reject) => {
      wx.navigateTo({
        url,
        events,
        success: resolve,
        fail: reject
      })
    })
  }
  switchTab ({ path, query }) {
    const { toUrl: url } = paramsParsing(path, query)
    return new Promise((resolve, reject) => {
      wx.switchTab({
        url,
        success: resolve,
        fail: reject
      })
    })
  }
  redirectTo ({ path, query }) {
    const { toUrl: url } = paramsParsing(path, query)
    return new Promise((resolve, reject) => {
      wx.redirectTo({
        url,
        success: resolve,
        fail: reject
      })
    })
  }
  navigateBack ({ delta, setData }) {
    if (setData) {
      const pageStack = getCurrentPages()
      const backPage = pageStack[pageStack.length - 1 - (delta || 1)]
      backPage && backPage.setData(setData)
    }
    return new Promise((resolve, reject) => {
      wx.navigateBack({
        delta,
        success: resolve,
        fail: reject
      })
    })
  }
  reLaunch ({ path, query }) {
    const { toUrl: url } = paramsParsing(path, query)
    return new Promise((resolve, reject) => {
      wx.reLaunch({
        url,
        success: resolve,
        fail: reject
      })
    })
  }
}

export default new Navigator()
