import Vue from 'vue'
import VueMaterial from 'vue-material'

import App from './App.vue'
import router from './router'
import Auth from './plugins/auth'
import Axios from './plugins/axios'
import Udaru from './plugins/udaru'

import 'vue-material/dist/vue-material.min.css'
import './styles.scss'
// import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

Vue.use(Auth)
Vue.use(Axios)
Vue.use(Udaru)
Vue.use(VueMaterial)

Vue.filter('json', value => JSON.stringify(value, null, 2))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
