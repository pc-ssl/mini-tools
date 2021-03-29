// 拦截重构Page
const originPage = Page
Page = options => {
  const mixin = options.mixin
  if (mixin && isArray(mixin)) {
    options = merge(options, mixin)
  }
  originPage(options)
}

// 小程序内置的属性/方法
const originProperties = ['data', 'properties', 'options']
const originMethods = [
  'onLoad',
  'onReady',
  'onShow',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onPageScroll',
  'onTabItemTap'
]
/**
 * 合并对象
 * @param {object} options
 * @param {array} mixin
 */
function merge (options, mixins) {
  mixins.forEach(mixin => {
    // mixin 必须是一个对象
    if (!isObject(mixin)) {
      throw new Error('Mixin mast be an object')
    }

    // 合并属性对象
    for (let [key, val] of Object.entries(mixin)) {
      // 如果是内置属性
      if (originProperties.includes(key)) {
        options[key] = Object.assign(options[key], val)
      }
      // 如果是内置函数
      else if (originMethods.includes(key)) {
        const originFunc = options[key]
        options[key] = function (...arg) {
          // 先执行混入的函数
          val.call(this, ...arg)
          return originFunc && originFunc.call(this, ...arg)
        }
      } else {
        options = Object.assign(options, mixin)
      }
    }
  })
  return options
}

/**
 * 判断是否为对象
 */
function isObject (target) {
  return Object.prototype.toString.call(target) === '[object Object]'
}

/**
 * 判断是否为数组
 */
function isArray (target) {
  return Array.isArray(target)
}
