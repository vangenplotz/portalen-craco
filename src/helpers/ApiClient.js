import fetch from 'isomorphic-unfetch'
import { stringify } from 'querystringify'

const fixParams = params => {
  const keys = Object.keys(params)
  return keys.reduce((obj, key) => {
    const item = params[key]
    let extra = {}
    if (typeof item === 'object' && item !== null) {
      const objKeys = Object.keys(item)
      objKeys.forEach(objKey => {
        extra[`${key}[${objKey}]`] = item[objKey]
      })
    } else {
      extra[key] = item
    }
    return {
      ...obj,
      ...extra
    }
  }, {})
}

const requestHelper = (method, instans) => {
  return (url, { params, data } = {}) =>
    new Promise((resolve, reject) => {
      const query = params ? `?${stringify(fixParams(params))}` : ''
      const body = data ? { body: JSON.stringify(data) } : {}
      let timeout = setTimeout(() => {
        const str = `Timeout for ${url}`
        // eslint-disable-next-line no-console
        console.log(str)
        reject(new Error(str))
      }, 50000)
      const authorization = instans.token ? `Bearer ${instans.token}` : null
      fetch(`${url}${query}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          authorization
        },
        ...body
      })
        .then(response => response.json())
        .then(json => {
          if (json && json.error) {
            return reject(json.error || 'Unknown error')
          }
          if (timeout) {
            clearTimeout(timeout)
            timeout = null
          }
          resolve(json)
        })
        .catch(function(error) {
          reject(error.message || 'Unknown error')
        })
    })
}

export default class ApiClient {
  constructor(token) {
    this.get = requestHelper('GET', this)
    this.post = requestHelper('POST', this)
    this.put = requestHelper('PUT', this)
    this.del = requestHelper('DELETE', this)
    this.token = token
  }
  empty() {}
}
