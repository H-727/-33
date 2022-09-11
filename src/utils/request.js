import axios from 'axios'
import store from '@/store'

const request = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})

request.interceptors.request.use(
  function (config) {
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = 'Bearer ' + tokenObj.token
    }
    return config
  },
  function (error) {
    throw error
  }
)
export default request
