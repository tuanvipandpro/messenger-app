import axios from '../axios'
import { defineStore } from 'pinia'

export const useChatterStore = defineStore('chatter', {
  state: () => ({
    chatter: []
  }),
  getters: {
    //TODO
  },
  actions: {
    async getAvailableUser() {
      const url = `/api/users`
      const res = await axios.get(url, {
        params: {
          pageNo: 1,
          pageNum: 10000
        }
      })

      if (res.status === 200) {
        const data = res.data.data.map((e, index) => {
          return {
            chatting: index === 0,
            newChat: false,
            ...e
          }
        })
        
        return data
      }

      return false
    },
    async getChatByRoomId(roomId) {
      const url = `/api/chats`
      const res = await axios.get(url, {
        params: {
          roomId: roomId
        }
      })
      return res.status === 200 ? res.data : false
    },
    async createChatForUserInRoom(roomId, text) {
      const url = `api/chats`
      const body = {
        roomId,
        text
      }
      const res = await axios.post(url, body)
      return res.status === 200 ? res.data : false
    }
  }
})