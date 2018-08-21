import Axios from 'axios'

export default {
  install(Vue) {
    const axios = Axios.create()

    axios.interceptors.request.use(config => {
      config.baseURL = Vue.settings.getUrl()

      if (!config.headers.authorization) {
        config.headers.authorization = Vue.settings.getUserId()
      }
      return config
    })

    Vue.prototype.$axios = Vue.axios = axios
  }
}
