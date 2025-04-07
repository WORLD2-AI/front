// @ts-check
import { defineStore } from 'pinia'

/**
 * Simulate a login
 */
function apiLogin(a, p) {
  return Promise.resolve({
    username: a,
    password:p,
    isLogin: true,
    isAdmin: false,
  })
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => (
    {
        username: '',
        password:'',
        isLogin: false,
        isAdmin: false,
      }
  ),

  actions: {
    logout() {
        localStorage.removeItem('user');
        this.$patch({
          username: '',
          password:'',
          isLogin: false,
          isAdmin: false,
          illegal: false,
        })

        // we could do other stuff like redirecting the user
    },

    /**
     * Attempt to login a user
     */
    async login(user, password) {
      if (user == "" || password == ""){
        return 
      }
      const userData = await apiLogin(user, password)
      localStorage.setItem('user', JSON.stringify(userData));
      this.$patch(userData)
    },
/**
     * Load the user from localStorage
     */
    loadUser() {
      let userData = JSON.parse(localStorage.getItem('user'))
      if (!userData ||userData.username === '') {
        userData = {
          username: '',
          isAdmin: false,
          isLogin:false,
        }
      }
      
      this.$patch(userData)
    }
  },
})
