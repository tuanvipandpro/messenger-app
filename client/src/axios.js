import axios from "axios"
import { ENDPOINT } from "./constants"

axios.defaults.baseURL = `${ENDPOINT}`

axios.interceptors.request.use(config => {
  if (!axios.defaults.headers.common.Authorization && sessionStorage.getItem('user')) {
    config.headers.Authorization = JSON.parse(sessionStorage.getItem('user')).token
  }
  return config
})

export default axios