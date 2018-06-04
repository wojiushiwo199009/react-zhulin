import _ from 'lodash'
/**
 *
 * @param {object} objParmas 传入的参数
*/

// obj = {
//   orderby: {           // 排序
//     cc: '',            // 从小到大
//     cdc: 'desc'       // 从大到小
//   },
//   filter: {           // 筛选   相等  大于 小于
//     eq: {
//       aaa: '',
//       bbb: 'desc'
//     },
//     lt: {
//       aaaa: '',
//       bbbb: 'desc'
//     },
//     gt: {
//       aaaaaa: '',
//       bbbbbb: 'desc'
//     },
//   },
//   pagination: {       // 分页
//     size: 3,          // 每页数据量
//     page: 4           // 页数
//   }
// }
// 结果
// "?%24filter=aaa%20eq%20''%20and%20bbb%20eq%20'desc'%20and%20aaaa%20lt%20''%20and%20bbbb%20lt%20'desc'%20and%20aaaaaa%20gt%20''%20and%20bbbbbb%20gt%20'desc'&%24orderby=cc%20and%20cdc&%24top=3&%24skip=4"
const getUrlParmas = (objParmas) => {
  const urlParmas = []
  if (_.isObject(objParmas)) {
    // 筛选条件:按照  companyid%20eq%20'123' 拼接
    if (objParmas.filter) {
      let values = []
      _.forIn(objParmas.filter, (value, key) => {
        console.log(key, value)
        _.forIn(value, (v, k) => {
          // 只有字符串类型的才加单引号
          if (_.isString(v)) {
            values.push(`${k}%20${key}%20'${v}'`)
          } else {
            values.push(`${k}%20${key}%20${v}`)
          }
        })
      })
      let valuesStr = '%24filter=' + values.join('%20and%20')
      urlParmas.push(valuesStr)
    }
    // 排序:按照  %24orderby=time%20desc 拼接
    if (objParmas.orderby) {
      let values = []
      _.forIn(objParmas.orderby, (value, key) => {
        console.log(key, value)
        if (value === 'desc') {
          values.push(`${key}%20desc`)
        } else {
          values.push(`${key}`)
        }
      })
      let valuesStr = '%24orderby=' + values.join('%20and%20')
      urlParmas.push(valuesStr)
    }
    // 分页 按照  %24top=2&%24skip=1  拼接
    if (objParmas.pagination) {
      urlParmas.push(`%24top=${objParmas.pagination.size}&%24skip=${objParmas.pagination.page}`)
    }
  } else {
    console.error('please input a object')
  }
  return '?' + urlParmas.join('&')
}

export default getUrlParmas
