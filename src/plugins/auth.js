export default function plugin(Vue) {
  if (plugin.installed) return

  plugin.installed = true

  Vue.prototype.$auth = Vue.auth = {
    isAuthenticated() {
      return !!localStorage.getItem('auth')
    },
    logout() {
      localStorage.removeItem('auth')
    },
    async login(auth) {
      const user = await Vue.udaru.checkUserForLogin(auth)
      console.log(user)
      localStorage.setItem('auth', auth)
    },
    getUserId() {
      return localStorage.getItem('auth')
    }
  }
}
