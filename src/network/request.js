import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function request (config) {
  const instance = axios.create({
    baseURL: 'https://ku.qingnian8.com/dataApi/qingKu'
  })

  // 在发送请求之前做些什么
  instance.interceptors.request.use(function (config) {
    NProgress.start()
    return config
  })

  // 对响应数据做些什么
  instance.interceptors.response.use(function (response) {
    NProgress.done()
    return response
  })

  return instance(config)
}
