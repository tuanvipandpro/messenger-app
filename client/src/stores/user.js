import axios from '../axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    avatar: '',
    token: ''
  }),
  getters: {
    //TODO
  },
  actions: {
    async login(firebaseToken) {
      const url = `/auth/login`
      const body = {
        firebaseToken: firebaseToken
      }

      const res = await axios.post(url, body)

      if (res.status === 200) {
        axios.defaults.headers.common.Authorization = res.data.token
        sessionStorage.setItem('user', JSON.stringify(res.data))
      }
    }
  }
})