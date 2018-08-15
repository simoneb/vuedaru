import Axios from 'axios'

export default function plugin(Vue) {
  if (plugin.installed) return

  plugin.installed = true

  const axios = Axios.create({
    baseURL: 'http://localhost:8080'
  })

  axios.interceptors.request.use(config => {
    if (!config.headers.authorization) {
      config.headers.authorization = Vue.settings.getUserId()
    }
    return config
  })

  Vue.prototype.$axios = Vue.axios = axios
}
