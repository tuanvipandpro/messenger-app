import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: null
  }),
  getters: {
    //TODO
  },
  actions: {
    login() {
      //TODO
    }
  }
})