/**
 * 拦截器构造函数
 */
class InterceptorsManner {
  constructor () {
    this.handlers = []
  }
  use (fn) {
    fn && this.handlers.push(fn)
  }
  eject (id) {
    if (this.handlers[id]) {
      this.handlers[id] = null
    }
  }
  forEach (fn) {
    this.handlers.forEach(function forEachHandler (h) {
      if (h !== null) {
        fn(h)
      }
    })
  }
}

class Request {
  baseUrl = ''
  timeout = 3000

  constructor () {
    // 拦截器构造
    this.interceptors = {
      request: new InterceptorsManner(),
      response: new InterceptorsManner()
    }

    // 批量创建请求
    ;['get', 'post'].forEach(method => {
      this[method] = (url, data, header) => {
        return this.request({ url, data, header, method })
      }
    })
  }
  create (options) {
    Object.assign(this, {
      baseUrl: options.baseUrl,
      timeout: options.timeout
    })
  }
  request (option) {
    const { baseUrl, timeout } = this
    // 请求拦截
    this.interceptors.request.forEach(interceptors => {
      option = interceptors(option)
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${baseUrl}${option.url}`,
        data: option.data || {},
        header: option.header || {},
        timeout,
        success: res => {
          // 响应拦截
          this.interceptors.response.forEach(interceptors => {
            res = interceptors(res)
          })
          resolve(res)
        },
        fail: reject
      })
    })
  }
}
export default Request
