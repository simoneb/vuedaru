export default {
  install(Vue) {
    Vue.filter('json', (value, indent = true) => JSON.stringify(value, null, indent ? 2 : 0))
  }
}
