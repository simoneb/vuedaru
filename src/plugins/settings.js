const USER_ID = 'user_id'
const URL = 'udaru_url'

export default function plugin(Vue) {
  if (plugin.installed) return

  plugin.installed = true

  Vue.prototype.$settings = Vue.settings = {
    isConfigured() {
      return !!this.getUserId() && !!this.getUrl()
    },
    setUserId(userId) {
      localStorage.setItem(USER_ID, userId)
    },
    getUserId() {
      return localStorage.getItem(USER_ID)
    },
    setUrl(url) {
      localStorage.setItem(URL, url)
    },
    getUrl() {
      return localStorage.getItem(URL)
    }
  }
}
