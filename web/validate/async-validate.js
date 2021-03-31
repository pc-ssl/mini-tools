
/**
 * 文档参考地址：
 * https://zhuanlan.zhihu.com/p/269624748?utm_source=wechat_session
 * https://github.com/pc-ssl/async-validator-source-code-analysis
 */


import Schema from 'Schema '

const descriptor = {
  name: {
    type: 'string',
    required: true,
    validator: (rule, value) => value === 'muji'
  },
  age: {
    type: 'number',
    asyncValidator: (rule, value) => {
      return new Promise((resolve, reject) => {
        if (value < 18) {
          reject('too young') // reject 这个 error message
        } else {
          resolve()
        }
      })
    }
  }
}
const validator = new Schema(descriptor)
validator.validate({ name: 'muji' }, (errors, fields) => {
  if (errors) {
    // 校验失败，errors是一个包含所有error的数组。
    // fields是一个对象，对象中field（字段）是key，每个field对应的所有error组成的数组是value。
    return handleErrors(errors, fields)
  }
  // 校验通过
})

// PROMISE使用方法
validator
  .validate({ name: 'muji', age: 16 })
  .then(() => {
    // 校验通过或者没有error message
  })
  .catch(({ errors, fields }) => {
    return handleErrors(errors, fields)
  })
