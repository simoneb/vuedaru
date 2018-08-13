export default function plugin(Vue) {
  if (plugin.installed) return

  plugin.installed = true

  Vue.prototype.$settings = Vue.settings = {
    isAuthenticated() {
      return !!localStorage.getItem('auth')
    },
    logout() {
      localStorage.removeItem('auth')
    },
    async login(userId) {
      await Vue.udaru.checkUserForLogin(userId)
      localStorage.setItem('auth', userId)
    },
    getUserId() {
      return localStorage.getItem('auth')
    }
  }
}
