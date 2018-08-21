export default {
  install(Vue) {
    Vue.filter('json', value => JSON.stringify(value, null, 2))
  }
}
