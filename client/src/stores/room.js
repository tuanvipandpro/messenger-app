import axios from '../axios'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('room', {
  state: () => ({
    room: {}
  }),
  getters: {
    //TODO
  },
  actions: {
    async getOpenChat(usersInRoom) {
      const url = `/api/chatRoom`
      const res = await axios.post(url, usersInRoom)

      if (res.status === 200) {
        return res.data
      }

      return false
    }
  }
})