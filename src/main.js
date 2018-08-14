import Vue from 'vue'
import VueMaterial from 'vue-material'
import VeeValidate, {Validator} from 'vee-validate'

import App from './App.vue'
import router from './router'
import Auth from './plugins/settings'
import Axios from './plugins/axios'
import Udaru from './plugins/udaru'
import store from './store'

import 'vue-material/dist/vue-material.min.css'
import './styles.scss'
// import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

Validator.extend('json', {
  getMessage: field => 'The ' + field + ' value is not valid JSON',
  validate: value => {
    try {
      JSON.parse(value)
      return true
    } catch (err) {
      return false
    }
  }
})

Validator.extend('udaru_id', {
  getMessage: field => 'The ' + field + ' value can only contain letters, numbers or the special characters - and _',
  validate: value => /^[A-Za-z0-9_-]+$/.test(value)
})

Vue.use(Auth)
Vue.use(Axios)
Vue.use(Udaru)
Vue.use(VueMaterial)
Vue.use(VeeValidate)

Vue.filter('json', value => JSON.stringify(value, null, 2))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
