import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: "",
      user: {
        id: "",
        email: "",
        username: "",
        firstname: "",
        lastname: "",
        phone: "",
        image_path: "",
      }
    }
  },
  getters: {
    isLogin: (state) => state.token !== ""
  },
  actions: {
    setNewToken(token: string) {
      this.token = token
    },
    setUser(
            id: string,
            email: string,
            username: string,
            firstname: string,
            lastname: string,
            phone: string,
            image_path: string)
    {
      this.user.id = id
      this.user.email = email
      this.user.username = username
      this.user.firstname = firstname
      this.user.lastname = lastname
      this.user.phone = phone
      this.user.image_path = image_path
    },
    clear() {
      this.token = ''
      this.user.id = ''
      this.user.email = ''
      this.user.username = ''
      this.user.firstname = ''
      this.user.lastname = ''
      this.user.phone = ''
      this.user.image_path = ''
    },
  },
  persist: true
})