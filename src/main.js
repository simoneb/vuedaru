import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Auth from './plugins/auth'
import Axios from './plugins/axios'
import Udaru from './plugins/udaru'

Vue.config.productionTip = false

Vue.use(Auth)
Vue.use(Axios)
Vue.use(Udaru)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
