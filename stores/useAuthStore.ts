import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: "",
      user: {
        name: "",
        national_id: "",
        surname: "",
        phone_number: "",
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
    setUser(name: string,
            national_id: string,
            surname: string,
            phone_number: string,
            image_path: string)
    {
      this.user.name = name
      this.user.surname = surname
      this.user.national_id = national_id
      this.user.phone_number = phone_number
      this.user.image_path = image_path
    },
    clear() {
      this.token = ''
      this.user.name = ''
      this.user.surname = ''
      this.user.national_id = ''
      this.user.phone_number = ''
      this.user.image_path = ''
    },
  },
  persist: true
})