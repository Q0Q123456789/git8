import axios from 'axios'
import qs from 'qs'
// import { Spin } from 'iview'\
import Cookies from 'js-cookie'
class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
        // 'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }
    return config
  }
  distroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {

      // if (config.method === 'post') {
      //   config.data = qs.stringify(config.data)
      // }
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      if (Cookies.get('token')) {
        config.headers.setCookie = Cookies.get('token')
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.distroy(url)
      // const { data, status } = res
      return res.data //{ data:data, status}
    }, error => {
      this.distroy(url)
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest