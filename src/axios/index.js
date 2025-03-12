import axios from "axios"
import router from "@/router"
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: '/steel',
  withCredentials: false,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      Message.error(res.data.msg)
    }
    return res.data
  },
  (error) => {
    console.log(error.response)
    if (error.response && error.response.data) {
      if (error.response.data.errorCode === '401') {
        Message.error('登录过期，请重新登录')
        router.replace('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default request