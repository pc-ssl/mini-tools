
const strategies = {
  isNoEmpty: function (value, errorMsg) {
    if (value.replace(/\s/g, '') === '') {
      return errorMsg
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value < length) {
      return errorMsg
    }
  },
  isMobile: function (value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg
    }
  }
}

class Validate {
  constructor () {
    this.cache = []
  }
  add (value, rule, errorMsg) {
    const ary = rule.split(':')
    this.cache.push(function () {
      const strategy = ary.shift()
      ary.unshift(value)
      ary.push(errorMsg)
      return strategies[strategy](...ary)
    })
  }

  start () {
    for (let i = 0, vaildateFunc; (vaildateFunc = this.cache[i++]); ) {
      const msg = vaildateFunc()
      if (msg) {
        alert(msg)
        return false
      }
    }
  }
}

export default Validate
