import Vue from 'vue'
import VueMaterial from 'vue-material'

import App from './App.vue'
import Axios from './plugins/axios'
import Filters from './plugins/filters'
import Settings from './plugins/settings'
import Udaru from './plugins/udaru'
import Validation from './plugins/validation'
import router from './router'
import store from './store'

import 'vue-material/dist/vue-material.min.css'
import './styles.scss'
// import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

Vue.use(Axios)
Vue.use(Filters)
Vue.use(Settings)
Vue.use(Udaru)
Vue.use(Validation)
Vue.use(VueMaterial)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
